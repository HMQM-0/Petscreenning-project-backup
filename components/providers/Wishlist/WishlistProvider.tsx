import React from "react";

import { useWishlistQuery } from "@generated";

import { WishlistContext } from "./context";

const WISHLIST_ITEMS_PER_API_CALL = 100;

interface IProps {
  children: React.ReactNode;
}

const WishlistProvider = ({ children }: IProps) => {
  const { data, loading, error, refetch, fetchMore } = useWishlistQuery({
    variables: {
      first: WISHLIST_ITEMS_PER_API_CALL,
    },
  });

  const hasNextPage = data?.me?.wishlist?.pageInfo.hasNextPage ?? false;
  const endCursor = data?.me?.wishlist?.pageInfo.endCursor;

  React.useEffect(() => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: endCursor,
          first: WISHLIST_ITEMS_PER_API_CALL,
        },
      });
    }
  }, [endCursor, fetchMore, hasNextPage]);

  const update = () => {
    refetch({
      first: WISHLIST_ITEMS_PER_API_CALL,
    });
  };

  const wishlist = data?.me?.wishlist?.edges.map(({ node }) => node) ?? [];

  const getContext = () => ({
    error: error ?? null,
    loading,
    update,
    wishlist,
  });

  return (
    <WishlistContext.Provider value={getContext()}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
