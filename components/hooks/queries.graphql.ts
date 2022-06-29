import { gql } from "@apollo/client";

export const micrositesQuery = gql`
  query Microsites($first: Int, $search: String) {
    microsites(
      first: $first
      filter: { published: PUBLISHED, search: $search }
    ) {
      edges {
        node {
          seoTitle
          seoDescription
          description
          descriptionJson
          id
          name
          slug
          description
          affiliate {
            id
            firstName
            lastName
            companyName
            email
          }
          seller {
            id
            companyName
            logo {
              url
            }
          }
          logoImage {
            url
          }
          bannerImage {
            url
          }
        }
      }
    }
  }
`;
