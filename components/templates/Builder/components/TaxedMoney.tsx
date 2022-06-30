import { Builder } from "@builder.io/react";
import { Typography } from "@mui/material";
import React from "react";

import { TaxedMoney as TaxedMoneyComponent } from "components/molecules/TaxedMoney";

export const TaxedMoney = (props: {
  TaxedMoney?: {
    gross: { currency: string; amount: number };
    net: { currency: string; amount: number };
  };
}) => {
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  if (!props.TaxedMoney) {
    return isEditingOrPreviewing ? <Typography>MISSING TAXED MONEY BINDING</Typography> : null;
  }

  return <TaxedMoneyComponent taxedMoney={props.TaxedMoney} />;
};
