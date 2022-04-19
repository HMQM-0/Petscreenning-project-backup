import Head from "next/head";
import React from "react";

import { BrandingType } from "graphql/generated";

import useManifest from "./useManifest";

type SEOProps = {
  branding: BrandingType;
  title: string;
};

export const SEO: React.FC<SEOProps> = ({ branding, title }) => {
  useManifest(branding);

  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href={branding.favicon?.url} />

      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* <meta name="msapplication-config" content="browserconfig.xml" /> */}
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href={branding.icon?.url} />
      <link rel="apple-touch-icon" sizes="152x152" href={branding.icon?.url} />
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      /> */}

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={branding.icon?.url}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={branding.favicon?.url}
      />

      {/* <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      /> */}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="PWA App" />
      <meta name="twitter:description" content="Best PWA App in the world" />
      <meta name="twitter:image" content={branding.icon?.url} />
      <meta name="twitter:creator" content="@crushon" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PWA App" />
      <meta property="og:description" content="Best PWA App in the world" />
      <meta property="og:site_name" content="PWA App" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:image" content={branding.icon?.url} />
    </Head>
  );
};
