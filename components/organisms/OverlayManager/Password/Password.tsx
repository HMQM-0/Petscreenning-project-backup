import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import Offline from "deprecated/components/Offline/index";
import Online from "deprecated/components/Online/index";
import Overlay from "components/atoms/Overlay/Overlay";
import { OverlayContextInterface } from "components/providers/Overlay/context";
import PasswordResetRequestForm from "deprecated/components/PasswordResetRequestForm/index";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import { X as CloseImg } from "components/icons/x";
import overlayClasses from "components/atoms/Overlay/scss/index.module.scss";

import classes from "./scss/index.module.scss";



interface PasswordProps {
  overlay: OverlayContextInterface;
}

const Password = ({
  overlay,
}: PasswordProps) => {
  console.log('overlayClasses', overlayClasses);
  return (
    <Overlay testingContext="passwordOverlay" context={overlay}>
      <Box className={classes["password-reset"]}>
        <Online>
          <Box className={overlayClasses.overlay__header}>
            <p className={overlayClasses["overlay__header-text"]}>
              <FormattedMessage defaultMessage="Reset your password" />
            </p>
            <button
              onClick={overlay.hide}
              className={overlayClasses["overlay__header__close-icon"]}
            >
              <CloseImg />
            </button>
          </Box>
          <Box className={classes["password-reset__content"]}>
            <PasswordResetRequestForm />
          </Box>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </Box>
    </Overlay>
  );
};

export default Password;
