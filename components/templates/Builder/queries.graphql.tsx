import { gql } from "@apollo/client";

import {
  basicProductFragment,
  productPricingFragment,
} from "../ProductPage/queries.graphql";

export const builderMenuItem = gql`
  fragment BuilderMenuItem on MenuItem {
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

export const builderProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${builderMenuItem}
  query BuilderProducts(
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    productList: products(
      after: $after
      first: $pageSize
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
          brand
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

export const builderCategoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query BuilderCategory(
    $id: ID!
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
        categories: [$id]
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
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
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
    attributes(filter: { inCategory: $id }, first: 100) {
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

export const micrositesQuery = gql`
  query Microsites($first: Int, $search: String) {
    microsites(
      first: $first
      filter: { published: PUBLISHED, search: $search }
    ) {
      edges {
        node {
          seoTitle
          seoDescription
          description
          descriptionJson
          id
          name
          slug
          description
          affiliate {
            id
            firstName
            lastName
            companyName
            email
          }
          seller {
            id
            companyName
            logo {
              url
            }
          }
          logoImage {
            url
          }
          bannerImage {
            url
          }
        }
      }
    }
  }
`;
