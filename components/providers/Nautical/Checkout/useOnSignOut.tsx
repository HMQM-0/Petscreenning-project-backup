import React, { useEffect } from "react";

import { setCheckout, setPayment } from "utils";

import { CheckoutActionCreators, CheckoutActions } from "./actions";

import { useAuth } from "../Auth";

type useInitializeCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useOnSignOut = ({ dispatch }: useInitializeCheckoutProps) => {
  const { signedOut } = useAuth();

  useEffect(() => {
    if (signedOut) {
      setCheckout({});
      setPayment({});
      dispatch(CheckoutActionCreators.clearCheckout());
    }
  }, [dispatch, signedOut]);
};

export { useOnSignOut };
