import clsx from "clsx";
import * as React from "react";
import { IconButton, useTheme } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { NavLink } from "../NavLink";
import { MainMenuSubItemFragment } from "../MainMenu/queries.graphql.generated";

interface NavItemProps {
  hideOverlay(): void;
  showSubItems(item: MainMenuSubItemFragment): void;
  item:
    | (MainMenuSubItemFragment & {
        children?: MainMenuSubItemFragment[];
      })
    | null;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  item,
}) => {
  const [hover, setHover] = React.useState(false);
  const hasSubNavigation = item?.children && !!item.children.length;
  const theme = useTheme();

  const hoverStyle = {
    color: theme.palette.secondary.main,
  };

  if (!item) {
    return null;
  }

  return (
    <li
      className={clsx({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <NavLink
        item={item}
        className="side-nav__menu-item-link"
        onClick={hideOverlay}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? hoverStyle : { color: "inherit" }}
      />
      {hasSubNavigation && (
        <IconButton color={"primary"} onClick={() => showSubItems(item)}>
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      )}
    </li>
  );
};

export default NavItem;

/*
<ReactSVG
  src={subcategoriesImg}
  className="side-nav__menu-item-more"
  onClick={() => showSubItems(item)}
/>
*/
