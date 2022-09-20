import { gql } from "@apollo/client";

export const brandingFragment = gql`
  fragment Branding on BrandingType {
    id
    jsonContent
    logo {
      url
    }
    icon {
      url
    }
    favicon {
      url
    }
    footerText
    logoHeight
    logoWidth
  }
`;
