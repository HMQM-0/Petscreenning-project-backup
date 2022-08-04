import { BuilderContent } from "@builder.io/sdk";
import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import React from "react";

import { Builder } from "./Builder";
import { ErrorPageQuery } from "./queries.graphql.generated";

type ErrorProps = {
  builderContent: BuilderContent | null;
  data: ErrorPageQuery;
  is404: boolean;
};

const sx: SxProps = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const Error = ({ builderContent, data, is404 }: ErrorProps) => {
  if (builderContent) {
    return <Builder content={builderContent} data={data} />;
  }

  if (is404) {
    return (
      <Box sx={sx}>
        <Typography variant="h1">404</Typography>
        <Typography variant="body1">Page not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      <Typography variant="h1">Oops...</Typography>
      <Typography variant="body1">Something went wrong on our end, we&apos;re working on it!</Typography>
    </Box>
  );
};

export { Error };
