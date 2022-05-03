// TODO: How to pass this into <Overlay> ?
import "./scss/index.module.scss";

import * as React from "react";

import { Overlay, OverlayContextInterface } from "../..";

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
