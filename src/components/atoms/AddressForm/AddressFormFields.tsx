import React from "react";
import { TextField } from "formik-mui";
import { Field, FormikProps } from "formik";
import { Alert, Box, MenuItem } from "@mui/material";

import { useShopContext } from "src/components/providers/ShopProvider";

import { fields } from "./constants";
import { gridSpan, textField } from "./styles";
import { validateEmail } from "./validators";
import { AddressFormValues } from "./types";

type AddressFormFieldsProps = {
  touched: FormikProps<AddressFormValues>["touched"];
  errors: FormikProps<AddressFormValues>["errors"];
  errorMessage: string | React.ReactNode;
  hasEmail?: boolean;
};

const AddressFormFields = ({ touched, errors, hasEmail, errorMessage }: AddressFormFieldsProps) => {
  const { countries } = useShopContext();
  return (
    <>
      {fields.map(({ name, label, autoComplete, required, span, type }) =>
        name !== "country" ? (
          <>
            <Field
              key={name}
              sx={{ ...textField, ...(span ? gridSpan : {}) }}
              autoComplete={autoComplete}
              component={TextField}
              required={required}
              name={name}
              label={label}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                helperText: touched[name] ? errors[name] : null,
              }}
              type={type}
            />
          </>
        ) : (
          <>
            <Field
              sx={textField}
              component={TextField}
              name="country"
              label="country"
              variant="outlined"
              required
              autoComplete="country"
              InputLabelProps={{ shrink: true, helperText: touched[name] ? errors[name] : null }}
              select
            >
              {countries?.map((option) => (
                <MenuItem
                  key={option.code}
                  value={option.code}
                >
                  {option.country}
                </MenuItem>
              ))}
            </Field>
          </>
        ),
      )}
      {hasEmail && (
        <>
          <Field
            sx={textField}
            component={TextField}
            required
            name="email"
            label="email"
            type="email"
            autoComplete="email"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              helperText: touched.email ? validateEmail("email") : null,
            }}
          />
        </>
      )}
      <Box
        style={{
          display: errorMessage ? "block" : "none",
        }}
        sx={gridSpan}
      >
        <Alert severity="error">{errorMessage ? errorMessage : "Please ensure all required fields are entered"}</Alert>
      </Box>
    </>
  );
};

export { AddressFormFields };
