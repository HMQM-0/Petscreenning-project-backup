import { gql } from "@apollo/client";

export const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 540) {
      url
    }
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

export const variantAttributeFragment = gql`
  fragment VariantAttribute on SelectedAttribute {
    attribute {
      id
      name
      slug
      metadata {
        key
        value
      }
    }
    values {
      id
      name
      value: name
      extra: value
    }
  }
`;

export const productVariantFragment = gql`
  ${priceFragment}
  ${variantAttributeFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: $countryCode)
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      ...VariantAttribute
    }
  }
`;

export const productDetailsFragment = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  fragment ProductDetails on Product {
    ...BasicProductFields
    ...ProductPricingField
    descriptionJson
    description
    category {
      id
      name
      backgroundImage {
        url
        alt
      }
      products(first: 6) {
        edges {
          node {
            ...BasicProductFields
            ...ProductPricingField
            defaultVariant {
              ...ProductVariantFields
            }
            slug
            isAvailable
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
            thumbnail {
              url
              alt
            }
          }
        }
      }
    }
    defaultVariant {
      ...ProductVariantFields
    }
    images {
      id
      alt
      url
    }
    attributes {
      ...SelectedAttributeFields
    }
    features {
      name
      description
    }
    variants {
      ...ProductVariantFields
    }
    seoDescription
    seoTitle
    isAvailable
    isAvailableForPurchase
    availableForPurchase
    seller {
      id
      companyName
    }
  }
`;

export const productSeoFragment = gql`
  fragment ProductSeo on Product {
    seoTitle
    name
    seoDescription
    descriptionJson
    thumbnail {
      url
    }
    category {
      name
    }
    isAvailable
    pricing {
      priceRange {
        start {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${productDetailsFragment}
  ${productSeoFragment}
  query ProductDetails($id: ID!, $countryCode: CountryCode) {
    branding {
      ...Branding
    }
    product(id: $id) {
      ...ProductDetails
      ...ProductSeo
    }
  }
`;

export const productRatingsAndReviewsFragment = gql`
  fragment ProductRatingsAndReviews on ProductRatingsAndReviews {
    bottomline {
      averageScore
      totalReview
    }
    reviews {
      content
      createdAt
      score
      title
      user {
        displayName
      }
    }
  }
`;

export const GetProductRatingsAndReviewsQuery = gql`
  ${productRatingsAndReviewsFragment}
  query GetProductRatingsAndReviews($productId: String!) {
    productRatingsAndReviews(productId: $productId) {
      ...ProductRatingsAndReviews
    }
  }
`;

// To be uncommented when needed (or moved to appropriate file)
// export const builderProductDetailsQuery = gql`
//   ${basicProductFragment}
//   ${selectedAttributeFragment}
//   ${productVariantFragment}
//   ${productPricingFragment}
//   query BuilderProductDetails($id: ID!, $countryCode: CountryCode) {
//     product(id: $id) {
//       ...BasicProductFields
//       ...ProductPricingField
//       descriptionJson
//       description
//       category {
//         id
//         name
//         backgroundImage {
//           url
//           alt
//         }
//         productList: products(first: 6) {
//           products: edges {
//             product: node {
//               ...BasicProductFields
//               ...ProductPricingField
//               defaultVariant {
//                 ...ProductVariantFields
//               }
//               slug
//               isAvailable
//               attributes {
//                 attribute {
//                   id
//                   name
//                 }
//                 values {
//                   id
//                   name
//                 }
//               }
//               seller {
//                 id
//                 companyName
//                 microsite {
//                   id
//                   name
//                 }
//                 logo {
//                   url
//                 }
//               }
//               thumbnail {
//                 url
//                 alt
//               }
//             }
//           }
//         }
//       }
//       defaultVariant {
//         ...ProductVariantFields
//       }
//       images {
//         id
//         alt
//         url
//       }
//       attributes {
//         ...SelectedAttributeFields
//       }
//       features {
//         name
//         description
//       }
//       variants {
//         ...ProductVariantFields
//       }
//       seoDescription
//       seoTitle
//       isAvailable
//       isAvailableForPurchase
//       availableForPurchase
//       seller {
//         id
//         companyName
//         microsite {
//           id
//           name
//         }
//         logo {
//           url
//         }
//       }
//     }
//   }
// `;
//
// // FIXME: Check how to handle pagination of `productVariants` in the UI.
// // We need allow the user view  all cart items regardless of pagination.
// export const productVariantsQuery = gql`
//   ${basicProductFragment}
//   ${productVariantFragment}
//   query VariantList($ids: [ID!], $countryCode: CountryCode) {
//     productVariants(ids: $ids, first: 100) {
//       edges {
//         node {
//           ...ProductVariantFields
//           product {
//             ...BasicProductFields
//           }
//         }
//       }
//     }
//   }
// `;
