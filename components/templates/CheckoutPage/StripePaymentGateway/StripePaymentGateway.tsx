import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useEffect, useRef, useState } from "react";

import { IFormError } from "@types";
import { useCheckout } from "nautical-api";
import { Loader } from "components/atoms/Loader";
import { useGetClientSecretQuery } from "queries/clientSecret.graphql.generated";

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
  const { shippingAddress } = useCheckout();

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

  useGetClientSecretQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      gateway: "nautical.payments.stripe",
      paymentInformation: {
        amount: total?.gross?.amount,
        currency: total?.gross?.currency?.toLowerCase(),
        token: localStorage.getItem("nauticalPaymentId"),
        shipping: {
          firstName: shippingAddress?.firstName,
          lastName: shippingAddress?.lastName,
          companyName: shippingAddress?.companyName,
          streetAddress1: shippingAddress?.streetAddress1,
          streetAddress2: shippingAddress?.streetAddress2,
          city: shippingAddress?.city,
          countryArea: shippingAddress?.countryArea,
          postalCode: shippingAddress?.postalCode,
          // @ts-ignore - Needs to be CountryCode defined in generated code - TODO: Refactor NauticalProvider to ensure useCheckout types this as country code
          country: shippingAddress?.country?.code,
          phone: shippingAddress?.phone,
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

  const handleFormSubmit = async (stripe: Stripe | null, elements: StripeElements | null) => {
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
          <StripeCreditCardForm formId={formId} formRef={formRef} errors={allErrors} onSubmit={handleFormSubmit} />
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { StripePaymentGateway };
