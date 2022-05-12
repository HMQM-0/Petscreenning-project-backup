import { gql } from "graphql-tag";

export const brandingQuery = gql`
  query Branding {
    branding {
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
  }
`;
