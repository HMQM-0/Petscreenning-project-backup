import { gql } from "graphql-tag";

export const themeFontQuery = gql`
  query ThemeFont($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;
