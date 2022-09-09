import { Reducer } from "use-immer";

import { AuthActions, AuthActionTypes } from "./actions";
import { IAuthContext } from "./context";

export const reducer: Reducer<IAuthContext, AuthActions> = (draft, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      draft.user = action.payload.user;
      draft.token = action.payload.token;
      draft.authenticated = true;
      draft.loaded = true;
      draft.signedOut = false;
      break;
    case AuthActionTypes.SIGN_OUT:
      draft.user = undefined;
      draft.token = undefined;
      draft.authenticated = false;
      draft.loaded = true;
      draft.signedOut = true;
      break;
    case AuthActionTypes.UPDATE:
      draft.user = action.payload.user;
      draft.loaded = true;
      break;
    case AuthActionTypes.INITIALIZE:
      draft.loaded = true;
      break;
    default:
      // @ts-ignore - this will never happen, but is useful when adding a new action and debugging
      throw new Error(`Auth Reducer had action type with no case ${action.type}`);
      break;
  }
};
