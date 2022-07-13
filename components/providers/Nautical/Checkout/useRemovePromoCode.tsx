import { useCallback } from "react";

import { CheckoutActions } from "./actions";
import { ICheckoutContext } from "./context";
import { useRemovePromoCodeJob } from "./helpers/useRemovePromoCodeJob";
import { FunctionErrorCheckoutTypes } from "./types";

type useRemovePromoCodeProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  id: ICheckoutContext["id"];
};

const useRemovePromoCode = ({ dispatch, id }: useRemovePromoCodeProps) => {
  const removePromoCodeJob = useRemovePromoCodeJob({ dispatch });
  const checkoutId = id;
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
