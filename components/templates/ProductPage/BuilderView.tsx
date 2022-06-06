// To be refactored separately in Builder related task
import React from "react";
import { useParams } from "react-router";

import { Loader } from "components/atoms/Loader";
import { useCart } from "@nautical/react";
import { getGraphqlIdFromDBId } from "core/utils";
import NetworkStatus from "components/atoms/NetworkStatus";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TypedBuilderProductDetailsQuery } from "./queries";


const BuilderView = () => {
  const { addItem, items } = useCart();
  const params = useParams();


  return (
    <TypedBuilderProductDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(params.id!, "Product"),
      }}
      errorPolicy="all"
      key={params.id}
    >
      {({ data, loading }: any) => (
        // @ts-ignore
        <NetworkStatus>
          {(isOnline: any) => {
            const { product } = data;

            if (loading) {
              return <Loader />;
            }

            if (product === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            return (
              // @ts-ignore
              // eslint-disable-next-line react/jsx-no-undef
              <PageWithQueryAttributes
                microsite={null}
                product={product}
                add={addItem}
                items={items as any}
              />
            );
          }}
        </NetworkStatus>
      )}
    </TypedBuilderProductDetailsQuery>
  );
};

export default BuilderView;
