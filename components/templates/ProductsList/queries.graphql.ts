import { gql } from "@apollo/client";

import {
  basicProductFragment,
  priceFragment,
  productPricingFragment,
} from "components/templates/ProductPage/queries.graphql";

import { menuTree } from "../../organisms/ProductSideNavbar/queries.graphql";

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

export const basicVariant = gql`
  fragment BasicVariant on ProductVariant {
    id
  }
`;

export const productsListProduct = gql`
  ${basicProductFragment}
  ${basicVariant}
  ${productPricingFragment}
  ${productVariantPricingFragment}
  fragment ProductsListProduct on Product {
    ...BasicProductFields
    ...ProductPricingField
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
    slug
    isAvailable
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
    brand
    defaultVariant {
      ...BasicVariant
      name
      quantityAvailable
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
      quantityAvailable,
      ...ProductVariantPricingField
    }
  }
`;


export const productList = gql`
  ${productsListProduct}
  fragment ProductList on ProductCountableConnection {
    totalCount
    products: edges {
      product: node {
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
`;

export const productsQuery = gql`
  ${productList}
  query Products(
    $query: String
    $categoryIds: [ID!]
    $collectionIds: [ID!]
    $micrositeId: ID
    $attributes: [AttributeInput!]
    $after: String
    $before: String
    $first: Int
    $last: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    productList: products(
      after: $after
      before: $before
      first: $first
      last: $last
      sortBy: $sortBy
      microsite: $micrositeId
      filter: {
        isPublished: true
        search: $query
        attributes: $attributes
        categories: $categoryIds
        collections: $collectionIds
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        stockAvailability: IN_STOCK
      }
    ) {
      ...ProductList
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

export const productsPageMenuAndAttributesQuery = gql`
  ${productsPageAttribute}
  ${menuTree}
  query ProductsPageMenuAndAttributes {
    attributes(first: 100) {
      edges {
        node {
          ...ProductsPageAttribute
        }
      }
    }
    menu(name: "sidenav") {
      ...MenuTree
    }
  }
`;
