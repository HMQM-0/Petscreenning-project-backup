import { useCallback } from "react";

import { useUpdateCheckout, useRefreshCheckoutLines } from "./helpers";

import { useCheckout } from "../Checkout";

const useAddItem = () => {
  const { lines } = useCheckout();
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string, quantity: number) => {
      // 1. save in local storage
      const _lines = lines?.map((line) => ({ ...line })) ?? [];
      let variantInCheckout = _lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = _lines.filter((variant) => variant.variant.id !== variantId);
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

      await refreshCheckoutLines(alteredLines);

      // 2. save online if possible (if checkout id available)
      updateCheckout(alteredLines);
    },
    [lines, refreshCheckoutLines, updateCheckout]
  );
};

export { useAddItem };
