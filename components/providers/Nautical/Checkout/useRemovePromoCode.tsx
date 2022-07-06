import { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useRemovePromoCodeJob } from "./helpers/useRemovePromoCodeJob";
import { FunctionErrorCheckoutTypes } from "./types";

type useRemovePromoCodeProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useRemovePromoCode = ({ dispatch }: useRemovePromoCodeProps) => {
  const removePromoCodeJob = useRemovePromoCodeJob({ dispatch });
  return useCallback(
    async (promoCode: string) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;

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
    [removePromoCodeJob]
  );
};

export { useRemovePromoCode };
