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

export const productsListProduct = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantPricingFragment}
  fragment ProductsListProduct on Product {
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
