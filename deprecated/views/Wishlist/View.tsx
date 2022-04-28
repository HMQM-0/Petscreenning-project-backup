// import "./scss/index.scss";

import * as React from "react";

import { WishlistContext } from "deprecated/@nautical/react/components/WishlistProvider/context";

// import { useHistory } from "react-router-dom";
import { Wishlist } from "@components/templates";
import { ShopContext } from "deprecated/components/ShopProvider/context";

import StorePage from "../Builder/StorePage";

const View: React.FC = () => {
  const { wishlist } = React.useContext(WishlistContext);
  const { builderKey } = React.useContext(ShopContext);

  return builderKey ? (
    <StorePage wishlist={wishlist} />
  ) : (
    <Wishlist wishlist={wishlist} />
  );
};

export default View;
