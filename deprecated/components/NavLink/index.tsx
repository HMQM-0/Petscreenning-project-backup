import * as React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "core/utils";
import { MainMenuSubItemFragment } from "@generated";

import { MenuStyle } from "../MainMenu";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item: MainMenuSubItemFragment;
  menuStyle?: MenuStyle;
}

/*

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  item,
  menuStyle,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  let linkUrl = "";

  if (category) {
    linkUrl = generateCategoryUrl(category.id, category.name);
  }

  if (collection) {
    linkUrl = generateCollectionUrl(collection.id, collection.name);
  }

  if (page) {
    linkUrl = generatePageUrl(page.slug);
  }

  if (url) {
    linkUrl = url;
  }

  return <Link to={linkUrl} {...props}>{name}</Link>;
};

export default NavLink;

*/

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  menuStyle,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  /* 
  const ThemedLink = css`
    color: ${maybe(
      () => menuStyle?.textColor + " !important",
      "#323232 !important"
    )};
    &:hover {
      color: ${maybe(
        () => menuStyle?.hoverColor + " !important",
        "#26b2e3 !important"
      )};
    }
  `;
  */

  const link = (url: string) => (
    <Link href={url} {...props}>
      <a onClick={onClick}>{name}</a>
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props} onClick={onClick}>
        {name}
      </a>
    );
  }
  if (category) {
    return (
      <Link href={generateCategoryUrl(category.id, category.name)}>
        <a
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={style}
        >
          {name}
        </a>
      </Link>
    );
  }
  if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  }
  if (page) {
    return link(generatePageUrl(page.slug));
  }

  return (
    <Box component="span" {...props}>
      {name}
    </Box>
  );
};
