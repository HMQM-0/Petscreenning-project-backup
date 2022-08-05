import { gql } from "@apollo/client";

import { brandingFragment } from "../../../queries/branding.graphql";

export const errorPageQuery = gql`
  ${brandingFragment}
  query ErrorPage {
    branding {
      ...Branding
    }
    shop {
      description
      name
    }
  }
`;
