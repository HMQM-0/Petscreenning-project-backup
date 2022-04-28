import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { productPricingFragment } from "../Product/queries";
import {
  BuilderSearchProducts,
  BuilderSearchProductsVariables,
} from "./gqlTypes/BuilderSearchProducts";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${productPricingFragment}
  query SearchProducts(
    $query: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $sortBy: ProductOrder
    $microsite: ID
    $after: String
  ) {
    products(
      filter: { search: $query, attributes: $attributes }
      first: $pageSize
      sortBy: $sortBy
      after: $after
      microsite: $microsite
    ) {
      totalCount
      edges {
        node {
          ...ProductPricingField
          id
          name
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    attributes(filter: { filterableInStorefront: true }, first: 100) {
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
  }
`;

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);

export const builderSearchQuery = gql`
  ${productPricingFragment}
  query BuilderSearch(
    $query: String!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $attributes: [AttributeInput]
    $sortBy: ProductOrder
    $microsite: ID
  ) {
    productList: products(
      filter: { search: $query, attributes: $attributes }
      first: $first
      after: $after
      before: $before
      last: $last
      sortBy: $sortBy
      microsite: $microsite
    ) {
      totalCount
      products: edges {
        product: node {
          ...ProductPricingField
          id
          name
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
          slug
          brand
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
          defaultVariant {
            id
            name
            quantityAvailable
          }
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
    attributeList: attributes(
      filter: { filterableInStorefront: true }
      first: 100
    ) {
      attributes: edges {
        attribute: node {
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
  }
`;

export const TypedBuilderSearchProductsQuery = TypedQuery<
  BuilderSearchProducts,
  BuilderSearchProductsVariables
>(builderSearchQuery);
