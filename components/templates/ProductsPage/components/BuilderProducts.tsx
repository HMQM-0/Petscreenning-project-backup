import * as React from "react";
import { useQuery } from "@apollo/client";
import { useQueryParam, StringParam } from 'next-query-params';

import { Loader } from "components/atoms/Loader";
import {
  maybe,
} from "core/utils";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import NetworkStatus from "components/atoms/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "core/config";

import { builderProductsQuery } from "../queries.graphql";
import {
  BuilderProducts as IBuilderProducts,
  BuilderProductsVariables,
} from "../gqlTypes/BuilderProducts";

interface BuilderProductsProps {
  variables: any;
}

// TODO: This component to be refactored during StorePage implementation?
const BuilderProducts = ({
  variables,
}: BuilderProductsProps) => {
  const [, setAfterFilters] = useQueryParam("after", StringParam);
  const [, setBeforeFilters] = useQueryParam("before", StringParam);
  const [, setFirstFilters] = useQueryParam("first", StringParam);
  const [, setLastFilters] = useQueryParam("last", StringParam);

  const { data: builderProductsData, loading: builderProductsLoading } =
    useQuery<IBuilderProducts, BuilderProductsVariables>(builderProductsQuery, {
      // @ts-ignore
      variables: variables,
    });

  const loadNextPage = () => {
    setBeforeFilters(null);
    setLastFilters(null);
    // @ts-ignore
    setAfterFilters(builderProductsData.productList.pageInfo.endCursor);
    // @ts-ignore
    setFirstFilters(PRODUCTS_PER_PAGE);
  };

  const loadPrevPage = () => {
    setAfterFilters(null);
    setFirstFilters(null);
    // @ts-ignore
    setBeforeFilters(builderProductsData.productList.pageInfo.startCursor);
    // @ts-ignore
    setLastFilters(PRODUCTS_PER_PAGE);
  };

  return (
    <NetworkStatus>
      {(isOnline) => {
        if (builderProductsLoading) {
          return <Loader />;
        }

        const canDisplayFilters = maybe(
          () => !!builderProductsData?.attributes?.edges,
          false
        );

        if (canDisplayFilters) {
          // TODO: To be added in future tasks
          // return (
          //   <StorePage
          //     products={builderProductsData}
          //     loadNextPage={loadNextPage}
          //     loadPrevPage={loadPrevPage}
          //   />
          // );
        }

        if (builderProductsData === null) {
          return <NotFound />;
        }

        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        return <Loader />;
      }}
    </NetworkStatus>
  );
};

export default BuilderProducts;
