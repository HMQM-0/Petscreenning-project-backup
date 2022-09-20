import { gql } from "@apollo/client";

import { basicProductFragment, productPricingFragment } from "src/components/templates/ProductPage/queries.graphql";
import { basicVariant } from "src/components/templates/ProductsList/queries.graphql";

export const featuredProducts = gql`
  ${basicVariant}
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
                ...BasicVariant
              }
            }
          }
        }
      }
    }
  }
`;
