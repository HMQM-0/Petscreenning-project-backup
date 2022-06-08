import React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

import classes from "./scss/index.module.scss";

interface ForgottenPasswordProps {
  onClick: VoidFunction;
}

const ReturnToLogin = ({ onClick }: ForgottenPasswordProps) => (
  <Box className={classes["login__content__password-reminder"]}>
    <p>
      <FormattedMessage defaultMessage="Return to account login" />{" "}
      <Box
        component="span"
        className="u-link"
        onClick={onClick}
      >
        <FormattedMessage defaultMessage="Click Here" />
      </Box>
    </p>
  </Box>
);

export default ReturnToLogin;
