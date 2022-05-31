// import { css, jsx } from "@emotion/react";
import * as React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "core/utils";

import { MainMenuSubItemFragment } from "../MainMenu/queries.graphql.generated";
// import {
//   SecondaryMenu_shop_navigation_secondary_items,
//   SecondaryMenu_shop_navigation_secondary_items_children,
// } from "../Footer/gqlTypes/SecondaryMenu";
// import { MainMenu_shop_navigation_main_items } from "../MainMenu/gqlTypes/MainMenu";
// import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";
// import { MenuStyle } from "../MainMenu/gqlTypes/MenuStyle";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item: MainMenuSubItemFragment & {
    children?: MainMenuSubItemFragment[];
  };
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
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

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
