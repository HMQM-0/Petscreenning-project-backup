import { useCallback } from "react";

import { CheckoutActions } from "./actions";
import { ICheckoutContext } from "./context";
import { useCompleteCheckoutJob } from "./helpers/useCompleteCheckoutJob";
import { FunctionErrorCheckoutTypes } from "./types";

type useCompleteCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  id: ICheckoutContext["id"];
  applicableVolumeDiscounts: ICheckoutContext["applicableVolumeDiscounts"];
  applicableVolumeDiscountsBySeller: ICheckoutContext["applicableVolumeDiscountsBySeller"];
};

export interface CompleteCheckoutInput {
  paymentData?: object;
  redirectUrl?: string;
  storeSource?: boolean;
  affiliate?: string;
  microsite?: string;
}

const useCompleteCheckout = ({
  dispatch,
  id,
  applicableVolumeDiscounts,
  applicableVolumeDiscountsBySeller,
}: useCompleteCheckoutProps) => {
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
