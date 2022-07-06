import { useCallback } from "react";

import { getCountryCode } from "types/CountryCode";
import { getCheckout, getPayment, setPayment } from "utils";

import { useCreateCheckoutPaymentMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, ICheckoutAddress, IPaymentCreditCard } from "../types";
import { constructPaymentModel } from "../../utils/constructPaymentModel";
import { CheckoutActionCreators, CheckoutActions } from "../actions";

interface CheckoutCreatePaymentMutationHandlerInput {
  amount: number;
  checkoutId: string;
  gateway: string;
  billingAddress: ICheckoutAddress;
  token?: string;
  returnUrl?: string;
}

const useCreateCheckoutPaymentMutationHandler = () => {
  const [createCheckoutPaymentMutation] = useCreateCheckoutPaymentMutation();
  return useCallback(
    async ({
      amount,
      checkoutId,
      gateway,
      billingAddress,
      token,
      returnUrl,
    }: CheckoutCreatePaymentMutationHandlerInput) => {
      try {
        const checkout = getCheckout();
        const variables = {
          checkoutId,
          paymentInput: {
            amount,
            billingAddress: {
              city: billingAddress.city,
              companyName: billingAddress.companyName,
              country: getCountryCode(billingAddress?.country?.code ?? ""),
              countryArea: billingAddress.countryArea,
              firstName: billingAddress.firstName,
              lastName: billingAddress.lastName,
              phone: billingAddress.phone,
              postalCode: billingAddress.postalCode,
              streetAddress1: billingAddress.streetAddress1,
              streetAddress2: billingAddress.streetAddress2,
            },
            gateway,
            returnUrl,
            token,
            volumeDiscount: checkout?.applicableVolumeDiscounts?.amount,
          },
        };
        const { data, errors } = await createCheckoutPaymentMutation({
          variables,
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutPaymentCreate?.errors.length) {
          return {
            error: data?.checkoutPaymentCreate?.errors,
          };
        }
        if (data?.checkoutPaymentCreate?.payment) {
          return {
            data: constructPaymentModel(data.checkoutPaymentCreate.payment),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [createCheckoutPaymentMutation]
  );
};

type useCreatePaymentJobProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

interface CreatePaymentJobInput {
  checkoutId: string;
  amount: number;
  gateway: string;
  token?: string;
  billingAddress: ICheckoutAddress;
  creditCard?: IPaymentCreditCard;
  returnUrl?: string;
}

const useCreatePaymentJob = ({ dispatch }: useCreatePaymentJobProps) => {
  const createCheckoutPaymentMutationHandler = useCreateCheckoutPaymentMutationHandler();
  return useCallback(
    async ({ checkoutId, amount, gateway, token, billingAddress, creditCard, returnUrl }: CreatePaymentJobInput) => {
      const payment = getPayment();

      const { data, error } = await createCheckoutPaymentMutationHandler({
        amount,
        billingAddress,
        checkoutId,
        gateway,
        returnUrl,
        token,
      });

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.CREATE_PAYMENT,
          },
        };
      }

      const updates = {
        creditCard,
        gateway: data?.gateway,
        id: data?.id,
        token: data?.token,
        total: data?.total,
        returnUrl: data?.returnUrl,
      };

      setPayment({
        ...payment,
        ...updates,
      });

      dispatch(CheckoutActionCreators.createPayment(updates));

      return { data };
    },
    [createCheckoutPaymentMutationHandler, dispatch]
  );
};

export { useCreatePaymentJob };
