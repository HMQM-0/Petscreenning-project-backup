import { gql } from "@apollo/client";

import { nauticalOrderDetailFragment } from "src/components/providers/Nautical/Checkout/fragments.graphql";
import { brandingFragment } from "src/queries/branding.graphql";

export const orderHistoryDetailsPageQuery = gql`
  ${brandingFragment}
  query OrderHistoryDetailsPage {
    branding {
      ...Branding
    }
  }
`;

export const invoiceFragment = gql`
  fragment InvoiceFragment on Invoice {
    id
    number
    createdAt
    url
    status
  }
`;

export const nauticalOrderDetailsByTokenQuery = gql`
  ${nauticalOrderDetailFragment}
  ${invoiceFragment}
  query NauticalOrderByToken($token: NauticalUUID!) {
    nauticalOrderByToken(token: $token) {
      ...NauticalOrderDetail
      invoices {
        ...InvoiceFragment
      }
    }
  }
`;
