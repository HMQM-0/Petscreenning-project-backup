import { gql } from "@apollo/client";

export const submitRatingAndReviewMutation = gql`
  mutation SubmitRatingAndReview(
    $headline: String!
    $review: String!
    $publicName: String!
    $rating: String!
    $productId: String!
    $emailAddress: String!
  ) {
    submitRatingAndReview(
      headline: $headline
      review: $review
      publicName: $publicName
      rating: $rating
      productId: $productId
      emailAddress: $emailAddress
    ) {
      errors {
        field
        message
      }
      submissionSuccessful
    }
  }
`;
