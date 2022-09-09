import React, { useMemo } from "react";

import { META_DEFAULTS } from "core/config";

import useManifest from "./useManifest";
import MemoizedDocumentHead, { DocumentHeadProps } from "./MemoizedDocumentHead";

export const DocumentHead = ({ branding, ...seo }: DocumentHeadProps) => {
  useManifest(branding);
  const mergedSeo = useMemo(
    () => ({
      ...META_DEFAULTS,
      ...seo,
    }),
    [seo],
  );

  return (
    <MemoizedDocumentHead
      branding={branding}
      {...mergedSeo}
    />
  );
};
