import clsx from "clsx";
import React, { useState } from "react";
import { IconButton, useTheme } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { NavLink } from "src/components/atoms/NavLink";
import { MainMenuItemsFragment } from "src/components/layouts/MainMenu/queries.graphql.generated";

import classes from "./scss/index.module.scss";

interface NavItemProps {
  hideOverlay(): void;

  showSubItems(item: MainMenuItemsFragment): void;

  item: MainMenuItemsFragment;
}

const NavItem = ({ hideOverlay, showSubItems, item }: NavItemProps) => {
  const [hover, setHover] = useState(false);
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
        [classes["side-nav__menu-item"]]: true,
        [classes["side-nav__menu-item--has-subnavigation"]]: hasSubNavigation,
      })}
    >
      <NavLink
        item={item}
        className={classes["side-nav__menu-item-link"]}
        onClick={hideOverlay}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? hoverStyle : { color: "inherit" }}
      />
      {hasSubNavigation && (
        <IconButton
          color={"primary"}
          onClick={() => showSubItems(item)}
        >
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      )}
    </li>
  );
};

export default NavItem;
