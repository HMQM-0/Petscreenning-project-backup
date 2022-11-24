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
          onClick={onClick}
          data-test="accountOverlayForgottenPasswordLink"
        >
          <span style={{ color: "#0E6EFF", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}>
            <FormattedMessage defaultMessage="Click Here" />
          </span>
        </Box>
      </p>
    </Box>
  </>
);

export default ForgottenPassword;
