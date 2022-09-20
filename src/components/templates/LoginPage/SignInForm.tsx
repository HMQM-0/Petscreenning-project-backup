import React from "react";
import { FormattedMessage } from "react-intl";

import ForgottenPassword from "src/components/organisms/OverlayManager/Login/ForgottenPassword";
import LoginForm from "src/components/molecules/LoginForm";
import { OverlayTheme, OverlayType, useOverlayContext } from "src/components/providers/Overlay";

import classes from "./scss/index.module.scss";

const SignInForm = () => {
  const { show } = useOverlayContext();

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };
  return (
    <>
      <h3 className={classes["checkout__header"]}>
        <FormattedMessage defaultMessage="Registered user" />
      </h3>
      <LoginForm />
      <ForgottenPassword onClick={showPasswordResetOverlay} />
    </>
  );
};

export default SignInForm;
