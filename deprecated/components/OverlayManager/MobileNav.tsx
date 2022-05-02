import * as React from "react";
import { Box } from "@mui/material";

import { isMicrosite } from "core/utils";
import { Maybe, MenuItem } from "@generated";

import { OverlayContextInterface } from "../Overlay/context";
import Overlay from "../Overlay/Overlay";
import MobileNavList from "../MobileNav/NavList";

const MobileNav = ({ overlay }: { overlay: OverlayContextInterface }) => {
  const items: Maybe<MenuItem>[] = overlay.context.data;

  if (isMicrosite()) {
      return null
  }

  return (
    <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
      <Box className="side-nav" onClick={(evt) => evt.stopPropagation()}>
        <MobileNavList items={items} hideOverlay={overlay.hide} />
      </Box>
    </Overlay>
  );
};

export default MobileNav;
