import React, { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { CheckoutActionCreators, CheckoutActions } from "../actions";
import { useRemoveCheckoutPromoCodeMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes } from "../types";

const useRemovePromoCodeMutationHandler = () => {
  const [removeCheckoutPromoCodeMutation] = useRemoveCheckoutPromoCodeMutation();
  return useCallback(
    async (promoCode: string, checkoutId: string) => {
      try {
        const { data, errors } = await removeCheckoutPromoCodeMutation({
          variables: { checkoutId, promoCode },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutRemovePromoCode?.errors.length) {
          return {
            error: data?.checkoutRemovePromoCode?.errors,
          };
        }
        if (data?.checkoutRemovePromoCode?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutRemovePromoCode.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [removeCheckoutPromoCodeMutation]
  );
};

type useRemovePromoCodeJobProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

export interface RemovePromoCodeJobInput {
  checkoutId: string;
  promoCode: string;
}

const useRemovePromoCodeJob = ({ dispatch }: useRemovePromoCodeJobProps) => {
  const removePromoCodeMutation = useRemovePromoCodeMutationHandler();
  return useCallback(
    async ({ checkoutId, promoCode }: RemovePromoCodeJobInput) => {
      const checkout = getCheckout();

      const { data, error } = await removePromoCodeMutation(promoCode, checkoutId);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
          },
        };
      }

      const updates = {
        promoCodeDiscount: data?.promoCodeDiscount,
      };

      setCheckout({
        ...checkout,
        ...updates,
      });

      dispatch(CheckoutActionCreators.removePromoCode(updates));

      return { data };
    },
    [dispatch, removePromoCodeMutation]
  );
};

export { useRemovePromoCodeJob };
