import React from "react";
import { Skeleton, useScrollTrigger } from "@mui/material";
import Image from "next/image";

import TopNav from "deprecated/components/MainMenu/TopNav";
import PromoBanner from "deprecated/_nautical/components/PromoBanner/PromoBanner";

type HeaderProps = {
  logo: {
    src: string;
    height?: number;
    width?: number;
  };
};

const Header = ({ logo }: HeaderProps) => {
  const trigger = useScrollTrigger();
  const stickyStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
  };
  const emptyStyle: React.CSSProperties = {};

  const _logo = logo ? (
    <Image {...logo} objectFit="contain" alt="Logo" />
  ) : (
    <Skeleton />
  );
  return (
    <>
      <header style={trigger ? stickyStyle : emptyStyle}>
        <PromoBanner content="FREE SHIPPING over $50" />
        <TopNav logo={_logo} />
      </header>
      {trigger && <div style={{ marginBottom: "104px" }} />}
    </>
  );
};

export { Header };
