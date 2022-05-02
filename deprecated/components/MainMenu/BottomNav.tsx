import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Link from "next/link";

import classes from "./scss/index.module.scss";
interface IBottomNavProps {}

const fabStyle: React.CSSProperties = {
  border: "1px solid #ededed",
  bottom: 12,
  boxShadow: "none",
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
};

const BottomNav: React.FunctionComponent<IBottomNavProps> = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box className={classes["bottom-nav"]}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          bottom: 0,
          top: "auto",
          borderTop: "1px solid #ededed",
          position: "fixed",
          width: "100%",
        }}
      >
        <Link href="/">
          <a>
            <BottomNavigationAction
              showLabel
              label="Home"
              icon={<HomeIcon />}
              style={{ zIndex: 3 }}
            />
          </a>
        </Link>
        <BottomNavigationAction
          disableRipple
          disableTouchRipple
          disabled
          style={{ zIndex: 3 }}
        />
        <Link href="wishlist/">
          <a>
            <BottomNavigationAction
              showLabel
              label="Wishlist"
              icon={<FavoriteIcon />}
              style={{ zIndex: 3 }}
            />
          </a>
        </Link>
      </BottomNavigation>
      <Link href="/search/?q=search">
        <a>
          <Fab color="primary" style={fabStyle} aria-label="Search">
            <SearchIcon fontSize="large" />
          </Fab>
        </a>
      </Link>
    </Box>
  );
};

export default BottomNav;
