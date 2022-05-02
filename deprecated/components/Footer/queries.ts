import { gql } from "graphql-tag";

import { SecondaryMenu } from "./gqlTypes/SecondaryMenu";

import { TypedQuery } from "../../core/queries";

const secondaryMenu = gql`
  fragment SecondaryMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
  }

  query SecondaryMenu {
    shop {
      navigation {
        secondary {
          items {
            ...SecondaryMenuSubItem
            children {
              ...SecondaryMenuSubItem
            }
          }
        }
      }
    }
  }
`;

export const TypedSecondaryMenuQuery = TypedQuery<SecondaryMenu, {}>(
  secondaryMenu
);
