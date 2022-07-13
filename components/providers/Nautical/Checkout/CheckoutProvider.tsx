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

  useInitializeCheckout({ dispatch });
  useOnSignOut({ dispatch });
  const setShippingAddress = useSetShippingAddress({
    dispatch,
    id: checkout.id,
    lines: checkout.lines,
    billingAsShipping: checkout.billingAsShipping,
  });
  const setBillingAddress = useSetBillingAddress({ dispatch });
  const setBillingAsShippingAddress = useSetBillingAsShippingAddress({ checkout, dispatch });
  const setShippingMethod = useSetShippingMethod({ dispatch });
  const setSellerShippingMethods = useSetSellerShippingMethods({ dispatch, id: checkout.id });
  const addPromoCode = useAddPromoCode({ dispatch });
  const removePromoCode = useRemovePromoCode({ dispatch });
  const createPayment = useCreatePayment({
    dispatch,
    id: checkout.id,
    billingAddress: checkout.billingAddress,
    applicableVolumeDiscounts: checkout.applicableVolumeDiscounts,
  });
  const completeCheckout = useCompleteCheckout({
    dispatch,
    id: checkout.id,
    applicableVolumeDiscounts: checkout.applicableVolumeDiscounts,
    applicableVolumeDiscountsBySeller: checkout.applicableVolumeDiscountsBySeller,
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
