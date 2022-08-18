import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from "@apollo/client";

import * as Address from "./address";
import * as Returns from "./returns";
import * as ReturnsNotifications from "./returnsNotification";
import * as Affiliate from "./affiliates";
import {
  DeleteUserAddress,
  DeleteUserAddressVariables,
} from "./gqlTypes/DeleteUserAddress";
import {
  CreateUserAddress,
  CreateUserAddressVariables,
} from "./gqlTypes/CreateUserAddress";
import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables,
} from "./gqlTypes/SetCustomerDefaultAddress";
import {
  UpdateUserAddress,
  UpdateUserAddressVariables,
} from "./gqlTypes/UpdateUserAddress";
import { SetPassword, SetPasswordVariables } from "./gqlTypes/SetPassword";
import {
  PasswordChange,
  PasswordChangeVariables,
} from "./gqlTypes/PasswordChange";
import {
  AccountUpdate,
  AccountUpdateVariables,
} from "./gqlTypes/AccountUpdate";
import {
  AffiliateCodeUse,
  AffiliateCodeUseVariables,
} from "./gqlTypes/AffiliateCode";
import { OrderReturn, OrderReturnVariables } from "./gqlTypes/OrderReturn";
import {
  NauticalOrderReturnNotification,
  OrderReturnNotification,
  OrderReturnNotificationVariables,
} from "./gqlTypes/OrderReturnNotification";

export type MutationOptions<TData, TVariables> = Omit<ApolloMutationOptions<TData, TVariables>,
  "mutation">;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AffiliateCodeUse: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AffiliateCodeUse, AffiliateCodeUseVariables>
  ) =>
    client.mutate({
      mutation: Affiliate.useAffiliateCodeMutation,
      ...options,
    }),
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.setCustomerDefaultAddress,
      ...options,
    }),
  // TODO: Ensure these work in new Wishlist Provider
  // AddWishlistProduct: <TCacheShape>(
  //   client: ApolloClient<TCacheShape>,
  //   options: MutationOptions<AddWishlistProduct, AddWishlistProductVariables>
  // ) =>
  //   client.mutate({
  //     mutation: Wishlist.addWishlistProduct,
  //     ...options,
  //   }),
  // AddWishlistProductVariant: <TCacheShape>(
  //   client: ApolloClient<TCacheShape>,
  //   options: MutationOptions<AddWishlistProductVariant,
  //     AddWishlistProductVariantVariables>
  // ) =>
  //   client.mutate({
  //     mutation: Wishlist.addWishlistProductVariant,
  //     ...options,
  //   }),
  // RemoveWishlistProduct: <TCacheShape>(
  //   client: ApolloClient<TCacheShape>,
  //   options: MutationOptions<RemoveWishlistProduct,
  //     RemoveWishlistProductVariables>
  // ) =>
  //   client.mutate({
  //     mutation: Wishlist.removeWishlistProduct,
  //     ...options,
  //   }),
  // RemoveWishlistProductVariant: <TCacheShape>(
  //   client: ApolloClient<TCacheShape>,
  //   options: MutationOptions<RemoveWishlistProductVariant,
  //     RemoveWishlistProductVariantVariables>
  // ) =>
  //   client.mutate({
  //     mutation: Wishlist.removeWishlistProductVariant,
  //     ...options,
  //   }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.createUserAddress,
      ...options,
    }),
  BulkFulfillmentReturn: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<OrderReturn, OrderReturnVariables>
  ) =>
    client.mutate({
      mutation: Returns.bulkFulfillmentReturn,
      ...options,
    }),
  NauticalBulkFulfillmentReturnDashboardNotification: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<NauticalOrderReturnNotification,
      OrderReturnNotificationVariables>
  ) =>
    client.mutate({
      mutation:
      ReturnsNotifications.nauticalBulkFulfillmentReturnDashboardNotification,
      ...options,
    }),
  VendorBulkFulfillmentReturnDashboardNotification: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<OrderReturnNotification,
      OrderReturnNotificationVariables>
  ) =>
    client.mutate({
      mutation:
      ReturnsNotifications.vendorBulkFulfillmentReturnDashboardNotification,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.deleteUserAddress,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.updateUserAddress,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
