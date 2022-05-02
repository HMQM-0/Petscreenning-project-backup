// import footerImg from "deprecated/images/footer.svg"
import * as React from "react";
import { Box, IconButton, Skeleton, Theme } from "@mui/material";
import { ReactSVG } from "react-svg";
import { styled } from "@mui/styles";

import { Loader } from "@components/atoms/Loader";
import { Spacer } from "@components/molecules/ProductTile/styles";
import { getMicrositeId, isMicrosite } from "core/utils";
import { TypedMicrositeQuery } from "deprecated/views/Microsites/queries";
// import fbIcon from "deprecated/images/fb-icon.svg"

// import footerLogo from "deprecated/images/footer-logo.png"
// import igIcon from "deprecated/images/ig-icon.svg"
// import ttIcon from "deprecated/images/tt-icon.svg"
// import ytIcon from "deprecated/images/yt-icon.svg"

import "./scss/index.module.scss";

import { maybe } from "@utils/misc";

import { TypedSecondaryMenuQuery } from "./queries";

import { NavLink } from "../NavLink";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
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
    // color: theme.palette.secondary.main,
    height: 32,
    width: 32,
  },
}));

interface INavProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Nav: React.FunctionComponent<INavProps> = ({ footerText, icon }) => {
  return (
    <footer className="footer-nav">
      <Box className="social-icons">
        <StyledIconButton aria-label="facebook">
          {/* <ReactSVG src={fbIcon} height="32" width="32" /> */}
        </StyledIconButton>
        <StyledIconButton aria-label="instagram">
          {/* <ReactSVG src={igIcon} height="32" width="32" /> */}
        </StyledIconButton>
        <IconButton
          sx={{
            backgroundColor: "#fff",
            height: 68,
            width: 68,
            display: "flex",
            placeItems: "center",
            overflow: "hidden",
          }}
          aria-label="home page"
        >
          {icon ? icon : <Skeleton />}
          {/* <img src={footerLogo} alt="Logo" height="64" width="64" /> */}
        </IconButton>
        <StyledIconButton aria-label="youtube">
          {/* <ReactSVG src={ytIcon} height="32" width="32" /> */}
        </StyledIconButton>
        <StyledIconButton aria-label="tiktok">
          {/* <ReactSVG src={ttIcon} height="32" width="32" /> */}
        </StyledIconButton>
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
