import { useCallback } from "react";

import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";

const useRemoveItem = () => {
  const { lines } = useCheckout();
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string) => {
      // 1. update local storage
      let _lines = lines?.map((line) => ({ ...line })) ?? [];
      const variantInCheckout = _lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = _lines.filter((variant) => variant.variant.id !== variantId);

      await refreshCheckoutLines(alteredLines);

      // 2. save online if possible (if checkout id available)
      if (variantInCheckout) {
        variantInCheckout.quantity = 0;
        alteredLines.push(variantInCheckout);
      }
      updateCheckout(alteredLines);
    },
    [lines, refreshCheckoutLines, updateCheckout]
  );
};

export { useRemoveItem };
