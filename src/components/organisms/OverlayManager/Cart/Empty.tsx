import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

import Button from "src/components/atoms/Button";

import classes from "./scss/index.module.scss";

interface EmptyProps {
  overlayHide: VoidFunction;
}

const Empty = ({ overlayHide }: EmptyProps) => (
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
        primary
        outlined
        onClick={overlayHide}
      >
        <FormattedMessage defaultMessage="Continue Shopping" />
      </Button>
    </Box>
  </Box>
);

export default Empty;