import React, { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useUpdatePromoCode } from "./helpers/useUpdatePromoCode";
import { FunctionErrorCheckoutTypes } from "./types";

type useAddPromoCodeProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useAddPromoCode = ({ dispatch }: useAddPromoCodeProps) => {
  const addPromoCode = useUpdatePromoCode({ dispatch });
  return useCallback(
    async (promoCode: string) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;

      if (checkoutId) {
        const { data, dataError } = await addPromoCode({
          checkoutId,
          promoCode,
        });
        return {
          data,
          dataError,
          pending: false,
        };
      } else {
        return {
          functionError: {
            error: new Error("You need to set shipping address before modifying promo code."),
            type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
          },
          pending: false,
        };
      }
    },
    [addPromoCode]
  );
};

export { useAddPromoCode };
