import { gql } from "@apollo/client";

import {
  basicProductFragment,
  priceFragment,
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
export const productsPageAttribute = gql`
  fragment ProductsPageAttribute on Attribute {
    id
    name
    slug
    values {
      id
      name
      slug
    }
  }
`;

export const productVariantPricingFragment = gql`
  ${priceFragment}
  fragment ProductVariantPricingField on ProductVariant {
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
  }
`;

export const productsPageProduct = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantPricingFragment}
  fragment ProductsPageProduct on Product {
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
      ...ProductVariantPricingField
    }
  }
`;
export const productsPageMenu = gql`
  ${menuItem}
  fragment ProductsPageMenu on Menu {
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
`;

export const productsQuery = gql`
  ${productsPageProduct}
  ${productsPageAttribute}
  ${productsPageMenu}
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
          ...ProductsPageProduct
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
          ...ProductsPageAttribute
        }
      }
    }
    menu(name: "sidenav") {
      ...ProductsPageMenu
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
