import React from "react";
import { Skeleton, useScrollTrigger } from "@mui/material";

import { MaterialUIProvider } from "@providers";
import { BrandingType } from "@generated";
import { SEO, ThemeFont } from "components/atoms";
import TopNav from "deprecated/components/MainMenu/TopNav";
import BottomNav from "deprecated/components/MainMenu/BottomNav";
import PromoBanner from "deprecated/_nautical/components/PromoBanner/PromoBanner";
import { Footer } from "deprecated/components/Footer";
import CookieBar from "deprecated/_nautical/components/CookieBar";
import { useAcceptCookies } from "deprecated/hooks/useAcceptCookies";
import Button from "deprecated/components/Button";

import OverlayManager from "../../deprecated/components/OverlayManager/OverlayManager";

type LayoutProps = {
  children: React.ReactNode;
  branding: BrandingType;
};

const Layout = ({ children, branding }: LayoutProps) => {
  const trigger = useScrollTrigger();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  const stickyStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
  };
  const emptyStyle: React.CSSProperties = {};

  const fillerStyle: React.CSSProperties = trigger
    ? { marginBottom: "104px" }
    : {};

  const logo = branding?.logo ? (
    <img
      src={branding.logo.url}
      height={branding.logoHeight || 50}
      alt="Logo"
    />
  ) : (
    <Skeleton />
  );

  const icon = branding?.icon ? (
    <img src={branding.icon.url} height="64" width="64" alt="Icon" />
  ) : null;

  return (
    <MaterialUIProvider branding={branding}>
      <SEO branding={branding} />
      <ThemeFont />
      <header style={trigger ? stickyStyle : emptyStyle}>
        <PromoBanner content="FREE SHIPPING over $50" />
        <TopNav logo={logo} />
      </header>
      <div style={fillerStyle} />
      {children}
      <BottomNav />
      <Footer footerText={branding.footerText} icon={icon} />
      <CookieBar
        title=""
        description="This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to cookies being used."
        hide={acceptedCookies}
        action={
          <Button
            color="secondary"
            variant="contained"
            onClick={() => onAcceptCookies()}
          >
            Got it!
          </Button>
        }
      />
      <OverlayManager />
      {/* <Notifications /> */}
    </MaterialUIProvider>
  );
};

export { Layout };
