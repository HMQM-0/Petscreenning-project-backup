import { Builder } from "@builder.io/react";
import { Typography } from "@mui/material";
import React from "react";

import { AddToWishlist as AddToWishlistButton } from "components/organisms";

export const AddToWishlist = (props: { productId: string }) => {
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  if (!props.productId) {
    return isEditingOrPreviewing ? <Typography>MISSING PRODUCT ID BINDING</Typography> : null;
  }

  return <AddToWishlistButton productId={props.productId} showButtonText={false} />;
};
