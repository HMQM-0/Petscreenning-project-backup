import { Box, Alert } from "@mui/material";
import * as React from "react";

import { IProps } from "./types";

const NotificationTemplate: React.FC<IProps> = ({ message, options, close }) => {
  return (
    <>
      <Alert
        style={{
          width: 350,
          minHeight: 64,
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        severity={options.type}
        onClick={close}
      >
        <Box style={{ fontWeight: 700 }}>{message.title}</Box>
        <Box>{message.actionText}</Box>
        <Box>{message.content}</Box>
      </Alert>
    </>
  );
};

export default NotificationTemplate;
