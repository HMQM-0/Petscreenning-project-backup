import { Drawer, Box } from "@mui/material";
import * as React from "react";

import { useMainMenuQuery } from "deprecated/components/MainMenu/queries.graphql.generated";
import { MobileNavList } from "deprecated/components/MobileNav";

interface IDrawerMenuProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  logo?: React.ReactNode;

  close(): void;
}

const DrawerMenu: React.FunctionComponent<IDrawerMenuProps> = (props) => {
  const { anchor, open, close, logo } = props;
  const { data } = useMainMenuQuery();
  const menuItems = data?.shop.navigation?.main?.items ?? [];

  return (
    <Drawer
      anchor={anchor}
      open={open}
      ModalProps={{ onBackdropClick: close }}
      style={{ maxWidth: 400 }}
    >
      <Box className="side-nav" onClick={(evt) => evt.stopPropagation()}>
        {/* @ts-ignore */}
        <MobileNavList items={menuItems} logo={logo} hideOverlay={close} />
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
