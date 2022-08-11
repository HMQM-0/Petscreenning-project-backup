import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  streetAddress1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
