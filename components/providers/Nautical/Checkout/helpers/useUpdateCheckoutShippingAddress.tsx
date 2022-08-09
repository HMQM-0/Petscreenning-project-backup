import { useCallback } from "react";

import { getCountryCode } from "types/CountryCode";

import { constructCheckoutModel } from "../../utils/constructCheckoutModel";
import { useUpdateCheckoutShippingAddressMutation } from "../mutations.graphql.generated";
import { DataErrorCheckoutTypes, ICheckoutAddress } from "../types";
import { CheckoutActionCreators, CheckoutActions } from "../actions";

export interface UpdateShippingAddressInput {
  checkoutId: string;
  shippingAddress: ICheckoutAddress;
  email: string;
  selectedShippingAddressId?: string;
  billingAsShipping?: boolean;
}

const useSetShippingAddressMutation = () => {
  const [updateCheckoutShippingAddressMutation] = useUpdateCheckoutShippingAddressMutation();

  return useCallback(
    async (shippingAddress: ICheckoutAddress, email: string, checkoutId: string) => {
      try {
        const variables = {
          checkoutId,
          email,
          shippingAddress: {
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
        };
        const { data, errors } = await updateCheckoutShippingAddressMutation({
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
        if (data?.checkoutShippingAddressUpdate?.errors.length) {
          return {
            error: data?.checkoutShippingAddressUpdate?.errors,
          };
        }
        if (data?.checkoutShippingAddressUpdate?.checkout) {
          return {
            data: constructCheckoutModel(data.checkoutShippingAddressUpdate.checkout),
          };
        }
        return {};
      } catch (error) {
        return {
          error,
        };
      }
    },
    [updateCheckoutShippingAddressMutation]
  );
};

type UseUpdateCheckoutShippingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useUpdateCheckoutShippingAddress = ({ dispatch }: UseUpdateCheckoutShippingAddressProps) => {
  const setShippingAddressMutation = useSetShippingAddressMutation();

  return useCallback(
    async ({
      checkoutId,
      shippingAddress,
      email,
      selectedShippingAddressId,
      billingAsShipping,
    }: UpdateShippingAddressInput) => {
      const { data, error } = await setShippingAddressMutation(shippingAddress, email, checkoutId);

      if (error) {
        return {
          dataError: {
            error,
            type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
          },
        };
      }

      const updates = {
        availableShippingMethods: data?.availableShippingMethods,
        billingAsShipping: billingAsShipping || false,
        email: data?.email ?? "",
        selectedShippingAddressId,
        shippingAddress: data?.shippingAddress,
        availableShippingMethodsBySeller: data?.availableShippingMethodsBySeller,
      };

      dispatch(CheckoutActionCreators.updateShippingAddress(updates));

      return { data };
    },
    [dispatch, setShippingAddressMutation]
  );
};

export { useUpdateCheckoutShippingAddress };
