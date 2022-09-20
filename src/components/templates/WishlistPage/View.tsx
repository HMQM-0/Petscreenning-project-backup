import React, { useContext } from "react";

import { useShopContext } from "src/components/providers/ShopProvider";
import { Loader } from "src/components/atoms/Loader";
import { WishlistTable } from "src/components/molecules/WishlistTable/WishlistTable";
import { useWishlist } from "nautical-api";

import * as S from "./styles";

// import StorePage from "../Builder/StorePage";

const View: React.FC = () => {
  const { wishlist, loading } = useWishlist();
  const { builderKey } = useShopContext();

  if (builderKey) {
    // return <StorePage wishlist={wishlist} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <S.Wrapper>
      <WishlistTable wishlist={wishlist} />
    </S.Wrapper>
  );
};

export default View;
