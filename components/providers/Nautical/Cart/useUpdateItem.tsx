import { useCallback } from "react";

import { prepareLinesForUpdate, useRefreshCheckoutLines, useUpdateCheckout } from "./helpers";

import { useCheckout } from "../Checkout";
import { ICheckoutStateContext } from "../Checkout/context";

const useUpdateItem = () => {
  const { lines } = useCheckout();
  const refreshCheckoutLines = useRefreshCheckoutLines();
  const updateCheckout = useUpdateCheckout();

  return useCallback(
    async (variantId: string, quantity: number) => {
      const { variantToModify, linesWithoutVariant } = prepareLinesForUpdate(variantId, lines);

      let newLines: ICheckoutStateContext["lines"] = [...linesWithoutVariant];
      // 1. Modify lines

      if (variantToModify) {
        variantToModify.quantity = quantity;
        newLines = [...newLines, variantToModify];
      }

      // 2. save online if possible (if checkout id available)
      await refreshCheckoutLines(newLines);

      // 2. save online if possible (if checkout id available)
      updateCheckout(newLines);
    },
    [refreshCheckoutLines, updateCheckout, lines]
  );
};

export { useUpdateItem };
