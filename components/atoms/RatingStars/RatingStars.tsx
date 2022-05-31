import * as React from "react";
import Rating from "@mui/material/Rating";

import "./scss/index.module.scss";
import { useGetProductRatingsAndReviewsQuery } from "./queries.graphql.generated";

interface IRatingStarsProps {
  productId: string;
  scrollToRatingsAndReviewsSection: () => void;
}

const RatingStars: React.FC<IRatingStarsProps> = (props) => {
  const { productId, scrollToRatingsAndReviewsSection } = props;
  const { data } = useGetProductRatingsAndReviewsQuery({
    variables: {
      productId,
    },
    fetchPolicy: "network-only",
  });

  const reviewsSummary = data?.productRatingsAndReviews?.bottomline;
  const stars = reviewsSummary?.averageScore ?? null;
  const totalReviews = reviewsSummary?.totalReview ?? null;

  return (
    <div
      className="rating-stars-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "100px",
      }}
      onClick={scrollToRatingsAndReviewsSection}
    >
      <Rating name="read-only" value={stars} readOnly />
      <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
        {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
      </span>
    </div>
  );
};

export default RatingStars;
