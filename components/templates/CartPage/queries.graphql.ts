import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const cartPageQuery = gql`
  ${brandingFragment}
  query CartPage {
    branding {
      ...Branding
    }
  }
`;
