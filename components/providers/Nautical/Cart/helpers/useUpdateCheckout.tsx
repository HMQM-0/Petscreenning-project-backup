import React, { useCallback } from "react";

import { saveMutationResultToLocalStorage } from "./saveMutationResultToLocalStorage";

import { ICheckoutModel } from "../../Checkout/types";
import { useUpdateCheckoutLineMutation } from "../../Checkout/mutations.graphql.generated";

const useUpdateCheckout = () => {
  const [updateCheckoutLine] = useUpdateCheckoutLineMutation();

  return useCallback(
    async (checkout: ICheckoutModel) => {
      if (checkout?.id) {
        const { lines, id: checkoutId } = checkout;

        if (checkoutId && lines) {
          const linesToUpdate = lines.map((line) => ({
            quantity: line.quantity,
            variantId: line.variant.id,
          }));

          try {
            const { data, errors } = await updateCheckoutLine({
              variables: {
                checkoutId,
                lines: linesToUpdate,
              },
            });

            // TODO: This will likely need to be moved to checkout provider
            if (errors?.length) {
              // return {
              //   error: errors,
              // };
            }
            if (data?.checkoutLinesUpdate?.errors.length) {
              // return {
              //   error: data?.checkoutLinesUpdate?.errors,
              // };
            }
            if (data?.checkoutLinesUpdate?.checkout) {
              // return {
              //   data: constructCheckoutModel(data.checkoutLinesUpdate.checkout),
              // };
            }

            if (data?.checkoutLinesUpdate) {
              saveMutationResultToLocalStorage(data);
            }
          } catch (error) {
            // return {
            //   error,
            // };
          }
        }
      }
    },
    [updateCheckoutLine]
  );
};

export { useUpdateCheckout };
