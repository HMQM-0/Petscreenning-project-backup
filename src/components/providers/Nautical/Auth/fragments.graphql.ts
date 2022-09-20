import { gql } from "@apollo/client";

import { checkoutAddressFragment } from "../Checkout/fragments.graphql";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    companyName
    isStaff
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
