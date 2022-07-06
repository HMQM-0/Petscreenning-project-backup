import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useUpdateCheckout, useRefreshCheckoutLines } from "./helpers";

import { ICheckoutModel } from "../Checkout/types";

type useAddItemProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useAddItem = ({ dispatch }: useAddItemProps) => {
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string, quantity: number) => {
      const checkout = getCheckout();

      // 1. save in local storage
      let lines = checkout?.lines || [];
      let variantInCheckout = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
      const newVariantQuantity = variantInCheckout ? variantInCheckout.quantity + quantity : quantity;
      if (variantInCheckout) {
        variantInCheckout.quantity = newVariantQuantity;
        alteredLines.push(variantInCheckout);
      } else {
        variantInCheckout = {
          quantity,
          variant: {
            id: variantId,
          },
        };
        alteredLines.push(variantInCheckout);
      }
      const alteredCheckout: ICheckoutModel = checkout
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

export { useAddItem };
