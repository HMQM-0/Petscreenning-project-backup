import React, { useEffect } from "react";

import { setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";

import { useAuth } from "../Auth";

type useInitializeCheckoutProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useOnSignOut = ({ dispatch }: useInitializeCheckoutProps) => {
  const { signedOut } = useAuth();

  useEffect(() => {
    if (signedOut) {
      dispatch(CartActionCreators.clearCart());
    }
  }, [dispatch, signedOut]);
};

export { useOnSignOut };
