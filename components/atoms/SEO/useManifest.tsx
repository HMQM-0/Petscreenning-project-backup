import { useEffect } from "react";

import { BrandingType } from "graphql/generated";

export default function useManifest(branding: BrandingType) {
  useEffect(() => {
    if (branding) {
      const manifestElement = document.getElementById("manifest");
      const manifestString = JSON.stringify({
        name: "PWA",
        short_name: "PWA",
        description: "A description of Nautical Commerce",
        icons: [
          {
            src: branding.icon?.url,
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: branding.icon?.url,
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#f2f2f2",
        background_color: "#121212",
        start_url: "http://localhost:3000",
        display: "standalone",
        orientation: "portrait",
      });
      manifestElement?.setAttribute(
        "href",
        "data:application/json;charset=utf-8," +
          encodeURIComponent(manifestString)
      );
    }
  }, [branding]);
}
