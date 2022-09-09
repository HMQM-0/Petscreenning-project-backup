import { Box, Typography } from "@mui/material";
import React from "react";

const Unathenticated = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h3">Not Authenticated</Typography>
      <Typography variant="body1">You are being redirected to the home page</Typography>
    </Box>
  );
};

export { Unathenticated };
