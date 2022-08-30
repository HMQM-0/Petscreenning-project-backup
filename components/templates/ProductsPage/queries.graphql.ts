import { gql } from "@apollo/client";

import { productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

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
