import { gql } from "@apollo/client";

import { accountErrorFragment } from "fragments/errors.graphql";

import { userFragment } from "./fragments.graphql";

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

const tokenVeryficationMutation = gql`
  ${accountErrorFragment}
  ${userFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      isValid
      payload
      user {
        ...User
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;
