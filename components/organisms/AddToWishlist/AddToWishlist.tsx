import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { AddToWishlistButton } from "components/molecules/AddToWishlistButton";
import { WishlistContext } from "components/providers/Wishlist/context";
// TODO: Refactor
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useAuth,
} from "@nautical/react";
// TODO: Refactor
import { userWishlist } from "@nautical/queries/wishlist";

import { IProps } from "./types";

export const AddToWishlist = ({
  productId,
  showButtonText = true,
}: IProps) => {
  // const { wishlist, update } = React.useContext(WishlistContext);
  const { wishlist } = useContext(WishlistContext);
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  const isAddedToWishlist = () => {
    return (
      !!wishlist && wishlist.some(({ product }) => product.id === productId)
    );
  };

  const [addedToWishlist, setAddedToWishlist] = useState(
    isAddedToWishlist()
  );
  React.useEffect(() => {
    const added = isAddedToWishlist();
    if (added !== addedToWishlist) {
      setAddedToWishlist(added);
    }
  }, [wishlist]);
  const [
    addWishlistProduct,
    // { loading: addLoading, error: addError },
  ] = useAddWishlistProduct({ productId });
  const [
    removeWishlistProduct,
    // { loading: errorLoading, error: removeError },
  ] = useRemoveWishlistProduct({ productId });

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
    if (addedToWishlist && user) {
      removeWishlistProduct(
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
      addWishlistProduct(
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

  return (
    <AddToWishlistButton
      added={addedToWishlist}
      onClick={addOrRemoveFromWishlist}
      showText={showButtonText}
    />
  );
};
