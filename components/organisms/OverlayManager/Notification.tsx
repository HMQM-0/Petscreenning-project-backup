import * as React from "react";

import { Message } from "components/atoms/Message";
import { OverlayContextInterface } from "components/providers/Overlay/context";

interface NotificationOverlayProps {
  overlay: OverlayContextInterface;
}

export const NotificationOverlay = ({ overlay: { hide, context } }: NotificationOverlayProps) => {
  if (!context) {
    return null;
  }
  return (
    <Message
      title={context.title || ""}
      status={context.status}
      onClick={hide}
    >
      {context.content}
    </Message>
  );
};

export default NotificationOverlay;
