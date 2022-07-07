import { gql } from "@apollo/client";

import { productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

export const vendorsPageQuery = gql`
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query VendorsPage {
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
