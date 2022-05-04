import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import Offline from "deprecated/components/Offline/index";
import Online from "deprecated/components/Online/index";
import Overlay from "deprecated/components/Overlay/Overlay";
import { OverlayContextInterface } from "components/providers/Overlay/context";
import PasswordResetRequestForm from "deprecated/components/PasswordResetRequestForm/index";
import OfflinePlaceholder from "deprecated/components/OfflinePlaceholder";
import { X as CloseImg } from "components/icons/x";

import classes from "./scss/index.module.scss";


interface PasswordProps {
  overlay: OverlayContextInterface;
}

const Password = ({
  overlay,
}: PasswordProps) => (
  <Overlay testingContext="passwordOverlay" context={overlay}>
    <Box className={classes.passwordReset}>
      <Online>
        <Box className="overlay__header">
          <p className="overlay__header-text">
            <FormattedMessage defaultMessage="Reset your password" />
          </p>
          <button
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          >
            <CloseImg />
          </button>
        </Box>
        <Box className={classes.passwordReset__content}>
          <PasswordResetRequestForm />
        </Box>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </Box>
  </Overlay>
);

export default Password;
