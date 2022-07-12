import { useCallback } from "react";

import { saveMutationResultToLocalStorage } from "./saveMutationResultToLocalStorage";

import { useUpdateCheckoutLineMutation } from "../../Checkout/mutations.graphql.generated";
import { useCheckout } from "../../Checkout";
import { ICheckoutContext } from "../../Checkout/context";

const useUpdateCheckout = () => {
  const { id } = useCheckout();
  const [updateCheckoutLine] = useUpdateCheckoutLineMutation();

  return useCallback(
    async (lines: ICheckoutContext["lines"]) => {
      if (id) {
        if (id && lines) {
          const linesToUpdate = lines.map((line) => ({
            quantity: line.quantity,
            variantId: line.variant.id,
          }));

          try {
            const { data, errors } = await updateCheckoutLine({
              variables: {
                checkoutId: id,
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
    [id, updateCheckoutLine]
  );
};

export { useUpdateCheckout };
