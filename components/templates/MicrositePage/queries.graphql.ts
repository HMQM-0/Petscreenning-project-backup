import { gql } from "@apollo/client";

import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
import { productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

export const basicMicrosite = gql`
  fragment BasicMicrosite on Microsite {
    id
    slug
    name
    description
    descriptionJson
    seoDescription
    seoTitle
    bannerImage {
      url
    }
    logoImage {
      url
    }
  }
`;

export const micrositePageQuery = gql`
  ${basicMicrosite}
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query MicrositePage($id: ID!) {
    branding {
      ...Branding
    }
    microsite(id: $id) {
      ...BasicMicrosite
    }
    attributes(filter: { inMicrosite: $id, filterableInStorefront: true }, first: 100) {
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
