import React, { useEffect } from "react";

import { getCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useRefreshCheckoutLines } from "./helpers";

type useInitializeCartProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useInitializeCart = ({ dispatch }: useInitializeCartProps) => {
  const refreshCheckoutLines = useRefreshCheckoutLines();

  useEffect(() => {
    const init = async () => {
      const checkout = getCheckout();

      if (checkout) {
        const lines = await refreshCheckoutLines(checkout);

        dispatch(CartActionCreators.initializeCart(lines));
      }
    };
    init();
  }, [dispatch, refreshCheckoutLines]);
};

export { useInitializeCart };
