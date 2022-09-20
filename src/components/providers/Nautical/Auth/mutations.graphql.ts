import { gql } from "@apollo/client";

import { accountErrorFragment } from "src/fragments/errors.graphql";

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

export const changeUserPassword = gql`
  ${accountErrorFragment}
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;

export const setPassword = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation SetPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors: accountErrors {
        ...AccountError
      }
      token
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord = gql`
  mutation YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecords($user: UserInput!) {
    yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord(user: $user) {
      ok
      status
    }
  }
`;

export const yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints = gql`
  mutation YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints($input: UserPointsInput!) {
    yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints(input: $input) {
      ok
      status
    }
  }
`;
