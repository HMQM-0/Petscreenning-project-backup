import { Button, Box } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

import { OverlayTheme, OverlayType, useOverlayContext } from "src/components/providers/Overlay";

import classes from "./scss/index.module.scss";

const CheckoutAsGuest = () => {
  const { show } = useOverlayContext();
  return (
    <Box
      sx={{ fontFamily: "Red Hat Display !important" }}
      className={classes["checkout-login__guest"]}
    >
      <h3
        style={{ color: "#001A5D", fontSize: "30px", fontFamily: "Red Hat Display !important;", marginBottom: "1em" }}
        className={classes["checkout__header"]}
      >
        <FormattedMessage defaultMessage="Guest" />
      </h3>
      <p style={{ fontFamily: "Red Hat Display !important", marginBottom: "4.5em" }}>
        <FormattedMessage defaultMessage="If you don’t wish to register an account, don’t worry. You can checkout as a guest. We care about you just as much as any registered user." />
      </p>
      <Link href={"/checkout?guest=1"}>
        <a>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "#0E6EFF",
              backgroundColor: "#fff !important",
              border: "1px solid #0E6EFF",
              marginBottom: "2rem !important",
            }}
          >
            <FormattedMessage defaultMessage="Continue as a guest" />
          </Button>
        </a>
      </Link>

      <p style={{ fontSize: "13px" }}>
        <FormattedMessage defaultMessage="or you can" />{" "}
        <Box
          component="span"
          data-test="showRegisterOverlay"
          onClick={() => show(OverlayType.register, OverlayTheme.right)}
        >
          <span
            style={{
              color: "#0E6EFF",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            <FormattedMessage defaultMessage="Create an account" />
          </span>
        </Box>
      </p>
    </Box>
  );
};

export default CheckoutAsGuest;
