import React from "react";
import Image from "next/image";

import { BrandingFragment } from "queries/branding.graphql.generated";

type LogoProps = {
  branding: BrandingFragment;
};

const Logo = ({ branding }: LogoProps) => {
  return branding?.logo ? (
    <Image
      src={branding.logo.url}
      width={branding.logoWidth ?? 188}
      height={branding.logoHeight ?? 28}
      objectFit="contain"
      alt="Logo"
    />
  ) : (
    <Image
      width={160}
      height={40}
      objectFit="contain"
      src="/nautical_logo.svg"
      alt="Default Nautical logo"
    />
  );
};

export { Logo };
