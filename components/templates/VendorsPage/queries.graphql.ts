import { gql } from "@apollo/client";

import { brandingFragment } from "queries/branding.graphql";

export const micrositesFragment = gql`
  fragment Microsite on Microsite {
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
`;

export const micrositesQuery = gql`
  ${micrositesFragment}
  query Microsites($first: Int, $search: String) {
    microsites(first: $first, filter: { published: PUBLISHED, search: $search }) {
      edges {
        node {
          ...Microsite
        }
      }
    }
  }
`;

export const vendorsPageQuery = gql`
  ${brandingFragment}
  query VendorsPage {
    branding {
      ...Branding
    }
  }
`;
