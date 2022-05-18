import React from "react";

import { useShopContext } from "components/providers/ShopProvider";
import { Money } from "components/atoms/Money";

import { IProps } from "./types";


export const TaxedMoney = ({ taxedMoney, defaultValue, ...props }: IProps) => {
  const { displayGrossPrices } = useShopContext();
  const money = taxedMoney
    ? displayGrossPrices
      ? taxedMoney.gross
      : taxedMoney.net
    : undefined;
  return (<Money {...props} money={money} defaultValue={defaultValue} />);
};

TaxedMoney.displayName = "TaxedMoney";
export default TaxedMoney;
