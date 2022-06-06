import "@builder.io/widgets";
import * as React from "react";
import { useTheme } from "@mui/material";
import { useAlert } from "react-alert";
import { StringParam, useQueryParam, useQueryParams } from "next-query-params";
import { Base64 } from "js-base64";
import { useQuery } from "@apollo/client";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { slugify } from "@utils/core";
import { useAuth, useCart } from "@nautical/react";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";
import { micrositesQuery } from "components/templates/Builder/queries.graphql";
import { FilterQuerySet } from "components/templates/ProductsList/View";
import {
  useAddWishlistProductMutation,
  useRemoveWishlistProductMutation,
} from "components/providers/Wishlist/mutations.graphql.generated";
import { WishlistDocument } from "components/providers/Wishlist/queries.graphql.generated";

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
  vendors?: boolean;
  variantSelect?: any;
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
  variantSelect,
}: IStorePage) => {
  const [, setSearchParams] = useQueryParams({
    q: StringParam,
  });
  const router = useRouter();
  const { user } = useAuth();
  const { addItem, items } = useCart();
  const theme = useTheme();
  const alert = useAlert();
  const intl = useIntl();

  const [, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

  const { wishlist: wishlistContext } = React.useContext(WishlistContext);

  const { data: builderMicrositesData } = useQuery(micrositesQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 100,
    },
  });

  const [setRemoveWishlistProduct] = useRemoveWishlistProductMutation();
  const [setAddWishlistProduct] = useAddWishlistProductMutation();

  return React.useMemo(() => {
    const clearFilters = () => {
      setAttributeFilters({});
    };

    function handleAddToCart(
      name: string,
      variantId: string,
      quantity: number
    ) {
      addItem(variantId, quantity);
      alert.show(
        {
          title: "Added " + quantity + "x " + name,
        },
        { type: "success" }
      );
    }

    function handleSetSearch(query: string) {
      setSearchParams({
        q: query,
      });
    }

    function handleNavigateById(id: string, name: string) {
      const rawId = Base64.decode(id).split(":");
      let schema = rawId[0];
      const primaryKey = rawId[1];
      const slug = slugify(name);
      if (schema.toLowerCase() === "microsite") {
        schema = "site";
      }
      router.push("/" + schema.toLowerCase() + "/" + slug + "/" + primaryKey);
    }

    function handleNavigateByItem(item: { id: string; name: string }) {
      const rawId = Base64.decode(item.id).split(":");
      let schema = rawId[0];
      const primaryKey = rawId[1];
      const slug = slugify(item.name);
      if (schema.toLowerCase() === "microsite") {
        schema = "site";
      }
      router.push("/" + schema.toLowerCase() + "/" + slug + "/" + primaryKey);
    }

    const isAddedToWishlist = async (productId: string) => {
      return (
        !!wishlistContext &&
        wishlistContext.some(({ product }) => product.id === productId)
      );
    };

    const addOrRemoveFromWishlist = async (productId: string) => {
      const addedToWishlist =
        !!wishlistContext &&
        wishlistContext.some(({ product }) => product.id === productId);

      if (!user) {
        alert.show(
          {
            content: `Please log in to add the product to your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Login required",
            }),
          },
          {
            timeout: 7500,
            type: "error",
          }
        );
      }
      if (addedToWishlist && user) {
        await setRemoveWishlistProduct({
          variables: { productId },
          refetchQueries: [
            WishlistDocument, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        });
        // update();
        alert.show(
          {
            content: `Removed product from your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Product removed",
            }),
          },
          {
            timeout: 7500,
            type: "success",
          }
        );
      } else if (!addedToWishlist && user) {
        await setAddWishlistProduct({
          variables: { productId },
          refetchQueries: [
            WishlistDocument, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        });
        alert.show(
          {
            content: `Added product to your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Product added",
            }),
          },
          {
            timeout: 7500,
            type: "success",
          }
        );
      }
    };

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
      vendors: sanitizeModel(builderMicrositesData),
      quantity: 1,
      theme: theme,
      cart: items,
      addToCart: (name: string, variantId: string, quantity: number) =>
        handleAddToCart(name, variantId, quantity),
      searchFor: (query: string) => handleSetSearch(query),
      navigate: (to: string, replace: boolean) =>
        replace ? router.replace(to) : router.push(to),
      navigateById: (id: string, name: string) => handleNavigateById(id, name),
      navigateByItem: (item: { id: string; name: string }) =>
        handleNavigateByItem(item),
      addOrRemoveFromWishlist: (productId: string) =>
        addOrRemoveFromWishlist(productId),
      isAddedToWishlist: (productId: string) => isAddedToWishlist(productId),
      // handleAttributeChange: onAttributeChange,
      decodeId: (id: string) => atob(id).split(":")[1],
      clearFilters: clearFilters,
      loadMore: () => loadMore(),
      loadNextPage: () => loadNextPage(),
      loadPrevPage: () => loadPrevPage(),
      variantSelect: variantSelect,
    };
  }, [
    addItem,
    alert,
    builderMicrositesData,
    category,
    collection,
    intl,
    items,
    landing,
    loadMore,
    loadNextPage,
    loadPrevPage,
    microsite,
    router,
    product,
    products,
    search,
    setAddWishlistProduct,
    setAttributeFilters,
    setRemoveWishlistProduct,
    setSearchParams,
    theme,
    user,
    variantSelect,
    wishlist,
    wishlistContext,
  ]);
};

export default useBuilderStateData;
