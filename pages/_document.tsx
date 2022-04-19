import { Html, Head, Main, NextScript } from "next/document";

// It is likely that you do NOT want to modify this page
// Check here before modifying this document: https://nextjs.org/docs/advanced-features/custom-document

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="manifest" href="/manifest.json" id="manifest" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
