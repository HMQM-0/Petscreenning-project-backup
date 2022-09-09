import * as React from "react";
import { Box } from "@mui/material";

import { IFormError } from "types";

import classes from "./scss/index.module.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: IFormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: IFormError[];
  helpText?: string;
  label?: string;
  labelColor?: string;
  textColor?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  const baseClass = classes["input__field"];
  const errorsClass = errors && errors.length ? ` ${classes["input__field--error"]}` : "";
  const iconLeftClass = iconLeft ? ` ${classes["input__field--left-icon"]}` : "";
  const styleTypeClass = styleType === "grey" ? ` ${classes["input__field--grey"]}` : "";

  return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};

const TextField: React.FC<TextFieldProps> = ({
  label = "",
  labelColor,
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  ...rest
}) => {
  const labelStyle = labelColor ? { color: labelColor } : {};

  return (
    <Box className={classes.input}>
      {iconLeft ? (
        <Box
          component="span"
          className={classes["input__icon-left"]}
        >
          {iconLeft}
        </Box>
      ) : null}
      {iconRight ? (
        <Box
          component="span"
          className={classes["input__icon-right"]}
        >
          {iconRight}
        </Box>
      ) : null}
      <Box className={classes["input__content"]}>
        <input
          {...rest}
          className={generateClassName({ errors, iconLeft, styleType })}
        />
        {label ? (
          <Box
            component="span"
            className={classes["input__label"]}
            style={labelStyle}
          >
            {label}
          </Box>
        ) : null}
      </Box>
      {errors && (
        <Box
          component="span"
          className={classes["input__error"]}
        >
          {errors.map((error) => error.message).join(" ")}
        </Box>
      )}
      {helpText && (
        <Box
          component="span"
          className={classes["input__help-text"]}
        >
          {helpText}
        </Box>
      )}
    </Box>
  );
};

export default TextField;
