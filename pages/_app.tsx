import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { positions, Provider as AlertProvider } from "react-alert";
import { NextQueryParamProvider } from "next-query-params";
import dynamic from "next/dynamic";

import { defaultTheme, GlobalStyle } from "@styles";

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
                  <GlobalStyle />
                  <Component {...pageProps} />
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
