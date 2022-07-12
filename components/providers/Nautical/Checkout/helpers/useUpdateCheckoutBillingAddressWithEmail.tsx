import React, { useCallback } from "react";

import { getCheckout } from "utils";
import { getCountryCode } from "types/CountryCode";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { useUpdateCheckoutBillingAddressWithEmailMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, ICheckoutAddress } from "../types";
import { CheckoutActionCreators, CheckoutActions } from "../actions";

const useSetBillingAddressWithEmail = () => {
  const [updateCheckoutBillingAddressWithEmailMutation] = useUpdateCheckoutBillingAddressWithEmailMutation();
  return useCallback(
    async (billingAddress: ICheckoutAddress, email: string, checkoutId: string) => {
      try {
        const variables = {
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
          checkoutId,
          email,
        };
        const { data, errors } = await updateCheckoutBillingAddressWithEmailMutation({
          variables,
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutEmailUpdate?.errors.length) {
          return {
            error: data?.checkoutEmailUpdate?.errors,
          };
        }
        if (data?.checkoutBillingAddressUpdate?.errors.length) {
          return {
            error: data?.checkoutBillingAddressUpdate?.errors,
          };
        }
        if (data?.checkoutBillingAddressUpdate?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutBillingAddressUpdate.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [updateCheckoutBillingAddressWithEmailMutation]
  );
};

type useUpdateCheckoutBillingAddressWithEmailProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

interface SetBillingAddressWithEmailJobInput {
  checkoutId: string;
  email: string;
  billingAddress: ICheckoutAddress;
  selectedBillingAddressId?: string;
}

const useUpdateCheckoutBillingAddressWithEmail = ({ dispatch }: useUpdateCheckoutBillingAddressWithEmailProps) => {
  const setBillingAddressWithEmail = useSetBillingAddressWithEmail();
  return useCallback(
    async ({ checkoutId, email, billingAddress, selectedBillingAddressId }: SetBillingAddressWithEmailJobInput) => {
      const checkout = getCheckout();

      const { data, error } = await setBillingAddressWithEmail(billingAddress, email, checkoutId);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
          },
        };
      }

      const updates = {
        availablePaymentGateways: data?.availablePaymentGateways,
        billingAddress: data?.billingAddress,
        billingAsShipping: false,
        email: data?.email,
        selectedBillingAddressId,
      };

      dispatch(CheckoutActionCreators.setBillingAddressWithEmail(updates));

      return { data };
    },
    [dispatch, setBillingAddressWithEmail]
  );
};

export { useUpdateCheckoutBillingAddressWithEmail };
