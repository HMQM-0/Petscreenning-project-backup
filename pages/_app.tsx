import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "@styles";
import { positions, Provider as AlertProvider } from "react-alert";
import { NotificationTemplate } from "@components/atoms";

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
          <GlobalStyle />
          <Component {...pageProps} />
        </AlertProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
