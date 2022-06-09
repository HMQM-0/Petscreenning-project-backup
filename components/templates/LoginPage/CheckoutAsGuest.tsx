import { Button, Box } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

import {
  OverlayTheme,
  OverlayType,
  useOverlayContext,
} from "components/providers/Overlay";

import classes from "./scss/index.module.scss";

const CheckoutAsGuest = () => {
  const { show } = useOverlayContext();
  return (
    <Box className={classes["checkout-login__guest"]}>
      <h3 className={classes["checkout__header"]}>
        <FormattedMessage defaultMessage="Continue as a guest" />
      </h3>
      <p>
        <FormattedMessage defaultMessage="If you don’t wish to register an account, don’t worry. You can checkout as a guest. We care about you just as much as any registered user." />
      </p>
      <Link href={"/checkout?guest=1"}>
        <a>
          <Button variant="contained" fullWidth color="secondary">
            <FormattedMessage defaultMessage="Continue as a guest" />
          </Button>
        </a>
      </Link>

      <p>
        <FormattedMessage defaultMessage="or you can" />{" "}
        <Box
          component="span"
          data-test="showRegisterOverlay"
          className="u-link"
          onClick={() => show(OverlayType.register, OverlayTheme.right)}
        >
          <FormattedMessage defaultMessage="create an account" />
        </Box>
      </p>
    </Box>
  );
};

export default CheckoutAsGuest;
