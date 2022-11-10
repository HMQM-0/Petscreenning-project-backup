import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
} from "@mui/material";
import { StringParam, useQueryParam } from "next-query-params";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { ImportContacts, Logout } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useAuth, useCart } from "nautical-api";
import { OverlayTheme, OverlayType, useOverlayContext } from "src/components/providers/Overlay";

import MenuListComposition from "./MenuListComposition";
import PawItForwardIcon from "./PawItForwardIcon";
import { useMainMenuQuery } from "./queries.graphql.generated";
import classes from "./index.module.scss";
import FiddoTobbyAlert from "./FidoTobbyAlert.png";

interface ITopNavProps {
  logo?: React.ReactNode;
}

const TopNav = (props: ITopNavProps) => {
  const { logo } = props;

  const { authenticated, signOut } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
  };
  const alert = useAlert();
  const overlayContext = useOverlayContext();
  const [search] = useQueryParam("q", StringParam);
  const [term, setTerm] = React.useState<string>(search || "");
  const [showHeader, setShowHeader] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | (EventTarget & HTMLDivElement) | null
  >(null);
  const accountMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    // Sync local state with query param, anytime it is changed
    setTerm(search || "");
  }, [search]);

  useEffect(() => {
    if (window) {
      setShowHeader(!window.location.href.includes("checkout"));
    }
  }, []);

  const handleCart = () => {
    overlayContext.show(OverlayType.cart, OverlayTheme.right);
  };

  const handleMenu = () => {
    overlayContext.show(OverlayType.sideNav, OverlayTheme.left, { logo });
  };

  const handleSearch = () => {
    if (term.length > 2) {
      router.push("/search?q=" + term);
    } else {
      alert.show(
        {
          content: "Minimum of three letters required",
          title: "Search",
        },
        { type: "info", timeout: 3000 },
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const cartItemsQuantity = (items && items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) || 0;

  const { data, loading } = useMainMenuQuery();
  const menuItems = data?.shop.navigation?.main?.items ?? [];
  return (
    <>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#fff", minHeight: 72, boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "space-between",
            minHeight: "72px !important",
            maxWidth: 1200,
            width: "100%",
          }}
        >
          <div className={classes.mobileNav}>
            <Button
              sx={{
                display: { xs: "flex", sm: "none" },
                borderRadius: "12px",
                marginLeft: "8px",
                minWidth: 32,
                padding: "8px",
              }}
              onClick={handleMenu}
              aria-label="Menu"
            >
              <MenuIcon htmlColor="#777" />
            </Button>
          </div>
          <div className={classes.mobileNav}>
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              onClick={() => handleSearch()}
              aria-label="Search"
            >
              <SearchIcon htmlColor="#777" />
            </IconButton>
          </div>

          <div
            onClick={() => router.push("https://www.fidoalert.com/")}
            className={classes.desktopFiddoTobbyAlert}
          >
            <Image
              src={FiddoTobbyAlert}
              width={63}
              height={20}
              objectFit="contain"
              alt="FiddoTobbyAlert"
            />
          </div>

          <Box sx={{ alignContent: "center", display: "flex", flexBasis: 200 }}>
            <Link href="/">
              <a>
                <Box sx={{ alignItems: "center", display: "flex" }}>{logo}</Box>
              </a>
            </Link>
            <div className={classes.mobileNav}>
              <Button
                sx={{
                  display: { xs: "none", sm: "flex" },
                  borderRadius: "12px",
                  marginLeft: "8px",
                  minWidth: 32,
                  padding: "8px",
                }}
                onClick={handleMenu}
                aria-label="Menu"
              >
                <MenuIcon htmlColor="#777" />
              </Button>
            </div>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Paper
              elevation={0}
              sx={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 515,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "10px",
              }}
            >
              <InputBase
                value={term}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ "aria-label": "search" }}
              />
              <Divider
                sx={{ height: 41, m: 0.5 }}
                orientation="vertical"
              />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                onClick={() => handleSearch()}
                aria-label="Search"
              >
                <SearchIcon htmlColor="#777" />
              </IconButton>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              aria-label="account"
              aria-controls={accountMenuOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={accountMenuOpen ? "true" : undefined}
              onClick={(event) => {
                if (!authenticated) {
                  overlayContext.show(OverlayType.login, OverlayTheme.right);
                  return;
                }

                setAnchorEl(accountMenuOpen ? null : event.currentTarget);
              }}
            >
              {authenticated ? (
                <PersonIcon color="primary" />
              ) : (
                <div className={classes.headerOption}>
                  <MeetingRoomOutlinedIcon htmlColor="#21BC99" />
                  <div className={classes.headerOptionLabel}>My Account</div>
                </div>
              )}
            </IconButton>

            <div className={classes.desktopNav}>
              <PawItForwardIcon />
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={accountMenuOpen}
              onClose={() => setAnchorEl(null)}
              onClick={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Link href="/account">
                  <a>
                    <ListItemIcon>
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </a>
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link href="/account/order-history">
                  <a>
                    <ListItemIcon>
                      <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    Order History
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/account/wishlist">
                  <a>
                    <ListItemIcon>
                      <FavoriteIcon fontSize="small" />
                    </ListItemIcon>
                    Wishlist
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/account/address-book">
                  <a>
                    <ListItemIcon>
                      <ImportContacts fontSize="small" />
                    </ListItemIcon>
                    Address Book
                  </a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Badge
              badgeContent={cartItemsQuantity}
              color="secondary"
            >
              <IconButton
                onClick={() => handleCart()}
                aria-label="Cart"
              >
                <ShoppingCartOutlinedIcon htmlColor="#21BC99" />
              </IconButton>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
      {showHeader && (
        <div className={classes.desktopNav}>
          <Box
            sx={{
              width: "100%",
              minWidth: "1440px",
              minHeight: "35px",
              background: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
              borderTop: "0.25px solid #dadada",
            }}
          >
            <div className={classes.menu}>
              {menuItems?.map((item: any, index) => (
                <MenuListComposition
                  option={item}
                  optionsPlacement="bottom-start"
                  isNavOption
                  key={index}
                />
              ))}
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default TopNav;
