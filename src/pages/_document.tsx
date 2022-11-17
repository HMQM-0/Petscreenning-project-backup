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

export const PAYMENTS_MARKETPLACE_SCRIPT = `(function(r,o,k,t,n,e,w,a,){r._ROKT=n;r[n]=r[n]||{id:t,h:w,lc:[],it:new
  Date(),onLoaded:function(c)
  {r[n].lc.push(c)}};a=o.createElement('script');a.type='text/javascript';a.async=!0;a.src=k;if(e)
  {a.integrity=e;a.crossOrigin='anonymous'}=o.getElementsByTagName('script')
  [0];.parentNode.insertBefore(a,_)})
  (window,document,'https://apps.rokt.com/wsdk/integrations/snippet.js','3071804547766951791',
  'rokt');`;

const PaymentsMarketplaceScript = () => (
  <script
    dangerouslySetInnerHTML={{ __html: PAYMENTS_MARKETPLACE_SCRIPT }}
    id="pm-script"
  />
);

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
          <PaymentsMarketplaceScript />
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
