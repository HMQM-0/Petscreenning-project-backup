import { Reducer } from "use-immer";

import { AuthActionCreators, AuthActionTypes } from "./actions";
import { IAuthContext } from "./context";

type AuthActionKeys = keyof typeof AuthActionCreators;
type AuthActions = ReturnType<typeof AuthActionCreators[AuthActionKeys]>;

export const reducer: Reducer<IAuthContext, AuthActions> = (draft, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      draft.user = action.payload.user;
      draft.token = action.payload.token;
      draft.authenticated = true;
      draft.loaded = true;
      break;
    case AuthActionTypes.SIGN_OUT:
      draft.user = undefined;
      draft.token = undefined;
      draft.authenticated = false;
      draft.loaded = true;
      break;
    default:
      throw new Error(`Auth Reducer had action type with no case ${action}`);
      break;
  }
};
