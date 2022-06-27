import React, { useContext, useMemo } from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { AddToWishlistButton } from "components/molecules/AddToWishlistButton";
import { useAuth, useWishlist } from "nautical-api";
import { userWishlist } from "components/providers/Nautical/Wishlist/queries.graphql";
import {
  useAddWishlistProductMutation,
  useRemoveWishlistProductMutation,
} from "components/providers/Nautical/Wishlist/mutations.graphql.generated";

import { IProps } from "./types";

export const AddToWishlist = ({ productId, showButtonText = true }: IProps) => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  const isAddedToWishlist = useMemo(
    () => !!wishlist && wishlist.some(({ product }) => product.id === productId),
    [wishlist, productId]
  );

  const [addWishlistProduct] = useAddWishlistProductMutation({
    variables: { productId },
  });
  const [removeWishlistProduct] = useRemoveWishlistProductMutation({
    variables: { productId },
  });

  const addOrRemoveFromWishlist = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
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
    if (isAddedToWishlist) {
      removeWishlistProduct({
        variables: { productId },
        refetchQueries: [
          userWishlist, // DocumentNode object parsed with gql
          "Wishlist", // Query name
        ],
      });
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
    } else if (!isAddedToWishlist) {
      addWishlistProduct({
        variables: { productId },
        refetchQueries: [
          userWishlist, // DocumentNode object parsed with gql
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

  return <AddToWishlistButton added={isAddedToWishlist} onClick={addOrRemoveFromWishlist} showText={showButtonText} />;
};
