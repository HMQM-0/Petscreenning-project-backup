import gql from "graphql-tag";

import {
  basicProductFragment,
  productPricingFragment
} from "components/templates/ProductPage/queries.graphql";

import { FeaturedProducts } from "./gqlTypes/FeaturedProducts";

import { TypedQuery } from "../../core/queries";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts {
    shop {
      loginForPrice
      loginForProducts
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
              defaultVariant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<FeaturedProducts, {}>(
  featuredProducts
);
