import { useCallback, useContext } from "react";

import { CheckoutActions } from "./actions";
import { CheckoutStateContext } from "./context";
import { useUpdateSellerShippingMethods } from "./helpers/useUpdateSellerShippingMethods";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetSellerShippingMethodsProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetSellerShippingMethods = ({ dispatch }: useSetSellerShippingMethodsProps) => {
  const { id } = useContext(CheckoutStateContext);
  const setSellerShippingMethods = useUpdateSellerShippingMethods({ dispatch });
  return useCallback(
    async (seller: number, shippingMethodSelection: string) => {
      if (id) {
        const { data, dataError } = await setSellerShippingMethods({
          checkoutId: id,
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
          error: new Error("You need to set a shipping address before setting Shipping Method."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [id, setSellerShippingMethods],
  );
};

export { useSetSellerShippingMethods };
