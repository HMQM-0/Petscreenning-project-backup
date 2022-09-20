import { useCallback } from "react";

import { setNauticalClientSecret, setNauticalPaymentId } from "src/utils";

import { CheckoutActionCreators, CheckoutActions } from "../actions";
import { useCompleteCheckoutMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, IMultiSellerVolumeDiscount } from "../types";

export interface CompleteCheckoutMutationHandlerInput {
  checkoutId: string;
  paymentData?: object;
  redirectUrl?: string;
  storeSource?: boolean;
  affiliate?: string;
  microsite?: string;
  volumeDiscount?: number;
  volumeDiscountsBySeller?: IMultiSellerVolumeDiscount[];
}

const useCompleteCheckoutMutationHandler = () => {
  const [completeCheckoutMutation] = useCompleteCheckoutMutation();
  return useCallback(
    async ({
      checkoutId,
      paymentData,
      redirectUrl,
      storeSource,
      affiliate,
      microsite,
      volumeDiscount,
      volumeDiscountsBySeller,
    }: CompleteCheckoutMutationHandlerInput) => {
      try {
        const paymentDataString = paymentData && JSON.stringify(paymentData);

        const cleanedVolumeDiscountsBySeller =
          volumeDiscountsBySeller?.map((v) => {
            return {
              seller: v.seller,
              volumeDiscount: {
                amount: v.volumeDiscount.amount,
                currency: v.volumeDiscount.currency,
              },
            };
          }) ?? [];

        const { data, errors } = await completeCheckoutMutation({
          variables: {
            checkoutId,
            paymentData: paymentDataString,
            redirectUrl,
            storeSource,
            affiliate,
            microsite,
            volumeDiscount: Number(volumeDiscount),
            volumeDiscountsBySeller: cleanedVolumeDiscountsBySeller,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutComplete?.errors.length) {
          return {
            error: data?.checkoutComplete?.errors,
          };
        }
        if (data?.checkoutComplete) {
          return {
            data: data.checkoutComplete,
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [completeCheckoutMutation],
  );
};

type useCompleteCheckoutJobProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

export interface CompleteCheckoutJobInput {
  checkoutId: string;
  paymentData?: object;
  redirectUrl?: string;
  storeSource?: boolean;
  affiliate?: string;
  microsite?: string;
  volumeDiscount?: number;
  volumeDiscountsBySeller?: IMultiSellerVolumeDiscount[];
}

const useCompleteCheckoutJob = ({ dispatch }: useCompleteCheckoutJobProps) => {
  const completeCheckoutMutationHandler = useCompleteCheckoutMutationHandler();
  return useCallback(
    async ({
      checkoutId,
      paymentData,
      redirectUrl,
      storeSource,
      affiliate,
      microsite,
      volumeDiscount,
      volumeDiscountsBySeller,
    }: CompleteCheckoutJobInput) => {
      const { data, error } = await completeCheckoutMutationHandler({
        checkoutId,
        paymentData,
        redirectUrl,
        storeSource,
        affiliate,
        microsite,
        volumeDiscount,
        volumeDiscountsBySeller,
      });

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }

      if (!data?.confirmationNeeded) {
        setNauticalPaymentId(null);
        setNauticalClientSecret(null);
      }

      dispatch(CheckoutActionCreators.clearCheckout());

      return { data };
    },
    [completeCheckoutMutationHandler, dispatch],
  );
};

export { useCompleteCheckoutJob };
