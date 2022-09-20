import React from "react";
import Image from "next/image";

import { Footer } from "src/components/molecules/Footer";
import Button from "src/components/atoms/Button";
import { MaterialUIProvider } from "@providers";
import { DocumentHead, DocumentHeadProps, ThemeFont } from "src/components/atoms";
import BottomNav from "src/components/atoms/BottomNav";
import CookieBar from "src/components/atoms/CookieBar";
import { useAcceptCookies } from "src/components/hooks";
import OverlayManager from "src/components/organisms/OverlayManager/OverlayManager";
import { Logo } from "src/components/atoms/Logo";

import { Header } from "./Header";

type LayoutProps = {
  children: React.ReactNode;
  documentHead: DocumentHeadProps;
};

const Layout = ({ children, documentHead }: LayoutProps) => {
  const { branding } = documentHead;

  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  const icon = branding?.icon ? (
    <Image
      src={branding.icon.url}
      height="64"
      width="64"
      alt="Icon"
    />
  ) : null;
  const headerLogo = (
    <Logo
      logo={branding.logo}
      logoHeight={branding.logoHeight ?? 50}
      logoWidth={branding.logoWidth ?? 100}
    />
  );

  return (
    <MaterialUIProvider branding={branding}>
      <DocumentHead {...documentHead} />
      <ThemeFont />
      <Header logo={headerLogo} />
      {children}
      <BottomNav />
      <Footer
        footerText={branding.footerText}
        icon={icon}
      />
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
