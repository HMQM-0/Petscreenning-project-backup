import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutContext, ICheckoutContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useInitializeCheckout } from "./useInitializeCheckout";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetShippingMethod } from "./useSetShippingMethod";

type CheckoutProps = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: CheckoutProps) => {
  const [checkout, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  useInitializeCheckout({ dispatch });
  const setShippingAddress = useSetShippingAddress({ dispatch });
  const setBillingAddress = useSetBillingAddress({ dispatch });
  const setBillingAsShippingAddress = useSetBillingAsShippingAddress({ checkout, dispatch });
  const setShippingMethod = useSetShippingMethod({ dispatch });

  const value: ICheckoutContext = {
    ...checkout,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    setShippingMethod,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider };
