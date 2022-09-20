import React from "react";

import { ICardData, IFormError } from "src/types";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { GatewayConfigLine } from "@generated";

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: GatewayConfigLine[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  // balance for the paymentIntent
  total?: ITaxedMoney;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
  setPaymentAlreadySubmitted: React.Dispatch<boolean>;
}
