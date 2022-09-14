import React, { useCallback } from "react";

import { setCsrfToken, setSignInToken } from "utils";
import { IS_SSR } from "utils/isSSR";

import { useSignInMutation } from "./mutations.graphql.generated";
import { useUserDetailsLazyQuery } from "./queries.graphql.generated";
import { AuthActionCreators, AuthActions } from "./actions";
import { BROWSER_NO_CREDENTIAL_API_MESSAGE } from "./constants";

type useSignInProps = {
  dispatch: React.Dispatch<AuthActions>;
};

const useSignIn = ({ dispatch }: useSignInProps) => {
  const [signInMutation] = useSignInMutation({ fetchPolicy: "no-cache" });
  const [userDetailsQuery] = useUserDetailsLazyQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  return useCallback(
    /**
     * Tries to authenticate user with given email and password.
     * @param email Email used for authentication.
     * @param password Password used for authentication.
     * @param autoSignIn Indicates if SDK should try to sign in user with given credentials in future without explicitly calling this method. True by default.
     */
    async (email: string, password: string, autoSignIn: boolean = true) => {
      dispatch(AuthActionCreators.fetching());
      try {
        const { data, errors: graphqlErrors } = await signInMutation({
          variables: { email, password },
        });

        const errors = data?.tokenCreate?.errors || graphqlErrors || [];

        try {
          // @ts-ignore
          if (!IS_SSR && autoSignIn && !errors.length && window.PasswordCredential) {
            // @ts-ignore
            const passwordCredential = new window.PasswordCredential({
              id: email,
              password,
            });
            await navigator.credentials.store(passwordCredential);
          }
        } catch (credentialsError) {
          console.warn(BROWSER_NO_CREDENTIAL_API_MESSAGE, credentialsError);
        }

        if (errors.length) {
          dispatch(AuthActionCreators.errors(errors.map((error) => ({ message: error.message }))));
          return;
        }

        setSignInToken(data?.tokenCreate?.token || null);
        setCsrfToken(data?.tokenCreate?.csrfToken || null);

        const token = data?.tokenCreate?.token ?? undefined;

        await userDetailsQuery({
          onCompleted: (data) => {
            const user = data?.me;

            if (user) {
              dispatch(AuthActionCreators.signIn(token, user));
            }
          },
          onError: (apolloError) => {
            dispatch(AuthActionCreators.errors([apolloError]));
          },
        });
      } catch {
        const errors = [{ message: "There was an unexpected error. Please try again", field: "password" }];
        dispatch(AuthActionCreators.errors(errors));
      }
    },
    [dispatch, signInMutation, userDetailsQuery],
  );
};

export { useSignIn };
