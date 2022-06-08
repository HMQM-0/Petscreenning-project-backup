import React from "react";
import Rating from "@mui/material/Rating";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Grid } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import Image from "next/image";

import RatingAndReviewForm from "components/organisms/OverlayManager/RatingAndReview/RatingAndReviewForm";
import { OverlayContext, OverlayTheme, OverlayType } from "components/providers/Overlay/context";
import { useGetProductRatingsAndReviewsQuery } from "components/templates/ProductPage/queries.graphql.generated";

import { decodeEntities, formatDate } from "./utils";
import { RatingsAndReviewProps } from "./types";
import { ReviewBars } from "./ReviewBars";

// STYLING
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: "#0082a0",
      "&:hover": {
        background: "#006880",
      },
      padding: "0.9rem 1rem",
      border: "none",
      transition: "0.3s",
      outline: "none",
      cursor: "pointer",
      color: "#fff",
      width: "100%",
      fontFamily: "inherit",
      borderRadius: "0px",
      display: "inline-block",
      fontSize: "1.125rem",
      textTransform: "uppercase",
      fontWeight: "bolder",
      lineHeight: "1.25rem",
      marginTop: "20px",
    },
    reviewStars: {
      margin: "5px 0",
    },
    topReviewContainer: {
      height: "auto",
      margin: "0 6px 35px 6px",
      padding: 8,
    },
    reviewContainer: {
      height: "auto",
      margin: "35px 6px",
      padding: 8,
    },
    reviewsContainer: {
      alignItems: "center",
      display: "flex",
      float: "left",
      justifyContent: "center",
      width: "75%",
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "16px",
    },
    reviewAvatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "1px solid lightgray",
    },
    reviewSummaryContainer: {
      width: "274px",
      float: "left",
      margin: "0 0 10px 7px",
    },
    reviewUserName: {
      marginLeft: "10px",
      fontWeight: "bold",
    },
    reviewDate: {
      fontStyle: "italic",
      color: "#707070",
    },
    reviewBody: {
      marginTop: "10px",
    },
    reviewTitle: {
      fontWeight: "bold",
      marginLeft: "10px",
    },
    heading: {
      fontSize: "x-large",
      fontWeight: "bolder",
      marginBottom: "20px",
    },
    noReviewsText: {
      fontWeight: "bold",
      color: "#323232",
      fontSize: "xx-large",
      lineHeight: "3rem",
    },
    averageScore: {
      fontSize: "3rem",
      fontWeight: "bolder",
      marginRight: "15px",
    },
    totalReviews: {
      paddingLeft: "5px",
    },
    barsContainer: {
      marginTop: "20px",
      fontWeight: "bold",
    },
  })
);

export const RatingsAndReviews = ({ productId }: RatingsAndReviewProps) => {
  const classes = useStyles();

  const { data } = useGetProductRatingsAndReviewsQuery({
    variables: {
      productId,
    },
    fetchPolicy: "network-only",
  });
  const reviewsData = data?.productRatingsAndReviews;
  const reviewsSummary = reviewsData?.bottomline;
  const averageScore = reviewsSummary?.averageScore || 0;
  const totalReview = reviewsSummary?.totalReview || 0;
  const reviews = reviewsData?.reviews;

  const [hasMore, setHasMore] = React.useState(true);
  const [items, setItems] = React.useState(Array.from({ length: 10 }));

  // NEED TO MODIFY THIS LATER TO DEAL WITH HUGE LISTS OF REVIEWS
  const fetchMoreData = () => {
    if (!reviews?.length || items.length >= reviews.length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
    }, 500);
  };

  return (
    <OverlayContext.Consumer>
      {(overlayContext) => (
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={classes.reviewSummaryContainer}>
            <div className={classes.flexContainer}>
              <div className={classes.averageScore}>
                {averageScore.toFixed(1)}
              </div>
              <div>
                <Rating
                  name="read-only"
                  value={averageScore}
                  readOnly
                />
                <div className={classes.totalReviews}>
                  {totalReview}{" "}
                  {totalReview === 1 ? "Review" : "Reviews"}
                </div>
              </div>
            </div>
            {reviewsData && (
              <div className={classes.barsContainer}>
                <ReviewBars reviewsData={reviewsData} />
              </div>
            )}
            <Button
              aria-label="Leave Review"
              type="button"
              className={classes.button}
              onClick={() => {
                overlayContext.show(OverlayType.modal, OverlayTheme.modal, {
                  content: <RatingAndReviewForm productId={productId} />,
                });
              }}
            >
              <FormattedMessage defaultMessage="Leave Review" />
            </Button>
          </div>
          <div className={classes.reviewsContainer}>
            {!!reviews?.length ? (
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={!!reviews?.length && <h4>Loading...</h4>}
                height={500}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>End of reviews.</b>
                  </p>
                }
              >
                {reviews.map((review, index) => (
                  <div
                    className={
                      index === 0
                        ? classes.topReviewContainer
                        : classes.reviewContainer
                    }
                    key={index}
                  >
                    <div className={classes.flexContainer}>
                      <Image
                        className={classes.reviewAvatar}
                        src={
                          // social image is not present in the API. A BE issue?
                          // @ts-ignore
                          review.user?.socialImage ||
                          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        }
                        alt="user avatar"
                      />
                      <div className={classes.reviewUserName}>
                        {decodeEntities(review.user?.displayName)}
                      </div>
                    </div>
                    <div className={classes.flexContainer}>
                      <div className={classes.reviewStars}>
                        <Rating
                          name="read-only"
                          value={review.score}
                          readOnly
                        />
                      </div>
                      <div className={classes.reviewTitle}>
                        {decodeEntities(review.title)}
                      </div>
                    </div>
                    <div className={classes.reviewDate}>
                      {formatDate(review.createdAt)}
                    </div>
                    <div className={classes.reviewBody}>
                      {decodeEntities(review.content)}
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div>
                <div className={classes.noReviewsText}>
                  Be the first to leave a review!
                </div>
              </div>
            )}
          </div>
        </Grid>
      )}
    </OverlayContext.Consumer>
  );
};
