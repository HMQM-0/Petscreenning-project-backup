import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

type useRemoveItemProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useRemoveItem = ({ dispatch }: useRemoveItemProps) => {
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string) => {
      const checkout = getCheckout();

      // 1. update local storage
      let lines = checkout?.lines || [];
      const variantInCheckout = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
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
      if (variantInCheckout) {
        variantInCheckout.quantity = 0;
        alteredLines.push(variantInCheckout);
      }
      updateCheckout(alteredCheckout);

      // 3. set new items in state
      dispatch(CartActionCreators.updateItems(lines));
    },
    [dispatch, refreshCheckoutLines, updateCheckout]
  );
};

export { useRemoveItem };
