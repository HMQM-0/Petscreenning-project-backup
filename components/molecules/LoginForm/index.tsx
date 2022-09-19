import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";

import Form from "components/molecules/Form";
import { useAuth } from "nautical-api";
import { commonMessages } from "core/intl";
import Button from "components/atoms/Button";
import TextField from "components/atoms/TextField";

import classes from "./scss/index.module.scss";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm = ({ hide }: ILoginForm) => {
  const { signIn, errors, fetching, user } = useAuth();

  useEffect(() => {
    if (user && !fetching) {
      hide?.();
    }
  }, [user, fetching, hide]);

  const handleOnSubmit = async (evt: React.FormEvent, { email, password }: { email: string; password: string }) => {
    evt.preventDefault();
    await signIn(email.toLowerCase(), password);
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
            {...(fetching && { disabled: true })}
          >
            {fetching ? intl.formatMessage(commonMessages.loading) : intl.formatMessage({ defaultMessage: "Sign in" })}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default LoginForm;
