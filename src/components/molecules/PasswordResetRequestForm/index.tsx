import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { commonMessages } from "src/core/intl";
import Button from "src/components/atoms/Button";
import TextField from "src/components/atoms/TextField";
import Form from "src/components/molecules/Form";
import { IFormError } from "src/types";

import classes from "./scss/index.module.scss";
import { useResetPasswordRequestMutation } from "./queries.graphql.generated";

const PasswordResetRequestForm = () => {
  const intl = useIntl();
  const [passwordReset, { loading, data }] = useResetPasswordRequestMutation();

  const buttonMessage =
    data?.requestPasswordReset?.errors.length === 0
      ? intl.formatMessage({ defaultMessage: "Check your inbox" })
      : intl.formatMessage({ defaultMessage: "Reset password" });

  const isDisabled = loading || data?.requestPasswordReset?.errors.length === 0;

  return (
    <Box className={classes["password-reset-form"]}>
      <p className={classes["password-reset-form__text"]}>
        <FormattedMessage defaultMessage="Please provide us your email address so we can share you a link to reset your password" />
      </p>
      <Form<{ email: string }>
        errors={(data?.requestPasswordReset?.errors as IFormError[]) ?? []}
        onSubmit={(event, { email }) => {
          event.preventDefault();
          passwordReset({
            variables: {
              email,
              redirectUrl: `${window.location.origin}/reset-password/`,
            },
          });
        }}
      >
        <TextField
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
        />
        <Box className={classes["password-reset-form__button"]}>
          <Button
            testingContext="submit"
            type="submit"
            disabled={isDisabled}
          >
            {loading ? <FormattedMessage {...commonMessages.loading} /> : buttonMessage}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default PasswordResetRequestForm;
