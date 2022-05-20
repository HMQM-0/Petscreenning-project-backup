import { gql } from "@apollo/client";

export const menuItem = gql`
  fragment MenuItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    collection {
      id
      name
    }
    page {
      id
      title
    }
    level
    parent {
      id
      name
    }
  }
`;

export const menuTree = gql`
  ${menuItem}
  fragment MenuTree on Menu {
    id
    name
    items {
      ...MenuItem
      children {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
  }
`;
