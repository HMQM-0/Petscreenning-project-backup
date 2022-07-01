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
