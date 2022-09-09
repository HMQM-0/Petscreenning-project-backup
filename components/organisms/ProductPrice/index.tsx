import React from "react";

import { IProps as TaxedMoneyProps } from "components/molecules/TaxedMoney/types";
import Price from "components/organisms/Price";

import { TaxedMoney } from "../../molecules/TaxedMoney/TaxedMoney";

interface ProductPriceItemProps {
  pricing?: {
    priceRange?: {
      start?: TaxedMoneyProps["taxedMoney"];
      stop?: TaxedMoneyProps["taxedMoney"];
    } | null;
    priceRangeUndiscounted?: {
      start?: TaxedMoneyProps["taxedMoney"];
      stop?: TaxedMoneyProps["taxedMoney"];
    } | null;
  } | null;
}

const ProductPrice = ({ pricing }: ProductPriceItemProps) => {
  const priceStart = pricing?.priceRange?.start;
  const priceStop = pricing?.priceRange?.stop;
  const priceUndiscountedStart = pricing?.priceRangeUndiscounted?.start;
  const priceUndiscountedStop = pricing?.priceRangeUndiscounted?.stop;

  if (
    priceStart?.gross.amount === priceStop?.gross.amount &&
    priceUndiscountedStart?.gross.amount === priceUndiscountedStop?.gross.amount
  ) {
    // No need for a price range when both prices are the same
    return (
      <Price
        price={priceStart}
        priceUndiscounted={priceUndiscountedStart}
      />
    );
  }

  // For Price range we do not show un-discounted price (too long line in the UI)
  return (
    <>
      <TaxedMoney taxedMoney={priceStart} /> - <TaxedMoney taxedMoney={priceStop} />
    </>
  );
};

export default ProductPrice;
