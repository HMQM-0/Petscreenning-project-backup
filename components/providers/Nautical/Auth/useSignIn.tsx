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
  });
  return useCallback(
    /**
     * Tries to authenticate user with given email and password.
     * @param email Email used for authentication.
     * @param password Password used for authentication.
     * @param autoSignIn Indicates if SDK should try to sign in user with given credentials in future without explicitly calling this method. True by default.
     */
    async (email: string, password: string, autoSignIn: boolean = true) => {
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
        return {
          errors,
        };
      }

      setSignInToken(data?.tokenCreate?.token || null);
      setCsrfToken(data?.tokenCreate?.csrfToken || null);

      const { data: userData, error: userDataError } = await userDetailsQuery();

      if (userDataError) {
        return {
          errors: [userDataError],
        };
      }

      const token = data?.tokenCreate?.token ?? undefined;
      const user = userData?.me;
      dispatch(AuthActionCreators.signIn(token, user));

      return {
        errors: null,
      };
    },
    [dispatch, signInMutation, userDetailsQuery],
  );
};

export { useSignIn };
