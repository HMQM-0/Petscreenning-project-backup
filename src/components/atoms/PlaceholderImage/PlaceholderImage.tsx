import React from "react";

import { NoPhoto } from "src/components/icons/noPhoto";

import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({ alt = "placeholder", className }: IProps) => {
  return (
    <NoPhoto
      title={alt}
      className={className}
    />
  );
};
