import React, { useCallback, useContext } from "react";

import { CheckoutActions } from "./actions";
import { CheckoutStateContext } from "./context";
import { useUpdateShippingMethod } from "./helpers/useUpdateShippingMethod";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetShippingMethodProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetShippingMethod = ({ dispatch }: useSetShippingMethodProps) => {
  const { id } = useContext(CheckoutStateContext);
  const updateShippingMethod = useUpdateShippingMethod({ dispatch });
  const checkoutId = id;
  return useCallback(
    async (shippingMethodId: string) => {
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
    [checkoutId, updateShippingMethod]
  );
};

export { useSetShippingMethod };
