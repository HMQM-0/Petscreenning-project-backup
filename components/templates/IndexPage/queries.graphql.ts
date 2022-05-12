import { gql } from "@apollo/client";

import {
  basicProductFragment,
  productPricingFragment,
} from "../ProductPage/queries.graphql";

export const homePageQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Home {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        description
        descriptionJson
        name
        products(first: 20) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
              isAvailable
              defaultVariant {
                id
              }
            }
          }
        }
      }
    }
    categories(level: 0, first: 2) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
    collections(first: 4) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;

export const builderHomePageQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query BuilderHome {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        description
        descriptionJson
        name
        productList: products(first: 20) {
          products: edges {
            product: node {
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
              isAvailable
              slug
              brand
              attributes {
                attribute {
                  id
                  name
                }
                values {
                  id
                  name
                }
              }
              seller {
                id
                companyName
                microsite {
                  id
                  name
                }
                logo {
                  url
                }
              }
              defaultVariant {
                id
                name
                quantityAvailable
              }
            }
          }
        }
      }
    }
    categoryList: categories(level: 0, first: 2) {
      categories: edges {
        category: node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
    collectionList: collections(first: 4) {
      collections: edges {
        collection: node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;
