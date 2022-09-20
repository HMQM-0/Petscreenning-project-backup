import React from "react";

import { CheckoutStateContext, CheckoutDispatchContext } from "./context";

export function useCheckout() {
  const state = React.useContext(CheckoutStateContext);
  const dispatch = React.useContext(CheckoutDispatchContext);
  const context = { ...state, ...dispatch };
  if (!state || !dispatch) {
    throw new Error("useCheckout must be used within the CheckoutProvider");
  }
  return context;
}
