import React from "react";
import { makeStyles, createStyles } from "@mui/styles";

import { ProductRatingsAndReviewsFragment } from "components/templates/ProductPage/queries.graphql.generated";

// STYLING
const useStyles = makeStyles(() =>
  createStyles({
    outerRatingContainer: {
      height: "30px",
    },
    innerRatingContainer: {
      display: "flex",
    },
    barsContainer: {
      position: "relative",
    },
    backgroundBar: {
      height: "20px",
      width: "147px",
      backgroundColor: "#F0F0F0",
      border: "1px solid #B2B2B2",
      borderRadius: "1px",
      margin: "0px 10px 10px 10px",
      boxShadow: "2px 2px 3px #00000026",
    },
    ratingBar: {
      height: "20px",
      backgroundColor: "#0082a0",
      border: "1px solid #006C85",
      borderRadius: "1px",
      margin: "0px 10px 10px 10px",
      position: "absolute",
      zIndex: 1,
      transform: "translateY(-150%)",
    },
  })
);

// HELPER FUNCTIONS
const formatFloatToPercentage = (float: number) => {
  return `${(float * 100).toFixed()}%`;
};

const getStarReviews = (
  reviews: ProductRatingsAndReviewsFragment["reviews"],
  totalReviews: number | null | undefined,
  star: number) => {
  if (!reviews || !totalReviews) {
    return 0;
  }
  // TODO: BE issue. reviews can not contain null (`[null]`)
  return (reviews.filter((review) => review!.score === star).length / totalReviews);
};

type ReviewBarsProps = {
  reviewsData: ProductRatingsAndReviewsFragment;
};

export const ReviewBars = ({ reviewsData }: ReviewBarsProps) => {
  const classes = useStyles();

  // TODO: Is there a better/prettier way?
  const stars = [5, 4, 3, 2, 1];

  const renderStar = (star: number) => {
    const starReviews = getStarReviews(reviewsData.reviews, reviewsData.bottomline?.totalReview, star);
    return (
      <>
        <div>{star} Stars</div>
        <div className={classes.barsContainer}>
          <div className={classes.backgroundBar} />
          {starReviews ? (
            <div
              className={classes.ratingBar}
              style={{ width: `${starReviews * 147}px` }}
            />
          ) : (
            <div />
          )}
        </div>
        <div>{formatFloatToPercentage(starReviews)}</div>
      </>
    );
  };

  return (
    <>
      {stars.map((star) => (
        <div key={star} className={classes.outerRatingContainer}>
          <div className={classes.innerRatingContainer}>
            {renderStar(star)}
          </div>
        </div>
      ))}
    </>
  );
};
