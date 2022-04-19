import Head from "next/head";
import React from "react";

export const Social: React.FC = () => {
  return (
    <Head>
      <title>Nautical</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="PWA App" />
      <meta name="twitter:description" content="Best PWA App in the world" />
      <meta
        name="twitter:image"
        content="https://lunaoceans.app/icons/android-chrome-192x192.png"
      />
      <meta name="twitter:creator" content="@lauchness1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PWA App" />
      <meta property="og:description" content="Best PWA App in the world" />
      <meta property="og:site_name" content="PWA App" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://lunaoceans.app/icons/apple-touch-icon.png"
      />
    </Head>
  );
};
