// This component to be refactored (and probably combined with BuilderProducts and Collections) in Builder related task
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

export const View = ({ variables }: any) => {
  const [, setAfterFilters] = useQueryParam("after", StringParam);
  const [, setBeforeFilters] = useQueryParam("before", StringParam);
  const [, setFirstFilters] = useQueryParam("first", StringParam);
  const [, setLastFilters] = useQueryParam("last", StringParam);
  return (
    <NetworkStatus>
      {(isOnline: any) => (
        <TypedBuilderCategoryQuery variables={variables}>
          {(builderCategoryData: any) => {
            if (builderCategoryData.loading) {
              return <Loader />;
            }

            if (
              builderCategoryData.data &&
              builderCategoryData.data.category === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!builderCategoryData.data?.attributeList?.attributes &&
              !!builderCategoryData.data?.category?.name;

            return (
              <TypedBuilderCategoryProductsQuery
                // @ts-ignore
                variables={variables}
              >
                {(builderCategoryProducts: any) => {
                  if (!canDisplayFilters && builderCategoryProducts.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    // const handleLoadMore = () =>
                    //   builderCategoryProducts.loadMore(
                    //     (prev, next) => ({
                    //       ...prev,
                    //       productList: {
                    //         ...prev.productList,
                    //         products: [
                    //           ...prev.productList.products,
                    //           ...next.productList.products,
                    //         ],
                    //         pageInfo: next.productList.pageInfo,
                    //       },
                    //     }),
                    //     {
                    //       after:
                    //         builderCategoryProducts.data.productList.pageInfo.endCursor,
                    //     }
                    //   );
                    const loadNextPage = () => {
                      setBeforeFilters(null);
                      setLastFilters(null);
                      setAfterFilters(
                        builderCategoryProducts.data.productList.pageInfo
                          .endCursor
                      );
                      setFirstFilters(PRODUCTS_PER_PAGE);
                    };

                    const loadPrevPage = () => {
                      setAfterFilters(null);
                      setFirstFilters(null);
                      setBeforeFilters(
                        builderCategoryProducts.data.productList.pageInfo
                          .startCursor
                      );
                      setLastFilters(PRODUCTS_PER_PAGE);
                    };

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                          builderCategoryData.data.category.seoDescription,
                          title: builderCategoryData.data.category.seoTitle,
                          type: "product.category",
                        }}
                      >
                        <Box style={{ textAlign: "center" }}>
                          <StorePage
                            category={{
                              ...builderCategoryData.data,
                              ...builderCategoryProducts.data,
                            }}
                            loadNextPage={loadNextPage}
                            loadPrevPage={loadPrevPage}
                          />
                          {/* {builderCategoryData.data && builderCategoryProducts.data.productList?.pageInfo?.hasNextPage &&
                          <Box style={{ marginBottom: "20px", marginLeft: "auto", marginRight: "auto" }}>
                            <Button
                              variant="contained"
                              // testingContext="loadMoreProductsButton"
                              color="secondary"
                              onClick={handleLoadMore}
                              // ref={moreButton}
                            >
                              <FormattedMessage defaultMessage="More +" />
                            </Button>
                          </Box>} */}
                        </Box>
                      </MetaWrapper>
                    );
                  }

                  return null;
                }}
              </TypedBuilderCategoryProductsQuery>
            );
          }}
        </TypedBuilderCategoryQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
