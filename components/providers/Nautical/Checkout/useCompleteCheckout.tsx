import { useCallback, useContext } from "react";

import { CheckoutActions } from "./actions";
import { CheckoutStateContext } from "./context";
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
  const { id, applicableVolumeDiscounts, applicableVolumeDiscountsBySeller } = useContext(CheckoutStateContext);

  const completeCheckoutJob = useCompleteCheckoutJob({ dispatch });
  const checkoutId = id;
  const volumeDiscount = applicableVolumeDiscounts?.amount;
  const volumeDiscountsBySeller = applicableVolumeDiscountsBySeller;

  return useCallback(
    async (input?: CompleteCheckoutInput) => {
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
    [checkoutId, completeCheckoutJob, volumeDiscount, volumeDiscountsBySeller]
  );
};

export { useCompleteCheckout };
