import { gql } from "@apollo/client";

import { userFragment } from "src/components/providers/Nautical/Auth/fragments.graphql";
import { accountErrorFragment } from "src/fragments/errors.graphql";

export const setCustomerDefaultAddress = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation SetCustomerDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;

export const deleteUserAddress = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation DeleteUserAddress($addressId: ID!) {
    accountAddressDelete(id: $addressId) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;

export const createUserAddress = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation CreateUserAddress($input: AddressInput!) {
    accountAddressCreate(input: $input) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;

export const updateUserAddress = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation UpdateUserAddress($input: AddressInput!, $id: ID!) {
    accountAddressUpdate(input: $input, id: $id) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;
