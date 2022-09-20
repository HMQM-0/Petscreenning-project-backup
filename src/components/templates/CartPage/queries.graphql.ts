import { gql } from "@apollo/client";

import { brandingFragment } from "src/queries/branding.graphql";

export const cartPageQuery = gql`
  ${brandingFragment}
  query CartPage {
    branding {
      ...Branding
    }
  }
`;
