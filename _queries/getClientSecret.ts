import { gql } from "graphql-tag";

export const getClientSecretQuery = gql`
  query GetClientSecret(
    $gateway: ID!
    $paymentInformation: StripeClientPaymentData!
  ) {
    getClientSecret(gateway: $gateway, paymentInformation: $paymentInformation)
  }
`;
