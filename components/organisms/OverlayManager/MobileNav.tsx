import * as React from "react";
import { Box } from "@mui/material";

import { isMicrosite } from "core/utils";
import { Maybe, MenuItem } from "@generated";
import { OverlayContextInterface } from "components/providers/Overlay/context";
import mobileNavClasses from "deprecated/components/MobileNav/scss/index.module.scss";
import MobileNavList from "deprecated/components/MobileNav/NavList";

import Overlay from "./Overlay/Overlay";


interface MobileNavProps {
  overlay: OverlayContextInterface;
}

const MobileNav = ({ overlay }: MobileNavProps) => {
  const items: Maybe<MenuItem>[] = overlay.context?.data;

  if (isMicrosite()) {
    return null;
  }

  return (
    <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
      <Box className={mobileNavClasses["side-nav"]} onClick={(evt) => evt.stopPropagation()}>
        <MobileNavList items={items} hideOverlay={overlay.hide} />
      </Box>
    </Overlay>
  );
};

export default MobileNav;
