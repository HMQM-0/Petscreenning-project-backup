import React from "react";
import { Box } from "@mui/material";
import { useAlert, AlertContainer } from "react-alert";
import { useIntl, IntlShape } from "react-intl";

import { commonMessages } from "deprecated/intl";
import Button from "components/atoms/Button";
import Form from "deprecated/components/Form";
import { FormError } from "deprecated/components/Form/types";
import TextField from "components/atoms/TextField";

import {
  RegisterAccountMutation,
  useRegisterAccountMutation,
} from "./mutations.graphql.generated";
import classes from "./scss/index.module.scss";

const showSuccessNotification = (
  data: RegisterAccountMutation,
  hide: () => void,
  alert: AlertContainer,
  intl: IntlShape
) => {
  const successful = !data.accountRegister?.errors.length;

  if (!successful) {
    return;
  }
  hide();
  alert.show(
    {
      title: data.accountRegister?.requiresConfirmation
        ? intl.formatMessage({
          defaultMessage:
            "Please check your e-mail for further instructions",
        })
        : intl.formatMessage({ defaultMessage: "New user has been created" }),
    },
    { type: "success", timeout: 5000 }
  );
};

interface RegisterFormProps {
  hide: VoidFunction;
}

const RegisterForm = ({ hide }: RegisterFormProps) => {
  const [registerAccountMutation, { data, loading }] =
    useRegisterAccountMutation({
      onCompleted: (data) => showSuccessNotification(data, hide, alert, intl),
    });
  const alert = useAlert();
  const intl = useIntl();

  return (
    <Form<{ email: string; password: string; companyName: string; }>
      // BE issue. errors should not contain null
      errors={(data?.accountRegister?.errors as FormError[]) ?? []}
      onSubmit={(event, { email, password, companyName }) => {
        event.preventDefault();
        const redirectUrl = `${window.location.origin}/account-confirm/`;
        return registerAccountMutation({
          variables: {
            email,
            password,
            redirectUrl,
            companyName,
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
      <TextField
        name="password"
        autoComplete="password"
        label={intl.formatMessage(commonMessages.password)}
        type="password"
        required
      />
      <TextField
        name="companyName"
        autoComplete="companyName"
        label={intl.formatMessage(commonMessages.companyName)}
        type="text"
      />
      <Box className={classes.login__content__button}>
        <Button
          testingContext="submitRegisterFormButton"
          type="submit"
          disabled={loading}
        >
          {loading
            ? intl.formatMessage(commonMessages.loading)
            : intl.formatMessage({ defaultMessage: "Register" })}
        </Button>
      </Box>
    </Form>
  );
};

export default RegisterForm;
