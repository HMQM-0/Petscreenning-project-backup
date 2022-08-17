import React from "react";
import { Box, Typography } from "@mui/material";
import Media from "react-media";

import { smallScreen } from "styles/constants";
import { AccountMenuSidebar } from "components/organisms/AccountMenuSidebar";
import { AccountMenuMobile } from "components/organisms/AccountMenuMobile";
import { useAuth } from "nautical-api";

import classes from "./scss/index.module.scss";
import { notAuthenticatedHeader, notAuthenticatedWrapper } from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const AccountSettingsLayout = ({ children }: LayoutProps) => {
  const { user, loaded } = useAuth();

  if (!user && loaded) {
    return (
      <Box sx={notAuthenticatedWrapper}>
        <Typography variant="h1" sx={notAuthenticatedHeader}>
          Not Authenticated
        </Typography>
        <Typography variant="body1">Please login to access your account</Typography>
      </Box>
    );
  }
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
