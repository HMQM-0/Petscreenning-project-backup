import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutContext, ICheckoutContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useInitializeCheckout } from "./useInitializeCheckout";
import { useSetShippingAddress } from "./useSetShippingAddress";

type CheckoutProps = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: CheckoutProps) => {
  const [checkout, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  useInitializeCheckout({ dispatch });
  const setShippingAddress = useSetShippingAddress({ dispatch });

  const value: ICheckoutContext = {
    ...checkout,
    setShippingAddress,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider };
