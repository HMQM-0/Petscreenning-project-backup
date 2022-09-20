import React, { useCallback } from "react";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { CheckoutActionCreators, CheckoutActions } from "../actions";
import { useAddCheckoutPromoCodeMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes } from "../types";

const useAddPromoCodeMutation = () => {
  const [addCheckoutPromoCodeMutation] = useAddCheckoutPromoCodeMutation();

  return useCallback(
    async (promoCode: string, checkoutId: string) => {
      try {
        const { data, errors } = await addCheckoutPromoCodeMutation({
          variables: { checkoutId, promoCode },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutAddPromoCode?.errors.length) {
          return {
            error: data?.checkoutAddPromoCode?.errors,
          };
        }
        if (data?.checkoutAddPromoCode?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutAddPromoCode.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [addCheckoutPromoCodeMutation],
  );
};

type useUpdatePromoCodeProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

interface AddPromoCodeJobInput {
  checkoutId: string;
  promoCode: string;
}

const useUpdatePromoCode = ({ dispatch }: useUpdatePromoCodeProps) => {
  const addPromoCode = useAddPromoCodeMutation();
  return useCallback(
    async ({ checkoutId, promoCode }: AddPromoCodeJobInput) => {
      const { data, error } = await addPromoCode(promoCode, checkoutId);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
          },
        };
      }

      const updates = {
        promoCodeDiscount: data?.promoCodeDiscount,
      };

      dispatch(CheckoutActionCreators.addPromoCode(updates));

      return { data };
    },
    [addPromoCode, dispatch],
  );
};

export { useUpdatePromoCode };
