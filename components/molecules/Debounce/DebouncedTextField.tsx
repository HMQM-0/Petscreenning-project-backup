import * as React from "react";

import TextField, { TextFieldProps } from "components/atoms/TextField";

import { DebounceChange } from "./DebounceChange";

interface DebouncedTextFieldProps extends Omit<TextFieldProps, "onChange"> {
  time?: number;
  resetValue?: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const DebouncedTextField = (props: DebouncedTextFieldProps) => {
  const { time, resetValue, value: originalValue, onChange, ...textFieldProps } = props;
  return (
    <DebounceChange
      resetValue={resetValue}
      debounce={onChange}
      time={time}
      value={originalValue}
    >
      {({ change, value }) => (
        <TextField
          {...textFieldProps}
          value={value}
          onChange={change}
        />
      )}
    </DebounceChange>
  );
};

DebouncedTextField.defaultProps = {
  time: 250,
};

export default DebouncedTextField;
