// This component to be refactored (and probably combined with BuilderProducts and Categories) in Builder related task
import React from "react";
import { Box } from "@mui/material";
import { StringParam, useQueryParam } from "next-query-params";

import { Loader } from "components/atoms/Loader/Loader";

import {
  TypedBuilderCategoryQuery,
  TypedBuilderCategoryProductsQuery,
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
} from "./queries";

import {
  MetaWrapper,
  NotFound,
  OfflinePlaceholder,
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
} from "../../components";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import NetworkStatus from "../../components/NetworkStatus";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved,import/order
import { PRODUCTS_PER_PAGE } from "../../core/config";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import StorePage from "../Builder/StorePage";
import {
  TypedBuilderCollectionProductsDataQuery,
  TypedBuilderCollectionProductsQuery
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
} from "../../../deprecated/views/Collection/queries";

export const View = ({ variables }: any) => {
  const [, setAfterFilters] = useQueryParam("after", StringParam);
  const [, setBeforeFilters] = useQueryParam("before", StringParam);
  const [, setFirstFilters] = useQueryParam("first", StringParam);
  const [, setLastFilters] = useQueryParam("last", StringParam);
  return (
    <NetworkStatus>
      {(isOnline: any) => (
        <TypedBuilderCollectionProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {(collectionData: any) => {
            if (collectionData.loading) {
              return <Loader />;
            }

            if (
              collectionData.data &&
              collectionData.data.collection === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!collectionData.data?.attributeList?.attributes &&
              !!collectionData.data?.collection?.name;

            return (
              <TypedBuilderCollectionProductsQuery
                // @ts-ignore
                variables={variables}
              >
                {(collectionProductsData: any) => {
                  if (!canDisplayFilters && collectionProductsData.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    // const handleLoadMore = () =>
                    //   collectionProductsData.loadMore(
                    //     (prev, next) => ({
                    //       collection: {
                    //         ...prev.collection,
                    //         productList: {
                    //           ...prev.collection.productList,
                    //           products: [
                    //             ...prev.collection.productList.products,
                    //             ...next.collection.productList.products,
                    //           ],
                    //           pageInfo: next.collection.productList.pageInfo,
                    //         },
                    //       },
                    //     }),
                    //     {
                    //       after:
                    //         collectionProductsData.data.collection.productList
                    //           .pageInfo.endCursor,
                    //     }
                    //   );

                    const loadNextPage = () => {
                      setBeforeFilters(null);
                      setLastFilters(null);
                      setAfterFilters(
                        // @ts-ignore
                        collectionProductsData.data.collection.productList
                          .pageInfo.endCursor
                      );
                      setFirstFilters(PRODUCTS_PER_PAGE);
                    };

                    const loadPrevPage = () => {
                      setAfterFilters(null);
                      setFirstFilters(null);
                      setBeforeFilters(
                        // @ts-ignore
                        collectionProductsData.data.collection.productList
                          .pageInfo.startCursor
                      );
                      setLastFilters(PRODUCTS_PER_PAGE);
                    };

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                          // @ts-ignore
                          collectionData.data.collection.seoDescription,
                          // @ts-ignore
                          title: collectionData.data.collection.seoTitle,
                          type: "product.collection",
                        }}
                      >
                        <StorePage
                          collection={{
                            ...collectionData.data,
                            ...collectionProductsData.data,
                          }}
                          loadNextPage={loadNextPage}
                          loadPrevPage={loadPrevPage}
                        />
                      </MetaWrapper>
                    );
                  }

                  return null;
                }}
              </TypedBuilderCollectionProductsQuery>
            );
          }}
        </TypedBuilderCollectionProductsDataQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
