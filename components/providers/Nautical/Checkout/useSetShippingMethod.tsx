import React, { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useUpdateShippingMethod } from "./helpers/useUpdateShippingMethod";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetShippingMethodProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetShippingMethod = ({ dispatch }: useSetShippingMethodProps) => {
  const updateShippingMethod = useUpdateShippingMethod({ dispatch });
  return useCallback(
    async (shippingMethodId: string) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;

      if (checkoutId) {
        const { data, dataError } = await updateShippingMethod({
          checkoutId,
          shippingMethodId,
        });
        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to set shipping address before setting shipping method."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [updateShippingMethod]
  );
};

export { useSetShippingMethod };
