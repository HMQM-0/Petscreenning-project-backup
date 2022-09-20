import { Box } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import Select, { Props as SelectProps } from "react-select";

import classes from "./scss/index.module.scss";

type Style = "white" | "grey";

export interface SelectValue {
  label: string;
  value: string;
}

export interface SelectFieldProps<TValue> extends SelectProps<TValue> {
  label?: string;
  styleType?: Style;
}

type GenericSelectField<TValue> = React.FunctionComponent<SelectFieldProps<TValue>>;

const SelectField: GenericSelectField<SelectValue> = ({ label = "", styleType = "white", ...rest }) => (
  <Box
    className={clsx(classes["react-select-wrapper"], {
      [classes["react-select-wrapper--grey"]]: styleType === "grey",
    })}
  >
    {label ? (
      <Box
        component="span"
        className={classes["input__label"]}
      >
        {label}
      </Box>
    ) : null}
    <Select
      classNamePrefix={classes["react-select"]}
      {...rest}
    />
  </Box>
);

export default SelectField;
