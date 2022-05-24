import { gql } from "@apollo/client";

export const nauticalOrderByUserFragment = gql`
  fragment NauticalOrderByUser on NauticalOrder {
    id
    token
    number
    statusDisplay
    created
    total {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    sellerFulfillments {
      id
      status
      lines {
        id
        quantity
        orderLine {
          id
          productName
          productSku
          variantName
          quantity
          quantityFulfilled
        }
      }
    }
    lines {
      id
      productName
      productSku
      quantity
      variant {
        id
        product {
          name
          id
        }
      }
      thumbnail {
        alt
        url
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }
`;

export const nauticalOrdersByUser = gql`
  ${nauticalOrderByUserFragment}
  query NauticalOrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      nauticalOrders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...NauticalOrderByUser
          }
        }
      }
    }
  }
`;
