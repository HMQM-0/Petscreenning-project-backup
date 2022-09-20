import React, { useCallback } from "react";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { CheckoutActionCreators, CheckoutActions } from "../actions";
import { useUpdateCheckoutSellerShippingMethodsMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes } from "../types";

const useSetSellerShippingMethodsMutation = () => {
  const [updateCheckoutSellerShippingMethodsMutation] = useUpdateCheckoutSellerShippingMethodsMutation();
  return useCallback(
    async (checkoutId: string, seller: number, shippingMethodSelection: string) => {
      try {
        const { data, errors } = await updateCheckoutSellerShippingMethodsMutation({
          variables: {
            checkoutId,
            seller: String(seller),
            shippingMethodSelection,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutSellerShippingMethodsUpdate?.errors.length) {
          return {
            error: data?.checkoutSellerShippingMethodsUpdate?.errors,
          };
        }
        if (data?.checkoutSellerShippingMethodsUpdate?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutSellerShippingMethodsUpdate.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [updateCheckoutSellerShippingMethodsMutation],
  );
};

type useUpdateSellerShippingMethodsProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

interface SetSellerShippingMethodsJobInput {
  checkoutId: string;
  seller: number;
  shippingMethodSelection: string;
}

const useUpdateSellerShippingMethods = ({ dispatch }: useUpdateSellerShippingMethodsProps) => {
  const setSellerShippingMethods = useSetSellerShippingMethodsMutation();
  return useCallback(
    async ({ checkoutId, seller, shippingMethodSelection }: SetSellerShippingMethodsJobInput) => {
      const { data, error } = await setSellerShippingMethods(checkoutId, seller, shippingMethodSelection);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
          },
        };
      }

      const updates = {
        lines: data?.lines,
        promoCodeDiscount: data?.promoCodeDiscount,
        sellerShippingMethods: data?.sellerShippingMethods,
      };

      dispatch(CheckoutActionCreators.setSellerShippingMethods(updates));

      return { data };
    },
    [dispatch, setSellerShippingMethods],
  );
};

export { useUpdateSellerShippingMethods };
