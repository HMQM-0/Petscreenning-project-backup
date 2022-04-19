import Head from "next/head";
import React from "react";
import useManifest from "./useManifest";

export const PWA: React.FC = () => {
  const data = {};

  useManifest(data);

  return (
    <Head>
      <link rel="shortcut icon" href="https://xkcd.com/s/919f27.ico" />

      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="msapplication-config"
        content="https://lunaoceans.app/icons/browserconfig.xml"
      />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link
        rel="apple-touch-icon"
        href="https://lunaoceans.app/icons/touch-icon-iphone.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="https://lunaoceans.app/icons/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://lunaoceans.app/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="https://lunaoceans.app/icons/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://lunaoceans.app/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://lunaoceans.app/icons/favicon-16x16.png"
      />

      <link
        rel="mask-icon"
        href="https://lunaoceans.app/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
    </Head>
  );
};
