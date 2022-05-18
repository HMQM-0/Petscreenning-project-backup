import React from "react";
import { Box } from "@mui/material";

import classes from "./scss/index.module.scss";
import Media from "react-media";
import { smallScreen } from "@styles/constants";
import { AccountMenuSidebar } from "../../organisms/AccountMenuSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const AccountSettingsLayout = ({ children }: LayoutProps) => {
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
            {/*<AccountMenuMobile links={links} active={location.pathname} />*/}
          </Box>
        </Media>
        <Box className={classes.account__content}>{children}</Box>
      </div>
    </div>
  );
};

export { AccountSettingsLayout };
