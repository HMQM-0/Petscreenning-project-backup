import { gql } from "@apollo/client";

import { productsPageAttribute } from "src/components/templates/ProductsList/queries.graphql";
import { menuTree } from "src/components/organisms/ProductSideNavbar/queries.graphql";
import { brandingFragment } from "src/queries/branding.graphql";

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
