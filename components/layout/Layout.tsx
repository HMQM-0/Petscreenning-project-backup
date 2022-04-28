import React, { FunctionComponent } from "react";
import { Skeleton, useScrollTrigger } from "@mui/material";

import { MaterialUIProvider, OverlayProvider } from "@providers";
import { BrandingType } from "@generated";
import { SEO, ThemeFont } from "components/atoms";
// import TopNav from "deprecated/components/MainMenu/TopNav";

type LayoutProps = {
  children: React.ReactNode;
  branding: BrandingType;
};

const Layout = ({ children, branding }: LayoutProps) => {
  const trigger = useScrollTrigger();
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

  console.log("branding", branding);
  return (
    <MaterialUIProvider branding={branding}>
      <OverlayProvider>
        <SEO branding={branding} />
        <ThemeFont />
        <header style={trigger ? stickyStyle : emptyStyle}>
          {/* <PromoBanner content="FREE SHIPPING over $50" /> */}
          {/* <TopNav logo={logo} /> */}
        </header>
        <div style={fillerStyle} />
        {children}
        {/* <BottomNav /> */}
        {/* <Footer footerText={footerText} icon={icon} /> */}
        {/* <CookieBar
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
        /> */}
        {/* <OverlayManager />
          <Notifications /> */}
      </OverlayProvider>
    </MaterialUIProvider>
  );
};

export { Layout };
