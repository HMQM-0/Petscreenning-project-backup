import { gql } from "@apollo/client";

const mainMenuSubItemFragment = gql`
  fragment MainMenuSubItem on MenuItem {
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
    parent {
      id
    }
  }
`;

const mainMenuItemsFragment = gql`
  ${mainMenuSubItemFragment}
  fragment MainMenuItems on MenuItem {
    ...MainMenuSubItem
    children {
      ...MainMenuSubItem
      children {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
              children {
                ...MainMenuSubItem
                children {
                  ...MainMenuSubItem
                  children {
                    ...MainMenuSubItem
                    children {
                      ...MainMenuSubItem
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const mainMenuFragment = gql`
  ${mainMenuItemsFragment}
  fragment MainMenu on Menu {
    id
    items {
      ...MainMenuItems
    }
  }
`;

export const mainMenu = gql`
  ${mainMenuFragment}
  query MainMenu {
    shop {
      navigation {
        main {
          ...MainMenu
        }
      }
    }
    designerdata(name: "NavBar") {
      jsonContent
      name
    }
  }
`;
