export const structuredData = (description: string, name: string, url: string) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: description,
    name: name,
    url,
  });
};
