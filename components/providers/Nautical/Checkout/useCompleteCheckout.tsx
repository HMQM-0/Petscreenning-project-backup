import { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useCompleteCheckoutJob } from "./helpers/useCompleteCheckoutJob";
import { FunctionErrorCheckoutTypes } from "./types";

type useCompleteCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

export interface CompleteCheckoutInput {
  paymentData?: object;
  redirectUrl?: string;
  storeSource?: boolean;
  affiliate?: string;
  microsite?: string;
}

const useCompleteCheckout = ({ dispatch }: useCompleteCheckoutProps) => {
  const completeCheckoutJob = useCompleteCheckoutJob({ dispatch });
  return useCallback(
    async (input?: CompleteCheckoutInput) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;
      const volumeDiscount = checkout?.applicableVolumeDiscounts?.amount;
      const volumeDiscountsBySeller = checkout?.applicableVolumeDiscountsBySeller;

      if (checkoutId) {
        const { data, dataError } = await completeCheckoutJob({
          ...input,
          checkoutId,
          volumeDiscount,
          volumeDiscountsBySeller:
            volumeDiscountsBySeller?.map((volumeDiscountBySeller) => ({
              ...volumeDiscountBySeller,
              volumeDiscount: volumeDiscountBySeller.volumeDiscount,
              seller: Number(volumeDiscountBySeller.seller),
            })) ?? [],
        });
        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to set shipping address before creating payment."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [completeCheckoutJob]
  );
};

export { useCompleteCheckout };
