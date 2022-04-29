import * as React from "react";

import { MainMenuSubItem } from "./gqlTypes/MainMenuSubItem";
import { MenuStyle } from "./gqlTypes/MenuStyle";

import { NavLink } from "../NavLink";

interface NavNestedItemProps extends MainMenuSubItem {
  children?: NavNestedItemProps[] | null;
  menuStyle?: MenuStyle;
  hideOverlay?(): void;
}

const NavItem: React.FC<NavNestedItemProps> = ({
  hideOverlay,
  children,
  menuStyle,
  ...item
}) => {
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <NavItem menuStyle={menuStyle} key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li onClick={hideOverlay}>
      <NavLink style={menuStyle} item={item} onClick={hideOverlay} />
      {content}
    </li>
  );
};

export default NavItem;
