import { gql } from "@apollo/client";

import { brandingFragment } from "../../../queries/branding.graphql";

export const checkoutPageQuery = gql`
  ${brandingFragment}
  query CheckoutPage {
    branding {
      ...Branding
    }
    shop {
      description
      name
    }
  }
`;

export const sellerNameQuery = gql`
  query SellerName($id: ID!) {
    sellerName(id: $id) {
      id
      companyName
    }
  }
`;
