import * as React from "react";
import Media from "react-media";
import { StringParam, useQueryParam } from "use-query-params";

import { xLargeScreen } from "@styles/constants";
import {
  maybe,
} from "core/utils";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import NetworkStatus from "components/atoms/NetworkStatus";
import { ProductFilterInput, ProductListQueryVariables, useProductListQuery } from "@generated";

import Page from "../Page";
import { FilterQuerySet } from "../View";

interface ProductsProps {
  variables: ProductListQueryVariables;
  filters: ProductFilterInput;
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
  // TODO: Why `loadMore` is missing?
  // @ts-ignore
  const { loading, data, loadMore } = useProductListQuery({
    variables,
    errorPolicy: "all",
  });

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name: string, value: string) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        // TODO: filters.attributes is array?
        // @ts-ignore
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

  if (!data) {
    return <NotFound />;
  }

  // TODO: Refactor NetworkStatus to a hook?
  return (
    <NetworkStatus>
      {(isOnline) => {
        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        const canDisplayFilters = maybe(
          // TODO: No attribute in ProductsListQuery?
          // @ts-ignore
          () => !!data.attributes.edges,
          false
        );

        const handleLoadMore = () =>
          loadMore(
            // TODO: see missing loadMore issue
            // @ts-ignore
            (prev, next) => ({
              ...prev,
              products: {
                ...prev.products,
                edges: [...prev.products.edges, ...next.products.edges],
                pageInfo: next.products.pageInfo,
              },
            }),
            { after: data?.products?.pageInfo.endCursor }
          );

        if (canDisplayFilters) {
          return (
            <Media
              query={{
                minWidth: xLargeScreen,
              }}
            >
              <Page
                clearFilters={clearFilters}
                // TODO: No attribute in ProductsListQuery?
                // @ts-ignore
                attributes={data.attributes.edges.map(
                  // TODO: see above
                  // @ts-ignore
                  (edge) => edge.node
                )}
                // TODO: No menu in ProductsListQuery?
                // @ts-ignore
                menu={data.menu}
                displayLoader={loading}
                hasNextPage={maybe(
                  () => !!data.products?.pageInfo.hasNextPage,
                  false
                ) as boolean}
                // TODO: Fix sortOptions type
                // @ts-ignore
                sortOptions={sortOptions}
                // TODO: No sortBy in ProductFilterInput?
                // @ts-ignore
                activeSortOption={filters.sortBy}
                // TODO: Fix filters type
                // @ts-ignore
                filters={filters}
                // TODO: Fix products type
                // @ts-ignore
                products={data.products}
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
      }}
    </NetworkStatus>
  );
};

export default Products;
