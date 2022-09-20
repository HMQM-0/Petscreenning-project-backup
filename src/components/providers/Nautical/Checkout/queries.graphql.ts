import { gql } from "@apollo/client";

import { checkoutFragment, checkoutProductVariantFragment } from "./fragments.graphql";

export const checkoutDetails = gql`
  ${checkoutFragment}
  query CheckoutDetails($token: NauticalUUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const userCheckoutDetails = gql`
  ${checkoutFragment}
  query UserCheckoutDetails {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;

export const checkoutProductVariants = gql`
  ${checkoutProductVariantFragment}
  query CheckoutProductVariants($ids: [ID!]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
  }
`;
