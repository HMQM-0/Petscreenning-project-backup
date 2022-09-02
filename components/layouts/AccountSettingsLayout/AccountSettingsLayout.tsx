import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { AccountMenuSidebar } from "components/organisms/AccountMenuSidebar";
import { AccountMenuMobile } from "components/organisms/AccountMenuMobile";
import { useAuth } from "nautical-api";
import { IS_SSR } from "utils";

import classes from "./scss/index.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const AccountSettingsLayout = ({ children }: LayoutProps) => {
  const { signedOut } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (signedOut && !IS_SSR) {
      push("/");
    }
  }, [push, signedOut]);

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

export { AccountSettingsLayout };
