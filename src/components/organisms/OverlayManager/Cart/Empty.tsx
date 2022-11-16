import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";
import router from "next/router";

import Button from "src/components/atoms/Button";

import classes from "./scss/index.module.scss";

const imageBannerURL =
  "https://cdn.builder.io/api/v1/image/assets%2F77351f890251406eb2d564008d339e95%2Fa8749f1fe697490d8af39b552f0c9d1d";

interface EmptyProps {
  overlayHide: VoidFunction;
}

const Empty = ({ overlayHide }: EmptyProps) => (
  <>
    <Box className={classes.cart__empty}>
      <h4>
        <FormattedMessage defaultMessage="Your bag is empty" />
      </h4>
      <p>
        <FormattedMessage defaultMessage="You haven’t added anything to your bag. We’re sure you’ll find something in our store" />
      </p>
      <Box className={classes.cart__empty__action}>
        <Button
          testingContext="emptyCartHideOverlayButton"
          onClick={overlayHide}
        >
          <FormattedMessage defaultMessage="Continue Shopping" />
        </Button>
      </Box>
    </Box>
    <Box className={classes["cart__banner"]}>
      <Box className={classes["cart__banner__text"]}>
        <p>Paw it Forward!</p>
        <p>buy a t-shirt for $25 and get your FidoAlert t-shirt</p>
        <p className={classes["cart__banner__text__info"]}>
          Since the beginning of FidoTabby, our loyal pet loving base has helped over 90,000 people keep their pets safe
          and FidoTabby Alert free to everyone
        </p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push(`/`)}
          className={classes["cart__banner__shopbtn"]}
        >
          <FormattedMessage defaultMessage="SHOP NOW" />
        </Button>
      </Box>
      <Box className={classes["cart__banner__image"]}>
        <img
          src={imageBannerURL}
          alt="T-shirt banner"
        />
      </Box>
    </Box>
  </>
);

export default Empty;
