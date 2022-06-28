import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutContext, ICheckoutContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";

type CheckoutProps = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: CheckoutProps) => {
  const [checkout, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  const value: ICheckoutContext = {
    ...checkout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider };
