// import { ContactIcon, ContactIconShape } from "deprecated/_nautical/blocks"
import * as React from "react";
import { Box } from "@mui/material";

// import { SocialMediaIcon } from ".."
import { isMicrosite } from "core/utils";
import { SOCIAL_MEDIA } from "core/config";

import classes from "./scss/index.module.scss";
import Nav from "./Nav";

interface FooterProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ footerText, icon }) => {
  return (
    <Box className={classes.footer} id="footer">
      {!isMicrosite() && (
        <Box className={`${classes.footer}__favicons ${classes.container}`}>
          {SOCIAL_MEDIA.map((medium) => (
            <Box
              className={classes["social-icons"]}
              key={medium.ariaLabel}
              style={{ display: "none" }}
            >
              {/*
            <ContactIcon
              backgroundColor="#21125e"
              hoverColor="#26b2e3"
              link={medium.href}
              shape={ContactIconShape.circle}
              type={medium.ariaLabel}
              size={36}
            />
            */}
            </Box>
          ))}
        </Box>
      )}
      {isMicrosite() && <Box pt={1} />}
      <Nav footerText={footerText} icon={icon} />
    </Box>
  );
};

export default Footer;
