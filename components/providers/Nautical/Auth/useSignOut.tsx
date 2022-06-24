import { useCallback } from "react";
import { useApolloClient } from "@apollo/client";

import { clearLocalStorage } from "utils";

import { AuthActions, AuthActionCreators } from "./actions";

type useSignOutProps = {
  dispatch: React.Dispatch<AuthActions>;
};

const useSignOut = ({ dispatch }: useSignOutProps) => {
  const client = useApolloClient();

  /**
   * Sign out user by clearing cache, local storage and authentication token.
   */
  return useCallback(async () => {
    clearLocalStorage();
    client.resetStore();
    dispatch(AuthActionCreators.signOut());
  }, [client, dispatch]);
};

export { useSignOut };
