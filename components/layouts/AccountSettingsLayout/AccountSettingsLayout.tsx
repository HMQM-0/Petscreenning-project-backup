import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "nautical-api";
import { IS_SSR } from "utils";

import { Authenticated } from "./Authenticated";
import { Unathenticated } from "./Unathenticated";

type LayoutProps = {
  children: React.ReactNode;
  allowAnonymousUser?: boolean;
};

const AccountSettingsLayout = ({ children, allowAnonymousUser }: LayoutProps) => {
  const { loaded, authenticated } = useAuth();
  const { push } = useRouter();

  const isAllowedToViewPage = allowAnonymousUser || (loaded && authenticated);

  useEffect(() => {
    if (!IS_SSR) {
      if (!isAllowedToViewPage) {
        push("/");
      }
    }
  }, [push, allowAnonymousUser, loaded, authenticated, isAllowedToViewPage]);

  if (!isAllowedToViewPage) {
    return <Unathenticated />;
  }

  return <Authenticated anonymous={!authenticated}>{children}</Authenticated>;
};

export { AccountSettingsLayout };
