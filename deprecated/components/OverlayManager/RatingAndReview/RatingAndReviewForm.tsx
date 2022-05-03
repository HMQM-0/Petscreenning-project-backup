import "./scss/index.module.scss";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useIntl, IntlShape } from "react-intl";
import Rating from "@mui/material/Rating";

import { commonMessages } from "deprecated/intl";
import { maybe } from "core/utils";
import TextArea from "deprecated/components/TextArea";

import { SubmitRatingAndReview } from "./gqlTypes/SubmitRatingAndReview";
import { TypedRatingAndReviewMutation } from "./mutations";

import { Button, Form, TextField } from "../..";
import { OverlayContext } from "../../../components/Overlay/context";
import { FormError } from "../../Form/types";


const showSuccessNotification = (
  data: SubmitRatingAndReview,
  hide: () => void,
  // TODO: where to get type of function returned from useAlert?
  alert: any,
  intl: IntlShape
) => {
  const successful = maybe(() => !data.submitRatingAndReview?.errors.length);
  if (successful) {
    hide();
    alert.show(
      {
        title: intl.formatMessage({
          defaultMessage: "Your Rating and Review has been submitted.",
        }),
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const RatingAndReviewForm: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const alert = useAlert();
  const intl = useIntl();
  const { hide } = React.useContext(OverlayContext);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [noRatingSelected, setNoRatingSelected] = useState<boolean | null>(null);

  return (
    <TypedRatingAndReviewMutation
      onCompleted={(data) => showSuccessNotification(data, hide, alert, intl)}
    >
      {(submitRatingAndReview, { loading, data }) => {
        return (
          <div style={{ padding: "25px" }}>
            <Form
              errors={maybe(() => data?.submitRatingAndReview?.errors, []) as FormError[]}
              onSubmit={(event, data) => {
                // TODO: What should be passed to <Form<...> to fix this?
                const { headline, publicName, emailAddress } = data as any;
                event.preventDefault();
                if (!rating) {
                  setNoRatingSelected(true);
                  return;
                }
                setNoRatingSelected(false);
                return submitRatingAndReview({
                  variables: {
                    headline,
                    publicName,
                    emailAddress,
                    rating,
                    review,
                    productId,
                  },
                });
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Overall rating
                </div>
                <div style={{ display: "flex", alignContent: "center" }}>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e, value) => setRating(value)}
                  />
                  {noRatingSelected && (
                    <span
                      style={{
                        margin: "3px 0 0 5px",
                        color: "#fe6e76",
                        fontSize: "0.75rem",
                      }}
                    >
                      Please select rating.
                    </span>
                  )}
                </div>
              </div>
              <TextField
                name="publicName"
                label={"Choose your public name"}
                helpText="  This is how you'll appear to other customers."
                type="text"
                required
              />
              <TextField
                name="emailAddress"
                label={"Enter your email address"}
                helpText="  This will not be shared publicly."
                type="text"
                required
              />
              <TextField
                name="headline"
                label={"Add a headline"}
                helpText="  What's most important to know?"
                type="text"
                required
              />
              <TextArea
                name="review"
                label={"Add a written review"}
                helpText="  What did you like or dislike? What did you use this product for?"
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="login__content__button">
                <Button
                  testingContext="submitRegisterFormButton"
                  type="submit"
                  {...(loading && { disabled: true })}
                >
                  {loading
                    ? intl.formatMessage(commonMessages.loading)
                    : intl.formatMessage({ defaultMessage: "Submit" })}
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </TypedRatingAndReviewMutation>
  );
};

export default RatingAndReviewForm;
