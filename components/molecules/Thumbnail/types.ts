import React from "react";

import { BasicProductFieldsFragment } from "@generated";

interface ISource {
  thumbnail?: BasicProductFieldsFragment["thumbnail"] | null;
  thumbnail2x?: BasicProductFieldsFragment["thumbnail2x"] | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
}