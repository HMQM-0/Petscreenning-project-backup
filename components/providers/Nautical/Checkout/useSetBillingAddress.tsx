import React, { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { useCreateCheckout } from "./helpers/useCreateCheckout";
import { useUpdateCheckoutBillingAddress } from "./helpers/useUpdateCheckoutBillingAddress";
import { useUpdateCheckoutBillingAddressWithEmail } from "./helpers/useUpdateCheckoutBillingAddressWithEmail";
import { FunctionErrorCheckoutTypes, ICheckoutAddress } from "./types";

type useSetBillingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetBillingAddress = ({ dispatch }: useSetBillingAddressProps) => {
  const setBillingAddress = useUpdateCheckoutBillingAddress({ dispatch });
  const setBillingAddressWithEmail = useUpdateCheckoutBillingAddressWithEmail({ dispatch });
  const createCheckout = useCreateCheckout({ dispatch });

  return useCallback(
    async (billingAddress: ICheckoutAddress, email?: string) => {
      const checkout = getCheckout();
      const checkoutId = checkout?.id;
      const isShippingRequiredForProducts = checkout?.lines
        ?.filter((line) => line.quantity > 0)
        .some(({ variant }) => variant.product?.productType.isShippingRequired);
      const alteredLines = checkout?.lines?.map((item) => ({
        quantity: item!.quantity,
        variantId: item?.variant!.id,
      }));

      if (isShippingRequiredForProducts && checkoutId && checkout?.shippingAddress) {
        const { data, dataError } = await setBillingAddress({
          billingAddress,
          billingAsShipping: false,
          checkoutId,
          selectedBillingAddressId: billingAddress.id,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }
      if (isShippingRequiredForProducts) {
        return {
          functionError: {
            error: new Error("You need to set shipping address before setting billing address."),
            type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
          },
          pending: false,
        };
      }
      if (!isShippingRequiredForProducts && email && checkoutId && alteredLines) {
        const { data, dataError } = await setBillingAddressWithEmail({
          billingAddress,
          checkoutId,
          email,
          selectedBillingAddressId: billingAddress.id,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }
      if (!isShippingRequiredForProducts && email && alteredLines) {
        const { data, dataError } = await createCheckout({
          billingAddress,
          email,
          lines: alteredLines,
          selectedBillingAddressId: billingAddress.id,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }
      if (!isShippingRequiredForProducts && !email) {
        return {
          functionError: {
            error: new Error(
              "You need to provide email when products do not require shipping before setting billing address."
            ),
            type: FunctionErrorCheckoutTypes.EMAIL_NOT_SET,
          },
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to add items to cart before setting billing address."),
          type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
        },
        pending: false,
      };
    },
    [createCheckout, setBillingAddress, setBillingAddressWithEmail]
  );
};

export { useSetBillingAddress };
