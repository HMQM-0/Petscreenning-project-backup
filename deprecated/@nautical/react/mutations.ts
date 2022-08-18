import { mutationFactory } from "./useMutation";

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useCreateUserAddress = mutationFactory("setCreateUserAddress");
export const useUpdateUserAddress = mutationFactory("setUpdateuserAddress");

// Affiliate mutations
export const useAffiliateCode = mutationFactory("setAffiliateCodeUse");

// Wishlist mutation
export const useAddWishlistProduct = mutationFactory("setAddWishlistProduct");
export const useRemoveWishlistProduct = mutationFactory(
  "setRemoveWishlistProduct"
);
export const useAddWishlistProductVariant = mutationFactory(
  "setAddWishlistProductVariant"
);
export const useAddRemoveWishlistProductVariant = mutationFactory(
  "setRemoveWishlistProductVariant"
);
