import { gql } from "graphql-tag";

import { MainMenu } from "./gqlTypes/MainMenu";

import { TypedQuery } from "../../core/queries";

export const mainMenu = gql`
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

  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
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
        }
      }
    }
    designerdata(name: "NavBar") {
      jsonContent
      name
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);
