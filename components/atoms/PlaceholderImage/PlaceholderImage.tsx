import React from "react";

import { NoPhoto } from "components/icons/noPhoto";

import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  return <NoPhoto title={alt} />;
};
