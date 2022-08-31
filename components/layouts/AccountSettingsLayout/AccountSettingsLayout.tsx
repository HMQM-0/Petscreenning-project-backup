import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Media from "react-media";
import { useRouter } from "next/router";

import { smallScreen } from "styles/constants";
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
        <Media query={{ minWidth: smallScreen }}>
          <Box className={classes.account__menu}>
            <AccountMenuSidebar />
          </Box>
        </Media>
        <Media query={{ maxWidth: smallScreen - 1 }}>
          <Box>
            <AccountMenuMobile />
          </Box>
        </Media>
        <Box className={classes.account__content}>{children}</Box>
      </div>
    </div>
  );
};

export { AccountSettingsLayout };
