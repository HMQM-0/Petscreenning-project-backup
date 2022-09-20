import React, { useCallback } from "react";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { CheckoutActionCreators, CheckoutActions } from "../actions";
import { useUpdateCheckoutShippingMethodMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes } from "../types";

const useSetShippingMethodMutation = () => {
  const [updateCheckoutShippingMethodMutation] = useUpdateCheckoutShippingMethodMutation();
  return useCallback(
    async (shippingMethodId: string, checkoutId: string) => {
      try {
        const { data, errors } = await updateCheckoutShippingMethodMutation({
          variables: {
            checkoutId,
            shippingMethodId,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutShippingMethodUpdate?.errors.length) {
          return {
            error: data?.checkoutShippingMethodUpdate?.errors,
          };
        }
        if (data?.checkoutShippingMethodUpdate?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutShippingMethodUpdate.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [updateCheckoutShippingMethodMutation],
  );
};

type useUpdateShippingMethodProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

export interface SetShippingMethodJobInput {
  checkoutId: string;
  shippingMethodId: string;
}

const useUpdateShippingMethod = ({ dispatch }: useUpdateShippingMethodProps) => {
  const setShippingMethod = useSetShippingMethodMutation();
  return useCallback(
    async ({ checkoutId, shippingMethodId }: SetShippingMethodJobInput) => {
      const { data, error } = await setShippingMethod(shippingMethodId, checkoutId);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
          },
        };
      }

      const updates = {
        promoCodeDiscount: data?.promoCodeDiscount,
        shippingMethod: data?.shippingMethod,
      };

      dispatch(CheckoutActionCreators.setShippingMethod(updates));

      return { data };
    },
    [dispatch, setShippingMethod],
  );
};

export { useUpdateShippingMethod };
