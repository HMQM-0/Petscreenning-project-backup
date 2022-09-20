import { gql } from "@apollo/client";

import { brandingFragment } from "src/queries/branding.graphql";

export const wishlistPageQuery = gql`
  ${brandingFragment}
  query WishlistPage {
    branding {
      ...Branding
    }
  }
`;
