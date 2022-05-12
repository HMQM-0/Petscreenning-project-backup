import { gql } from "@apollo/client";

export const getProductRatingsAndReviews = gql`
  query GetProductRatingsAndReviews($productId: String!) {
    productRatingsAndReviews(productId: $productId) {
      bottomline {
        averageScore
        totalReview
      }
      reviews {
        content
        createdAt
        score
        title
        user {
          displayName
        }
      }
    }
  }
`;
