import { useCallback } from "react";

import { FunctionErrorCheckoutTypes, IPaymentCreditCard } from "./types";
import { CheckoutActions } from "./actions";
import { useCreatePaymentJob } from "./helpers/useCreatePaymentJob";
import { ICheckoutContext } from "./context";

import { useCart } from "../Cart";

type useCreatePaymentProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  id: ICheckoutContext["id"];
  billingAddress: ICheckoutContext["billingAddress"];
  applicableVolumeDiscounts: ICheckoutContext["applicableVolumeDiscounts"];
};

export interface CreatePaymentInput {
  gateway: string;
  token?: string;
  creditCard?: IPaymentCreditCard;
  returnUrl?: string;
}

const useCreatePayment = ({ dispatch, applicableVolumeDiscounts, id, billingAddress }: useCreatePaymentProps) => {
  const { totalPrice } = useCart();
  const createPaymentJob = useCreatePaymentJob({ dispatch });

  return useCallback(
    async (input: CreatePaymentInput) => {
      const checkoutId = id;
      const amount = totalPrice?.gross.amount;

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
    [createPaymentJob, totalPrice]
  );
};

export { useCreatePayment };
