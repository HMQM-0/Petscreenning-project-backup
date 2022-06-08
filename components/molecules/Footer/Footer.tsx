import React from "react";
import { Box } from "@mui/material";

import { SOCIAL_MEDIA } from "core/config";

import classes from "./scss/index.module.scss";
import Nav from "./Nav";

interface FooterProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Footer = ({ footerText, icon }: FooterProps) => {
  return (
    <Box className={classes.footer} id="footer">
      <Box className={`${classes['footer__favicons']} ${classes.container}`}>
        {SOCIAL_MEDIA.map((medium) => (
          <Box
            className={classes["social-icons"]}
            key={medium.ariaLabel}
            style={{ display: "none" }}
          />
        ))}
      </Box>
      <Nav footerText={footerText} icon={icon} />
    </Box>
  );
};

export default Footer;
