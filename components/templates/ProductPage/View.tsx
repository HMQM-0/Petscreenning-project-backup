import React, { useContext } from "react";

import { Loader } from "components/atoms/Loader";
import { useAuth, useCart } from "@nautical/react";
import {
  useNetworkStatus,
} from "@hooks";
import NotFound from "components/molecules/NotFound";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import { useProductDetailsQuery, ProductDetailsFragment } from "@generated";
import { IItems } from "@nautical/api/Cart/types";
import LoginToViewProducts from "components/organisms/LoginToViewProducts/LoginToViewProducts";
import { ShopContext } from "components/providers/ShopProvider/context";

import Page from "./Page";

// import BuilderView from "./BuilderView";


export interface IProps {
  product: ProductDetailsFragment;
  add: (variantId: string, quantity: number) => void;
  items: IItems;
}

type ViewProps = {
  id: string;
};

const View = ({ id: productId }: ViewProps) => {
  const { addItem, items } = useCart();

  const { user } = useAuth();

  const { builderKey, loginForProducts } = useContext(ShopContext);

  const { online: isOnline } = useNetworkStatus();

  const { loading, data } = useProductDetailsQuery({
    variables: {
      id: productId,
    },
    errorPolicy: "all",
  });

  const product = data?.product;

  if (!user && loginForProducts) {
    return <LoginToViewProducts />;
  }

  if (loading) {
    return <Loader />;
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
