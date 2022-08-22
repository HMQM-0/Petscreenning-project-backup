import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const addressBookPage = gql`
  ${brandingFragment}
  query AddressBookPage {
    branding {
      ...Branding
    }
  }
`;
