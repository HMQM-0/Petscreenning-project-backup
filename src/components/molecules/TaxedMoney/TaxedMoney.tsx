import React from "react";

// import { useShopContext } from "src/components/providers/ShopProvider";
import { Money } from "src/components/atoms/Money";

import { IProps } from "./types";

export const TaxedMoney = ({ taxedMoney, defaultValue, ...props }: IProps) => {
  // For now, we always show Net prices
  // (except for the Total field in Checkout/Order, which will be handled manually via `Money` component)
  const money = taxedMoney?.net;
  // Previous implementation (to be re-used in some other way later):
  // const { displayGrossPrices } = useShopContext();
  // const money = taxedMoney
  //   ? displayGrossPrices
  //     ? taxedMoney.gross
  //     : taxedMoney.net
  //   : undefined;
  return (
    <Money
      {...props}
      money={money}
      defaultValue={defaultValue}
    />
  );
};

TaxedMoney.displayName = "TaxedMoney";
export default TaxedMoney;
