import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutContext, ICheckoutContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddPromoCode } from "./useAddPromoCode";
import { useInitializeCheckout } from "./useInitializeCheckout";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetSellerShippingMethods } from "./useSetSellerShippingMethods";
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
  const setSellerShippingMethods = useSetSellerShippingMethods({ dispatch });
  const addPromoCode = useAddPromoCode({ dispatch });

  const value: ICheckoutContext = {
    ...checkout,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    setShippingMethod,
    setSellerShippingMethods,
    addPromoCode,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider };
