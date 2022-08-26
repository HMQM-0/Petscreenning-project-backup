import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements, PaymentIntentResult } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { IFormError } from "@types";
import { useCheckout, useAuth } from "nautical-api";
import { Loader } from "components/atoms/Loader";
import { useGetClientSecretQuery } from "queries/clientSecret.graphql.generated";
import { getNauticalClientSecret, getNauticalPaymentId, setNauticalClientSecret, setNauticalPaymentId } from "utils";

import { IProps } from "./types";

import { StripeCreditCardForm } from "../StripeCreditCardForm";

let stripe: Stripe | null = null;

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  formRef,
  formId,
  total,
  errors = [],
  onError,
  setPaymentAlreadySubmitted,
}: IProps) => {
  const hasLoadedStripe = useRef(false);
  const router = useRouter();
  const { authenticated } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);
  const [clientSecret, setClientSecret] = useState(() => getNauticalClientSecret() || "");
  const { shippingAddress } = useCheckout();

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  useEffect(() => {
    const load = async (key: string) => {
      stripe = await loadStripe(key);
      setInitialized(true);
      if (!stripe) {
        const stripeApiKeyErrors = [
          {
            message: "Stripe gateway misconfigured. Api key not provided.",
          },
        ];
        setSubmitErrors(stripeApiKeyErrors);
        onError(stripeApiKeyErrors);
      }
    };

    if (apiKey && !hasLoadedStripe.current) {
      load(apiKey);
      hasLoadedStripe.current = true;
    }
  }, [apiKey, onError]);

  useEffect(() => {
    const checkInterruptedPayment = async () => {
      const paymentId = getNauticalPaymentId();
      const clientSecret = getNauticalClientSecret();

      if (initialized && stripe && paymentId && clientSecret) {
        // Check payment intent to see if it was already complete
        const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);
        if (
          paymentIntent.paymentIntent?.status === "requires_capture" ||
          paymentIntent.paymentIntent?.status === "succeeded"
        ) {
          const status = paymentIntent.paymentIntent.status;
          // payment is complete in stripe - redirect to complete in nautical
          const successUrl = `${window.location.href}?${
            authenticated ? "" : `guest=1&`
          }payment_intent=${paymentId}&payment_intent_client_secret=${clientSecret}&redirect_status=${status}`;
          router.push(successUrl);
        }
      }
    };
    checkInterruptedPayment();
  }, [authenticated, initialized, router]);

  useGetClientSecretQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      gateway: "nautical.payments.stripe",
      paymentInformation: {
        amount: total?.gross?.amount,
        currency: total?.gross?.currency?.toLowerCase(),
        token: getNauticalPaymentId(),
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
      if (data?.getClientSecret?.payment_method_already_provided) {
        setPaymentAlreadySubmitted(true);
        return;
      }
      if (data?.getClientSecret?.id) {
        const existingId = getNauticalPaymentId();
        if (existingId !== data.getClientSecret.id) {
          setNauticalPaymentId(data.getClientSecret.id);
        }
      }
      if (data?.getClientSecret?.client_secret) {
        const existingSecret = clientSecret;
        if (existingSecret !== data.getClientSecret.client_secret) {
          setClientSecret(data.getClientSecret.client_secret);
          setNauticalClientSecret(data.getClientSecret.client_secret);
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
