import { useCallback } from "react";

import { getCheckout, setCheckout } from "utils";

import { useGetRefreshedCheckoutLines } from "./useGetRefreshedCheckoutLines";
import { CartActionCreators, CartActions } from "./actions";
import { saveMutationResultToLocalStorage } from "./saveMutationResultToLocalStorage";

import { ICheckoutModel } from "../Checkout/types";
import { useUpdateCheckoutLineMutation } from "../Checkout/mutations.graphql.generated";
import { constructCheckoutModel } from "../utils/constructCheckoutModel";

type useAddItemProps = {
  dispatch: React.Dispatch<CartActions>;
  getRefreshedCheckoutLines: ReturnType<typeof useGetRefreshedCheckoutLines>;
};

const useAddItem = ({ getRefreshedCheckoutLines, dispatch }: useAddItemProps) => {
  const [updateCheckoutLine] = useUpdateCheckoutLineMutation();

  return useCallback(
    async (variantId: string, quantity: number) => {
      const checkout = getCheckout();

      // 1. save in local storage
      let lines = checkout?.lines || [];
      let variantInCheckout = lines.find((variant) => variant.variant.id === variantId);
      const alteredLines = lines.filter((variant) => variant.variant.id !== variantId);
      const newVariantQuantity = variantInCheckout ? variantInCheckout.quantity + quantity : quantity;
      if (variantInCheckout) {
        variantInCheckout.quantity = newVariantQuantity;
        alteredLines.push(variantInCheckout);
      } else {
        variantInCheckout = {
          quantity,
          variant: {
            id: variantId,
          },
        };
        alteredLines.push(variantInCheckout);
      }
      const alteredCheckout: ICheckoutModel = checkout
        ? {
            ...checkout,
            lines: alteredLines,
          }
        : {
            lines: alteredLines,
          };
      setCheckout(alteredCheckout);

      if (alteredCheckout?.lines) {
        const { data, error } = await getRefreshedCheckoutLines(alteredCheckout.lines ?? null);
        if (error) {
          // TODO: Determine what this fireError behaviour accomplishes
          // this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
        } else {
          lines = data ?? [];
          setCheckout({
            ...alteredCheckout,
            lines: data,
          });
        }
      }

      // 2. save online if possible (if checkout id available)
      if (alteredCheckout?.id) {
        const { lines, id: checkoutId } = alteredCheckout;

        if (checkoutId && lines) {
          const alteredLines = lines.map((line) => ({
            quantity: line.quantity,
            variantId: line.variant.id,
          }));

          try {
            const { data, errors } = await updateCheckoutLine({
              variables: {
                checkoutId,
                lines: alteredLines,
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

export { useAddItem };
