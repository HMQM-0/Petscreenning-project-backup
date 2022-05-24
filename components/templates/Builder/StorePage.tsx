// TODO: This component will be deleted - we will use the useBuilderStateData hook instead and pass the values directly to BuilderComponent from the builder package

import "@builder.io/widgets";
import * as React from "react";
// import appState from '@builder.io/app-context';
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { CircularProgress, useTheme } from "@mui/material";
import { useAlert } from "react-alert";
import { StringParam, useQueryParam, useQueryParams } from "next-query-params";
import { Base64 } from "js-base64";
import queryString from "query-string";
import { useQuery } from "@apollo/client";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { slugify } from "@utils/core";
import {
  useAddWishlistProduct,
  useAuth,
  useCart,
  useRemoveWishlistProduct,
} from "@nautical/react";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";
import { userWishlist } from "components/providers/Wishlist/queries.graphql";

import { micrositesQuery } from "./queries.graphql";

import { FilterQuerySet } from "../ProductsList/View";

// import { useProductVariantsAttributes, useProductVariantsAttributesValuesSelection } from "@hooks";

const model = "store";
var type = "/store/product";
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

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

const StorePage: React.FunctionComponent<IStorePage> = (props) => {
  const {
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
  } = props;
  const [searchParams, setSearchParams] = useQueryParams({
    q: StringParam,
  });
  const router = useRouter();
  const { user } = useAuth();
  const [pageJson, setPage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;
  const { addItem, items } = useCart();
  const theme = useTheme();
  const alert = useAlert();
  const intl = useIntl();

  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const { wishlist: wishlistContext } = React.useContext(WishlistContext);

  const { data: builderMicrositesData } = useQuery(micrositesQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 100,
    },
  });

  // const productVariantAttributes = useProductVariantsAttributes(product?.variants || []);

  // const [productVariantsAttributesSelectedValues, selectProductVariantsAttributesValue] = useProductVariantsAttributesValuesSelection(productVariantAttributes);

  const [selectedVariant, setSelectedVariant] = React.useState(
    product?.defaultVariant
  );

  // function getSelectedVariant() {
  //   // attributeSelections
  //   // [{
  //   //   id: attributeId,
  //   //   value: attributeValueId
  //   // }, ...]
  //   const selectedVariant = product.variants.find((productVariant) => {
  //     return productVariant.attributes.every((productVariantAttribute) => {
  //       const productVariantAttributeId = productVariantAttribute.attribute.id;
  //       if (
  //         productVariantAttribute.values[0] &&
  //         productVariantsAttributesSelectedValues[productVariantAttributeId] &&
  //         productVariantAttribute.values[0]!.id ===
  //           productVariantsAttributesSelectedValues[productVariantAttributeId]!
  //             .id
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   });
  //   return selectedVariant;
  // }

  // React.useEffect(() => {
  //   console.info("USE EFFECT START")
  //   const newVariant = product?.variants?.find((productVariant) => {
  //     return productVariant.attributes.every((productVariantAttribute) => {
  //       const productVariantAttributeId = productVariantAttribute.attribute.id;
  //       if (
  //         productVariantAttribute.values[0] &&
  //         productVariantsAttributesSelectedValues[productVariantAttributeId] &&
  //         productVariantAttribute.values[0]!.id ===
  //           productVariantsAttributesSelectedValues[productVariantAttributeId]!
  //             .id
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   });
  //   console.info("USE EFFECT END")
  //   console.info(newVariant)
  //   setSelectedVariant(newVariant);
  //   // if (onChange) {
  //   //   onChange(productVariantsAttributesSelectedValues, selectedVariant);
  //   // }
  // }, [productVariantsAttributesSelectedValues]);

  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    router.push(
      queryString.stringifyUrl(
        {
          query: { [slug ?? ""]: value },
          url: `${location.pathname}${location.search}`,
        },
        { skipEmptyString: true }
      )
    );
  };

  const [setRemoveWishlistProduct] = useRemoveWishlistProduct();
  const [setAddWishlistProduct] = useAddWishlistProduct();


  const stateData = React.useMemo(() => {
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
        await setRemoveWishlistProduct(
          { productId },
          {
            refetchQueries: [
              userWishlist, // DocumentNode object parsed with gql
              "Wishlist", // Query name
            ],
          }
        );
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
        await setAddWishlistProduct(
          { productId },
          {
            refetchQueries: [
              userWishlist, // DocumentNode object parsed with gql
              "Wishlist", // Query name
            ],
          }
        );
        // update();
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
      // "variantId": product?.defaultVariant?.id || "",
      defaultVariant: sanitizeModel(product?.defaultVariant),
      // "selectedVariant": sanitizeModel(selectedVariant),
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

  // console.info("SANITIZED STATE DATA")
  // console.info(stateData)

  React.useEffect(() => {
    function getStoreModel() {
      if (search) return "/store/search";
      if (category) return "/store/category";
      if (collection) return "/store/collection";
      if (product) return "/store/product";
      if (landing) return "/store/landing";
      if (products) return "/store/products";
      if (wishlist) return "/store/wishlist";
      if (microsite) return "/store/microsite";
      if (vendors) return "/store/vendors";
    }

    type = getStoreModel() ?? "/store/landing";
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        // const path = window.location.pathname;
        const content = await builder.get(model, { url: type }).promise();
        setPage(content);
        setLoading(false);
      };
      fetchPage();
    }
  }, [
    category,
    collection,
    isEditingOrPreviewing,
    landing,
    microsite,
    product,
    products,
    search,
    vendors,
    wishlist,
  ]);

  if (pageJson || isEditingOrPreviewing) {
    return (
      <BuilderComponent model={model} content={pageJson} data={stateData} />
    );
  }
  
  if (isLoading) {
    return <CircularProgress sx={{ placeSelf: "center" }} />;
  }
  
  return <NoComponent />;
};

export default StorePage;
