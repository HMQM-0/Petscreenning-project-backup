import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const searchPageQuery = gql`
  ${brandingFragment}
  query SearchPage {
    branding {
      ...Branding
    }
  }
`;
