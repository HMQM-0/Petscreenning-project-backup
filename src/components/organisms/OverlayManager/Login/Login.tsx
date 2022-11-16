import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useState } from "react";

import LoginForm from "src/components/molecules/LoginForm";
import OfflinePlaceholder from "src/components/atoms/OfflinePlaceholder";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "src/components/providers/Overlay/context";
import { X as CloseImg } from "src/components/icons/x";
import { useNetworkStatus } from "src/components/hooks";

import classes from "./scss/index.module.scss";
import ForgottenPassword from "./ForgottenPassword";
import RegisterForm from "./RegisterForm";

import overlayClasses from "../Overlay/scss/index.module.scss";
import Overlay from "../Overlay/Overlay";

interface LoginProps {
  overlay: OverlayContextInterface;
  active: "login" | "register";
}

const Login = ({ active: initialActiveState, overlay }: LoginProps) => {
  const { online: isOnline } = useNetworkStatus();
  const [active, setActive] = useState(initialActiveState);

  const changeActiveTab = (newTab: "login" | "register") => {
    setActive(newTab);
  };

  const { show, hide } = overlay;

  const isLogin = active === "login";

  return (
    <Overlay
      testingContext="loginOverlay"
      context={overlay}
    >
      <Box className={classes.login}>
        {isOnline ? (
          <>
            <Box className={overlayClasses.overlay__header}>
              <p className={overlayClasses["overlay__header-text"]}>
                <FormattedMessage defaultMessage="My Account" />
              </p>
              <button
                onClick={hide}
                className={overlayClasses["overlay__header__close-icon"]}
              >
                <CloseImg />
              </button>
            </Box>
            <Box className={classes.login__tabs}>
              <Box
                component="span"
                data-test="loginTab"
                onClick={() => changeActiveTab("login")}
                className={isLogin ? classes["active-tab"] : ""}
              >
                <FormattedMessage defaultMessage="Sign in to account" />
              </Box>
              <Box
                component="span"
                data-test="registerTab"
                onClick={() => changeActiveTab("register")}
                className={!isLogin ? classes["active-tab"] : ""}
              >
                <FormattedMessage defaultMessage="Register new account" />
              </Box>
            </Box>
            <Box className={classes.login__content}>
              {isLogin ? (
                <>
                  <LoginForm hide={hide} />
                  <ForgottenPassword
                    onClick={() => {
                      show(OverlayType.password, OverlayTheme.right);
                    }}
                  />
                </>
              ) : (
                <RegisterForm hide={hide} />
              )}
            </Box>
          </>
        ) : (
          <OfflinePlaceholder />
        )}
      </Box>
    </Overlay>
  );
};

export default Login;
