import { gql } from "@apollo/client";

import { brandingFragment } from "src/queries/branding.graphql";

export const resetPasswordPageQuery = gql`
  ${brandingFragment}
  query ResetPasswordPage {
    branding {
      ...Branding
    }
  }
`;
