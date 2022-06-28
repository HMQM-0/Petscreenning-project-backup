import React, { useEffect } from "react";

import { getCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useGetRefreshedCheckoutLines } from "./useGetRefreshedCheckoutLines";

type useInitializeCartProps = {
  dispatch: React.Dispatch<CartActions>;
  getRefreshedCheckoutLines: ReturnType<typeof useGetRefreshedCheckoutLines>;
};

const useInitializeCart = ({ getRefreshedCheckoutLines, dispatch }: useInitializeCartProps) => {
  useEffect(() => {
    const init = async () => {
      const checkout = getCheckout();

      let lines = checkout?.lines || [];

      if (checkout?.lines) {
        const { data, error } = await getRefreshedCheckoutLines(lines ?? null);

        if (error) {
          // TODO: Determine what this fireError behaviour accomplishes
          // this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
        }

        lines = data ?? [];
      }

      dispatch(CartActionCreators.initializeCart(lines));
    };
    init();
  }, [dispatch, getRefreshedCheckoutLines]);
};

export { useInitializeCart };
