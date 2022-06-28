import { Reducer } from "use-immer";

import { CheckoutActions, CheckoutActionTypes } from "./actions";
import { ICheckoutContext } from "./context";

export const reducer: Reducer<ICheckoutContext, CheckoutActions> = (draft, action) => {
  switch (action.type) {
    case CheckoutActionTypes.INITIALIZE_Checkout:
      // draft.items = action.payload.items;
      break;
    default:
      throw new Error(`Checkout Reducer had action type with no case ${action}`);
  }
};
