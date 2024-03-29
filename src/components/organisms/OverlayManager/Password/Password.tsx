import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { OverlayContextInterface, OverlayTheme, OverlayType } from "src/components/providers/Overlay/context";
import PasswordResetRequestForm from "src/components/molecules/PasswordResetRequestForm/index";
import OfflinePlaceholder from "src/components/atoms/OfflinePlaceholder";
import { X as CloseImg } from "src/components/icons/x";
import { useNetworkStatus } from "src/components/hooks";
import { useOverlayContext } from "src/components/providers/Overlay";

import classes from "./scss/index.module.scss";
import ReturnToLogin from "./ReturnToLogin";

import overlayClasses from "../Overlay/scss/index.module.scss";
import Overlay from "../Overlay/Overlay";

interface PasswordProps {
  overlay: OverlayContextInterface;
}

const Password = ({ overlay }: PasswordProps) => {
  const overlayContext = useOverlayContext();
  const { online: isOnline } = useNetworkStatus();
  return (
    <Overlay
      testingContext="passwordOverlay"
      context={overlay}
    >
      <Box className={classes["password-reset"]}>
        {isOnline ? (
          <>
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
              <ReturnToLogin onClick={() => overlayContext.show(OverlayType.login, OverlayTheme.right)} />
            </Box>
          </>
        ) : (
          <OfflinePlaceholder />
        )}
      </Box>
    </Overlay>
  );
};

export default Password;
