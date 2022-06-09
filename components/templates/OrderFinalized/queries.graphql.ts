import { gql } from "@apollo/client";

import { brandingFragment } from "../../../queries/branding.graphql";

export const orderFinalizedPageQuery = gql`
  ${brandingFragment}
  query OrderFinalizedPage($token: NauticalUUID!) {
    branding {
      ...Branding
    }
    shop {
      description
      name
    }
    nauticalOrderByToken(token: $token) {
      userEmail
    }
  }
`;
