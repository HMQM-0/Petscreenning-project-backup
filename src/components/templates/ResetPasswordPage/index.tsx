import { Box } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

import { setSignInToken } from "src/utils";
import { useSetPasswordMutation } from "src/components/providers/Nautical/Auth/mutations.graphql.generated";
import { BASE_URL } from "src/core/config";

import { ResetPasswordForm } from "./ResetPasswordForm";
import * as S from "./styles";
import { FormikProps } from "./types";

const PasswordResetSchema = Yup.object().shape({
  password: Yup.string().min(2, "Password is to short!").required("This field is required"),
  retypedPassword: Yup.string()
    .min(2, "Please retype password")
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Retyped password does not match"),
});

const initialData: FormikProps = {
  password: "",
  retypedPassword: "",
};

interface ResetPasswordPageProps {
  email: string;
  token: string;
}

type UserInputError = {
  field?: string;
};

export const ResetPasswordPage = ({ email, token }: ResetPasswordPageProps) => {
  const router = useRouter();

  const [setPassword, { data, error: graphqlErrors }] = useSetPasswordMutation();

  const tokenError = graphqlErrors?.extraInfo?.userInputErrors?.some(
    (error: UserInputError) => error?.field === "token",
  );
  const passwordError = graphqlErrors?.extraInfo?.userInputErrors?.find(
    (error: UserInputError) => error?.field === "password",
  )?.message;

  React.useEffect(() => {
    if (data && data.setPassword && data.setPassword.token) {
      setSignInToken(data.setPassword.token);
      router.replace(BASE_URL);
    }
  }, [data, router]);

  const onSubmit = (values: FormikProps) =>
    setPassword({
      variables: {
        email,
        password: values.password,
        token,
      },
    });

  return (
    <Box className="container">
      <S.Wrapper>
        <Formik
          initialValues={initialData}
          validationSchema={PasswordResetSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleBlur, values, errors, handleSubmit }) => {
            return (
              <ResetPasswordForm
                {...{
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  passwordError,
                  tokenError: !!tokenError,
                  values,
                }}
              />
            );
          }}
        </Formik>
      </S.Wrapper>
    </Box>
  );
};
