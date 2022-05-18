import React from "react";
import Link from "next/link";

import { AccountMenu, AccountMenuItem } from "components/molecules/AccountMenu";

export const AccountMenuSidebar = () => {
  return (
    <AccountMenu>
      <Link href="/account/general" passHref>
        <AccountMenuItem>Account</AccountMenuItem>
      </Link>
      {/*<Link href="/account/order-history" passHref>*/}
      {/*  <AccountMenuItem>Order History</AccountMenuItem>*/}
      {/*</Link>*/}
      {/*<Link href="/account/wishlist" passHref>*/}
      {/*  <AccountMenuItem>Wishlist</AccountMenuItem>*/}
      {/*</Link>*/}
      {/*<Link href="/account/address-book" passHref>*/}
      {/*  <AccountMenuItem>Address book</AccountMenuItem>*/}
      {/*</Link>*/}
    </AccountMenu>
  );
};
