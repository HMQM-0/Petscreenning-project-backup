import gql from "graphql-tag";
import { TypedQuery } from "deprecated/core/queries";
import { Branding } from "deprecated/_nautical/components/ThemeFont/types";

export const brandingQuery = gql`
  query Branding {
    branding {
      id
      jsonContent
      logo {
        url
      }
      icon {
        url
      }
      favicon {
        url
      }
      footerText
      logoHeight
      logoWidth
    }
  }
`;

export const TypedBrandingQuery = TypedQuery<Branding, {}>(brandingQuery);

export const getClientSecretQuery = gql`
  query GetClientSecret(
    $gateway: ID!
    $paymentInformation: StripeClientPaymentData!
  ) {
    getClientSecret(gateway: $gateway, paymentInformation: $paymentInformation)
  }
`;
