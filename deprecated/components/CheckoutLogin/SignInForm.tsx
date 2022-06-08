import React from "react";
import { FormattedMessage } from "react-intl";

import ForgottenPassword from "components/organisms/OverlayManager/Login/ForgottenPassword";

import { LoginForm } from "../";

const SignInForm: React.FC<{
  onForgottenPasswordClick: () => void;
}> = ({ onForgottenPasswordClick }) => (
  <>
    <h3 className="checkout__header">
      <FormattedMessage defaultMessage="Registered user" />
    </h3>
    <LoginForm />
    <ForgottenPassword onClick={onForgottenPasswordClick} />
  </>
);

export default SignInForm;
