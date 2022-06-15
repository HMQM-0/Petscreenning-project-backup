import { gql } from "@apollo/client";

import { accountErrorFragment } from "fragments/errors.graphql";

export const tokenRefreshMutation = gql`
  ${accountErrorFragment}
  mutation RefreshToken($csrfToken: String, $refreshToken: String) {
    tokenRefresh(csrfToken: $csrfToken, refreshToken: $refreshToken) {
      token
      user {
        id
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;
