import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const resetPasswordPageQuery = gql`
  ${brandingFragment}
  query ResetPasswordPage {
    branding {
      ...Branding
    }
  }
`;
