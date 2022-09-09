import { ImageProps } from "next/image";
import React from "react";

import { BasicProductFieldsFragment } from "components/templates/ProductPage/queries.graphql.generated";

interface ISource {
  thumbnail?: BasicProductFieldsFragment["thumbnail"] | null;
  thumbnail2x?: BasicProductFieldsFragment["thumbnail2x"] | null;
}

export interface IProps extends Omit<ImageProps, "src"> {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
  style?: React.CSSProperties;
}
