import React from "react";
import { isEqual } from "lodash";

import { TaxedMoney } from "components/molecules/TaxedMoney";
import { ProductPricingFieldFragment } from "components/templates/ProductPage/queries.graphql.generated";
import { ProductVariantPricingFieldFragment } from "components/templates/ProductsList/queries.graphql.generated";
import { IItems } from "components/providers/Nautical/Cart/types";

import * as S from "./styles";

/**
 * Renders formatted price for chosen variant or product.
 * Price ranges and discounts are additionally formatted available.
 */
export const getProductPrice = (
  productPricingRange: ProductPricingFieldFragment["pricing"],
  variantPricing: ProductVariantPricingFieldFragment["pricing"]
) => {
  if (variantPricing) {
    if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
      return <TaxedMoney taxedMoney={variantPricing.price} />;
    }
    return (
      <>
        <S.UndiscountedPrice>
          <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
        </S.UndiscountedPrice>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TaxedMoney taxedMoney={variantPricing.price} />
      </>
    );
  }

  if (!productPricingRange?.priceRange) {
    return <></>;
  }

  const { start, stop } = productPricingRange.priceRange;
  if (isEqual(start, stop)) {
    return <TaxedMoney taxedMoney={start} />;
  }
  return (
    <>
      <TaxedMoney taxedMoney={start} /> - <TaxedMoney taxedMoney={stop} />
    </>
  );
};

export const canAddToCart = (
  items: IItems,
  isAvailableForPurchase: boolean,
  variantId: string | undefined,
  variantStock: number,
  quantity: number
): boolean => {
  const cartItem = items?.find((item) => item.variant.id === variantId);
  const syncedQuantityWithCart = cartItem ? quantity + (cartItem?.quantity || 0) : quantity;
  return isAvailableForPurchase && quantity > 0 && !!variantId && variantStock >= syncedQuantityWithCart;
};

/**
 * Returns how many items you can add to the cart. Takes in account quantity already in cart.
 */
export const getAvailableQuantity = (items: IItems, variantId: string | undefined, variantStock: number): number => {
  const cartItem = items?.find((item) => item.variant.id === variantId);
  const quantityInCart = cartItem?.quantity || 0;
  return variantStock - quantityInCart;
};
