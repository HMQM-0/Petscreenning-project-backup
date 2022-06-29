import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

type useUpdateItemProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useUpdateItem = ({ dispatch }: useUpdateItemProps) => {
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string, quantity: number) => {
      const checkout = getCheckout();
      // 1. save in local storage
      let lines = checkout?.lines || [];
      const variantInCheckout = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
      if (variantInCheckout) {
        variantInCheckout.quantity = quantity;
        alteredLines.push(variantInCheckout);
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

      // 2. save online if possible (if checkout id available)
      lines = await refreshCheckoutLines(alteredCheckout);

      // 2. save online if possible (if checkout id available)
      updateCheckout(alteredCheckout);

      // 3. set new items in state
      dispatch(CartActionCreators.updateItems(lines));
    },
    [dispatch, refreshCheckoutLines, updateCheckout]
  );
};

export { useUpdateItem };
