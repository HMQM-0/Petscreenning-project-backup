import { useCallback } from "react";

import { CheckoutActions } from "./actions";
import { ICheckoutContext } from "./context";
import { useUpdateSellerShippingMethods } from "./helpers/useUpdateSellerShippingMethods";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetSellerShippingMethodsProps = {
  id: ICheckoutContext["id"];
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetSellerShippingMethods = ({ dispatch, id }: useSetSellerShippingMethodsProps) => {
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
          error: new Error("You need to set a shipping address before setting shipping method."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [id, setSellerShippingMethods]
  );
};

export { useSetSellerShippingMethods };
