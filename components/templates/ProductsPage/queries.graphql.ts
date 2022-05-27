import { gql } from "@apollo/client";

import { productsListProduct } from "components/templates/ProductsList/queries.graphql";
import { menuItem } from "components/organisms/ProductSideNavbar/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

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
    $categoryIds: [ID!]
    $collectionIds: [ID!]
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
        categories: $categoryIds
        collections: $collectionIds
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      ...ProductList
    }
  }
`;

export const productsPageQuery = gql`
  ${brandingFragment}
  ${productList}
  ${menuItem}
  query ProductsPage(
    $categoryIds: [ID!]
    $collectionIds: [ID!]
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    branding {
      ...Branding
    }
    productList: products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: $categoryIds
        collections: $collectionIds
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      ...ProductList
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
