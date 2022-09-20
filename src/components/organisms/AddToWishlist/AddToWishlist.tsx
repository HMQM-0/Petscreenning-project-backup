import React from "react";
import { AlertType, useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { AddToWishlistButton } from "src/components/molecules/AddToWishlistButton";
import { useAuth, useWishlist } from "nautical-api";
import { userWishlist } from "src/components/providers/Nautical/Wishlist/queries.graphql";
import {
  useAddWishlistProductMutation,
  useRemoveWishlistProductMutation,
} from "src/components/providers/Nautical/Wishlist/mutations.graphql.generated";
import { IProps as NotificationProps } from "src/components/atoms/NotificationTemplate/types";

import { IProps } from "./types";

export const useIsAddedToWishlist = () => {
  const { wishlist } = useWishlist();
  return (productId: string) => !!wishlist && wishlist.some(({ product }) => product.id === productId);
};

export const useAddOrRemoveToWishlist = () => {
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  const isAddedToWishlist = useIsAddedToWishlist();

  const [addWishlistProduct] = useAddWishlistProductMutation({});
  const [removeWishlistProduct] = useRemoveWishlistProductMutation({});

  const showAlert = (message: NotificationProps["message"], type: AlertType = "success") => {
    alert.show(message, {
      timeout: 7500,
      type,
    });
  };

  return (productId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      showAlert(
        {
          content: `Please log in to add the product to your wishlist`,
          title: intl.formatMessage({
            defaultMessage: "Login required",
          }),
        },
        "error",
      );
      return;
    }
    if (isAddedToWishlist(productId)) {
      removeWishlistProduct({
        variables: { productId },
        refetchQueries: [
          userWishlist, // DocumentNode object parsed with gql
          "Wishlist", // Query name
        ],
      });
      showAlert({
        content: `Removed product from your wishlist`,
        title: intl.formatMessage({
          defaultMessage: "Product removed",
        }),
      });
    } else {
      addWishlistProduct({
        variables: { productId },
        refetchQueries: [
          userWishlist, // DocumentNode object parsed with gql
          "Wishlist", // Query name
        ],
      });
      showAlert({
        content: `Added product to your wishlist`,
        title: intl.formatMessage({
          defaultMessage: "Product added",
        }),
      });
    }
  };
};

export const AddToWishlist = ({ productId, showButtonText = true }: IProps) => {
  const isAddedToWishlist = useIsAddedToWishlist();
  const addOrRemoveFromWishlist = useAddOrRemoveToWishlist();
  const addOrRemoveFromWishlistHandler = addOrRemoveFromWishlist(productId);
  return (
    <AddToWishlistButton
      added={isAddedToWishlist(productId)}
      onClick={addOrRemoveFromWishlistHandler}
      showText={showButtonText}
    />
  );
};
