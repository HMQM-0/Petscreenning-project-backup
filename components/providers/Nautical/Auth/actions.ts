import { IAuthContext } from "./context";

export const AuthActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
} as const;

export const AuthActionCreators = {
  signIn: (token: IAuthContext["token"], user: IAuthContext["user"]) => ({
    type: AuthActionTypes.SIGN_IN,
    payload: {
      token,
      user,
    },
  }),
  signOut: () => ({
    type: AuthActionTypes.SIGN_OUT,
    payload: null,
  }),
} as const;

type AuthActionKeys = keyof typeof AuthActionCreators;
export type AuthActions = ReturnType<typeof AuthActionCreators[AuthActionKeys]>;