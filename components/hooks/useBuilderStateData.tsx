import "@builder.io/widgets";
import * as React from "react";
import { useTheme } from "@mui/material";
import { useAlert } from "react-alert";
import { StringParam, useQueryParam, useQueryParams } from "next-query-params";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { MicrositesQueryResult } from "components/templates/VendorsPage/queries.graphql.generated";
import { generateUrlByGraphqlId, getDBIdFromGraphqlId } from "core/utils";
import { FilterQuerySet, useAddOrRemoveToWishlist, useIsAddedToWishlist } from "components/organisms";
import { useHandleAddToCart } from "components/templates/ProductPage/Page";
import {
  useAddWishlistProductMutation,
  useRemoveWishlistProductMutation,
} from "components/providers/Nautical/Wishlist/mutations.graphql.generated";
import { useAuth, useWishlist, useCart } from "nautical-api";

interface IStorePage {
  category?: any;
  collection?: any;
  product?: any;
  landing?: any;
  products?: any;
  loadMore?: any;
  loadNextPage?: any;
  loadPrevPage?: any;
  search?: any;
  wishlist?: any;
  microsite?: any;
  vendors?: MicrositesQueryResult["data"];
  error?: any;
  notFound?: any;
}

function sanitizeModel(model: any) {
  if (model === null || model === undefined) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(model));
  }
}

const useBuilderStateData = ({
  category,
  collection,
  product,
  landing,
  products,
  loadMore,
  loadNextPage,
  loadPrevPage,
  search,
  wishlist,
  microsite,
  vendors,
  error,
  notFound,
}: IStorePage) => {
  const [, setSearchParams] = useQueryParams({
    q: StringParam,
  });
  const router = useRouter();
  const { user } = useAuth();
  const { items } = useCart();
  const theme = useTheme();
  const alert = useAlert();
  const intl = useIntl();
  const addToCartHandler = useHandleAddToCart();

  const addOrRemoveFromWishlist = useAddOrRemoveToWishlist();
  const isAddedToWishlist = useIsAddedToWishlist();

  const [, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

  const { wishlist: wishlistContext } = useWishlist();

  const [setRemoveWishlistProduct] = useRemoveWishlistProductMutation();
  const [setAddWishlistProduct] = useAddWishlistProductMutation();

  return React.useMemo(() => {
    const clearFilters = () => {
      setAttributeFilters({});
    };

    function handleAddToCart(name: string, variantId: string, quantity: number) {
      return addToCartHandler(variantId, quantity, name);
    }

    function handleSetSearch(query: string) {
      setSearchParams({
        q: query,
      });
    }

    function handleNavigateById(id: string, name: string) {
      router.push(generateUrlByGraphqlId(id, name));
    }

    function handleNavigateByItem(item: { id: string; name: string }) {
      return handleNavigateById(item.id, item.name);
    }

    return {
      category: sanitizeModel(category),
      collection: sanitizeModel(collection),
      product: sanitizeModel(product),
      defaultVariant: sanitizeModel(product?.defaultVariant),
      shop: sanitizeModel(landing),
      products: sanitizeModel(products),
      search: sanitizeModel(search),
      wishlist: sanitizeModel(wishlist),
      user: sanitizeModel(user),
      microsite: sanitizeModel(microsite),
      vendors: sanitizeModel(vendors),
      error: sanitizeModel(error),
      notFound: sanitizeModel(notFound),
      quantity: 1,
      theme: theme,
      cart: items,
      addToCart: handleAddToCart,
      searchFor: handleSetSearch,
      navigate: (to: string, replace: boolean) => (replace ? router.replace(to) : router.push(to)),
      navigateById: handleNavigateById,
      navigateByItem: handleNavigateByItem,
      addOrRemoveFromWishlist,
      isAddedToWishlist,
      decodeId: getDBIdFromGraphqlId,
      clearFilters,
      loadMore,
      loadNextPage,
      loadPrevPage,
    };
  }, [
    category,
    collection,
    product,
    landing,
    products,
    search,
    wishlist,
    user,
    microsite,
    vendors,
    error,
    notFound,
    theme,
    items,
    loadMore,
    loadNextPage,
    loadPrevPage,
    setAttributeFilters,
    addToCartHandler,
    setSearchParams,
    router,
    wishlistContext,
    alert,
    intl,
    setRemoveWishlistProduct,
    setAddWishlistProduct,
  ]);
};

export default useBuilderStateData;
