import * as React from "react";

import Message from "deprecated/components/Message/index";
import { OverlayContextInterface } from "components/providers/Overlay/context";

interface NotificationOverlayProps {
  overlay: OverlayContextInterface;
}

export const NotificationOverlay = ({ overlay: { hide, context } }: NotificationOverlayProps) => {
  if (!context) {
    return null;
  }
  return (
    <Message title={context.title || ""} status={context.status} onClose={hide}>
      {context.content}
    </Message>
  );
};

export default NotificationOverlay;
