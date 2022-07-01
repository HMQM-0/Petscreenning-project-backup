import { gql } from "@apollo/client";

import { userFragment } from "./fragments.graphql";

const getUserDetailsQuery = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;
