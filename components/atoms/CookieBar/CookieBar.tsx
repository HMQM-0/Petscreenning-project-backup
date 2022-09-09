import React from "react";
import { Box } from "@mui/material";

import classes from "./scss/index.module.scss";

interface CookieBarProps {
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const CookieBar = ({ title, description, action, hide }: CookieBarProps) => {
  return (
    <Box className={hide ? classes["cookie-hide"] : classes["cookie-root"]}>
      <span>{title}</span>
      <span>
        {description}
        &nbsp;
        <a
          rel="noreferrer"
          aria-label="learn more about cookies"
          role="button"
          className={classes["cookie-link"]}
          href="http://cookiesandyou.com"
          target="_blank"
        >
          About Cookies
        </a>
      </span>
      {action && <div className={classes["cookie-action"]}>{action}</div>}
    </Box>
  );
};

export default CookieBar;
