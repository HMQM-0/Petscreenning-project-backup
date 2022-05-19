import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {useIntl} from "react-intl";

import {
  AccountMenuMobile as AccountMenuMobileWrapper,
  AccountMenuMobileItem,
} from "components/molecules/AccountMenuMobile";

import { routes } from "../AccountMenuSidebar";
import {commonMessages} from "../../../deprecated/intl";

export const AccountMenuMobile = () => {
  const router = useRouter();
  const intl = useIntl();

  const currentRouteKeyId = routes.find(
    (route) => router.pathname === route.path
  )?.intlKeyId;
  const currentPageTitle = currentRouteKeyId && intl.formatMessage(commonMessages[currentRouteKeyId]);

  return (
    <AccountMenuMobileWrapper currentPageTitle={currentPageTitle}>
      {routes.map((route) => (
        <Link href={route.path} key={route.path} passHref>
          <AccountMenuMobileItem active={router.pathname === route.path}>
            {
              intl.formatMessage(commonMessages[route.intlKeyId])
            }
          </AccountMenuMobileItem>
        </Link>
      ))}
    </AccountMenuMobileWrapper>
  );
};
