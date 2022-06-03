import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client";

import { IFormError } from "@types";
import { getClientSecretQuery } from "deprecated/app/queries";
import { useCheckout } from "@nautical/react";
import { Loader } from "components/atoms/Loader";

import { IProps } from "./types";

import { StripeCreditCardForm } from "../StripeCreditCardForm";

let stripe: Stripe | null = null;

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  total,
  errors = [],
  onError,
}: IProps) => {
  const hasLoadedStripe = useRef(false);
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const { checkout } = useCheckout();

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  useEffect(() => {
    const load = async (key: string) => {
      stripe = await loadStripe(key);
      const stripeApiKeyErrors = [
        {
          message: "Stripe gateway misconfigured. Api key not provided.",
        },
      ];
      setSubmitErrors(stripeApiKeyErrors);
      onError(stripeApiKeyErrors);
    };

    if (apiKey && !hasLoadedStripe.current) {
      load(apiKey);
      hasLoadedStripe.current = true;
    }
  }, [apiKey, onError]);

  useQuery(getClientSecretQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      gateway: "nautical.payments.stripe",
      paymentInformation: {
        amount: total?.gross?.amount,
        currency: total?.gross?.currency?.toLowerCase(),
        token: localStorage.getItem("nauticalPaymentId"),
        shipping: {
          firstName: checkout?.shippingAddress?.firstName,
          lastName: checkout?.shippingAddress?.lastName,
          companyName: checkout?.shippingAddress?.companyName,
          streetAddress1: checkout?.shippingAddress?.streetAddress1,
          streetAddress2: checkout?.shippingAddress?.streetAddress2,
          city: checkout?.shippingAddress?.city,
          countryArea: checkout?.shippingAddress?.countryArea,
          postalCode: checkout?.shippingAddress?.postalCode,
          country: checkout?.shippingAddress?.country?.code,
          phone: checkout?.shippingAddress?.phone,
        },
      },
    },
    onCompleted: (data) => {
      if (data?.getClientSecret?.id) {
        const existingId = localStorage.getItem("nauticalPaymentId");
        if (existingId !== data.getClientSecret.id) {
          localStorage.setItem("nauticalPaymentId", data.getClientSecret.id);
        }
      }
      if (data?.getClientSecret?.client_secret) {
        const existingSecret = clientSecret;
        if (existingSecret !== data.getClientSecret.client_secret) {
          setClientSecret(data.getClientSecret.client_secret);
        }
      }
    },
  });

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const paymentElement = elements?.getElement(PaymentElement);

    if (paymentElement) {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href, // "http://localhost:3000/checkout/",
        },
      });

      if (error) {
        setSubmitErrors([
          ...submitErrors,
          {
            message: error.message!,
            field: error.code,
          },
        ]);
      }
    }
  };

  const allErrors = [...errors, ...submitErrors];

  const stripeOptions = {
    clientSecret: clientSecret,
  };

  return (
    <div data-test="stripeGateway">
      {stripeOptions.clientSecret ? (
        <Elements stripe={stripe} options={stripeOptions}>
          <StripeCreditCardForm
            formId={formId}
            formRef={formRef}
            errors={allErrors}
            onSubmit={handleFormSubmit}
          />
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { StripePaymentGateway };
