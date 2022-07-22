import { useCallback, useContext } from "react";

import { CheckoutActions } from "./actions";
import { CheckoutStateContext } from "./context";
import { useRemovePromoCodeJob } from "./helpers/useRemovePromoCodeJob";
import { FunctionErrorCheckoutTypes } from "./types";

type useRemovePromoCodeProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useRemovePromoCode = ({ dispatch }: useRemovePromoCodeProps) => {
  const { id: checkoutId } = useContext(CheckoutStateContext);
  const removePromoCodeJob = useRemovePromoCodeJob({ dispatch });
  return useCallback(
    async (promoCode: string) => {
      if (checkoutId) {
        const { data, dataError } = await removePromoCodeJob({
          checkoutId,
          promoCode,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to set shipping address before modifying promo code."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [checkoutId, removePromoCodeJob]
  );
};

export { useRemovePromoCode };
