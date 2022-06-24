import { useCallback, useEffect, useRef } from "react";

import { BROWSER_NO_CREDENTIAL_API_MESSAGE } from "./constants";
import { useSignIn } from "./useSignIn";

type useAutoSignInProps = {
  autoSignIn?: boolean;
  signIn: ReturnType<typeof useSignIn>;
};

const useAutoSignIn = ({ signIn, autoSignIn = true }: useAutoSignInProps) => {
  const hasSignedInRef = useRef(false);

  const credentialAPISignIn = useCallback(async () => {
    let credentials: Credential | null;
    try {
      // @ts-ignore
      credentials = await navigator.credentials.get({ password: true });
      // @ts-ignore
      if (credentials && "password" in credentials && credentials.password) {
        const { errors } = await signIn(
          // @ts-ignore
          credentials.id,
          // @ts-ignore
          credentials.password,
          true
        );
      }
    } catch (credentialsError) {
      console.warn(BROWSER_NO_CREDENTIAL_API_MESSAGE, credentialsError);
    }
  }, [signIn]);

  useEffect(() => {
    if (autoSignIn && !hasSignedInRef.current) {
      credentialAPISignIn();
      hasSignedInRef.current = true;
    }
  }, [credentialAPISignIn, autoSignIn]);
};

export { useAutoSignIn };
