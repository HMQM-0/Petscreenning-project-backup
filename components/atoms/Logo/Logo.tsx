import React from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";

import { BrandingFragment } from "queries/branding.graphql.generated";

type LogoProps = {
  logo?: BrandingFragment["logo"];
  logoWidth?: BrandingFragment["logoWidth"];
  logoHeight?: BrandingFragment["logoHeight"];
};

const Logo = ({ logo, logoWidth, logoHeight }: LogoProps) => {
  return logo ? (
    <Image
      src={logo.url}
      width={logoWidth ?? 188}
      height={logoHeight ?? 28}
      objectFit="contain"
      alt="Logo"
    />
  ) : (
    <Skeleton
      width={logoWidth ?? 188}
      height={logoHeight ?? 28}
    />
  );
};

export { Logo };
