import { gql } from "@apollo/client";

export const promoBannerQuery = gql`
  query PromoBanner($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;
