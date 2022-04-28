// import footerImg from "deprecated/images/footer.svg";
import { Loader } from "@components/atoms/Loader";
import { Spacer } from "@components/molecules/ProductTile/styles";
import { getMicrositeId, isMicrosite } from "deprecated/core/utils";
import { TypedMicrositeQuery } from "deprecated/views/Microsites/queries";
import * as React from "react";
import { Box, IconButton, Skeleton, Theme } from "@mui/material";
import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";
// import footerLogo from "deprecated/images/footer-logo.png";
import fbIcon from "deprecated/images/fb-icon.svg";
import igIcon from "deprecated/images/ig-icon.svg";
import ttIcon from "deprecated/images/tt-icon.svg";
import ytIcon from "deprecated/images/yt-icon.svg";
import "./scss/index.module.scss";
import { ReactSVG } from "react-svg";
import { makeStyles } from "@mui/styles";
import { maybe } from "@utils/misc";

const useStyles = makeStyles((theme: Theme) => ({
  logoButton: {
    backgroundColor: "#fff",
    height: 68,
    width: 68,
    display: "flex",
    placeItems: "center",
    overflow: "hidden",
  },
  socialButton: {
    backgroundColor: "#fff",
    height: 36,
    width: 36,
    display: "flex",
    placeItems: "center",
    "& div > div": {
      display: "flex",
      placeItems: "center",
    },
    "& div > div > svg": {
      fill: "currentColor",
      color: theme.palette.secondary.main,
      height: 32,
      width: 32,
    },
  },
}));
interface INavProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const { footerText, icon } = props;
  const classes = useStyles();
  return (
    <footer className="footer-nav">
      <Box className="social-icons">
        <IconButton className={classes.socialButton} aria-label="facebook">
          <ReactSVG src={fbIcon} height="32" width="32" />
        </IconButton>
        <IconButton className={classes.socialButton} aria-label="instagram">
          <ReactSVG src={igIcon} height="32" width="32" />
        </IconButton>
        <IconButton className={classes.logoButton} aria-label="home page">
          {icon ? icon : <Skeleton />}
          {/* <img src={footerLogo} alt="Logo" height="64" width="64" /> */}
        </IconButton>
        <IconButton className={classes.socialButton} aria-label="youtube">
          <ReactSVG src={ytIcon} height="32" width="32" />
        </IconButton>
        <IconButton className={classes.socialButton} aria-label="tiktok">
          <ReactSVG src={ttIcon} height="32" width="32" />
        </IconButton>
      </Box>
      <Box className="container">
        <Box
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              return data.shop.navigation.secondary.items?.map((item) => (
                <Box className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    <NavLink item={item} />
                  </h4>
                  <Box className="footer-nav__section-content">
                    {item.children.map((subItem) => (
                      <p key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </Box>
                </Box>
              ));
            }}
          </TypedSecondaryMenuQuery>
        </Box>
        {!!isMicrosite() && (
          <TypedMicrositeQuery variables={{ id: getMicrositeId() }}>
            {({ data, error, loading }) => {
              if (data && !error && !loading) {
                return (
                  <Box style={{ textAlign: "center" }}>
                    {data.microsite?.footerText}
                  </Box>
                );
              }
              return <Loader />;
            }}
          </TypedMicrositeQuery>
        )}
      </Box>
      <Spacer />
      <Box className="container">
        <Box style={{ display: "block", width: "100%" }}>
          <Box>
            <hr />
          </Box>
          <Box className="footer-nav__section-caption">
            <Box>{maybe(() => footerText)}</Box>
            {/* <Box><a href="" target="" role="button" className="footer-nav__section-caption">Privacy Policy</a></Box>
          <Box><a href="" target="" role="button" className="footer-nav__section-caption">Terms of Use</a></Box> */}
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Nav;

/*

style={{
          backgroundImage: `url(${footerImg})`,
          backgroundSize: "cover",
        }}
*/
