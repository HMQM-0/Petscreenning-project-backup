import { useCallback } from "react";

import { useUpdateCheckoutLineMutation } from "../../Checkout/mutations.graphql.generated";
import { useCheckout } from "../../Checkout";
import { ICheckoutContext } from "../../Checkout/context";
import { constructCheckoutModel } from "../../utils/constructCheckoutModel";

const useUpdateCheckout = () => {
  const { id, updateLines } = useCheckout();
  const [updateCheckoutLine] = useUpdateCheckoutLineMutation();

  return useCallback(
    async (lines: ICheckoutContext["lines"]) => {
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
            return {
              error: errors,
            };
          }
          if (data?.checkoutLinesUpdate?.errors.length) {
            return {
              error: data?.checkoutLinesUpdate?.errors,
            };
          }
          if (data?.checkoutLinesUpdate?.checkout) {
            return {
              data: constructCheckoutModel(data.checkoutLinesUpdate.checkout),
            };
          }

          const lines =
            data?.checkoutLinesUpdate?.checkout?.lines?.map((line) => ({ ...line, seller: line.seller?.id ?? "" })) ??
            null;

          if (lines) {
            updateLines(lines);
          }

          return data;
        } catch (error) {
          return {
            error,
          };
        }
      }
    },
    [id, updateCheckoutLine, updateLines]
  );
};

export { useUpdateCheckout };
