import { gql } from "@apollo/client";

import { productsListProduct, productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
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
    $query: String
    $categoryIds: [ID!]
    $collectionIds: [ID!]
    $attributes: [AttributeInput!]
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
        search: $query
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
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query ProductsPage {
    branding {
      ...Branding
    }
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
