import React from "react";
import { useImmerReducer } from "use-immer";

import { CheckoutContext, ICheckoutContext, INITIAL_STATE } from "./context";
import { reducer } from "./reducer";
import { useAddPromoCode } from "./useAddPromoCode";
import { useCompleteCheckout } from "./useCompleteCheckout";
import { useCreatePayment } from "./useCreatePayment";
import { useInitializeCheckout } from "./useInitializeCheckout";
import { useOnSignOut } from "./useOnSignOut";
import { useRemovePromoCode } from "./useRemovePromoCode";
import { useSetBillingAddress } from "./useSetBillingAddress";
import { useSetBillingAsShippingAddress } from "./useSetBillingAsShippingAddress";
import { useSetSellerShippingMethods } from "./useSetSellerShippingMethods";
import { useSetShippingAddress } from "./useSetShippingAddress";
import { useSetShippingMethod } from "./useSetShippingMethod";
import { useSyncLocalStorage } from "./useSyncLocalStorage";
import { useUpdateLines } from "./useUpdateLines";

type CheckoutProps = {
  children: React.ReactNode;
};

const CheckoutProvider = ({ children }: CheckoutProps) => {
  const [checkout, dispatch] = useImmerReducer(reducer, INITIAL_STATE);
  const {
    id,
    lines,
    billingAddress,
    shippingAddress,
    billingAsShipping,
    applicableVolumeDiscounts,
    applicableVolumeDiscountsBySeller,
  } = checkout;

  useInitializeCheckout({ dispatch });
  useOnSignOut({ dispatch });
  const setShippingAddress = useSetShippingAddress({
    dispatch,
    id,
    lines,
    billingAsShipping,
  });
  const setBillingAddress = useSetBillingAddress({ dispatch, id, shippingAddress, lines });
  const setBillingAsShippingAddress = useSetBillingAsShippingAddress({
    id,
    shippingAddress,
    billingAddress,
    dispatch,
  });
  const setShippingMethod = useSetShippingMethod({ dispatch, id });
  const setSellerShippingMethods = useSetSellerShippingMethods({ dispatch, id });
  const addPromoCode = useAddPromoCode({ dispatch });
  const removePromoCode = useRemovePromoCode({ dispatch, id });
  const createPayment = useCreatePayment({
    dispatch,
    id,
    billingAddress,
    applicableVolumeDiscounts,
  });
  const completeCheckout = useCompleteCheckout({
    dispatch,
    id,
    applicableVolumeDiscounts,
    applicableVolumeDiscountsBySeller,
  });
  const updateLines = useUpdateLines({ dispatch });

  const value: ICheckoutContext = {
    ...checkout,
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

  useSyncLocalStorage({ checkout: value });

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider };
