// @ts-nocheck
import * as React from "react";
import { Route, Routes } from "react-router";

import { CartPage, CheckoutPage, PasswordReset, ThankYouPage } from "@pages";
import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";
import { OrderDetails } from "../../userAccount/views";
import { Account, AccountConfirm } from "../../views/Account";
import { ArticlePage as OldArticlePage } from "../../views/Article";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { MicrositePage } from "../../views/Microsites";
import { HomePage } from "../../views/Home";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";
import { WishlistPage } from "../../views/Wishlist";
import { LandingPage } from "deprecated/views/Landing";

import { ProductsPage } from "deprecated/views/Products";
import * as paths from "./paths";
import BuilderPage from "deprecated/views/Builder/BuilderPage";
import ArticlePage from "deprecated/views/Builder/ArticlePage";
import StorePage from "deprecated/views/Builder/StorePage";

interface IAppProps {
  logo?: React.ReactNode;
}

export const AppRoutes: React.FC<IAppProps> = ({ logo }) => (
  <Routes>
    <Route path={paths.baseUrl} element={<HomePage />} />
    <Route path={paths.searchUrl} element={<SearchPage logo={logo} />} />
    <Route
      path={paths.micrositeSearchUrl}
      element={<SearchPage logo={logo} />}
    />
    <Route path={paths.wishlistUrl} element={<WishlistPage />} />
    <Route path={paths.micrositeWishlistUrl} element={<WishlistPage />} />
    <Route path={paths.categoryUrl} element={<CategoryPage logo={logo} />} />
    <Route
      path={paths.collectionUrl}
      element={<CollectionPage logo={logo} />}
    />
    <Route path={paths.micrositeUrl} element={<MicrositePage logo={logo} />} />
    <Route
      path={paths.micrositeProductUrl}
      element={<ProductPage logo={logo} />}
    />
    <Route path={paths.productsUrl} element={<ProductsPage logo={logo} />} />
    <Route path={paths.productUrl} element={<ProductPage logo={logo} />} />
    <Route path={paths.cartUrl} element={<CartPage />} />
    <Route path={paths.micrositeCartUrl} element={<CartPage />} />
    <Route path={paths.checkoutLoginUrl} element={<CheckoutLogin />} />
    <Route path={paths.micrositeCheckoutLoginUrl} element={<CheckoutLogin />} />
    <Route path={paths.pageUrl} element={<OldArticlePage />} />
    <Route path={accountPaths.baseUrl} element={<UserAccount />} />
    <Route path={accountPaths.userOrderDetailsUrl} element={<OrderDetails />} />
    <Route path={paths.guestOrderDetailsUrl} element={<OrderDetails />} />
    <Route
      path={paths.micrositeGuestOrderDetailsUrl}
      element={<OrderDetails />}
    />
    <Route path={paths.accountUrl} element={<Account />} />
    <Route path={paths.micrositeAccountUrl} element={<Account />} />
    <Route path={paths.accountConfirmUrl} element={<AccountConfirm />} />
    <Route
      path={paths.micrositeAccountConfirmUrl}
      element={<AccountConfirm />}
    />
    <Route path={paths.orderHistoryUrl} element={<Account />} />
    <Route path={paths.micrositeOrderHistoryUrl} element={<Account />} />
    <Route path={paths.addressBookUrl} element={<Account />} />
    <Route path={paths.micrositeAddressBookUrl} element={<Account />} />
    <Route path={paths.passwordResetUrl} element={<PasswordReset />} />
    <Route path={paths.micrositePasswordResetUrl} element={<PasswordReset />} />
    <Route path={paths.checkoutUrl} element={<CheckoutPage logo={logo} />} />
    <Route path={paths.micrositeCheckoutUrl} element={<CheckoutPage />} />
    <Route path={paths.orderFinalizedUrl} element={<ThankYouPage />} />
    <Route path={paths.micrositeOrderFinalizedUrl} element={<ThankYouPage />} />
    <Route path={"/store/vendors/*"} element={<StorePage vendors={true} />} />
    <Route path={"/article/*"} element={<ArticlePage />} />
    <Route path={"/builder/*"} element={<BuilderPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
