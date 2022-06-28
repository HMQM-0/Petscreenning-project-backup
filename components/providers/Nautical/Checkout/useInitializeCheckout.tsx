import React, { useEffect } from "react";

import { getCheckout, getPayment, setCheckout } from "utils";

import { CheckoutActionCreators, CheckoutActions } from "./actions";
import { useGetUserCheckout } from "./useGetUserCheckout";
import { ICheckoutContext } from "./context";

import { useAuth } from "../Auth";

type useInitializeCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useInitializeCheckout = ({ dispatch }: useInitializeCheckoutProps) => {
  const { authenticated } = useAuth();
  const getUserCheckout = useGetUserCheckout();

  useEffect(() => {
    const init = async () => {
      const checkout = getCheckout();
      const payment = getPayment();

      console.log("authenticated", authenticated);
      const { data, error } = await getUserCheckout(Boolean(authenticated), checkout?.token);

      if (error) {
        // TODO: What sort of error handling is appropriate here?
        // return {
        //   dataError: {
        //     error,
        //     type: DataErrorCheckoutTypes.GET_CHECKOUT,
        //   },
        // };
      }
      setCheckout(data || checkout);

      const initializedCheckout: ICheckoutContext = {
        checkout: data || checkout || undefined,
        promoCodeDiscount: checkout?.promoCodeDiscount,
        billingAsShipping: checkout?.billingAsShipping,
        selectedShippingAddressId: checkout?.selectedShippingAddressId,
        selectedBillingAddressId: checkout?.selectedBillingAddressId,
        availableShippingMethods: checkout?.availableShippingMethods,
        availableShippingMethodsBySeller: checkout?.availableShippingMethodsBySeller,
        applicableVolumeDiscounts: checkout?.applicableVolumeDiscounts ?? undefined,
        applicableVolumeDiscountsBySeller:
          checkout?.applicableVolumeDiscountsBySeller?.map((item) => ({
            ...item,
            volumeDiscount: item.volumeDiscount,
            seller: Number(item?.seller),
          })) ?? undefined,
        availablePaymentGateways: checkout?.availablePaymentGateways,
        payment: payment || undefined,
        loaded: true,
      };

      dispatch(CheckoutActionCreators.initializeCheckout(initializedCheckout));
    };

    init();
  }, [authenticated, dispatch, getUserCheckout]);
};

export { useInitializeCheckout };
