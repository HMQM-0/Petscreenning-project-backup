import { gql } from "@apollo/client";

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
  ${brandingFragment}
  query CategoryPage(
    $id: ID!
  ) {
    branding {
      ...Branding
    }
    category(id: $id) {
      ...BasicCategory
    }
  }
`;

// export const builderCategoryQuery = gql`
//   ${menuItem}
//   query BuilderCategoryData($id: ID!) {
//     category(id: $id) {
//       seoDescription
//       seoTitle
//       description
//       descriptionJson
//       id
//       name
//       backgroundImage {
//         url
//       }
//       ancestorList: ancestors(last: 5) {
//         categories: edges {
//           category: node {
//             id
//             name
//           }
//         }
//       }
//     }
//     attributeList: attributes(
//       filter: { inCategory: $id, filterableInStorefront: true }
//       first: 100
//     ) {
//       attributes: edges {
//         attribute: node {
//           id
//           name
//           slug
//           values {
//             id
//             name
//             slug
//           }
//         }
//       }
//     }
//     menu(name: "sidenav") {
//       id
//       name
//       items {
//         ...MenuItem
//         children {
//           ...MenuItem
//           children {
//             ...MenuItem
//           }
//         }
//       }
//     }
//   }
// `;
