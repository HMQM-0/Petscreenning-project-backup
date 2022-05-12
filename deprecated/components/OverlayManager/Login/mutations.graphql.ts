import { gql } from "@apollo/client";

export const registerAccountMutation = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $companyName: String
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: $redirectUrl
        companyName: $companyName
      }
    ) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;
