import React from "react";
import { Box } from "@mui/material";

import { useMainMenuQuery } from "@layouts/MainMenu/queries.graphql.generated";
import { isMicrosite } from "core/utils";
import { OverlayContextInterface } from "components/providers/Overlay/context";
import mobileNavClasses from "components/layouts/MainMenu/MobileNav/scss/index.module.scss";
import MobileNavList from "components/layouts/MainMenu/MobileNav/NavList";

import Overlay from "./Overlay/Overlay";

interface MobileNavProps {
  overlay: OverlayContextInterface;
}

const MobileNav = ({ overlay }: MobileNavProps) => {
  const { data, loading } = useMainMenuQuery();
  const items = data?.shop.navigation?.main?.items ?? [];

  if (isMicrosite()) {
    return null;
  }

  return (
    <Overlay
      testingContext="mobileNavigationOverlay"
      context={overlay}
    >
      <Box
        className={mobileNavClasses["side-nav"]}
        onClick={(evt) => evt.stopPropagation()}
      >
        {!loading && (
          <MobileNavList
            items={items}
            hideOverlay={overlay.hide}
            logo={overlay.context.logo}
          />
        )}
      </Box>
    </Overlay>
  );
};

export default MobileNav;
