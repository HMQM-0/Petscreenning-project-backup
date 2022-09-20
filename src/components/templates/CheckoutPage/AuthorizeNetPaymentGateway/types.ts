import { ICardData, IFormError } from "src/types";
import { GatewayConfigLine } from "@generated";
import { CardError } from "src/core/payments/braintree";

import { IFormikProps } from "./cctypes";

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
  /**
   * Postal code used by Braintree.
   */
  postalCode?: string;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (token: string, cardData: ICardData) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

export type CardErrors = CardError[] | null[];
export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
