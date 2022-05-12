import { gql } from "@apollo/client";

import { wishlistItemFragment } from "./fragments.graphql";

export const userWishlist = gql`
  ${wishlistItemFragment}
  query Wishlist($after: String, $first: Int) {
    me {
      id
      wishlist(after: $after, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...WishlistItem
          }
        }
      }
    }
  }
`;
