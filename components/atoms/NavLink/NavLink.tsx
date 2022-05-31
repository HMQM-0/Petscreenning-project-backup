import React from "react";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const getLinkUrl = ({
  category,
  collection,
  page,
}: IProps["item"]) => {
  if (category) {
    return generateCategoryUrl(category.id, category.name);
  }
  if (collection) {
    return generateCollectionUrl(collection.id, collection.name);
  }
  if (page) {
    return generatePageUrl(page.slug);
  }
  // TODO: Do we need to track error here?
  return null;
};

export const NavLink = ({
  item,
  fullWidth = false,
  ...props
}: IProps) => {
  const { name, url } = item;

  if (url) {
    return (
      <a
        href={url}
        // TODO: how to fix?
        // @ts-ignore
        className={props.className}
        {...props}
      >
        {name}
      </a>
    );
  }

  const linkUrl = getLinkUrl(item);

  return (
    <>
      {linkUrl && (
        <S.Link
          href={linkUrl}
          activeClassName="navlink-active"
          fullWidth={fullWidth}
          {...props}
        >
          {name}
        </S.Link>
      )}
    </>
  );
};
