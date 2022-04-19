import { useEffect } from "react";

export default function useManifest(data: unknown) {
  useEffect(() => {
    if (data) {
      const manifestElement = document.getElementById("manifest");
      const manifestString = JSON.stringify({
        name: "Nautical Commerce",
        short_name: "Nautical",
        description: "A description of Nautical Commerce",
        icons: [
          {
            src: "https://lunaoceans.app/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "https://lunaoceans.app/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#f2f2f2",
        background_color: "#121212",
        start_url: "http://localhost:3000/",
        display: "standalone",
        orientation: "portrait",
      });
      manifestElement?.setAttribute(
        "href",
        "data:application/json;charset=utf-8," +
          encodeURIComponent(manifestString)
      );
    }
  }, [data]);
}
