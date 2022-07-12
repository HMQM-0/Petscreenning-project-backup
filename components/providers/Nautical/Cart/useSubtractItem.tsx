import { useCallback } from "react";

import { getCheckout } from "utils";

import { useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";

const useSubtractItem = () => {
  const { lines } = useCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string) => {
      // 1. save in local storage
      let _lines = lines?.map((line) => ({ ...line })) ?? [];
      const variantFromCart = _lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = _lines.filter((variant) => variant.variant.id !== variantId);
      const newVariantQuantity = variantFromCart ? variantFromCart.quantity - 1 : 0;
      if (variantFromCart) {
        variantFromCart.quantity = newVariantQuantity;
        alteredLines.push(variantFromCart);
      }

      await refreshCheckoutLines(alteredLines);

      // 2. save online if possible (if checkout id available)
      updateCheckout(alteredLines);
    },
    [lines, refreshCheckoutLines, updateCheckout]
  );
};

export { useSubtractItem };
