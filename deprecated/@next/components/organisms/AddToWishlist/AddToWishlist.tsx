import React from "react";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useAuth,
} from "@nautical/react";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";

import { IProps } from "./types";
import { AddToWishlistButton } from "@components/molecules/AddToWishlistButton";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { userWishlist } from "@nautical/queries/wishlist";

export const AddToWishlist: React.FC<IProps> = ({
  productId,
  showButtonText = true,
}: IProps) => {
  // const { wishlist, update } = React.useContext(WishlistContext);
  const { wishlist } = React.useContext(WishlistContext);
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  const isAddedToWishlist = () => {
    return (
      !!wishlist && wishlist.some(({ product }) => product.id === productId)
    );
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
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
