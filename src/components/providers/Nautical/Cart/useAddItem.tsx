import { useCallback } from "react";

import { useUpdateCheckout, useRefreshCheckoutLines, prepareLinesForUpdate } from "./helpers";

import { useCheckout } from "../Checkout";
import { ICheckoutStateContext } from "../Checkout/context";

const useAddItem = () => {
  const { lines } = useCheckout();
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string, quantity: number) => {
      const { variantToModify, linesWithoutVariant } = prepareLinesForUpdate(variantId, lines);

      // 1. Modify lines
      const newVariantQuantity = variantToModify ? variantToModify.quantity + quantity : quantity;
      let newLines: ICheckoutStateContext["lines"] = [];
      if (variantToModify) {
        variantToModify.quantity = newVariantQuantity;
        newLines = [...linesWithoutVariant, variantToModify];
      } else {
        const newVariant = {
          quantity,
          variant: {
            id: variantId,
          },
        };
        newLines = [...linesWithoutVariant, newVariant];
      }

      // 2. Ensure lines are up-to-date with DB and set in state
      await refreshCheckoutLines(newLines);

      // 3. save online if possible (if checkout id available)
      updateCheckout(newLines);
    },
    [lines, refreshCheckoutLines, updateCheckout],
  );
};

export { useAddItem };
