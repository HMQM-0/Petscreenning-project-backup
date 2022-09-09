import { Box } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";

import { AddressFormValues } from "./types";
import { addressValidationSchema, noValidationSchema } from "./validators";

type AddressFormProps = {
  values: AddressFormValues;
  onSubmit: (values: AddressFormValues, actions: FormikHelpers<any>) => Promise<unknown>;
  submitText?: string | React.ReactNode;
  children: (props: FormikProps<AddressFormValues>) => React.ReactNode;
  noValidate?: boolean;
};

const AddressForm = ({ values, onSubmit, children, noValidate }: AddressFormProps) => {
  const initialValues: AddressFormValues = {
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    companyName: values.companyName,
    streetAddress1: values.streetAddress1,
    streetAddress2: values.streetAddress2,
    city: values.city,
    postalCode: values.postalCode,
    countryArea: values.countryArea,
    phone: values.phone,
    country: values.country,
  };
  return (
    <Formik
      validationSchema={noValidate ? noValidationSchema : addressValidationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(props) => {
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
              {children(props)}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddressForm };
