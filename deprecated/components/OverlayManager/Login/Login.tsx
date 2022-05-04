import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import LoginForm from "deprecated/components/LoginForm/index";
import Offline from "deprecated/components/Offline/index";
import OfflinePlaceholder from "deprecated/components/OfflinePlaceholder";
import Online from "deprecated/components/Online/index";
import Overlay from "deprecated/components/Overlay/Overlay";
import { OverlayContextInterface, OverlayTheme, OverlayType } from "components/providers/Overlay/context";
import { X as CloseImg } from "components/icons/x";

import classes from "./scss/index.module.scss";
import ForgottenPassword from "./ForgottenPassword";
import RegisterForm from "./RegisterForm";

import overlayClasses from "../../Overlay/scss/index.module.scss";


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
              {/* // TODO: why overlayClasses.overlay__headerText is undefined? */}
              <p className={overlayClasses.overlay__headerText}>
                <FormattedMessage defaultMessage="Nautical account" />
              </p>
              {/* // TODO: why overlayClasses.overlay__header__closeIcon is undefined? */}
              <button onClick={hide} className={overlayClasses.overlay__header__closeIcon}>
                <CloseImg />
              </button>
            </Box>
            <Box className={classes.login__tabs}>
              <Box
                component="span"
                data-test="loginTab"
                onClick={() => this.changeActiveTab("login")}
                // TODO: classes.activeTab is undefined here for some reason
                className={this.state.active === "login" ? classes.activeTab : ""}
              >
                <FormattedMessage defaultMessage="Sign in to account" />
              </Box>
              <Box
                component="span"
                data-test="registerTab"
                onClick={() => this.changeActiveTab("register")}
                // TODO: classes.activeTab is undefined here for some reason
                className={this.state.active === "register" ? classes.activeTab : ""}
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
