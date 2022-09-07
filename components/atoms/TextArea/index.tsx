import * as React from "react";
import clsx from "clsx";

import { IFormError } from "types";

import classes from "./scss/index.module.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: IFormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: IFormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  return clsx(
    classes["input__field"],
    {
      [classes["input__field--error"]]: errors && errors.length,
    },
    {
      [classes["input__field--left-icon"]]: iconLeft,
    },
    {
      [classes["input__field--grey"]]: styleType === "grey",
    }
  );
};

const TextArea: React.FC<TextAreaFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  value,
  ...rest
}) => (
  <div className={classes["input"]}>
    {iconLeft ? <span className={classes["input__icon-left"]}>{iconLeft}</span> : null}
    {iconRight ? <span className={classes["input__icon-right"]}>{iconRight}</span> : null}
    <div className={classes["input__content"]}>
      <textarea
        {...rest}
        className={generateClassName({ errors, iconLeft, styleType })}
        rows={3}
        value={value}
        style={{ resize: "vertical" }}
      />
      {label ? <span className={classes["input__label"]}>{label}</span> : null}
    </div>
    {errors && <span className={classes["input__error"]}>{errors.map((error) => error.message).join(" ")}</span>}
    {helpText && <span className={classes["input__help-text"]}>{helpText}</span>}
  </div>
);

export default TextArea;
