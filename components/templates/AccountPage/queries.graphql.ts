import { gql } from "@apollo/client";

import { userFragment } from "components/providers/Nautical/Auth/fragments.graphql";
import { accountErrorFragment } from "fragments/errors.graphql";
import { brandingFragment } from "queries/branding.graphql";

export const accountPageQuery = gql`
  ${brandingFragment}
  query AccountPage {
    branding {
      ...Branding
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
