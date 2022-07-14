import { useCallback } from "react";

import { prepareLinesForUpdate, useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";
import { ICheckoutStateContext } from "../Checkout/context";

const useSubtractItem = () => {
  const { lines } = useCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string) => {
      const { variantToModify, linesWithoutVariant } = prepareLinesForUpdate(variantId, lines);

      let newLines: ICheckoutStateContext["lines"] = [...linesWithoutVariant];
      // 1. Modify lines
      const newVariantQuantity = variantToModify ? variantToModify.quantity - 1 : 0;
      if (variantToModify) {
        variantToModify.quantity = newVariantQuantity;
        newLines = [...newLines, variantToModify];
      }

      // 2. Ensure lines are up-to-date with DB and set in state
      await refreshCheckoutLines(newLines);

      // 3. save online if possible (if checkout id available)
      updateCheckout(newLines);
    },
    [lines, refreshCheckoutLines, updateCheckout]
  );
};

export { useSubtractItem };
