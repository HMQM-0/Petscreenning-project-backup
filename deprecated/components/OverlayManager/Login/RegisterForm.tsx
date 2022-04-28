import "./scss/index.module.scss";

import * as React from "react";
import { Box, TextField } from "@mui/material";
import { useAlert, AlertContainer } from "react-alert";
import { useIntl, IntlShape } from "react-intl";

import { commonMessages } from "@temp/intl";
import Button from "deprecated/components/Button";
import Form from "deprecated/components/Form";

import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

import { accountConfirmUrl } from "../../../app/routes";

const showSuccessNotification = (
  data: RegisterAccount,
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

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const intl = useIntl();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    companyName: "",
  });

  return (
    <TypedAccountRegisterMutation
      onCompleted={(data) => showSuccessNotification(data, hide, alert, intl)}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={data?.accountRegister?.errors ?? []}
            onSubmit={(event, { email, password, companyName }) => {
              event.preventDefault();
              const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
              registerCustomer({
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
            <Box className="login__content__button">
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
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
