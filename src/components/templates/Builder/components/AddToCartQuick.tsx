import { Builder } from "@builder.io/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, Typography } from "@mui/material";
import { IconButtonTypeMap } from "@mui/material/IconButton/IconButton";
import React from "react";

import { useHandleAddToCart } from "src/components/templates/ProductPage/Page";

export const AddToCartQuick = (props: {
  variantId?: string;
  productName?: string;
  color?: IconButtonTypeMap["props"]["color"];
}) => {
  const addToCartHandler = useHandleAddToCart();

  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  if (!props.variantId) {
    return isEditingOrPreviewing ? <Typography>MISSING VARIANT ID BINDING</Typography> : null;
  }

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    return addToCartHandler(props.variantId!, 1, props.productName);
  };

  return (
    <IconButton
      color={props.color ? props.color : "primary"}
      onClick={handleAddToCart}
      aria-label="Add to Cart"
    >
      <AddCircleIcon />
    </IconButton>
  );
};
