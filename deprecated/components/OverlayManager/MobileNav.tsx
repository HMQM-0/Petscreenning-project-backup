import * as React from "react";
import { Box } from "@mui/material";

import { isMicrosite } from "core/utils";
import { Maybe, MenuItem } from "@generated";

import { Overlay, OverlayContextInterface } from "../Overlay";
import { MobileNavList } from "../MobileNav";

const MobileNav = ({ overlay }: { overlay: OverlayContextInterface }) => {
  const items: Maybe<MenuItem>[] = overlay.context.data;

  return (
    !Boolean(isMicrosite()) && (
      <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
        <Box className="side-nav" onClick={(evt) => evt.stopPropagation()}>
          <MobileNavList items={items} hideOverlay={overlay.hide} />
        </Box>
      </Overlay>
    )
  );
};

export default MobileNav;
