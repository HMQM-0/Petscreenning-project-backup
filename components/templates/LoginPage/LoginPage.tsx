import { Box } from "@mui/material";
import React from "react";

import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import { useNetworkStatus } from "@hooks";

import classes from "./scss/index.module.scss";
import SignInForm from "./SignInForm";
import CheckoutAsGuest from "./CheckoutAsGuest";

export const LoginPage = () => {
  const { online: isOnline } = useNetworkStatus();
  return (
    <Box className="container">
      {isOnline ? (
        <Box className={classes["checkout-login"]}>
          <CheckoutAsGuest />
          <Box className={classes["checkout-login__user"]}>
            <SignInForm />
          </Box>
        </Box>
      ) : (
        <OfflinePlaceholder />
      )}
    </Box>
  );
};
