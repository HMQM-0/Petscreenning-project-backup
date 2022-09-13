import { IAuthContext } from "./context";

export const AuthActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  UPDATE: "UPDATE",
  ERROR: "ERROR",
  FETCHING: "FETCHING",
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
  update: (user: IAuthContext["user"]) => ({
    type: AuthActionTypes.UPDATE,
    payload: {
      user,
    },
  }),
  errors: (errors: IAuthContext["errors"]) => ({
    type: AuthActionTypes.ERROR,
    payload: {
      errors,
    },
  }),
  fetching: () => ({
    type: AuthActionTypes.FETCHING,
    payload: null,
  }),
} as const;

type AuthActionKeys = keyof typeof AuthActionCreators;
export type AuthActions = ReturnType<typeof AuthActionCreators[AuthActionKeys]>;
