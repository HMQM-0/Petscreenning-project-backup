import { useCallback } from "react";

import { FunctionErrorCheckoutTypes, IPaymentCreditCard } from "./types";
import { CheckoutActions } from "./actions";
import { useCreatePaymentJob } from "./helpers/useCreatePaymentJob";
import { ICheckoutContext } from "./context";

import { calculateSummaryPrices } from "../Cart/useCalculateSummaryPrices";

type useCreatePaymentProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  checkout: ICheckoutContext;
};

export interface CreatePaymentInput {
  gateway: string;
  token?: string;
  creditCard?: IPaymentCreditCard;
  returnUrl?: string;
}

const useCreatePayment = ({ dispatch, checkout }: useCreatePaymentProps) => {
  const { totalPrice } = calculateSummaryPrices(checkout);
  const createPaymentJob = useCreatePaymentJob({ dispatch });
  const { id: checkoutId, billingAddress, applicableVolumeDiscounts } = checkout;
  const amount = totalPrice?.gross.amount;

  return useCallback(
    async (input: CreatePaymentInput) => {
      if (checkoutId && billingAddress && amount !== null && amount !== undefined) {
        const { data, dataError } = await createPaymentJob({
          ...input,
          amount,
          billingAddress,
          checkoutId,
          applicableVolumeDiscounts,
        });
        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to set billing address before creating payment."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [amount, applicableVolumeDiscounts, billingAddress, checkoutId, createPaymentJob]
  );
};

export { useCreatePayment };
