import { Alert, Box, Button, CircularProgress, MenuItem } from "@mui/material";
import { SxProps } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import Lock from "@mui/icons-material/Lock";
import React, { useState } from "react";
import * as Yup from "yup";

import { useShopContext } from "components/providers/ShopProvider";

export type AddressFormValues = {
  // CUSTOMER FIELDS
  email?: string;
  // ADDRESS FIELDS
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string;
  country?: string;
};

type AddressFormProps = {
  values: AddressFormValues;
  onSubmit: (values: AddressFormValues) => Promise<void>;
  errorMessage: string;
};

const textField: SxProps = {
  marginTop: "8px",
  "& .MuiFormLabel-root": {
    left: "-12px",
    marginBottom: 0,
    textTransform: "uppercase",
    top: "-8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    height: "56px",
    top: 0,
    "& legend": {
      display: "none",
    },
  },
};

const gridSpan: SxProps = {
  gridColumn: "1 / span 2",
};

const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const addressValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  streetAddress1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const fields: {
  name: keyof AddressFormValues;
  label: string;
  autoComplete: string;
  span: boolean;
  required: boolean;
  type?: string;
}[] = [
  { name: "firstName", label: "first name", required: true, autoComplete: "given-name", span: false },
  { name: "lastName", label: "last name", required: true, autoComplete: "family-name", span: false },
  { name: "companyName", label: "companyName", required: false, autoComplete: "companyName", span: true },
  { name: "streetAddress1", label: "address line 1", required: true, autoComplete: "address-line1", span: false },
  { name: "streetAddress2", label: "address line 2", required: false, autoComplete: "address-line2", span: false },
  { name: "city", label: "city", required: true, autoComplete: "address-level2", span: false },
  { name: "countryArea", label: "state/province/area", required: true, autoComplete: "address-level1", span: false },
  { name: "postalCode", label: "zip/postal code", required: true, autoComplete: "postal-code", span: false },
  { name: "phone", label: "phone", autoComplete: "shipping tel-national", required: false, span: false, type: "tel" },
  { name: "country", label: "country", required: true, autoComplete: "country", span: false },
];

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
}: AddressFormProps) => {
  const { countries } = useShopContext();
  const [formError, setFormError] = useState(false);
  return (
    <Formik
      validationSchema={addressValidationSchema}
      initialValues={{
        // CUSTOMER FIELDS
        email,
        // SHIPPING ADDRESS FIELDS
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
      {({ errors, touched, validateForm, isSubmitting, values, isValid, setSubmitting }) => {
        const formValidation = (event: any) => {
          validateForm()
            .then(() => {
              isValid ? onSubmit(event) : console.error("Form validation failed.");
            })
            .finally(() => {
              isValid ? setFormError(false) : setFormError(true);
            });
        };
        console.log("fields", fields);
        return (
          <Form>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "grid",
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
                    display: formError ? "block" : "none",
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
                  disableElevation
                  sx={{
                    borderRadius: 2,
                    mb: {
                      mb: 0,
                      md: "84px",
                    },
                    "& .MuiButton-label": {
                      fontSize: "1.0rem",
                      fontWeight: 400,
                    },
                  }}
                  variant="contained"
                  onClick={(e) => formValidation(e)}
                >
                  <Lock style={{ height: 16, width: 16, marginRight: 12 }} />{" "}
                  {isSubmitting ? <CircularProgress /> : "Continue"}
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
