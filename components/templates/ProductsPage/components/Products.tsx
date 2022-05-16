import * as React from "react";
import Media from "react-media";
import { useQueryParam, StringParam } from 'next-query-params';

import { xLargeScreen } from "@styles/constants";
import {
  maybe,
} from "core/utils";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import NetworkStatus from "components/atoms/NetworkStatus";
import { ProductsQueryVariables, useProductsQuery } from "@generated";
import { ProductFilters } from "types/Product";

import Page from "../Page";
import { FilterQuerySet } from "../View";

interface ProductsProps {
  variables: ProductsQueryVariables;
  filters: ProductFilters;
}

const Products = ({
  variables,
  filters,
}: ProductsProps) => {
  const [, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const { loading, data, fetchMore } = useProductsQuery({
    variables,
    errorPolicy: "all",
  });

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name: string, value: string) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes?.[name]?.length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              (item) => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const sortOptions = [
    {
      label: "Clear...",
      value: null,
    },
    {
      label: "Price Low-High",
      value: "price",
    },
    {
      label: "Price High-Low",
      value: "-price",
    },
    {
      label: "Name Increasing",
      value: "name",
    },
    {
      label: "Name Decreasing",
      value: "-name",
    },
    {
      label: "Last updated Ascending",
      value: "updated_at",
    },
    {
      label: "Last updated Descending",
      value: "-updated_at",
    },
  ];

  // TODO: Refactor NetworkStatus to a hook?
  return (
    <NetworkStatus>
      {(isOnline) => {
        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        const handleLoadMore = () =>
          fetchMore(
            // TODO: Refactor loadMore into the new fetchMore structure
            {}
            // (prev, next) => ({
            //   ...prev,
            //   products: {
            //     ...prev.products,
            //     edges: [...prev.products.edges, ...next.products.edges],
            //     pageInfo: next.products.pageInfo,
            //   },
            // }),
            // { after: data?.products?.pageInfo.endCursor }
          );

        if (!!data || loading) {
          return (
            <Media
              query={{
                minWidth: xLargeScreen,
              }}
            >
              <Page
                clearFilters={clearFilters}
                attributes={data?.attributes?.edges.map(
                  (edge) => edge.node
                ) ?? []}
                // TODO: menu is NOT undefined here
                menu={data?.menu!}
                displayLoader={loading}
                hasNextPage={maybe(
                  () => !!data?.products?.pageInfo.hasNextPage,
                  false
                ) as boolean}
                sortOptions={sortOptions}
                activeSortOption={filters.sortBy}
                filters={filters}
                // TODO: products is NOT undefined here. That is a generated type error
                products={data?.products!}
                onAttributeFiltersChange={onFiltersChange}
                onLoadMore={handleLoadMore}
                activeFilters={
                  filters.attributes
                    ? Object.keys(filters.attributes).length
                    : 0
                }
                onOrder={(value) => {
                  setSort(value.value);
                }}
              />
            </Media>
          );
        }

        if (!data) {
          return <NotFound />;
        }
      }}
    </NetworkStatus>
  );
};

export default Products;
