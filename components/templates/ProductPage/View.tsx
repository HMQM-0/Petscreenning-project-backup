import React, { useContext } from "react";

import { useAuth, useCart } from "@nautical/react";
import {
  useNetworkStatus,
} from "@hooks";
import NotFound from "components/molecules/NotFound";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { ShopContext } from "components/providers/ShopProvider/context";

import Page from "./Page";
import { ProductDetailsFragment } from "./queries.graphql.generated";

// import BuilderView from "./BuilderView";

type ViewProps = {
  product: ProductDetailsFragment;
};

const View = ({ product }: ViewProps) => {
  const { addItem, items } = useCart();

  const { user } = useAuth();

  const { builderKey, loginForProducts } = useContext(ShopContext);

  const { online: isOnline } = useNetworkStatus();

  if (!user && loginForProducts) {
    return <LoginToViewProducts />;
  }

  if (!product) {
    return <NotFound />;
  }

  if (!isOnline) {
    return <OfflinePlaceholder />;
  }

  if (builderKey) {
    // return (<BuilderView />);
  }

  return (
    <Page
      product={product}
      add={addItem}
      items={items}
    />
  );
};

export default View;
