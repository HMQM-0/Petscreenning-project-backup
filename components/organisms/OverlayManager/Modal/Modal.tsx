import React from "react";

import { OverlayContextInterface } from "components/providers/Overlay/context";

import Overlay from "../Overlay/Overlay";

export interface IModal {
  overlay: OverlayContextInterface;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const Modal = ({ overlay, testingContext }: IModal) => (
  <Overlay
    testingContext={testingContext}
    context={overlay}
  >
    {overlay.context?.content}
  </Overlay>
);

export default Modal;
