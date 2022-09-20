import React from "react";
import { Box } from "@mui/material";

import { AccountMenuSidebar } from "src/components/organisms/AccountMenuSidebar";
import { AccountMenuMobile } from "src/components/organisms/AccountMenuMobile";

import classes from "./scss/index.module.scss";

type AuthenticatedProps = {
  children: React.ReactNode;
  anonymous: boolean;
};

const Authenticated = ({ children, anonymous }: AuthenticatedProps) => {
  if (anonymous) {
    return <div className="container">{children}</div>;
  }

  return (
    <div className="container">
      <div className={classes.account}>
        <Box
          className={classes.account__menu}
          sx={{
            display: {
              xs: "none",
              sm: "initial",
            },
          }}
        >
          <AccountMenuSidebar />
        </Box>
        <Box
          sx={{
            display: {
              xs: "initial",
              sm: "none",
            },
          }}
        >
          <AccountMenuMobile />{" "}
        </Box>
        <Box className={classes.account__content}>{children}</Box>
      </div>
    </div>
  );
};

export { Authenticated };
