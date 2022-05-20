import React, { useContext } from "react";

import { WishlistContext } from "components/providers/Wishlist/context";
import { useShopContext } from "components/providers/ShopProvider";
import { Loader } from "components/atoms/Loader";
import { WishlistTable } from "components/molecules/WishlistTable/WishlistTable";

import * as S from "./styles";


// import StorePage from "../Builder/StorePage";

const View: React.FC = () => {
  const { wishlist, loading } = useContext(WishlistContext);
  const { builderKey } = useShopContext();

  if (builderKey) {
    // TODO: To be refactored and uncommented in a separate task
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
