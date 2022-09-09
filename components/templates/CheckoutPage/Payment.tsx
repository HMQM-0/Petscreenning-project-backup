import { Alert, Box, Typography } from "@mui/material";
import * as React from "react";
import { useIntl } from "react-intl";

import { useCart, useCheckout } from "nautical-api";
import { ICardData, IFormError } from "types";

import { StripePaymentGateway } from "./StripePaymentGateway";
import { AuthorizeNetPaymentGateway } from "./AuthorizeNetPaymentGateway";
import { gridspan, title } from "./styles";

import { ICheckoutModelLine } from "../../providers/Nautical/Checkout/types";

interface PaymentProps {
  handleCreatePayment: (gateway: string, token?: string, creditCardData?: ICardData) => void;
  submittingPayment: boolean;
  setSubmittingPayment: React.Dispatch<boolean>;
}

const Payment = ({ handleCreatePayment, submittingPayment, setSubmittingPayment }: PaymentProps) => {
  const { totalPrice } = useCart();

  const [errorMessage, setErrorMessage] = React.useState("");

  const [paymentAlreadySubmitted, setPaymentAlreadySubmitted] = React.useState<boolean>(false);

  const { availablePaymentGateways, lines, payment } = useCheckout();

  const intl = useIntl();

  // Other
  const checkoutGatewayFormId = "gateway-form";

  const sellers = lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict: Record<string, ICheckoutModelLine[]> = {};
  for (const seller of sellerSet) {
    if (seller) {
      mappingDict[seller] = lines?.filter((line) => line.seller === seller) ?? [];
    }
  }

  const checkoutGatewayFormRef = React.useRef<HTMLFormElement>(null);

  const handleErrors = (errors: IFormError[]) => {
    const messages = errors?.flatMap((error) => error.message) ?? [];
    setErrorMessage(messages.join(" \n"));
    setSubmittingPayment(false);
  };

  const authNetResponseHandler = (response: any, gateway: string, creditCardData: ICardData) => {
    if (response.messages.resultCode === "Error") {
      let i = 0;
      while (i < response.messages.message.length) {
        console.error(response.messages.message[i].code + ": " + response.messages.message[i].text);
        i = i + 1;
      }
    } else {
      handleCreatePayment(gateway, response.opaqueData.dataValue, creditCardData);
    }
  };

  const handleProcessPayment = async (gateway: string, token?: string, creditCardData?: ICardData) => {
    if (gateway === "nautical.payments.authorize_net") {
      const publicClientKey = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "client_key",
      )?.value;
      const apiLoginID = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "api_login_id",
      )?.value;
      const authData = {
        clientKey: publicClientKey,
        apiLoginID,
      };
      const cardData = {
        cardNumber: creditCardData?.fullNumber && creditCardData.fullNumber.toString(),
        month: creditCardData?.expMonth && creditCardData.expMonth.toString(),
        year: creditCardData?.expYear && creditCardData.expYear.toString(),
        cardCode: creditCardData?.cvv && creditCardData.cvv.toString(),
      };
      const secureData = {
        authData,
        cardData,
      };

      const sterilizedCreditCardData = {
        brand: creditCardData?.brand ?? "",
        expMonth: creditCardData?.expMonth ?? 0,
        expYear: creditCardData?.expYear ?? 0,
        firstDigits: creditCardData?.firstDigits ?? "",
        lastDigits: creditCardData?.lastDigits ?? "",
      };
      // @ts-ignore
      // Accept is a Javascript Library we imported via a script tag injected into the Head HTML Element of our
      // App via the Helmet React Component.
      // The Helmet component with this script can be found in the AuthorizeNetPaymentGateway(.tsx) component.
      Accept.dispatchData(secureData, (res) => {
        authNetResponseHandler(res, gateway, sterilizedCreditCardData);
        setSubmittingPayment(false);
      });
    } else {
      await handleCreatePayment(gateway, token, creditCardData);
      setSubmittingPayment(false);
    }
  };

  const showPaymentAlreadySubmittedNotification = paymentAlreadySubmitted && !payment?.token && !submittingPayment;
  const showPaymentForm = showPaymentAlreadySubmittedNotification || Number(totalPrice?.gross.amount) > 0;

  if (!showPaymentForm) {
    return null;
  }

  return (
    <>
      <Box mb={2}>
        <Typography
          sx={title}
          variant="h6"
        >
          Payment Information
        </Typography>
      </Box>
      {showPaymentAlreadySubmittedNotification ? (
        <Box mb={2}>
          <Typography>
            {intl.formatMessage({
              defaultMessage:
                "Your checkout was interrupted, however the payment method was already provided. We are attempting to finalize the previous payment...",
            })}
          </Typography>
        </Box>
      ) : (
        <>
          {availablePaymentGateways?.map(({ id, name, config }) => {
            switch (name) {
              case "Stripe":
                return (
                  <StripePaymentGateway
                    config={config}
                    formRef={checkoutGatewayFormRef}
                    formId={checkoutGatewayFormId}
                    errors={[]}
                    onError={(errors) => handleErrors(errors)}
                    total={totalPrice || undefined}
                    setPaymentAlreadySubmitted={setPaymentAlreadySubmitted}
                  />
                );
              case "Authorize.Net":
                return (
                  <AuthorizeNetPaymentGateway
                    config={config}
                    formRef={checkoutGatewayFormRef}
                    formId={checkoutGatewayFormId}
                    processPayment={(token, cardData) => handleProcessPayment(id, token, cardData)}
                    errors={[]}
                    onError={(errors) => handleErrors(errors)}
                  />
                );
              default:
                return null;
            }
          })}
        </>
      )}
      {errorMessage && (
        <Box
          mb={3}
          style={{ display: "block" }}
          sx={gridspan}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
    </>
  );
};

export default Payment;
