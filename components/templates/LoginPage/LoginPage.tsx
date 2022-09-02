import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import { useNetworkStatus } from "components/hooks";
import { useAuth } from "nautical-api";

import classes from "./scss/index.module.scss";
import SignInForm from "./SignInForm";
import CheckoutAsGuest from "./CheckoutAsGuest";

export const LoginPage = () => {
  const { online: isOnline } = useNetworkStatus();
  const { authenticated } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (authenticated) {
      push("/checkout/");
    }
  }, [authenticated, push]);
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
