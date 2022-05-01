// import "./scss/index.module.scss";

import * as React from "react";

import { WishlistContext } from "deprecated/@nautical/react/components/WishlistProvider/context";

// import { useHistory } from "react-router-dom";
import { Wishlist } from "@components/templates";
import { useShopContext } from "components/providers/ShopProvider";

import StorePage from "../Builder/StorePage";

const View: React.FC = () => {
  const { wishlist } = React.useContext(WishlistContext);
  const { builderKey } = useShopContext();

  return builderKey ? (
    <StorePage wishlist={wishlist} />
  ) : (
    <Wishlist wishlist={wishlist} />
  );
};

export default View;
