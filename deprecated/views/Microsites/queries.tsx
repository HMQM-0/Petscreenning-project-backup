// eslint-disable-next-line import/no-named-as-default
import gql from "graphql-tag";

import { Microsite, MicrositeVariables } from "./gqlTypes/Microsite";
import {
  MicrositeProducts,
  MicrositeProductsVariables,
} from "./gqlTypes/MicrositeProducts";
import {
  BuilderMicrositeProducts,
  BuilderMicrositeProductsVariables,
} from "./gqlTypes/BuilderMicrositeProducts";
import {
  BuilderMicrosite,
  BuilderMicrositeVariables,
} from "./gqlTypes/BuilderMicrosite";

import {
  basicProductFragment,
  productPricingFragment,
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
} from "../Product/queries";
import { TypedQuery } from "../../core/queries";
import { menuTree } from "../../../components/organisms/ProductSideNavbar/queries.graphql";

export const micrositeProductsDataQuery = gql`
  ${menuTree}
  query Microsite($id: ID!) {
    microsite(id: $id) {
      id
      slug
      name
      seoDescription
      seoTitle
      bannerImage {
        url
      }
      logoImage {
        url
      }
    }
    menu(name: "sidenav") {
      ...MenuTree
    }
    attributes(
      filter: { inMicrosite: $id, filterableInStorefront: true }
      first: 100
    ) {
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

export const TypedMicrositeProductsDataQuery = TypedQuery<Microsite,
  MicrositeVariables>(micrositeProductsDataQuery);

export const micrositeProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query MicrositeProducts(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    microsite(id: $id) {
      id
      bannerImage {
        url
      }
      logoImage {
        url
      }
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
            category {
              id
              name
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
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const TypedMicrositeProductsQuery = TypedQuery<MicrositeProducts,
  MicrositeProductsVariables>(micrositeProductsQuery);

export const micrositeQuery = gql`
  query Microsite($id: ID!) {
    microsite(id: $id) {
      id
      name
      footerText
      bannerImage {
        url
      }
      logoImage {
        url
      }
    }
  }
`;

export const TypedMicrositeQuery = TypedQuery<Microsite, MicrositeVariables>(
  micrositeQuery
);

export const builderMicrositeInfoQuery = gql`
  ${menuTree}
  query BuilderMicrositeInfo($id: ID!) {
    microsite(id: $id) {
      id
      slug
      name
      description
      descriptionJson
      seoDescription
      seoTitle
      bannerImage {
        url
      }
      logoImage {
        url
      }
    }
    menu(name: "sidenav") {
      ...MenuTree
    }
    attributeList: attributes(
      filter: { inMicrosite: $id, filterableInStorefront: true }
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

export const builderMicrositeQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query BuilderMicrosite(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $before: String
    $first: Int
    $last: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    microsite(id: $id) {
      id
      slug
      name
      description
      descriptionJson
      seoDescription
      seoTitle
      bannerImage {
        url
      }
      logoImage {
        url
      }
      productList: products(
        after: $after
        first: $first
        before: $before
        last: $last
        sortBy: $sortBy
        filter: {
          attributes: $attributes
          minimalPrice: { gte: $priceGte, lte: $priceLte }
        }
      ) {
        totalCount
        products: edges {
          product: node {
            ...BasicProductFields
            ...ProductPricingField
            category {
              id
              name
            }
            brand
            defaultVariant {
              id
              name
              quantityAvailable
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
            isAvailable
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
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const TypedBuilderMicrositeProductsQuery = TypedQuery<BuilderMicrositeProducts,
  BuilderMicrositeProductsVariables>(builderMicrositeQuery);

export const TypedBuilderMicrositeProductsDataQuery = TypedQuery<BuilderMicrosite,
  BuilderMicrositeVariables>(builderMicrositeInfoQuery);
