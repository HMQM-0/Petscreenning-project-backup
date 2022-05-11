import urljoin from "url-join";
// TODO: Remove url-join package - use URL instead

export const structuredData = (description: string, name: string) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: description,
    name: name,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: urljoin(location.href, "search", "?q={q}"),
    },
    url: location.href,
  });
};
