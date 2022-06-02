import React from "react";
import { useIntl } from "react-intl";
import { TextField } from "@mui/material";

import { commonMessages } from "deprecated/intl";

export interface IQuantityInput {
  quantity: number;
  maxQuantity: number;
  disabled: boolean;
  onQuantityChange: (value: number) => void;
  hideErrors: boolean;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}

export const QuantityInput: React.FC<IQuantityInput> = ({
  disabled,
  quantity,
  maxQuantity,
  onQuantityChange,
  hideErrors,
  testingContext,
  testingContextId,
}) => {
  const intl = useIntl();

  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <TextField
      style={{ marginBottom: 24 }}
      fullWidth
      name="quantity"
      type="number"
      label={intl.formatMessage(commonMessages.quantity)}
      defaultValue="1"
      value={quantity.toString()}
      disabled={disabled}
      onChange={handleQuantityChange}
      data-test={testingContext}
    />
  );
};
QuantityInput.displayName = "QuantityInput";
export default QuantityInput;
