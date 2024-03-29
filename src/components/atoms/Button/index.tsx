import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import React from "react";
import clsx from "clsx";

import classes from "./scss/index.module.scss";

type ButtonType = "submit" | "reset" | "button";

export interface ButtonProps extends MuiButtonProps {
  primary?: boolean;
  secondary?: boolean;
  outlined?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext?: string;
}

const Button = ({
  className = "",
  children,
  // testingContext,
  primary,
  secondary,
  outlined,
  btnRef,
  type,
  ...otherProps
}: ButtonProps) => {
  type ColorType = "inherit" | "default" | "primary" | "secondary";

  const color: ColorType = primary ? "primary" : secondary ? "secondary" : "secondary";

  const cl = clsx(classes.button, { [classes.secondary]: secondary }, { [className]: className });

  return (
    <MuiButton
      className={cl}
      color={color}
      variant={outlined ? "outlined" : "contained"}
      ref={btnRef}
      type={type as ButtonType}
      fullWidth
      {...otherProps}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
