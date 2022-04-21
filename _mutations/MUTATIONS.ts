import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from "@apollo/client";

import {
  AccountUpdateMutation,
  AccountUpdateMutationVariables,
  AddWishlistProductMutation,
  AddWishlistProductMutationVariables,
  AddWishlistProductVariantMutation,
  AddWishlistProductVariantMutationVariables,
  AffiliateCodeUseMutation,
  AffiliateCodeUseMutationVariables,
  BulkFulfillmentReturnMutation,
  BulkFulfillmentReturnMutationVariables,
  CreateUserAddressMutation,
  CreateUserAddressMutationVariables,
  DeleteUserAddressMutation,
  DeleteUserAddressMutationVariables,
  NauticalOrderReturnFromStorefrontNotificationMutation,
  NauticalOrderReturnFromStorefrontNotificationMutationVariables,
  PasswordChangeMutation,
  PasswordChangeMutationVariables,
  RemoveWishlistProductMutation,
  RemoveWishlistProductMutationVariables,
  RemoveWishlistProductVariantMutation,
  RemoveWishlistProductVariantMutationVariables,
  SetCustomerDefaultAddressMutation,
  SetCustomerDefaultAddressMutationVariables,
  SetPasswordMutation,
  SetPasswordMutationVariables,
  UpdateUserAddressMutation,
  UpdateUserAddressMutationVariables,
  VendorOrderReturnFromStorefrontNotificationMutation,
  VendorOrderReturnFromStorefrontNotificationMutationVariables,
} from "@generated";

import * as Address from "./address";
import * as Returns from "./returns";
import * as ReturnsNotifications from "./returnsNotification";
import * as User from "./user";
import * as Affiliate from "./affiliates";
import * as Wishlist from "./wishlist";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

/**
 * @deprecated
 * TODO: This needs to go
 */
export const MUTATIONS = {
  AffiliateCodeUse: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AffiliateCodeUseMutation,
      AffiliateCodeUseMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Affiliate.useAffiliateCodeMutation,
      ...options,
    }),
  AccountUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AccountUpdateMutation,
      AccountUpdateMutationVariables
    >
  ) =>
    client.mutate({
      mutation: User.accountUpdate,
      ...options,
    }),
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddressMutation,
      SetCustomerDefaultAddressMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Address.setCustomerDefaultAddress,
      ...options,
    }),
  AddWishlistProduct: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AddWishlistProductMutation,
      AddWishlistProductMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Wishlist.addWishlistProduct,
      ...options,
    }),
  AddWishlistProductVariant: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AddWishlistProductVariantMutation,
      AddWishlistProductVariantMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Wishlist.addWishlistProductVariant,
      ...options,
    }),
  RemoveWishlistProduct: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      RemoveWishlistProductMutation,
      RemoveWishlistProductMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Wishlist.removeWishlistProduct,
      ...options,
    }),
  RemoveWishlistProductVariant: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      RemoveWishlistProductVariantMutation,
      RemoveWishlistProductVariantMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Wishlist.removeWishlistProductVariant,
      ...options,
    }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      CreateUserAddressMutation,
      CreateUserAddressMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Address.createUserAddress,
      ...options,
    }),
  BulkFulfillmentReturn: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      BulkFulfillmentReturnMutation,
      BulkFulfillmentReturnMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Returns.bulkFulfillmentReturn,
      ...options,
    }),
  NauticalBulkFulfillmentReturnDashboardNotification: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      NauticalOrderReturnFromStorefrontNotificationMutation,
      NauticalOrderReturnFromStorefrontNotificationMutationVariables
    >
  ) =>
    client.mutate({
      mutation:
        ReturnsNotifications.nauticalBulkFulfillmentReturnDashboardNotification,
      ...options,
    }),
  VendorBulkFulfillmentReturnDashboardNotification: async <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      VendorOrderReturnFromStorefrontNotificationMutation,
      VendorOrderReturnFromStorefrontNotificationMutationVariables
    >
  ) =>
    client.mutate({
      mutation:
        ReturnsNotifications.vendorBulkFulfillmentReturnDashboardNotification,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      DeleteUserAddressMutation,
      DeleteUserAddressMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Address.deleteUserAddress,
      ...options,
    }),
  PasswordChange: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      PasswordChangeMutation,
      PasswordChangeMutationVariables
    >
  ) =>
    client.mutate({
      mutation: User.changeUserPassword,
      ...options,
    }),
  SetPassword: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetPasswordMutation, SetPasswordMutationVariables>
  ) =>
    client.mutate({
      mutation: User.setPassword,
      ...options,
    }),
  YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: any
  ) =>
    client.mutate({
      mutation: User.yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord,
      ...options,
    }),
  YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: any
  ) =>
    client.mutate({
      mutation: User.yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateUserAddressMutation,
      UpdateUserAddressMutationVariables
    >
  ) =>
    client.mutate({
      mutation: Address.updateUserAddress,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
