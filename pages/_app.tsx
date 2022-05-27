import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { positions, Provider as AlertProvider } from "react-alert";
import { NextQueryParamProvider } from "next-query-params";
import dynamic from "next/dynamic";
import { builder } from "@builder.io/react";

import builderConfig from "config/builder";
import { defaultTheme, GlobalStyle } from "@styles";
import { ShopProvider, OverlayProvider } from "@providers";

builderConfig.apiKey && builder.init(builderConfig.apiKey); // TODO: BE no longer stores/manages builder key
// TODO: Try to reduce bundle size by only loading required custom builder on each page
import "components/templates/Builder/mui";
import "components/templates/Builder/nautical";
import "deprecated/globalStyles/scss/index.scss";

const NotificationTemplate = dynamic(
  () => import("components/atoms/NotificationTemplate/NotificationTemplate")
);
const NauticalProvider = dynamic(
  () => import("components/providers/Nautical/NauticalProvider")
);
const WishlistProvider = dynamic(
  () => import("components/providers/Wishlist/WishlistProvider")
);
const LocaleProvider = dynamic(
  () => import("components/providers/Locale/Locale"),
  { ssr: false }
);

const notificationOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { __APOLLO__ } = pageProps;
  return (
    <ThemeProvider theme={defaultTheme}>
      <div id="root">
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <LocaleProvider>
            <NextQueryParamProvider>
              <NauticalProvider initialState={__APOLLO__}>
                <WishlistProvider>
                  <ShopProvider>
                    <OverlayProvider>
                      <GlobalStyle />
                      <Component {...pageProps} />
                    </OverlayProvider>
                  </ShopProvider>
                </WishlistProvider>
              </NauticalProvider>
            </NextQueryParamProvider>
          </LocaleProvider>
        </AlertProvider>
      </div>
      {/*
          TODO: Overlay component uses this div as it's root.
             Overlay might need to be refactored to get rid of this
       */}
      <div id="modal-root" />
    </ThemeProvider>
  );
}

export default MyApp;
