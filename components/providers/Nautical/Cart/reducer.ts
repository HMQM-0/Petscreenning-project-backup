import { Reducer } from "use-immer";

import { CartActions, CartActionTypes } from "./actions";
import { ICartContext } from "./context";

export const reducer: Reducer<ICartContext, CartActions> = (draft, action) => {
  switch (action.type) {
    case CartActionTypes.UPDATE_ITEMS:
      draft.items = action.payload.items;
      break;
    case CartActionTypes.INITIALIZE_CART:
      draft.items = action.payload.items;
      draft.loaded = true;
      break;
    default:
      throw new Error(`Cart Reducer had action type with no case ${action}`);
  }
};
