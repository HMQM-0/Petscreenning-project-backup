import "./scss/index.module.scss";

import * as React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { Maybe, MenuItem } from "@generated";

import NavItem from "./NavItem";

type NavListProps = {
  logo?: React.ReactNode;
  hideOverlay(): void;
  items: Maybe<MenuItem>[];
};

const NavList = ({ logo, hideOverlay, items }: NavListProps) => {
  const [displayedItems, setDisplayedItems] = React.useState(items);
  const [parent, setParent] = React.useState<
    typeof displayedItems[number] | null
  >(null);

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
    // @ts-ignore
    <ul>
      {parent ? (
        <li className="side-nav__menu-item side-nav__menu-item-back">
          <Box component="span" onClick={handleGoBack}>
            <KeyboardBackspaceIcon />
            {parent?.name}
          </Box>
        </li>
      ) : (
        <>
          {/* <li className="side-nav__menu-item side-nav__menu-item--title"> */}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "16px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {/* <Link
                to={baseUrl}
                // className="side-nav__menu-item-logo"
                onClick={hideOverlay}
              > */}
            {logo}
            {/* </Link> */}
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
              {/* className="side-nav__menu-item side-nav__menu-item--close"> */}
              <CloseIcon />
            </IconButton>
          </li>
          {/* <li className="side-nav__menu-item">
              <Link
                to={baseUrl}
                className="side-nav__menu-item-link"
                onClick={hideOverlay}
              >
                <FormattedMessage {...commonMessages.home} />
              </Link>
            </li> */}
        </>
      )}

      {displayedItems?.map((item) => {
        return (
          <NavItem
            key={item?.id}
            hideOverlay={hideOverlay}
            showSubItems={() => handleShowSubItems(item)}
            // @ts-ignore
            item={item}
          />
        );
      })}
    </ul>
  );
};

export default NavList;

/*
<ReactSVG src={backImg} />
*/
