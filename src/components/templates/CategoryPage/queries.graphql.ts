import { gql } from "@apollo/client";

import { menuTree } from "src/components/organisms/ProductSideNavbar/queries.graphql";
import { productsPageAttribute } from "src/components/templates/ProductsList/queries.graphql";
import { brandingFragment } from "src/queries/branding.graphql";

export const basicCategory = gql`
  fragment BasicCategory on Category {
    seoDescription
    seoTitle
    description
    descriptionJson
    id
    name
    level
    children(first: 30) {
      edges {
        node {
          id
          slug
          name
          level
          backgroundImage {
            url
          }
        }
      }
    }
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
