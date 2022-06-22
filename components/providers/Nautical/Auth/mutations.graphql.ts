import { gql } from "@apollo/client";

import { accountErrorFragment } from "fragments/errors.graphql";

const signInMutation = gql`
  ${accountErrorFragment}
  mutation SignIn($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      refreshToken
      token
      errors: accountErrors {
        ...AccountError
      }
      user {
        id
      }
    }
  }
`;
