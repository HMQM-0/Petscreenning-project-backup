import { gql } from "@apollo/client";

import { brandingFragment } from "src/queries/branding.graphql";

export const builderPageQuery = gql`
  ${brandingFragment}
  query BuilderPage {
    branding {
      ...Branding
    }
  }
`;
