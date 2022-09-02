import React from "react";

import { PlaceholderImage } from "components/atoms/PlaceholderImage";
import { CachedImage } from "components/molecules/CachedImage";

import { IProps } from "./types";

export const Thumbnail = ({ source, children, height, width, ...props }: IProps) => {
  const { thumbnail, thumbnail2x } = source;

  if (!thumbnail && !thumbnail2x) {
    return <PlaceholderImage className={props.className} alt={props.alt} />;
  }

  if (thumbnail?.url.substring(thumbnail?.url.lastIndexOf("/") + 1).includes("sizeguide-")) {
    return <PlaceholderImage className={props.className} alt={props.alt} />;
  }

  return (
    <CachedImage {...props} url={thumbnail?.url} url2x={thumbnail2x?.url} alt={thumbnail?.alt ?? ""}>
      {children}
    </CachedImage>
  );
};
