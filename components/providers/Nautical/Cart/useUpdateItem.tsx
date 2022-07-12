import { useCallback } from "react";

import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";

const useUpdateItem = () => {
  const { lines } = useCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string, quantity: number) => {
      // 1. save in local storage
      const _lines = lines?.map((line) => ({ ...line })) ?? [];
      const variantInCheckout = _lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = _lines.filter((variant) => variant.variant.id !== variantId);
      if (variantInCheckout) {
        variantInCheckout.quantity = quantity;
        alteredLines.push(variantInCheckout);
      }

      // 2. save online if possible (if checkout id available)
      await refreshCheckoutLines(alteredLines);

      // 2. save online if possible (if checkout id available)
      updateCheckout(alteredLines);
    },
    [refreshCheckoutLines, updateCheckout, lines]
  );
};

export { useUpdateItem };
