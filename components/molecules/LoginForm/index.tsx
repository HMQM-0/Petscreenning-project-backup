import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";

import { useAuth } from "nautical-api";
import { commonMessages } from "deprecated/intl";
import Button from "components/atoms/Button";
import { Form } from "deprecated/components";
import { FormError } from "deprecated/components/Form/types";
import TextField from "components/atoms/TextField";

import classes from "./scss/index.module.scss";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm = ({ hide }: ILoginForm) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleOnSubmit = async (
    evt: React.FormEvent,
    { email, password }: { email: string; password: string }
  ) => {
    evt.preventDefault();
    setLoading(true);
    const { errors } = await signIn(email.toLowerCase(), password);
    setLoading(false);
    if (errors) {
      const formErrors: FormError[] = errors.map((error) => ({
        message: error.message,
      }));
      setErrors(formErrors);
    } else if (hide) {
      setErrors([]);
      hide();
    }
  };

  const intl = useIntl();

  return (
    <Box className={classes["login-form"]}>
      <Form<{ email: string; password: string }>
        data={{ email: "", password: "" }}
        errors={errors ?? []}
        onSubmit={handleOnSubmit}
      >
        <TextField
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
        />
        <TextField
          name="password"
          autoComplete="password"
          label={intl.formatMessage(commonMessages.password)}
          type="password"
          required
        />
        <Box className={classes["login-form__button"]}>
          <Button
            testingContext="submit"
            type="submit"
            {...(loading && { disabled: true })}
          >
            {loading
              ? intl.formatMessage(commonMessages.loading)
              : intl.formatMessage({ defaultMessage: "Sign in" })}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default LoginForm;
