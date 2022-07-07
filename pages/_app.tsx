import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { positions, Provider as AlertProvider } from "react-alert";
import { NextQueryParamProvider } from "next-query-params";
import dynamic from "next/dynamic";
import { builder } from "@builder.io/react";
import Router from "next/router";
import { GlobalStyles } from "@mui/material";
import nProgress from "nprogress";

import builderConfig from "config/builder";
import { defaultTheme, GlobalStyle } from "@styles";
import { ShopProvider, OverlayProvider } from "@providers";
builderConfig.apiKey && builder.init(builderConfig.apiKey);
import "components/templates/Builder/mui";
import "components/templates/Builder/nautical";
import "deprecated/globalStyles/scss/index.scss";
import { nprogress } from "styles/nprogress";

const NotificationTemplate = dynamic(() => import("components/atoms/NotificationTemplate/NotificationTemplate"));
const NauticalProvider = dynamic(() => import("components/providers/Nautical/NauticalProvider"));
const LocaleProvider = dynamic(() => import("components/providers/Locale/Locale"), { ssr: false });

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const notificationOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { __APOLLO__ } = pageProps;
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={(theme) => nprogress(theme.palette.secondary.main)} />
      <div id="root">
        <AlertProvider template={NotificationTemplate as any} {...notificationOptions}>
          <LocaleProvider>
            <NextQueryParamProvider>
              <NauticalProvider initialState={__APOLLO__}>
                <ShopProvider>
                  <OverlayProvider>
                    <GlobalStyle />
                    <Component {...pageProps} />
                  </OverlayProvider>
                </ShopProvider>
              </NauticalProvider>
            </NextQueryParamProvider>
          </LocaleProvider>
        </AlertProvider>
      </div>
      <div id="modal-root" />
    </ThemeProvider>
  );
}

export default MyApp;
