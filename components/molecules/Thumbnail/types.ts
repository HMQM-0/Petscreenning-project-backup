import React from "react";

import { ProductsPageProductFragment } from "@generated";

interface ISource {
  thumbnail?: ProductsPageProductFragment["thumbnail"] | null;
  thumbnail2x?: ProductsPageProductFragment["thumbnail2x"] | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
}
