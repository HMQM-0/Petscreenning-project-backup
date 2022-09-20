import isEqual from "lodash/isEqual";
import React from "react";
import { Box } from "@mui/material";

import { TaxedMoney } from "src/components/molecules/TaxedMoney";
import { IProps as TaxedMoneyProps } from "src/components/molecules/TaxedMoney/types";

import classes from "./scss/index.module.scss";

interface PriceItemProps {
  price?: TaxedMoneyProps["taxedMoney"] | null;
  priceUndiscounted?: TaxedMoneyProps["taxedMoney"] | null;
}

const Price = ({ price, priceUndiscounted }: PriceItemProps) => {
  if (isEqual(price, priceUndiscounted)) {
    return <TaxedMoney taxedMoney={price} />;
  }

  return (
    <>
      <TaxedMoney taxedMoney={price} />
      &nbsp;&nbsp;
      <Box
        component="span"
        className={classes["product-list-price-undiscounted"]}
      >
        <TaxedMoney taxedMoney={priceUndiscounted} />
      </Box>
    </>
  );
};

export default Price;
