import { gql } from "@apollo/client";

import { productsListProduct } from "components/templates/ProductsList/queries.graphql";

export const productsQuery = gql`
  ${productsListProduct}
  query Products(
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          ...ProductsListProduct
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

// TODO: To be uncommented when needed (or moved to appropriate file)
// export const builderProductsQuery = gql`
//   ${basicProductFragment}
//   ${productPricingFragment}
//   ${menuItem}
//   query BuilderProducts(
//     $attributes: [AttributeInput]
//     $after: String
//     $before: String
//     $first: Int
//     $last: Int
//     $sortBy: ProductOrder
//     $priceLte: Float
//     $priceGte: Float
//   ) {
//     productList: products(
//       after: $after
//       before: $before
//       first: $first
//       last: $last
//       sortBy: $sortBy
//       filter: {
//         attributes: $attributes
//         minimalPrice: { gte: $priceGte, lte: $priceLte }
//       }
//     ) {
//       totalCount
//       products: edges {
//         product: node {
//           ...BasicProductFields
//           ...ProductPricingField
//           seller {
//             id
//             companyName
//             microsite {
//               id
//               name
//             }
//             logo {
//               url
//             }
//           }
//           slug
//           isAvailable
//           category {
//             id
//             name
//           }
//           attributes {
//             attribute {
//               id
//               name
//             }
//             values {
//               id
//               name
//             }
//           }
//           brand
//           defaultVariant {
//             id
//             name
//             quantityAvailable
//           }
//           variants {
//             id
//             name
//             images {
//               url
//             }
//             attributes {
//               attribute {
//                 id
//                 name
//                 slug
//               }
//               values {
//                 id
//                 name
//                 value: name
//                 extra: value
//               }
//             }
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//     }
//     attributes(first: 100) {
//       edges {
//         node {
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
