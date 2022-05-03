import clsx from "clsx";
import * as React from "react";
import { Box } from "@mui/material";

import classes from "./scss/index.module.scss";
import { OverlayContextInterface } from "./context";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
  /**
   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
  children?: React.ReactNode;
}

const Overlay = ({
  children,
  className,
  context: { type, theme, hide },
  testingContext,
}: OverlayProps) => (
  <Box
    className={clsx(classes.overlay, {
      [`${classes.overlay}--${type}`]: !!type,
      [className ?? ""]: !!className,
    })}
    data-test={testingContext}
    onClick={hide}
  >
    <Box className={`${classes.overlay}__${theme}`} onClick={(e) => e.stopPropagation()}>
      {children}
    </Box>
  </Box>
);

export default Overlay;
