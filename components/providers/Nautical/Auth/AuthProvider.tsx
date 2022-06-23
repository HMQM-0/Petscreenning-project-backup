import React from "react";
import { useImmerReducer } from "use-immer";

import { AuthContext, IAuthContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAutoSignIn } from "./useAutoSignIn";
import { useSignIn } from "./useSignIn";
import { useSignOut } from "./useSignOut";
import { useVerifyToken } from "./useVerifyToken";

type AuthProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProps) => {
  const [auth, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  const signIn = useSignIn({ dispatch });
  const signOut = useSignOut({ dispatch });
  useAutoSignIn({ signIn });
  useVerifyToken({ signOut, dispatch });

  const value: IAuthContext = {
    ...auth,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
