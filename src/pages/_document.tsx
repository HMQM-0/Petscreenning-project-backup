import React from "react";
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export const ROKT_IFRAME = `<iframe
aria-hidden="true"
src="https://apps.rokt.com/wsdk/preload/index.html"
sandbox="allow-scripts allow-same-origin"
style="border: 0px; width: 100%; display: none;"
></iframe>`;

const RoktIframeScript = () => <noscript dangerouslySetInnerHTML={{ __html: ROKT_IFRAME }} />;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            id="rokt-launcher"
            crossOrigin="anonymous"
            type="text/javascript"
            src="https://apps.rokt.com/wsdk/integrations/launcher.js"
          />
        </Head>
        <link
          rel="manifest"
          href="/manifest.json"
          id="manifest"
        />
        <body>
          <RoktIframeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
