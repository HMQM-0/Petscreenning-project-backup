import { isEmpty } from "lodash";
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Loader } from "components/atoms/Loader";
import { useAuth, useCart } from "@nautical/react";
import {
  useNetworkStatus,
} from "@hooks";
import NotFound from "components/molecules/NotFound";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import { useProductDetailsQuery, ProductDetailsFragment, VariantAttributeFragment, AttributeValue } from "@generated";
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

const PageWithQueryAttributes = (props: IProps) => {
  const { product } = props;
  const router = useRouter();
  const searchQueryAttributes = router.query;

  useEffect(() => {
    const defaultVariantQueryAttributes: Record<string, string> = {};
    product.defaultVariant?.attributes?.forEach(({ attribute, values }) => {
      // TODO: BE issue? Can slug be null?
      const attributeSlug = attribute.slug || attribute.id;
      const value = values[0]?.value;
      if (value && !searchQueryAttributes[attributeSlug]) {
        // Assign default value only if there is no value selected yet (and default value exists)
        defaultVariantQueryAttributes[attributeSlug] = value;
      }
    });

    if (!isEmpty(defaultVariantQueryAttributes)) {
      // Change URL in case of the attribute's default values were not present in the URL
      router.replace(
        {
          query: {
            ...router.query,
            ...defaultVariantQueryAttributes,
          },
        },
      );
    }
  }, [searchQueryAttributes, product.defaultVariant, router]);

  return (
    <Page {...props} />
  );
};

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
    <PageWithQueryAttributes
      product={product}
      add={addItem}
      items={items}
    />
  );
};

export default View;
