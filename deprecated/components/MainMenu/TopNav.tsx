import {
  AppBar,
  Button,
  Badge,
  Box,
  Divider,
  InputBase,
  IconButton,
  Paper,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Skeleton,
} from "@mui/material";
import React from "react";
import { useAlert } from "react-alert";
import "./scss/index.module.scss";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Logout, ImportContacts } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  useMainMenuQuery,
  useUserCheckoutDetailsQuery,
  useUserDetailsQuery,
} from "@generated";

// import DrawerMenu from "./DrawerMenu";
// import DrawerLogin from "./DrawerLogin";
// import DrawerCart from "./DrawerCart";

// const getStyles = makeStyles((theme: Theme) => {
//   console.log("theme", theme);
//   return createStyles({
//     menu: {
//       "& .MuiPaper-root": {
//         border: `1px solid ${theme.palette.divider}`,
//       },
//     },
// search: {
//   padding: "2px 4px",
//   display: "flex",
//   alignItems: "center",
//   width: 400,
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: 25,
// },
//   });
// });

interface ITopNavProps {
  logo?: React.ReactNode;
}

const TopNav: React.FunctionComponent<ITopNavProps> = (props) => {
  const { logo } = props;

  const { data: userDetailsData } = useUserDetailsQuery();
  const user = userDetailsData?.me;
  const { data: mainMenuData } = useMainMenuQuery();
  const { data: checkoutData } = useUserCheckoutDetailsQuery();
  const checkoutLines = checkoutData?.me?.checkout?.lines ?? null;

  // const { items } = useCart();
  const { push } = useRouter();
  const handleSignOut = async () => {
    // await signOut();
  };
  const alert = useAlert();
  const [term, setTerm] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLDivElement) | (EventTarget & HTMLButtonElement) | null
  >(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const accountMenuOpen = Boolean(anchorEl);
  const [cartOpen, setCartOpen] = React.useState(false);

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCart = () => {
    setCartOpen(true);
  };

  // const handleLogin = () => {
  //   if (!user) {
  //     setLoginOpen(true);
  //   } else {

  //   }
  // }

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleSearch = () => {
    if (term.length > 2) {
      push(`/search?q=${term}`);
    } else {
      alert.show(
        {
          // @ts-ignore
          content: "Minimum of three letters required",
          title: "Search",
        },
        { type: "info", timeout: 3000 }
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

  const cartItemsQuantity =
    checkoutLines?.reduce((acc, line) => acc + (line?.quantity ?? 0), 0) ?? 0;

  const logoImage = logo ? logo : <Skeleton />; // <img src={logoImg} width={188} height={"auto"} style={{ marginTop: "4px", marginBottom: "4px" }} onClick={() => navigate('/')} alt="Logo" />;

  const menuItems = mainMenuData?.shop.navigation?.main?.items ?? [];
  return (
    <>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#fff", minHeight: 72 }}
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
            <MenuOpenIcon htmlColor="#777" />
          </Button>

          <Box sx={{ alignContent: "center", display: "flex", flexBasis: 200 }}>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              {logoImage}
            </Box>
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
              <MenuOpenIcon htmlColor="#777" />
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Paper
              elevation={0}
              sx={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 25,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="Search">
                <SearchIcon htmlColor="#777" />
              </IconButton>
              <InputBase
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ "aria-label": "search" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                onClick={() => handleSearch()}
                aria-label="Search"
              >
                <RocketLaunchIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box
            sx={{ display: "flex", flexBasis: 200, justifyContent: "flex-end" }}
          >
            <IconButton
              color="inherit"
              aria-label="account"
              // size="small"
              // sx={{ ml: 2 }}
              aria-controls={accountMenuOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={accountMenuOpen ? "true" : undefined}
              onClick={(event) => {
                if (user) {
                  if (accountMenuOpen) {
                    setAnchorEl(null);
                  } else {
                    setAnchorEl(event.currentTarget);
                  }
                } else {
                  setLoginOpen(!loginOpen);
                }
              }}
            >
              {user ? (
                <PersonIcon color="primary" />
              ) : (
                <PersonOutlineOutlinedIcon color="action" />
              )}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={accountMenuOpen}
                onClose={() => setAnchorEl(null)}
                onClick={(event) => setAnchorEl(event.currentTarget)}
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
                  <Link href="/order-history">
                    <a>
                      <ListItemIcon>
                        <HistoryIcon fontSize="small" />
                      </ListItemIcon>
                      Order History
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/wishlist">
                    <a>
                      <ListItemIcon>
                        <FavoriteIcon fontSize="small" />
                      </ListItemIcon>
                      Wishlist
                    </a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/address-book">
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
            </IconButton>
            {/* </Hidden> */}
            <Badge badgeContent={cartItemsQuantity} color="secondary">
              <IconButton
                sx={{ backgroundColor: "#F3F5F9" }}
                onClick={() => handleCart()}
                aria-label="Cart"
              >
                <ShoppingBagOutlinedIcon htmlColor="#777" />
              </IconButton>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <DrawerMenu
        logo={logoImage}
        anchor="left"
        items={menuItems}
        open={menuOpen}
        close={handleMenuClose}
      />
      <DrawerCart anchor="right" open={cartOpen} close={handleCartClose} />
      <DrawerLogin anchor="right" open={loginOpen} close={handleLoginClose} /> */}
    </>
  );
};

export default TopNav;
