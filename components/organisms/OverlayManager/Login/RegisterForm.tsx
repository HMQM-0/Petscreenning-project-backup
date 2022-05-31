import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useAlert, AlertContainer } from "react-alert";
import { useIntl, IntlShape } from "react-intl";

import { commonMessages } from "deprecated/intl";
import Button from "components/atoms/Button";
import Form from "deprecated/components/Form";
import { accountConfirmUrl } from "deprecated/app/routes/paths";
import { FormError } from "deprecated/components/Form/types";
import {
  RegisterAccountMutation,
  useRegisterAccountMutation,
} from "deprecated/components/OverlayManager/Login/mutations.graphql.generated";

import classes from "./scss/index.module.scss";

const showSuccessNotification = (
  data: RegisterAccountMutation,
  hide: () => void,
  alert: AlertContainer,
  intl: IntlShape
) => {
  const successful = !data.accountRegister?.errors.length;

  if (successful) {
    hide();
    alert.show(
      {
        // @ts-ignore
        title: data.accountRegister.requiresConfirmation
          ? intl.formatMessage({
              defaultMessage:
                "Please check your e-mail for further instructions",
            })
          : intl.formatMessage({ defaultMessage: "New user has been created" }),
      },
      { type: "success", timeout: 5000 }
    );
  }
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
  });

  return (
    <Form
      // TODO: RegisterAccount_accountRegister_errors is not in sync with FormError
      errors={(data?.accountRegister?.errors as FormError[]) ?? []}
      onSubmit={(event) => {
        event.preventDefault();
        const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
        return registerAccountMutation({
          variables: {
            email: formData.email,
            password: formData.password,
            redirectUrl,
            companyName: formData.companyName,
          },
        });
      }}
    >
      <TextField
        fullWidth
        name="email"
        autoComplete="email"
        label={intl.formatMessage(commonMessages.eMail)}
        type="email"
        required
        sx={{ marginBottom: 2 }}
        onChange={(event) =>
          setFormData({
            ...formData,
            email: event.target.value,
          })
        }
      />
      <TextField
        fullWidth
        name="password"
        autoComplete="password"
        label={intl.formatMessage(commonMessages.password)}
        type="password"
        required
        sx={{ marginBottom: 2 }}
        onChange={(event) =>
          setFormData({
            ...formData,
            password: event.target.value,
          })
        }
      />
      <TextField
        fullWidth
        name="companyName"
        helperText="Optional"
        autoComplete="companyName"
        label={intl.formatMessage(commonMessages.companyName)}
        type="text"
        onChange={(event) =>
          setFormData({
            ...formData,
            companyName: event.target.value,
          })
        }
      />
      <Box className={classes.login__content__button}>
        <Button
          testingContext="submitRegisterFormButton"
          type="submit"
          {...(loading && { disabled: true })}
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
