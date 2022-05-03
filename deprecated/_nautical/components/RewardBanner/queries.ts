import { gql } from "graphql-tag";

export const promoBannerQuery = gql`
  query PromoBanner($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;
