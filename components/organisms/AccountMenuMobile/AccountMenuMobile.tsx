import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AccountMenuMobile as AccountMenuMobileWrapper,
  AccountMenuMobileItem,
} from "components/molecules/AccountMenuMobile";

import { routes } from "../AccountMenuSidebar";

export const AccountMenuMobile = () => {
  const router = useRouter();
  const currentPageTitle = routes.find(
    (route) => router.pathname === route.path
  )?.label;

  return (
    <AccountMenuMobileWrapper currentPageTitle={currentPageTitle}>
      {routes.map((route) => (
        <Link href={route.path} key={route.path} passHref>
          <AccountMenuMobileItem active={router.pathname === route.path}>
            {route.label}
          </AccountMenuMobileItem>
        </Link>
      ))}
    </AccountMenuMobileWrapper>
  );
};
