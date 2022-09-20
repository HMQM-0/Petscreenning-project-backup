import { gql } from "@apollo/client";

import { menuTree } from "src/components/organisms/ProductSideNavbar/queries.graphql";
import { productsPageAttribute } from "src/components/templates/ProductsList/queries.graphql";
import { brandingFragment } from "src/queries/branding.graphql";

export const basicCollection = gql`
  fragment BasicCollection on Collection {
    id
    slug
    name
    seoDescription
    seoTitle
    description
    descriptionJson
    backgroundImage {
      url
    }
  }
`;

export const collectionPageQuery = gql`
  ${basicCollection}
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query CollectionPage($id: ID!) {
    branding {
      ...Branding
    }
    collection(id: $id) {
      ...BasicCollection
    }
    attributes(filter: { inCollection: $id, filterableInStorefront: true }, first: 100) {
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
