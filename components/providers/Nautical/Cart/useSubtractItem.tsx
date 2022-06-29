import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

type useSubtractItemProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useSubtractItem = ({ dispatch }: useSubtractItemProps) => {
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string) => {
      const checkout = getCheckout();
      // 1. save in local storage
      let lines = checkout?.lines || [];
      const variantFromCart = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
      const newVariantQuantity = variantFromCart ? variantFromCart.quantity - 1 : 0;
      if (variantFromCart) {
        variantFromCart.quantity = newVariantQuantity;
        alteredLines.push(variantFromCart);
      }
      const alteredCheckout = checkout
        ? {
            ...checkout,
            lines: alteredLines,
          }
        : {
            lines: alteredLines,
          };
      setCheckout(alteredCheckout);

      lines = await refreshCheckoutLines(alteredCheckout);

      // 2. save online if possible (if checkout id available)
      updateCheckout(alteredCheckout);

      // 3. set new items in state
      dispatch(CartActionCreators.updateItems(lines));
    },
    [dispatch, refreshCheckoutLines, updateCheckout]
  );
};

export { useSubtractItem };
