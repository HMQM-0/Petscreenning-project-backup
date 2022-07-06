import React from "react";

import { CheckoutContext } from "./context";

export function useCheckout() {
  const context = React.useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within the CheckoutProvider");
  }
  return context;
}
