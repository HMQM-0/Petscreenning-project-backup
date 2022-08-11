import { Alert, Box, Button, CircularProgress, MenuItem } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import Lock from "@mui/icons-material/Lock";
import React from "react";

import { useShopContext } from "components/providers/ShopProvider";

import { AddressFormValues } from "./types";
import { fields } from "./constants";
import { gridSpan, textField } from "./styles";
import { validateEmail, addressValidationSchema } from "./validators";

type AddressFormProps = {
  values: AddressFormValues;
  onSubmit: (values: AddressFormValues) => Promise<void>;
  errorMessage: string;
  submitText?: string;
};

const AddressForm = ({
  values: {
    email,
    firstName,
    lastName,
    companyName,
    streetAddress1,
    streetAddress2,
    city,
    postalCode,
    countryArea,
    phone,
    country,
  },
  onSubmit,
  errorMessage,
  submitText,
}: AddressFormProps) => {
  const { countries } = useShopContext();

  return (
    <Formik
      validationSchema={addressValidationSchema}
      initialValues={{
        email,
        firstName,
        lastName,
        companyName,
        streetAddress1,
        streetAddress2,
        city,
        postalCode,
        countryArea,
        phone,
        country,
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "grid",
                },
                flexDirection: "column",
                gap: "16px",
                mb: 1,
                gridTemplateColumns: "1fr 1fr",
              }}
            >
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
                          <MenuItem key={option.code} value={option.code}>
                            {option.country}
                          </MenuItem>
                        ))}
                      </Field>
                    </>
                  )
                )}
                {typeof email !== undefined && (
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
                  <Alert severity="error">
                    {errorMessage ? errorMessage : "Please ensure all required fields are entered"}
                  </Alert>
                </Box>
                <Box></Box>
                <Button
                  color="primary"
                  type="submit"
                  disableElevation
                  sx={{
                    borderRadius: "2px",
                    mb: {
                      sm: 0,
                      xs: 1,
                    },
                    "& .MuiButton-label": {
                      fontSize: "1.0rem",
                      fontWeight: 400,
                    },
                  }}
                  variant="contained"
                >
                  <Lock style={{ height: 16, width: 16, marginRight: 12 }} />{" "}
                  {isSubmitting ? <CircularProgress /> : submitText || "Set Address"}
                </Button>
              </>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddressForm };
