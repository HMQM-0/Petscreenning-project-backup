import React, { useCallback } from "react";

import { getCountryCode } from "types/CountryCode";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { useCreateCheckoutMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, ICheckoutAddress } from "../types";
import { CheckoutActionCreators, CheckoutActions } from "../actions";

export interface CreateCheckoutInput {
  email: string;
  lines: Array<{ variantId: string; quantity: number }>;
  shippingAddress?: ICheckoutAddress;
  selectedShippingAddressId?: string;
  billingAddress?: ICheckoutAddress;
  selectedBillingAddressId?: string;
}

const useHandleCreateCheckoutMutation = () => {
  const [createCheckoutMutation] = useCreateCheckoutMutation();
  return useCallback(
    async (
      email: string,
      lines: Array<{ variantId: string; quantity: number }>,
      shippingAddress?: ICheckoutAddress,
      billingAddress?: ICheckoutAddress
    ) => {
      try {
        const variables = {
          checkoutInput: {
            billingAddress: billingAddress && {
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
            email,
            lines,
            shippingAddress: shippingAddress && {
              city: shippingAddress.city,
              companyName: shippingAddress.companyName,
              country: getCountryCode(shippingAddress?.country?.code ?? ""),
              countryArea: shippingAddress.countryArea,
              firstName: shippingAddress.firstName,
              lastName: shippingAddress.lastName,
              phone: shippingAddress.phone,
              postalCode: shippingAddress.postalCode,
              streetAddress1: shippingAddress.streetAddress1,
              streetAddress2: shippingAddress.streetAddress2,
            },
          },
        };
        const { data, errors } = await createCheckoutMutation({
          variables,
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutCreate?.errors.length) {
          return {
            error: data?.checkoutCreate?.errors,
          };
        }
        if (data?.checkoutCreate?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutCreate.checkout),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
      return {};
    },
    [createCheckoutMutation]
  );
};

type UseCreateCheckoutProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useCreateCheckout = ({ dispatch }: UseCreateCheckoutProps) => {
  const createCheckout = useHandleCreateCheckoutMutation();
  return useCallback(
    async ({
      email,
      lines,
      shippingAddress,
      selectedShippingAddressId,
      billingAddress,
      selectedBillingAddressId,
    }: CreateCheckoutInput) => {
      const { data, error } = await createCheckout(email, lines, shippingAddress, billingAddress);

      if (error) {
        /**
         * TODO: Differentiate errors!!! THIS IS A BUG!!!
         * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
         */
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
          },
        };
      }

      const newCheckout = {
        ...data,
        selectedBillingAddressId,
        selectedShippingAddressId,
      };

      dispatch(CheckoutActionCreators.createCheckout(newCheckout));

      return {
        data,
      };
    },
    [createCheckout, dispatch]
  );
};

export { useCreateCheckout };
