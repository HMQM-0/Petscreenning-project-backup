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
  // Do we need to track error here?
  return null;
};

export const NavLink = ({
  item,
  fullWidth = false,
  ...props
}: IProps) => {
  const { name, url } = item;

  if (url) {
    const className = typeof props.className === 'function'
      // Props are based on NavLink props - so showing `non-active` one
      // in case className was passed as a function
      ? props.className({ isActive: false })
      : props.className;
    const style = typeof props.style === 'function'
      // Props are based on NavLink props - so showing `non-active` styles
      // in case style was passed as a function
      ? props.style({ isActive: false })
      : props.style;
    return (
      <a
        href={url}
        {...props}
        className={className}
        style={style}
      >
        {name}
      </a>
    );
  }

  const linkUrl = getLinkUrl(item) || '';

  return (
    <>
      <S.Link
        href={linkUrl}
        activeClassName="navlink-active"
        fullWidth={fullWidth}
        {...props}
      >
        {name}
      </S.Link>
    </>
  );
};
