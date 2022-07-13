import { useCallback } from "react";

import { CheckoutActions } from "./actions";
import { ICheckoutContext } from "./context";
import { useCreateCheckout } from "./helpers/useCreateCheckout";
import { useUpdateCheckoutShippingAddress } from "./helpers/useUpdateCheckoutShippingAddress";
import { FunctionErrorCheckoutTypes, ICheckoutAddress } from "./types";

export interface SetBillingAddressJobInput {
  checkoutId: string;
  billingAddress?: ICheckoutAddress;
  billingAsShipping?: boolean;
  selectedBillingAddressId?: string;
}

type SetShippingAddressProps = {
  dispatch: React.Dispatch<CheckoutActions>;
  id: ICheckoutContext["id"];
  lines: ICheckoutContext["lines"];
  billingAsShipping: ICheckoutContext["billingAsShipping"];
};

const useSetShippingAddress = ({ dispatch, billingAsShipping, id, lines }: SetShippingAddressProps) => {
  const updateCheckoutShippingAddress = useUpdateCheckoutShippingAddress({ dispatch });
  const createCheckout = useCreateCheckout({ dispatch });

  return useCallback(
    async (shippingAddress: ICheckoutAddress, email: string) => {
      const checkoutId = id;
      const alteredLines = lines?.map((item) => ({
        quantity: item!.quantity,
        variantId: item?.variant!.id,
      }));

      if (alteredLines && checkoutId) {
        const { data, dataError } = await updateCheckoutShippingAddress({
          checkoutId,
          email,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
          billingAsShipping,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }

      if (alteredLines) {
        const { data, dataError } = await createCheckout({
          email,
          lines: alteredLines,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
        });

        return {
          data,
          dataError,
          pending: false,
        };
      }
      return {
        functionError: {
          error: new Error("You need to add items to cart before setting shipping address."),
          type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
        },
        pending: false,
      };
    },
    [billingAsShipping, createCheckout, updateCheckoutShippingAddress]
  );
};

export { useSetShippingAddress };
