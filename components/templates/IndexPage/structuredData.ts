// Remove url-join package - use URL instead
import urljoin from "url-join";

export const structuredData = (description: string, name: string, url: string) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: description,
    name: name,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: urljoin(url, "search", "?q={q}"),
    },
    url,
  });
};
