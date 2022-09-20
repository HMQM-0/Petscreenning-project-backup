import clsx from "clsx";
import * as React from "react";
import { Box } from "@mui/material";

import { OverlayContextInterface } from "src/components/providers/Overlay/context";

import classes from "./scss/index.module.scss";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
  /**
   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
  children?: React.ReactNode;
}

const Overlay = ({ children, className, context: { type, theme, hide }, testingContext }: OverlayProps) => (
  <Box
    className={clsx(classes.overlay, {
      [classes[`overlay--${type}`]]: !!type,
      [className ?? ""]: !!className,
    })}
    data-test={testingContext}
    onClick={hide}
  >
    <Box
      className={classes[`overlay__${theme}`]}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Box>
  </Box>
);

export default Overlay;
