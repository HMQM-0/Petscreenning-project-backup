import React from "react";

import { CheckoutActions } from "./actions";
import { CheckoutDispatchContext, ICheckoutDispatchContext } from "./context";
import { useAddPromoCode } from "./useAddPromoCode";
import { useCompleteCheckout } from "./useCompleteCheckout";
import { useCreatePayment } from "./useCreatePayment";
import { useRemovePromoCode } from "./useRemovePromoCode";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetSellerShippingMethods } from "./useSetSellerShippingMethods";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetShippingMethod } from "./useSetShippingMethod";
import { useUpdateLines } from "./useUpdateLines";

type CheckoutDispatchProps = {
  children: React.ReactNode;
  dispatch: React.Dispatch<CheckoutActions>;
};

const CheckoutDispatch = ({ dispatch, children }: CheckoutDispatchProps) => {
  const setShippingAddress = useSetShippingAddress({ dispatch });
  const setBillingAddress = useSetBillingAddress({ dispatch });
  const setBillingAsShippingAddress = useSetBillingAsShippingAddress({ dispatch });
  const setShippingMethod = useSetShippingMethod({ dispatch });
  const setSellerShippingMethods = useSetSellerShippingMethods({ dispatch });
  const addPromoCode = useAddPromoCode({ dispatch });
  const removePromoCode = useRemovePromoCode({ dispatch });
  const createPayment = useCreatePayment({ dispatch });
  const completeCheckout = useCompleteCheckout({ dispatch });
  const updateLines = useUpdateLines({ dispatch });

  const value: ICheckoutDispatchContext = {
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    setShippingMethod,
    setSellerShippingMethods,
    addPromoCode,
    removePromoCode,
    createPayment,
    completeCheckout,
    updateLines,
  };

  return <CheckoutDispatchContext.Provider value={value}>{children}</CheckoutDispatchContext.Provider>;
};

export { CheckoutDispatch };
