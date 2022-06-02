import React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/styles";

import { NavLink } from "components/atoms/NavLink";
import { Spacer } from "@components/molecules/ProductTile/styles";
import { FbIcon } from "components/icons/fbIcon";
import { IgIcon } from "components/icons/igIcon";
import { YtIcon } from "components/icons/ytIcon";
import { TtIcon } from "components/icons/ttIcon";

import classes from "./scss/index.module.scss";
import { useSecondaryMenuQuery } from "./queries.graphql.generated";


const StyledIconButton = styled(IconButton)(() => ({
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
    height: 32,
    width: 32,
  },
}));

interface INavProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Nav = ({ footerText, icon }: INavProps) => {
  const { data } = useSecondaryMenuQuery();
  const secondaryMenuItems = data?.shop.navigation?.secondary?.items;
  return (
    <footer className={classes["footer-nav"]}>
      <Box className={classes["social-icons"]}>
        <StyledIconButton aria-label="facebook">
          <FbIcon />
        </StyledIconButton>
        <StyledIconButton aria-label="instagram">
          <IgIcon />
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
        </IconButton>
        <StyledIconButton aria-label="youtube">
          <YtIcon />
        </StyledIconButton>
        <StyledIconButton aria-label="tiktok">
          <TtIcon />
        </StyledIconButton>
      </Box>
      <Box className="container">
        <Box
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {secondaryMenuItems?.map((item) => (
            // TODO: A BE issue, item should not be null
            <Box className={classes["footer-nav__section"]} key={item!.id}>
              <h4 className={classes["footer-nav__section-header"]}>
                {/* // TODO: A BE issue, item should not be null*/}
                <NavLink item={item!} />
              </h4>
              <Box className={classes["footer-nav__section-content"]}>
                {/* // TODO: children can be null? A BE issue? */}
                {item!.children?.map((subItem) => (
                  // TODO: A BE issue. subItem can not be null
                  <p key={subItem!.id}>
                    {/* // TODO: A BE issue, item should not be null */}
                    <NavLink item={subItem!} />
                  </p>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Spacer />
      <Box className="container">
        <Box style={{ display: "block", width: "100%" }}>
          <Box>
            <hr />
          </Box>
          <Box className={classes["footer-nav__section-caption"]}>
            <Box>{footerText}</Box>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Nav;
