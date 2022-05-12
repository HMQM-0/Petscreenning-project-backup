import { gql } from "@apollo/client";

export const themeFontQuery = gql`
  query ThemeFont($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;
