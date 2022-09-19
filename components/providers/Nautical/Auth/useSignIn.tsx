import React, { useCallback } from "react";
import { useApolloClient } from "@apollo/client";

import { setCsrfToken, setSignInToken } from "utils";
import { IS_SSR } from "utils/isSSR";

import { useSignInMutation } from "./mutations.graphql.generated";
import { UserDetailsDocument, UserDetailsQuery, useUserDetailsLazyQuery } from "./queries.graphql.generated";
import { AuthActionCreators, AuthActions } from "./actions";
import { BROWSER_NO_CREDENTIAL_API_MESSAGE } from "./constants";

type useSignInProps = {
  dispatch: React.Dispatch<AuthActions>;
};

const useSignIn = ({ dispatch }: useSignInProps) => {
  const [signInMutation] = useSignInMutation({ fetchPolicy: "no-cache" });
  const client = useApolloClient();

  const userDetailsQuery = useCallback(async () => {
    return client.query<UserDetailsQuery>({
      query: UserDetailsDocument,
      fetchPolicy: "network-only",
      errorPolicy: "all",
    });
  }, [client]);

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

        const { data: userDetailsData, error } = await userDetailsQuery();

        if (error) {
          dispatch(AuthActionCreators.errors([error]));
          return;
        }
        const user = userDetailsData?.me;

        if (user) {
          dispatch(AuthActionCreators.signIn(token, user));
        }
      } catch {
        const errors = [{ message: "There was an unexpected error. Please try again", field: "password" }];
        dispatch(AuthActionCreators.errors(errors));
      }
    },
    [dispatch, signInMutation, userDetailsQuery],
  );
};

export { useSignIn };
