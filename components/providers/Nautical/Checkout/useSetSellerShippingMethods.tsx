import { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useUpdateSellerShippingMethods } from "./helpers/useUpdateSellerShippingMethods";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetSellerShippingMethodsProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetSellerShippingMethods = ({ dispatch }: useSetSellerShippingMethodsProps) => {
  const setSellerShippingMethods = useUpdateSellerShippingMethods({ dispatch });
  return useCallback(
    async (seller: number, shippingMethodSelection: string) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;

      if (checkoutId) {
        const { data, dataError } = await setSellerShippingMethods({
          checkoutId,
          seller,
          shippingMethodSelection,
        });
        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to set a shipping address before setting shipping method."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [setSellerShippingMethods]
  );
};

export { useSetSellerShippingMethods };
