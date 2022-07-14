import React, { useCallback, useContext } from "react";

import { CheckoutActions } from "./actions";
import { CheckoutStateContext } from "./context";
import { useUpdateCheckoutBillingAddress } from "./helpers/useUpdateCheckoutBillingAddress";
import { FunctionErrorCheckoutTypes } from "./types";

type useSetBillingAsShippingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
};

const useSetBillingAsShippingAddress = ({ dispatch }: useSetBillingAsShippingAddressProps) => {
  const { id, shippingAddress, billingAddress } = useContext(CheckoutStateContext);
  const setBillingAddress = useUpdateCheckoutBillingAddress({ dispatch });
  return useCallback(
    async (billingAsShipping: boolean) => {
      if (id && shippingAddress) {
        if (billingAsShipping) {
          const { data, dataError } = await setBillingAddress({
            billingAddress: shippingAddress,
            billingAsShipping: true,
            checkoutId: id,
            selectedBillingAddressId: shippingAddress.id,
          });

          return {
            data,
            dataError,
            pending: false,
          };
        } else {
          const { data, dataError } = await setBillingAddress({
            billingAddress: billingAddress ?? undefined,
            billingAsShipping: false,
            checkoutId: id,
            selectedBillingAddressId: billingAddress?.id ?? undefined,
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
    [billingAddress, id, setBillingAddress, shippingAddress]
  );
};

export { useSetBillingAsShippingAddress };
