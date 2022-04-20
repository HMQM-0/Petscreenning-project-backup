import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { positions, Provider as AlertProvider } from "react-alert";

import { defaultTheme, GlobalStyle } from "@styles";
import { NotificationTemplate } from "@components";
import { LocaleProvider } from "@providers";

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
            <GlobalStyle />
            <Component {...pageProps} />
          </LocaleProvider>
        </AlertProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
