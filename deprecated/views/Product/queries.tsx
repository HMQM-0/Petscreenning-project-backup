import gql from "graphql-tag";

import {
  BuilderProductDetails,
  BuilderProductDetailsVariables,
} from "./gqlTypes/BuilderProductDetails";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";

import { TypedQuery } from "../../core/queries";

export const priceFragment = gql`
  fragment PriceDeprecated on TaxedMoney {
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
  fragment BasicProductFieldsDeprecated on Product {
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
  fragment SelectedAttributeFieldsDeprecated on SelectedAttribute {
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

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFieldsDeprecated on ProductVariant {
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
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetailsDeprecated($id: ID!, $countryCode: CountryCode) {
    product(id: $id) {
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
  }
`;

export const builderProductDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query BuilderProductDetailsDeprecated($id: ID!, $countryCode: CountryCode) {
    product(id: $id) {
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
        productList: products(first: 6) {
          products: edges {
            product: node {
              ...BasicProductFields
              ...ProductPricingField
              defaultVariant {
                ...ProductVariantFields
              }
              slug
              isAvailable
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
        microsite {
          id
          name
        }
        logo {
          url
        }
      }
    }
  }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!], $countryCode: CountryCode) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantFields
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const TypedProductDetailsQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedBuilderProductDetailsQuery = TypedQuery<
  BuilderProductDetails,
  BuilderProductDetailsVariables
>(builderProductDetailsQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);
