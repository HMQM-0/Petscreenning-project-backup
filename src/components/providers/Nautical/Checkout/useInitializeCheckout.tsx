import React, { useEffect } from "react";

import { getCheckout, setCheckout, getPayment, setPayment } from "src/utils";

import { CheckoutActionCreators, CheckoutActions } from "./actions";
import { useGetUserCheckout } from "./helpers/useGetUserCheckout";
import { ICheckoutStateContext } from "./context";
import { DataErrorCheckoutTypes } from "./types";

import { useAuth } from "../Auth";

type useInitializeCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  invalidator: {};
};

const useInitializeCheckout = ({ dispatch, invalidator }: useInitializeCheckoutProps) => {
  const { authenticated, signedOut } = useAuth();
  const getUserCheckout = useGetUserCheckout();

  useEffect(() => {
    const init = async () => {
      if (signedOut) {
        return;
      }
      const checkout = getCheckout();
      const payment = getPayment();

      const { data, error } = await getUserCheckout(Boolean(authenticated), checkout?.token);

      if (error) {
        if (error.type === DataErrorCheckoutTypes.USER_CHECKOUT_DOES_NOT_EXIST && checkout?.token) {
          dispatch(CheckoutActionCreators.clearCheckout());
          return;
        }
      }

      const newCheckout = data || checkout;

      if (newCheckout) {
        setCheckout(newCheckout);
      }

      if (payment) {
        setPayment(payment);
      }

      const initializedCheckout: ICheckoutStateContext = {
        ...newCheckout,
        payment: payment || undefined,
        loaded: true,
      };

      dispatch(CheckoutActionCreators.initializeCheckout(initializedCheckout));
    };

    init();
  }, [authenticated, dispatch, getUserCheckout, invalidator, signedOut]);
};

export { useInitializeCheckout };
