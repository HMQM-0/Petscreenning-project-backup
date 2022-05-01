import React from "react";

import { maybe } from "@utils/misc";
import { PlaceholderImage } from "@components/atoms";

import { IProps } from "./types";

import { CachedImage } from "../CachedImage";

export const Thumbnail = ({
  source,
  children,
  height,
  width,
  ...props
}: IProps) => {
  const { thumbnail, thumbnail2x } = source;

  if (!thumbnail && !thumbnail2x) {
    return <PlaceholderImage />;
  }

  if (
    thumbnail?.url
      .substring(thumbnail?.url.lastIndexOf("/") + 1)
      .includes("sizeguide-")
  ) {
    return <PlaceholderImage />;
  }

  return (
    <CachedImage
      {...props}
      url={maybe(() => thumbnail!.url)}
      url2x={maybe(() => thumbnail2x!.url)}
      alt={maybe(() => (thumbnail!.alt ? thumbnail!.alt : ""), "")}
      height={maybe(() => height)}
      width={maybe(() => width)}
    >
      {children}
    </CachedImage>
  );
};
