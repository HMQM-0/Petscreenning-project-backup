import { gql } from "@apollo/client";

import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
import { productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

export const searchPageQuery = gql`
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query SearchPage {
    branding {
      ...Branding
    }
    attributes(
      filter: { filterableInStorefront: true }
      first: 100
    ) {
      attributes: edges {
        attribute: node {
          ...ProductsPageAttribute
        }
      }
    }
    menu(name: "sidenav") {
      ...MenuTree
    }
  }
`;
