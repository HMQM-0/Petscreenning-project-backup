import React, { useCallback } from "react";

import { getCheckout } from "utils";

import { CheckoutActions } from "./actions";
import { ICheckoutContext } from "./context";
import { useUpdateCheckoutBillingAddress } from "./helpers/useUpdateCheckoutBillingAddress";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetBillingAsShippingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  checkout: ICheckoutContext;
};

const useSetBillingAsShippingAddress = ({ checkout, dispatch }: useSetBillingAsShippingAddressProps) => {
  const setBillingAddress = useUpdateCheckoutBillingAddress({ dispatch });
  return useCallback(
    async (billingAsShipping: boolean) => {
      const localStorageCheckout = getCheckout();
      const checkoutId = localStorageCheckout?.id;

      if (checkoutId && checkout?.shippingAddress) {
        if (billingAsShipping) {
          const { data, dataError } = await setBillingAddress({
            billingAddress: checkout.shippingAddress,
            billingAsShipping: true,
            checkoutId,
            selectedBillingAddressId: checkout?.shippingAddress.id,
          });

          return {
            data,
            dataError,
            pending: false,
          };
        } else {
          const { data, dataError } = await setBillingAddress({
            billingAddress: checkout?.billingAddress ?? undefined,
            billingAsShipping: false,
            checkoutId,
            selectedBillingAddressId: checkout.billingAddress?.id ?? undefined,
          });

          return {
            data,
            dataError,
            pending: false,
          };
        }
      }
      return {
        functionError: {
          error: new Error("You need to set shipping address before setting billing address."),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    },
    [checkout.billingAddress, checkout.shippingAddress, setBillingAddress]
  );
};

export { useSetBillingAsShippingAddress };
