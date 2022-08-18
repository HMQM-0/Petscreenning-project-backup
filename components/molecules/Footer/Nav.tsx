import React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";

import { NavLink } from "components/atoms/NavLink";
import { Spacer } from "@components/molecules/ProductTile/styles";
import { FbIcon } from "components/icons/fbIcon";
import { IgIcon } from "components/icons/igIcon";
import { YtIcon } from "components/icons/ytIcon";
import { TtIcon } from "components/icons/ttIcon";
import { TwIcon } from "components/icons/twIcon";

import classes from "./scss/index.module.scss";
import { useSecondaryMenuQuery } from "./queries.graphql.generated";

interface INavProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const socialLinks = {
  FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK_LINK,
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_LINK,
  YOUTUBE: process.env.NEXT_PUBLIC_YOUTUBE_LINK,
  TIKTOK: process.env.NEXT_PUBLIC_TIKTOK_LINK,
  TWITTER: process.env.NEXT_PUBLIC_TWITTER_LINK,
};

type SocialIconsKeys = keyof typeof socialLinks;
const socialLinksProps: Record<
  SocialIconsKeys,
  { ariaLabel: string; icon: React.FunctionComponent; href: string | undefined }
> = {
  FACEBOOK: {
    ariaLabel: "facebook",
    icon: FbIcon,
    href: process.env.NEXT_PUBLIC_FACEBOOK_LINK,
  },
  INSTAGRAM: {
    ariaLabel: "instagram",
    icon: IgIcon,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_LINK,
  },
  YOUTUBE: {
    ariaLabel: "youtube",
    icon: YtIcon,
    href: process.env.NEXT_PUBLIC_YOUTUBE_LINK,
  },
  TIKTOK: {
    ariaLabel: "tiktok",
    icon: TtIcon,
    href: process.env.NEXT_PUBLIC_TIKTOK_LINK,
  },
  TWITTER: {
    ariaLabel: "twitter",
    icon: TwIcon,
    href: process.env.NEXT_PUBLIC_TWITTER_LINK,
  },
};

const SocialIcon = ({ socialIconKey }: { socialIconKey: SocialIconsKeys }) => {
  const Icon = socialLinksProps[socialIconKey].icon;
  return (
    <IconButton className={classes["footer-social-icon"]} {...socialLinksProps[socialIconKey]}>
      <Icon />
    </IconButton>
  );
};

const Nav = ({ footerText, icon }: INavProps) => {
  const { data } = useSecondaryMenuQuery();
  const secondaryMenuItems = data?.shop.navigation?.secondary?.items;

  const socialIconsKeys: SocialIconsKeys[] = Object.keys(socialLinks)
    // Filter out social links that are not set
    .filter((socialLinkKey) => !!socialLinks[socialLinkKey as keyof typeof socialLinks]) as any;
  const half = Math.ceil(socialIconsKeys.length / 2);

  const socialIconsFirstHalf = socialIconsKeys.slice(0, half);
  const socialIconsSecondHalf = socialIconsKeys.slice(half, socialIconsKeys.length);
  // Render hidden icon to make everything look symmetric if left and right side are not the same
  const showEmptyIcon = socialIconsFirstHalf.length !== socialIconsSecondHalf.length;

  return (
    <footer className={classes["footer-nav"]}>
      <Box className={classes["social-icons"]}>
        {socialIconsFirstHalf.map((socialIconKey) => (
          <SocialIcon socialIconKey={socialIconKey} key={socialIconKey} />
        ))}
        <IconButton
          sx={{
            backgroundColor: "#fff",
            height: 68,
            width: 68,
            display: "flex",
            placeItems: "center",
            overflow: "hidden",
            "& img": {
              objectFit: "contain",
            },
          }}
          aria-label="home page"
        >
          {icon ? icon : <Skeleton />}
        </IconButton>
        {socialIconsSecondHalf.map((socialIconKey) => (
          <SocialIcon socialIconKey={socialIconKey} key={socialIconKey} />
        ))}
        {showEmptyIcon && <div style={{ width: 32, backgroundColor: "transparent" }} />}
      </Box>
      <Box className="container">
        <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "3rem" }}>
          {secondaryMenuItems?.map((item) => (
            <Box className={classes["footer-nav__section"]} key={item.id}>
              <h4 className={classes["footer-nav__section-header"]}>
                <NavLink item={item} />
              </h4>
              <Box className={classes["footer-nav__section-content"]}>
                {/* children can be null? A BE issue? */}
                {item!.children?.map((subItem) => (
                  <p key={subItem.id}>
                    <NavLink item={subItem} />
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
