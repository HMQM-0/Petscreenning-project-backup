import React from "react";

import Overlay from "components/atoms/Overlay/Overlay";
import { OverlayContextInterface } from "components/providers/Overlay/context";

export interface IModal {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const Modal = ({ overlay, testingContext }: IModal) => (
  <Overlay testingContext={testingContext} context={overlay}>
    {overlay.context?.content}
  </Overlay>
);

export default Modal;
