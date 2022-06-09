import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe payment form.
 */
const StripeCreditCardForm: React.FC<IProps> = ({
  formRef,
  formId,
  errors = [],
  onSubmit,
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <S.Form id={formId} ref={formRef}>
      <PaymentElement />
      <button
        id="gatewayButton"
        onClick={async (event) => {
          event.preventDefault();
          await onSubmit(stripe, elements);
        }}
      />
    </S.Form>
  );
};

export { StripeCreditCardForm };
