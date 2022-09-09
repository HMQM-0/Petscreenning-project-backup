import { gql } from "@apollo/client";

import { menuTree } from "components/organisms/ProductSideNavbar/queries.graphql";
import { productsPageAttribute } from "components/templates/ProductsList/queries.graphql";
import { brandingFragment } from "queries/branding.graphql";

export const basicCategory = gql`
  fragment BasicCategory on Category {
    seoDescription
    seoTitle
    description
    descriptionJson
    id
    name
    backgroundImage {
      url
    }
    ancestorList: ancestors(last: 5) {
      categories: edges {
        category: node {
          id
          name
        }
      }
    }
  }
`;

export const categoryPageQuery = gql`
  ${basicCategory}
  ${productsPageAttribute}
  ${brandingFragment}
  ${menuTree}
  query CategoryPage($id: ID!) {
    branding {
      ...Branding
    }
    category(id: $id) {
      ...BasicCategory
    }
    attributes(filter: { inCategory: $id, filterableInStorefront: true }, first: 100) {
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
