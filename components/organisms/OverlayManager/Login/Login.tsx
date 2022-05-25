import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import LoginForm from "deprecated/components/LoginForm/index";
import Offline from "deprecated/components/Offline/index";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import Online from "deprecated/components/Online/index";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "components/providers/Overlay/context";
import { X as CloseImg } from "components/icons/x";

import classes from "./scss/index.module.scss";
import ForgottenPassword from "./ForgottenPassword";
import RegisterForm from "./RegisterForm";

import overlayClasses from "../Overlay/scss/index.module.scss";
import Overlay from "../Overlay/Overlay";


interface LoginProps {
  overlay: OverlayContextInterface;
  active: "login" | "register";
}

class Login extends React.Component<LoginProps,
  { active: "login" | "register" }> {
  static defaultProps = {
    active: "login",
  };

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    this.setState({ active });
  };

  render() {
    const { overlay } = this.props;
    const { show, hide } = overlay;

    return (
      <Overlay testingContext="loginOverlay" context={overlay}>
        <Box className={classes.login}>
          <Online>
            <Box className={overlayClasses.overlay__header}>
              <p className={overlayClasses["overlay__header-text"]}>
                <FormattedMessage defaultMessage="Nautical account" />
              </p>
              <button onClick={hide} className={overlayClasses["overlay__header__close-icon"]}>
                <CloseImg />
              </button>
            </Box>
            <Box className={classes.login__tabs}>
              <Box
                component="span"
                data-test="loginTab"
                onClick={() => this.changeActiveTab("login")}
                className={this.state.active === "login" ? classes["active-tab"] : ""}
              >
                <FormattedMessage defaultMessage="Sign in to account" />
              </Box>
              <Box
                component="span"
                data-test="registerTab"
                onClick={() => this.changeActiveTab("register")}
                className={this.state.active === "register" ? classes["active-tab"] : ""}
              >
                <FormattedMessage defaultMessage="Register new account" />
              </Box>
            </Box>
            <Box className={classes.login__content}>
              {this.state.active === "login" ? (
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
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </Box>
      </Overlay>
    );
  }
}

export default Login;