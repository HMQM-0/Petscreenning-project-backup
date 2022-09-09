import { useCallback } from "react";

import { prepareLinesForUpdate, useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";
import { ICheckoutStateContext } from "../Checkout/context";

const useRemoveItem = () => {
  const { lines } = useCheckout();
  const updateCheckout = useUpdateCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();

  return useCallback(
    async (variantId: string) => {
      const { variantToModify, linesWithoutVariant } = prepareLinesForUpdate(variantId, lines);

      // 1. Modify lines
      let newLines: ICheckoutStateContext["lines"] = [...linesWithoutVariant];

      // 2. Ensure lines are up-to-date with DB and set in state
      await refreshCheckoutLines(newLines);

      // 3. save online if possible (if checkout id available)
      // NOTE: BE issue arises if the variant is removed, instead need to set quantity to 0 before db update
      if (variantToModify) {
        variantToModify.quantity = 0;
        newLines = [variantToModify];
      }
      updateCheckout(newLines);
    },
    [lines, refreshCheckoutLines, updateCheckout],
  );
};

export { useRemoveItem };
