import { gql } from "@apollo/client";

import { brandingFragment } from "src/queries/branding.graphql";

import { basicProductFragment, productPricingFragment } from "../ProductPage/queries.graphql";

export const homePageQuery = gql`
  ${brandingFragment}
  ${basicProductFragment}
  ${productPricingFragment}
  query Home {
    branding {
      ...Branding
    }
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
