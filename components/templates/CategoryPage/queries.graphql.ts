import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

import { productList } from "../ProductsPage/queries.graphql";

export const basicCategory = gql`
  fragment BasicCategory on Category {
    seoDescription
    seoTitle
    description
    descriptionJson
    id
    name
    backgroundImage {
      url
    }
    ancestorList: ancestors(last: 5) {
      categories: edges {
        category: node {
          id
          name
        }
      }
    }
  }
`;

export const categoryQuery = gql`
  ${basicCategory}
  query Category($id: ID!) {
    category(id: $id) {
      ...BasicCategory
    }
  }
`;

export const categoryPageQuery = gql`
  ${basicCategory}
  ${brandingFragment}
  ${productList}
  query CategoryPage(
    $id: ID!
    $attributes: [AttributeInput!]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    branding {
      ...Branding
    }
    category(id: $id) {
      ...BasicCategory
    }
    productList: products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      ...ProductList
    }
  }
`;

// export const builderCategoryQuery = gql`
//   ${menuItem}
//   query BuilderCategoryData($id: ID!) {
//     category(id: $id) {
//       seoDescription
//       seoTitle
//       description
//       descriptionJson
//       id
//       name
//       backgroundImage {
//         url
//       }
//       ancestorList: ancestors(last: 5) {
//         categories: edges {
//           category: node {
//             id
//             name
//           }
//         }
//       }
//     }
//     attributeList: attributes(
//       filter: { inCategory: $id, filterableInStorefront: true }
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
//   }
// `;
