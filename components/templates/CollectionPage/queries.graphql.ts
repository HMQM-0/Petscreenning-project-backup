import { gql } from "@apollo/client";

import { basicProductFragment, priceFragment, productPricingFragment } from "../../../deprecated/views/Product/queries";

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

// TODO: To be uncommented when needed in Builder related task
// export const builderCollectionQuery = gql`
//   ${priceFragment}
//   ${basicProductFragment}
//   ${productPricingFragment}
//   query BuilderCollection(
//     $id: ID!
//     $attributes: [AttributeInput]
//     $after: String
//     $first: Int
//     $before: String
//     $last: Int
//     $sortBy: ProductOrder
//     $priceLte: Float
//     $priceGte: Float
//   ) {
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
//       productList: products(
//         after: $after
//         first: $first
//         before: $before
//         last: $last
//         sortBy: $sortBy
//         filter: {
//           attributes: $attributes
//           minimalPrice: { gte: $priceGte, lte: $priceLte }
//         }
//       ) {
//         totalCount
//         products: edges {
//           product: node {
//             ...BasicProductFields
//             ...ProductPricingField
//             category {
//               id
//               name
//             }
//             slug
//             seller {
//               id
//               companyName
//               microsite {
//                 id
//                 name
//               }
//               logo {
//                 url
//               }
//             }
//             isAvailable
//             brand
//             defaultVariant {
//               id
//               name
//               quantityAvailable
//               pricing {
//                 onSale
//                 priceUndiscounted {
//                   ...Price
//                 }
//                 price {
//                   ...Price
//                 }
//               }
//             }
//             variants {
//               id
//               name
//               images {
//                 url
//               }
//               attributes {
//                 attribute {
//                   id
//                   name
//                   slug
//                 }
//                 values {
//                   id
//                   name
//                   value: name
//                   extra: value
//                 }
//               }
//             }
//           }
//         }
//         pageInfo {
//           endCursor
//           hasNextPage
//           hasPreviousPage
//           startCursor
//         }
//       }
//     }
//   }
// `;
//
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
