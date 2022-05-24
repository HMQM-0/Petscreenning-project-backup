// TODO: Do we need this component at all?
//  I guess microsite will redirect to regular Product page
import React from "react";
import { useParams } from "react-router";

import { Loader } from "components/atoms/Loader";
import { useCart } from "@nautical/react";
import { getGraphqlIdFromDBId } from "core/utils";
import NetworkStatus from "components/atoms/NetworkStatus";
import NotFound from "components/molecules/NotFound";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TypedProductDetailsQuery } from "./queries";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TypedMicrositeQuery } from "../Microsites/queries";

const MicrositeView = () => {
  const { addItem, items } = useCart();
  const params = useParams();

  return (
    <TypedMicrositeQuery
      variables={{
        id: getGraphqlIdFromDBId(params.micrositeId!, "Microsite"),
      }}
    >
      {({
        data: micrositeData,
        loading: micrositeLoading,
        error: micrositeError,
      }: any) => {
        if (micrositeLoading) {
          return <Loader />;
        }

        if (micrositeData?.microsite === null) {
          return <NotFound />;
        }

        if (micrositeData?.microsite && !micrositeLoading && !micrositeError) {
          return (
            <TypedProductDetailsQuery
              loaderFull
              variables={{
                id: getGraphqlIdFromDBId(params?.id!, "Product"),
              }}
              errorPolicy="all"
              key={params?.id}
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
                        microsite={micrositeData.microsite}
                        product={product}
                        add={addItem}
                        items={items as any}
                      />
                    );
                  }}
                </NetworkStatus>
              )}
            </TypedProductDetailsQuery>
          );
        }
      }}
    </TypedMicrositeQuery>
  );
};

export default MicrositeView;
