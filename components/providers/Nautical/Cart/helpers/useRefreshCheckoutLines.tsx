import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

import { useCheckout } from "../../Checkout";
import {
  CheckoutProductVariantsDocument,
  CheckoutProductVariantsQuery,
} from "../../Checkout/queries.graphql.generated";
import { ICheckoutModel, ICheckoutModelLine } from "../../Checkout/types";

const useRefreshCheckoutLines = () => {
  const { updateLines } = useCheckout();
  const client = useApolloClient();

  const getRefreshedCheckoutLines = useCallback(
    async (checkoutlines: ICheckoutModelLine[] | null) => {
      const idsOfMissingVariants = checkoutlines
        ?.filter((line) => !line.variant || !line.totalPrice)
        .map((line) => line.variant.id);
      const linesWithProperVariant = checkoutlines?.filter((line) => line.variant && line.totalPrice) || [];

      let variants: CheckoutProductVariantsQuery["productVariants"];
      if (idsOfMissingVariants && idsOfMissingVariants.length) {
        try {
          const observable = client.watchQuery<CheckoutProductVariantsQuery, any>({
            query: CheckoutProductVariantsDocument,
            variables: {
              ids: idsOfMissingVariants,
            },
          });
          variants = await new Promise((resolve, reject) => {
            observable.subscribe(
              (result) => {
                const { data, errors } = result;
                if (errors?.length) {
                  reject(errors);
                } else {
                  resolve(data.productVariants);
                }
              },
              (error) => {
                reject(error);
              }
            );
          });
        } catch (error) {
          return {
            error,
          };
        }
      }

      const linesWithMissingVariantUpdated = variants
        ? variants.edges.map((edge) => {
            const existingLine = checkoutlines?.find((line) => line.variant.id === edge.node.id);
            const variantPricing = edge.node.pricing?.price;
            const totalPrice = variantPricing
              ? {
                  gross: {
                    ...variantPricing.gross,
                    amount: variantPricing.gross.amount * (existingLine?.quantity || 0),
                  },
                  net: {
                    ...variantPricing.net,
                    amount: variantPricing.net.amount * (existingLine?.quantity || 0),
                  },
                }
              : null;

            return {
              id: existingLine?.id ?? "",
              quantity: existingLine?.quantity || 0,
              seller: existingLine?.seller,
              totalPrice,
              variant: {
                attributes: edge.node.attributes,
                id: edge.node.id,
                isAvailable: edge.node.isAvailable,
                name: edge.node.name,
                pricing: edge.node.pricing,
                product: edge.node.product,
                quantityAvailable: edge.node.quantityAvailable,
                sku: edge.node.sku,
              },
            };
          })
        : [];

      const linesWithProperVariantUpdated = linesWithProperVariant.map((line) => {
        const variantPricing = line.variant.pricing?.price;
        const totalPrice = variantPricing
          ? {
              gross: {
                ...variantPricing.gross,
                amount: variantPricing.gross.amount * line.quantity,
              },
              net: {
                ...variantPricing.net,
                amount: variantPricing.net.amount * line.quantity,
              },
            }
          : null;

        return {
          id: line.id,
          quantity: line.quantity,
          seller: line.seller,
          totalPrice,
          variant: line.variant,
        };
      });

      return {
        data: [...linesWithMissingVariantUpdated, ...linesWithProperVariantUpdated],
      };
    },
    [client]
  );

  return useCallback(
    async (lines: ICheckoutModel["lines"]) => {
      let newLines: ICheckoutModel["lines"] = [];
      if (lines) {
        const { data, error } = await getRefreshedCheckoutLines(lines ?? null);
        if (error) {
          // TODO: Determine what this fireError behaviour accomplishes
          // this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
        } else {
          newLines = data ?? [];
          updateLines(newLines);
          return newLines;
        }
      }
      updateLines(newLines);
      return newLines;
    },
    [getRefreshedCheckoutLines, updateLines]
  );
};

export { useRefreshCheckoutLines };
