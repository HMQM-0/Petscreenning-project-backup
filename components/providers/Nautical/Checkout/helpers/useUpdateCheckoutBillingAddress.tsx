import { useCallback } from "react";

import { getCheckout } from "utils";
import { getCountryCode } from "types/CountryCode";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { useUpdateCheckoutBillingAddressMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, ICheckoutAddress } from "../types";
import { CheckoutActionCreators, CheckoutActions } from "../actions";

const useSetBillingAddressMutation = () => {
  const [updateCheckoutBillingAddressMutation] = useUpdateCheckoutBillingAddressMutation();
  return useCallback(
    async (billingAddress: ICheckoutAddress, checkoutId: string) => {
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
        };
        const { data, errors } = await updateCheckoutBillingAddressMutation({
          variables,
        });

        if (errors?.length) {
          return {
            error: errors,
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
    [updateCheckoutBillingAddressMutation]
  );
};

type useUpdateCheckoutBillingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

interface SetBillingAddressJobInput {
  checkoutId: string;
  billingAddress?: ICheckoutAddress;
  billingAsShipping?: boolean;
  selectedBillingAddressId?: string;
}

const useUpdateCheckoutBillingAddress = ({ dispatch }: useUpdateCheckoutBillingAddressProps) => {
  const setBillingAddress = useSetBillingAddressMutation();
  return useCallback(
    async ({ checkoutId, billingAddress, billingAsShipping, selectedBillingAddressId }: SetBillingAddressJobInput) => {
      const checkout = getCheckout();

      const { data, error } = await setBillingAddress(billingAddress ?? {}, checkoutId);

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
        billingAsShipping: !!billingAsShipping,
        selectedBillingAddressId,
      };

      dispatch(CheckoutActionCreators.setBillingAddress(updates));

      return { data };
    },
    [dispatch, setBillingAddress]
  );
};

export { useUpdateCheckoutBillingAddress };
