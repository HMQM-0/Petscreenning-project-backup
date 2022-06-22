import { useApolloClient } from "@apollo/client";
import React, { useCallback } from "react";
import { useImmerReducer } from "use-immer";

import { clearLocalStorage, setCsrfToken, setSignInToken } from "utils";
import { IS_SSR } from "utils/isSSR";

import { AuthActionCreators } from "./actions";
import { AuthContext, IAuthContext, INITIAL_STATE } from "./context";
import { useSignInMutation } from "./mutations.graphql.generated";
import { useUserDetailsLazyQuery } from "./queries.graphql.generated";
import { reducer } from "./reducer";

const BROWSER_NO_CREDENTIAL_API_MESSAGE =
  "Nautical SDK is unable to use browser Credential Management API.";

type AuthProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProps) => {
  const client = useApolloClient();
  const [signInMutation] = useSignInMutation({ fetchPolicy: "no-cache" });
  const [userDetailsQuery] = useUserDetailsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [auth, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  /**
   * Tries to authenticate user with given email and password.
   * @param email Email used for authentication.
   * @param password Password used for authentication.
   * @param autoSignIn Indicates if SDK should try to sign in user with given credentials in future without explicitly calling this method. True by default.
   */
  const signIn = useCallback(
    async (email: string, password: string, autoSignIn: boolean = true) => {
      const { data, errors } = await signInMutation({
        variables: { email, password },
      });

      try {
        // @ts-ignore
        if (!IS_SSR && autoSignIn && !errors && window.PasswordCredential) {
          await navigator.credentials.store(
            // @ts-ignore
            new window.PasswordCredential({
              id: email,
              password,
            })
          );
        }
      } catch (credentialsError) {
        // eslint-disable-next-line no-console
        console.warn(BROWSER_NO_CREDENTIAL_API_MESSAGE, credentialsError);
      }

      if (errors) {
        return {
          errors,
        };
      }

      setSignInToken(data?.tokenCreate?.token || null);
      setCsrfToken(data?.tokenCreate?.csrfToken || null);

      const { data: userData, error: userDataError } = await userDetailsQuery();

      // TODO: Initialize Checkout once that provider exists
      // if (this.config.loadOnStart.checkout) {
      //   await this.jobsManager.run("checkout", "provideCheckout", {
      //     isUserSignedIn: !!data?.user,
      //   });
      // }

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
    [dispatch, signInMutation, userDetailsQuery]
  );

  /**
   * Sign out user by clearing cache, local storage and authentication token.
   */
  const signOut = useCallback(async () => {
    clearLocalStorage();
    client.resetStore();
    dispatch(AuthActionCreators.signOut());
  }, [client, dispatch]);

  const value: IAuthContext = {
    ...auth,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
