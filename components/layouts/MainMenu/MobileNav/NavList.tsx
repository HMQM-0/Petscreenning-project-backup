import * as React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { MainMenuItemsFragment } from "@layouts/MainMenu/queries.graphql.generated";

import classes from "./scss/index.module.scss";
import NavItem from "./NavItem";

type NavListProps = {
  logo?: React.ReactNode;
  hideOverlay(): void;
  items: MainMenuItemsFragment[];
};

const NavList = ({ logo, hideOverlay, items }: NavListProps) => {
  const [displayedItems, setDisplayedItems] = React.useState(items);
  const [parent, setParent] = React.useState<typeof displayedItems[number] | null>(null);

  const handleShowSubItems = (item: typeof parent) => {
    setParent(item);
    setDisplayedItems(item?.children ?? []);
  };

  const findItemById = (id: string) =>
    items.find((item) => item?.id === id) || null;

  const handleGoBack = () => {
    const grandparent = parent?.parent ?? null;

    if (!grandparent) {
      setParent(null);
      setDisplayedItems(items);
    } else {
      const newParent = findItemById(grandparent.id);
      setParent(newParent);
      setDisplayedItems(newParent?.children ?? []);
    }
  };

  return (
    <ul>
      {parent ? (
        <li className={`${classes["side-nav__menu-item"]} ${classes["side-nav__menu-item-back"]}`}>
          <Box component="span" onClick={handleGoBack}>
            <KeyboardBackspaceIcon />
            {parent?.name}
          </Box>
        </li>
      ) : (
        <li
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {logo}
          <IconButton
            onClick={hideOverlay}
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: 0,
            }}
          >
            {" "}
            <CloseIcon />
          </IconButton>
        </li>
      )}

      {displayedItems?.map((item) => {
        return (
          <NavItem
            key={item?.id}
            hideOverlay={hideOverlay}
            showSubItems={() => handleShowSubItems(item)}
            item={item}
          />
        );
      })}
    </ul>
  );
};

export default NavList;
