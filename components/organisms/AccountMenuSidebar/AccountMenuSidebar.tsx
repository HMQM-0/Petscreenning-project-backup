import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useIntl} from "react-intl";

import { AccountMenu, AccountMenuItem } from "components/molecules/AccountMenu";

import {commonMessages} from "../../../deprecated/intl";


interface Route {
  path: string;
  label: string;
  intlKeyId: keyof typeof commonMessages;
}

export const routes: Route[] = [
  {
    path: '/account/general',
    label: 'Account',
    intlKeyId: 'account',
  },
]

export const AccountMenuSidebar = () => {
  const router = useRouter();
  const intl = useIntl();


  return (
    <AccountMenu>
      {routes.map(route => (
        <Link href={route.path} key={route.path} passHref>
          <AccountMenuItem
            active={router.pathname === route.path}
          >
            {
              intl.formatMessage(commonMessages[route.intlKeyId])
            }
          </AccountMenuItem>
        </Link>
      ))}
    </AccountMenu>
  );
};
