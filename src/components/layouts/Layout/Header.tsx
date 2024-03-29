import React, { useEffect, useState } from "react";
import { useScrollTrigger } from "@mui/material";

import { PromoBanner } from "src/components/molecules/PromoBanner";
import TopNav from "src/components/layouts/MainMenu/TopNav";

type HeaderProps = {
  logo: React.ReactNode;
};

const Header = ({ logo }: HeaderProps) => {
  const [disableHysteresis, setDisableHysteresis] = useState(true);

  useEffect(() => {
    setDisableHysteresis(window.innerWidth <= 768);
  }, []);

  const trigger = useScrollTrigger({
    // The header should always be visible on the mobile device
    disableHysteresis,
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
