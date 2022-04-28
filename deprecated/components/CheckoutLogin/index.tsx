import "./scss/index.module.scss";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Navigate } from "react-router";

// import { useAuth } from "@nautical/sdk";
import { useAuth } from "@nautical/react";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";
import { OverlayType, OverlayTheme } from "../Overlay";
import { generateMicrositeUrl } from "@utils/core";
import {
  getMicrositeId,
  getMicrositeSlug,
  isMicrosite,
} from "deprecated/core/utils";

const CheckoutLogin: React.FC<{}> = () => {
  const overlay = useContext(OverlayContext);
  const { user } = useAuth();
  const { show } = overlay;

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  if (user) {
    return (
      <Navigate
        to={
          !!isMicrosite()
            ? `${generateMicrositeUrl(
                getMicrositeId(),
                getMicrositeSlug()
              )}checkout/`
            : "/checkout/"
        }
      />
    );
  }
  return (
    <Box className="container">
      <Online>
        <Box className="checkout-login">
          <CheckoutAsGuest
            overlay={overlay}
            checkoutUrl={
              !!isMicrosite()
                ? `${generateMicrositeUrl(
                    getMicrositeId(),
                    getMicrositeSlug()
                  )}checkout/`
                : "/checkout/"
            }
          />
          <Box className="checkout-login__user">
            <SignInForm onForgottenPasswordClick={showPasswordResetOverlay} />
          </Box>
        </Box>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </Box>
  );
};

export default CheckoutLogin;
