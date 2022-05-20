import React from "react";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generateMicrositeUrl,
  generatePageUrl,
} from "core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const getLinkUrl = ({
  category,
  collection,
  microsite,
  page,
}: IProps["item"]) => {
  if (category) {
    return generateCategoryUrl(category.id, category.name);
  }
  if (collection) {
    return generateCollectionUrl(collection.id, collection.name);
  }
  if (microsite) {
    return generateMicrositeUrl(microsite.id, microsite.name);
  }
  if (page) {
    return generatePageUrl(page.slug);
  }
};

export const NavLink: React.FC<IProps> = ({
  item,
  fullWidth = false,
  ...props
}) => {
  const { name, url, category, collection, microsite, page } = item;

  if (url) {
    return (
      // @ts-ignore
      <a href={url} {...props}>
        {name}
      </a>
    );
  }

  const linkUrl = getLinkUrl({ category, collection, microsite, page });

  return linkUrl ? (
    <S.Link
      href={linkUrl}
      activeClassName="navlink-active"
      fullWidth={fullWidth}
      {...props}
    >
      {name}
    </S.Link>
  ) : null;
};
