import * as React from "react";

import Message from "deprecated/components/Message/index";
import { OverlayContextInterface } from "deprecated/components/Overlay/context"

interface Props {
  overlay: OverlayContextInterface;
}

export const NotificationOverlay = ({ overlay: { hide, context } }: Props) => {
  return (
    <Message title={context.title || ""} status={context.status} onClose={hide}>
      {context.content}
    </Message>
  );
};

export default NotificationOverlay;
