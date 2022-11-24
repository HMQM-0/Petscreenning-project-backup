import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import OfflinePlaceholder from "src/components/atoms/OfflinePlaceholder";
import { useNetworkStatus } from "src/components/hooks";
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
          <Box className={classes["checkout-login__user"]}>
            <SignInForm />
          </Box>
          <CheckoutAsGuest />
        </Box>
      ) : (
        <OfflinePlaceholder />
      )}
    </Box>
  );
};
