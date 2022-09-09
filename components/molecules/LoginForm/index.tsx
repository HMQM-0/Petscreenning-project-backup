import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";

import Form from "components/molecules/Form";
import { AccountError } from "@generated";
import { useAuth } from "nautical-api";
import { commonMessages } from "core/intl";
import Button from "components/atoms/Button";
import TextField from "components/atoms/TextField";
import { IFormError } from "types";

import classes from "./scss/index.module.scss";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm = ({ hide }: ILoginForm) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IFormError[]>([]);

  const handleOnSubmit = async (evt: React.FormEvent, { email, password }: { email: string; password: string }) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const { errors } = await signIn(email.toLowerCase(), password);
      if (errors) {
        const IFormErrors: IFormError[] = errors.map((error) => ({
          field: (error as AccountError).field || undefined,
          message: error.message,
        }));
        setErrors(IFormErrors);
      } else if (hide) {
        setErrors([]);
        hide();
      }
    } catch {
      setErrors([
        {
          field: "email",
          message: "There was an unexpected error while signing in. Please try again.",
        },
      ]);
    }
    setLoading(false);
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
            {loading ? intl.formatMessage(commonMessages.loading) : intl.formatMessage({ defaultMessage: "Sign in" })}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default LoginForm;
