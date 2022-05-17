import * as React from "react";
import Media from "react-media";
import { useQueryParam, StringParam } from 'next-query-params';

import { xLargeScreen } from "@styles/constants";
import {
  maybe,
} from "core/utils";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import { ProductsQueryVariables, useProductsQuery } from "@generated";
import { useNetworkStatus } from "@hooks";

import Page from "../Page";
import { FilterQuerySet } from "../View";
import { IProps as FilterSidebatProps } from "../../../organisms/FilterSidebar/types";
import { IProps as ProductListHeaderProps } from "../../../organisms/ProductListHeader/types";

interface ProductsProps {
  variables: ProductsQueryVariables;
  filters: {
    attributes: FilterSidebatProps["filters"]["attributes"];
    sortBy: ProductListHeaderProps["activeSortOption"];
  };
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

  const { online } = useNetworkStatus();

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

  if (!online) {
    return <OfflinePlaceholder />;
  }

  if (!data && !loading) {
    return <NotFound />;
  }

  const handleLoadMore = () =>
    fetchMore(
      {
        variables: { after: data?.products?.pageInfo.endCursor }
      }
      // TODO: Refactor loadMore into the new fetchMore structure.
      //  We need to specify field policy here somehow to merge paginated results
      // (prev, next) => ({
      //   ...prev,
      //   products: {
      //     ...prev.products,
      //     edges: [...prev.products.edges, ...next.products.edges],
      //     pageInfo: next.products.pageInfo,
      //   },
      // }),
    );

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
        menu={data?.menu}
        displayLoader={loading}
        hasNextPage={maybe(
          () => !!data?.products?.pageInfo.hasNextPage,
          false
        ) as boolean}
        sortOptions={sortOptions}
        activeSortOption={filters.sortBy}
        filters={filters}
        products={data?.products}
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
};

export default Products;
