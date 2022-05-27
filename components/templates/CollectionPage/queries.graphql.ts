import { gql } from "@apollo/client";

import { productList } from "@nautical/queries/products";
import { brandingFragment } from "queries/branding.graphql";

export const basicCollection = gql`
  fragment BasicCollection on Collection {
    id
    slug
    name
    seoDescription
    seoTitle
    backgroundImage {
      url
    }
  }
`;

export const collectionQuery = gql`
  ${basicCollection}
  query Collection($id: ID!) {
    collection(id: $id) {
      ...BasicCollection
    }
  }
`;

export const collectionPageQuery = gql`
  ${basicCollection}
  ${brandingFragment}
  ${productList}
  query CollectionPage(
    $id: ID!
    $categoryIds: [ID!]
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    branding {
      ...Branding
    }
    collection(id: $id) {
      ...BasicCollection
    }
    productList: products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: $categoryIds
        collections: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      ...ProductList
    }
  }
`;

// TODO: To be uncommented when needed in Builder related task

// export const builderCollectionInfoQuery = gql`
//   ${menuItem}
//   query Collection($id: ID!) {
//     collection(id: $id) {
//       id
//       slug
//       name
//       seoDescription
//       seoTitle
//       description
//       descriptionJson
//       backgroundImage {
//         url
//       }
//     }
//     menu(name: "sidenav") {
//       id
//       name
//       items {
//         ...MenuItem
//         children {
//           ...MenuItem
//           children {
//             ...MenuItem
//           }
//         }
//       }
//     }
//     attributeList: attributes(
//       filter: { inCollection: $id, filterableInStorefront: true }
//       first: 100
//     ) {
//       attributes: edges {
//         attribute: node {
//           id
//           name
//           slug
//           values {
//             id
//             name
//             slug
//           }
//         }
//       }
//     }
//   }
// `;
