import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

import { BASE_URL } from "src/core/config";
import { generateMicrositeUrl, getMicrositeId, getMicrositeSlug, isMicrosite } from "src/core/utils";
import Button from "src/components/atoms/Button";

import classes from "./scss/index.module.scss";

const NotFound = () => (
  <Box className={classes["not-found-page"]}>
    <h2 className={classes["not-found-page__header"]}>
      <FormattedMessage defaultMessage="404" />
    </h2>
    <Box className={classes["not-found-page__ruler"]} />
    <Box className={classes["not-found-page__message"]}>
      <p>
        <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for!" />{" "}
      </p>
      <p>
        <FormattedMessage defaultMessage="You may have mistyped the address or the page may have moved." />{" "}
      </p>
      <p>
        <FormattedMessage defaultMessage="We’re sorry for the error and hope you’ll have a good day." />
      </p>
    </Box>
    <Box className={classes["not-found-page__button"]}>
      <Link
        href={isMicrosite() ? generateMicrositeUrl(getMicrositeId()!, getMicrositeSlug()) : BASE_URL}
        passHref
      >
        <Button
          testingContext="404pageGotoHomeButton"
          secondary
        >
          <FormattedMessage defaultMessage="Back to home" />
        </Button>
      </Link>
    </Box>
  </Box>
);

export default NotFound;
