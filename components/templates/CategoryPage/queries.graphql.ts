import { gql } from "@apollo/client";

export const categoryQuery = gql`
  query Category($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

// TODO: To be uncommented when needed in Builder related task
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
//
// export const builderCategoryProductsQuery = gql`
//   ${basicProductFragment}
//   ${productPricingFragment}
//   query BuilderCategoryProductsData(
//     $id: ID!
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
//       first: $first
//       before: $before
//       last: $last
//       sortBy: $sortBy
//       filter: {
//         attributes: $attributes
//         categories: [$id]
//         minimalPrice: { gte: $priceGte, lte: $priceLte }
//       }
//     ) {
//       totalCount
//       products: edges {
//         product: node {
//           ...BasicProductFields
//           ...ProductPricingField
//           category {
//             id
//             name
//           }
//           slug
//           isAvailable
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
//           brand
//           defaultVariant {
//             id
//             name
//             quantityAvailable
//             pricing {
//               onSale
//               price {
//                 gross {
//                   amount
//                   currency
//                 }
//                 net {
//                   amount
//                   currency
//                 }
//               }
//             }
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
//   }
// `;
