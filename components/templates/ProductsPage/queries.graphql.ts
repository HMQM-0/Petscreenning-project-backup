import { gql } from "@apollo/client";

import {
  basicProductFragment,
  productPricingFragment,
} from "components/templates/ProductPage/queries.graphql";

export const menuItem = gql`
  fragment MenuItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    collection {
      id
      name
    }
    page {
      id
      title
    }
    level
    parent {
      id
      name
    }
  }
`;

// export const productsPageProduct = gql`
//   ${basicProductFragment}
//   ${productPricingFragment}
//   fragment ProductsPageProduct on Product {
//     ...BasicProductFields
//     ...ProductPricingField
//     seller {
//       id
//       companyName
//     }
//     category {
//       id
//       name
//     }
//     attributes {
//       attribute {
//         id
//         name
//       }
//       values {
//         id
//         name
//       }
//     }
//     defaultVariant {
//       id
//     }
//     variants {
//       id
//       name
//       images {
//         url
//       }
//       attributes {
//         attribute {
//           id
//           name
//           slug
//         }
//         values {
//           id
//           name
//           value: name
//           extra: value
//         }
//       }
//     }
//   }
// `;

export const productsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${menuItem}
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
          ...BasicProductFields
          ...ProductPricingField
          seller {
            id
            companyName
          }
          category {
            id
            name
          }
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
          defaultVariant {
            id
          }
          variants {
            id
            name
            images {
              url
            }
            attributes {
              attribute {
                id
                name
                slug
              }
              values {
                id
                name
                value: name
                extra: value
              }
            }
          }
        }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    attributes(first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    menu(name: "sidenav") {
      id
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
          }
        }
      }
    }
  }
`;

// TODO: To be uncommented when needed (or moved to appropriate file)
// export const categoryProductsQuery = gql`
//   ${basicProductFragment}
//   ${productPricingFragment}
//   query Category(
//     $id: ID!
//     $attributes: [AttributeInput]
//     $after: String
//     $pageSize: Int
//     $sortBy: ProductOrder
//     $priceLte: Float
//     $priceGte: Float
//   ) {
//     products(
//       after: $after
//       first: $pageSize
//       sortBy: $sortBy
//       filter: {
//         attributes: $attributes
//         categories: [$id]
//         minimalPrice: { gte: $priceGte, lte: $priceLte }
//       }
//     ) {
//       totalCount
//       edges {
//         node {
//           ...BasicProductFields
//           ...ProductPricingField
//           category {
//             id
//             name
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
//     category(id: $id) {
//       seoDescription
//       seoTitle
//       id
//       name
//       backgroundImage {
//         url
//       }
//       ancestors(last: 5) {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//     attributes(filter: { inCategory: $id }, first: 100) {
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
//   }
// `;
//
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
