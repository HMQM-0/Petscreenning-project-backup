import React from "react";
import { Button, CircularProgress } from "@mui/material";
import Lock from "@mui/icons-material/Lock";

type AddressFormSubmitButtonProps = {
  isSubmitting: boolean;
  buttonText?: string;
};

const AddressFormSubmitButton = ({ isSubmitting, buttonText }: AddressFormSubmitButtonProps) => {
  return (
    <Button
      color="primary"
      type="submit"
      disableElevation
      sx={{
        borderRadius: "2px",
        mb: {
          sm: 0,
        },
        "& .MuiButton-label": {
          fontSize: "1.0rem",
          fontWeight: 400,
        },
      }}
      variant="contained"
      disabled={isSubmitting}
    >
      <Lock style={{ height: 16, width: 16, marginRight: 12 }} />{" "}
      {isSubmitting ? <CircularProgress /> : buttonText || "Set Address"}
    </Button>
  );
};

export { AddressFormSubmitButton };
