import { gql } from "@apollo/client";

import { brandingFragment } from "../../../queries/branding.graphql";

export const loginPageQuery = gql`
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
