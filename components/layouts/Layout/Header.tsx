import React from "react";
import { useScrollTrigger } from "@mui/material";

import { PromoBanner } from "components/molecules/PromoBanner";
import TopNav from "components/layouts/MainMenu/TopNav";
import { IS_SSR } from "utils";

type HeaderProps = {
  logo: React.ReactNode;
};

const Header = ({ logo }: HeaderProps) => {
  const trigger = useScrollTrigger({
    // The header should always be visible on the mobile device
    disableHysteresis: IS_SSR ? false : window.innerWidth <= 768,
  });
  const stickyStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
  };
  const emptyStyle: React.CSSProperties = {};

  return (
    <>
      <header style={trigger ? stickyStyle : emptyStyle}>
        <PromoBanner />
        <TopNav logo={logo} />
      </header>
      {trigger && <div style={{ marginBottom: "72px" }} />}
    </>
  );
};

export { Header };
