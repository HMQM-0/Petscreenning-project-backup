import { Builder } from "@builder.io/react";
import CloseIcon from "@mui/icons-material/Close";
import { AlertColor, Button, IconButton, Snackbar, Typography } from "@mui/material";
import React from "react";

import { useCart } from "nautical-api";

export const AddToCart = (props: {
  message?: string;
  severity?: AlertColor;
  button?: "contained" | "outlined" | "text" | null;
  color?: "primary" | "secondary" | null;
  width?: string;
  variantId?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const { addItem, removeItem } = useCart();

  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  if (!props.variantId) {
    return isEditingOrPreviewing ? <Typography>MISSING VARIANT ID BINDING</Typography> : null;
  }

  const handleClick = async () => {
    await addItem(props.variantId!, 1);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={async () => await removeItem(props.variantId!)}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Button
        color={props.color || "primary"}
        style={{
          alignSelf: "center",
          width: props.width ? `${props.width}px` : "100%",
          marginBottom: 24,
        }}
        onClick={handleClick}
        variant={props.button || "contained"}
      >
        Add to Cart
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Added to cart" action={action} />
    </>
  );
};
