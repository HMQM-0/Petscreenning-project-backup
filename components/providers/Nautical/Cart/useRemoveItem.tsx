import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { CartActionCreators, CartActions } from "./actions";
import { useGetRefreshedCheckoutLines } from "./useGetRefreshedCheckoutLines";
import { saveMutationResultToLocalStorage } from "./saveMutationResultToLocalStorage";

import { useUpdateCheckoutLineMutation } from "../Checkout/mutations.graphql.generated";

type useRemoveItemProps = {
  dispatch: React.Dispatch<CartActions>;
};

const useRemoveItem = ({ dispatch }: useRemoveItemProps) => {
  const getRefreshedCheckoutLines = useGetRefreshedCheckoutLines();
  const [updateCheckoutLine] = useUpdateCheckoutLineMutation();

  return useCallback(
    async (variantId: string) => {
      const checkout = getCheckout();

      // 1. update local storage
      let lines = checkout?.lines || [];
      const variantInCheckout = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
      const alteredCheckout = checkout
        ? {
            ...checkout,
            lines: alteredLines,
          }
        : {
            lines: alteredLines,
          };

      setCheckout(alteredCheckout);

      // 2. save online if possible (if checkout id available)
      if (alteredCheckout.lines) {
        const { data, error } = await getRefreshedCheckoutLines(alteredCheckout.lines);

        if (error) {
          // this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
        } else {
          lines = data ?? [];
          setCheckout({
            ...checkout,
            lines: data,
          });
        }
      }

      // 2. save online if possible (if checkout id available)
      if (alteredCheckout?.id) {
        const { lines, id: checkoutId } = alteredCheckout;

        if (checkoutId && lines) {
          if (variantInCheckout) {
            variantInCheckout.quantity = 0;
            alteredLines.push(variantInCheckout);
          }
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

      // 3. set new items in state
      dispatch(CartActionCreators.updateItems(lines));
    },
    [dispatch, getRefreshedCheckoutLines, updateCheckoutLine]
  );
};

export { useRemoveItem };
