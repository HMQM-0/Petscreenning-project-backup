import { gql } from "@apollo/client";

export const getClientSecretQuery = gql`
  query GetClientSecret(
    $gateway: ID!
    $paymentInformation: StripeClientPaymentData!
  ) {
    getClientSecret(gateway: $gateway, paymentInformation: $paymentInformation)
  }
`;
