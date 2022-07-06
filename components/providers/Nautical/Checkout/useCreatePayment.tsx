import { useCallback } from "react";

import { getCheckout } from "utils";

import { FunctionErrorCheckoutTypes, IPaymentCreditCard } from "./types";
import { CheckoutActions } from "./actions";
import { useCreatePaymentJob } from "./helpers/useCreatePaymentJob";

import { useCart } from "../Cart";

type useCreatePaymentProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

export interface CreatePaymentInput {
  gateway: string;
  token?: string;
  creditCard?: IPaymentCreditCard;
  returnUrl?: string;
}

const useCreatePayment = ({ dispatch }: useCreatePaymentProps) => {
  const { totalPrice } = useCart();
  const createPaymentJob = useCreatePaymentJob({ dispatch });

  return useCallback(
    async (input: CreatePaymentInput) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;
      const billingAddress = checkout?.billingAddress;
      const amount = totalPrice?.gross.amount;

      if (checkoutId && billingAddress && amount !== null && amount !== undefined) {
        const { data, dataError } = await createPaymentJob({
          ...input,
          amount,
          billingAddress,
          checkoutId,
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
    [createPaymentJob, totalPrice]
  );
};

export { useCreatePayment };
