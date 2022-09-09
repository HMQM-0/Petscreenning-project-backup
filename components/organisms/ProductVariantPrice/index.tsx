import React from "react";

import { IProps as TaxedMoneyProps } from "components/molecules/TaxedMoney/types";
import Price from "components/organisms/Price";

interface ProductVariantPriceItemProps {
  pricing?: {
    price?: TaxedMoneyProps["taxedMoney"] | null;
    priceUndiscounted?: TaxedMoneyProps["taxedMoney"] | null;
  } | null;
}

const ProductVariantPrice = ({ pricing }: ProductVariantPriceItemProps) => {
  const price = pricing?.price;
  const priceUndiscounted = pricing?.priceUndiscounted;

  return (
    <Price
      price={price}
      priceUndiscounted={priceUndiscounted}
    />
  );
};

export default ProductVariantPrice;
