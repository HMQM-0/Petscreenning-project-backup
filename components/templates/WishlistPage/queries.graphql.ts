import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const wishlistPageQuery = gql`
  ${brandingFragment}
  query WishlistPage {
    branding {
      ...Branding
    }
  }
`;
