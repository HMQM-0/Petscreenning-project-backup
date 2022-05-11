import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { positions, Provider as AlertProvider } from "react-alert";
import { NextQueryParamProvider } from "next-query-params";
import dynamic from "next/dynamic";

import "deprecated/globalStyles/scss/index.scss";
import { defaultTheme, GlobalStyle } from "@styles";
import { ShopProvider, OverlayProvider } from "@providers";

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
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <LocaleProvider>
            <NextQueryParamProvider>
              <NauticalProvider>
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
      </ThemeProvider>
    </>
  );
}

export default MyApp;
