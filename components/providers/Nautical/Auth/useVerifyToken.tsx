import { useCallback, useEffect, useRef } from "react";

import { getSignInToken } from "utils";

import { AuthActionCreators, AuthActions } from "./actions";
import { BROWSER_NO_CREDENTIAL_API_MESSAGE } from "./constants";
import { useVerifyTokenMutation } from "./mutations.graphql.generated";
import { useSignOut } from "./useSignOut";

type useVerifyTokenProps = {
  signOut: ReturnType<typeof useSignOut>;
  dispatch: React.Dispatch<AuthActions>;
};

const useVerifyToken = ({ signOut, dispatch }: useVerifyTokenProps) => {
  const hasVerifiedRef = useRef(false);
  const token = getSignInToken();
  const [verifyTokenMutation] = useVerifyTokenMutation({
    fetchPolicy: "no-cache",
  });

  const verify = useCallback(async () => {
    if (token) {
      const { errors, data } = await verifyTokenMutation({
        variables: {
          token,
        },
      });
      const user = data?.tokenVerify?.user ?? false;
      if (errors || !user) {
        await signOut();
        try {
          if (navigator.credentials?.preventSilentAccess) {
            await navigator.credentials.preventSilentAccess();
          }
        } catch (credentialsError) {
          // eslint-disable-next-line no-console
          console.warn(BROWSER_NO_CREDENTIAL_API_MESSAGE, credentialsError);
        }
      } else {
        dispatch(AuthActionCreators.signIn(token, user));
      }
    }
    dispatch(AuthActionCreators.initialize());
  }, [dispatch, signOut, token, verifyTokenMutation]);

  useEffect(() => {
    if (!hasVerifiedRef.current) {
      verify();
      hasVerifiedRef.current = true;
    }
  }, [verify]);
};

export { useVerifyToken };
