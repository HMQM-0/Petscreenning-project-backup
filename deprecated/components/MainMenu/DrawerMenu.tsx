import { Drawer, Box } from "@mui/material";
import * as React from "react";

import { INavItem, MobileNavList } from "../MobileNav";
interface IDrawerMenuProps {
  anchor: "left" | "top" | "right" | "bottom";
  items: INavItem[] | null;
  open: boolean;
  logo?: React.ReactNode;
  close(): void;
}

const DrawerMenu: React.FunctionComponent<IDrawerMenuProps> = (props) => {
  const { anchor, items, open, close, logo } = props;
  return (
    <Drawer
      anchor={anchor}
      open={open}
      ModalProps={{ onBackdropClick: close }}
      style={{ maxWidth: 400 }}
    >
      <Box className="side-nav" onClick={(evt) => evt.stopPropagation()}>
        <MobileNavList logo={logo} items={items} hideOverlay={close} />
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
