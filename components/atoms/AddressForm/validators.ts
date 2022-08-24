import * as Yup from "yup";

export const addressValidationSchema = (email?: string) =>
  Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    streetAddress1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    email: email ? Yup.string().email("Invalid email").required("Required") : Yup.string(),
  });

export const noValidationSchema = Yup.object().shape({});

export const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
