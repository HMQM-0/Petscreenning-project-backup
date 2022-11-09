import React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

import classes from "./scss/index.module.scss";

interface ForgottenPasswordProps {
  onClick: VoidFunction;
}

const ForgottenPassword = ({ onClick }: ForgottenPasswordProps) => (
  <>
    <Box className={classes["login__content__password-reminder"]}>
      <p>
        <FormattedMessage defaultMessage="Have you forgotten your password?" />{" "}
        <Box
          component="span"
          className={classes["custom-u-link"]}
          onClick={onClick}
          data-test="accountOverlayForgottenPasswordLink"
        >
          <FormattedMessage defaultMessage="Click Here" />
        </Box>
      </p>
    </Box>
  </>
);

export default ForgottenPassword;
