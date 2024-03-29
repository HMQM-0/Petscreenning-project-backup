import React, { useState } from "react";
import Script from "next/script";

import { maybe, removeEmptySpaces } from "src/core/utils";
import { ErrorMessage } from "src/components/atoms/ErrorMessage";

import * as S from "./styles";
import { IProps } from "./types";
import { AuthorizeNetCreditCardForm } from "./AuthorizeNetCreditCardForm";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

type CardError = { field?: string; message: string } | null;

interface ICardErrors {
  cvv: CardError;
  expirationMonth: CardError;
  expirationYear: CardError;
  number: CardError;
}

interface PaymentData {
  lastDigits: string;
  ccType: string;
  token: string;
}

interface ErrorData {
  fieldErrors: ICardErrors;
  nonFieldError?: string;
}

interface ICardPaymentInput {
  billingAddress: {
    postalCode?: string;
  };
  number: string;
  cvv: string;
  expirationDate: string;
}

interface ICardInputs {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

const AuthorizeNetPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  postalCode,
  onError,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<
    {
      message: string;
      field?: string;
    }[]
  >([]);

  const [cardErrors, setCardErrors] = React.useState<ErrorData>(INITIAL_CARD_ERROR_STATE);

  const sandboxEnabled = config.filter((configuration) => configuration.field === "use_sandbox")[0].value === "true";

  const tokenizeCcCard = async (creditCard: ICardPaymentInput) => {
    setCardErrors(INITIAL_CARD_ERROR_STATE);

    return {
      lastDigits: creditCard.number.trim().slice(-4),
      token: btoa(creditCard.number),
    } as PaymentData;
  };

  const handleSubmit = async (formData: ICardInputs) => {
    setSubmitErrors([]);
    const creditCard: ICardPaymentInput = {
      billingAddress: { postalCode },
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    };
    const expDate = creditCard.expirationDate.split("/");
    const expMonth = parseInt(expDate[0]);
    const expYear = parseInt(expDate[1]);
    const payment = await tokenizeCcCard(creditCard);
    const cvv = parseInt(creditCard.cvv);
    const fullNumber = parseInt(creditCard.number);

    if (payment?.token) {
      processPayment(payment?.token, {
        brand: payment?.ccType,
        firstDigits: null,
        lastDigits: payment?.lastDigits,
        expMonth,
        expYear,
        cvv,
        config,
        fullNumber,
      });
    } else {
      const errors = [
        {
          message: "Payment submission error. Credit card gateway returned no token in payload.",
        },
      ];
      setSubmitErrors(errors);
      onError(errors);
    }
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper data-test="creditCardPaymentGateway">
      {sandboxEnabled ? (
        <Script
          type="text/javascript"
          src="https://jstest.authorize.net/v1/Accept.js"
          charSet="utf-8"
        />
      ) : (
        <Script
          type="text/javascript"
          src="https://js.authorize.net/v1/Accept.js"
          charSet="utf-8"
        />
      )}

      <AuthorizeNetCreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "Expiry Date",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </S.Wrapper>
  );
};

export { AuthorizeNetPaymentGateway };
