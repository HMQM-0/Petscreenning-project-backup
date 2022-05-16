import React, { useState } from "react";
import { Box } from "@mui/material";

import { ProductSideNavbar } from "components/organisms/ProductSideNavbar/ProductSideNavbar";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import { ProductListHeader } from "components/organisms/ProductListHeader";
import { ProductList } from "components/organisms/ProductList";
import { FilterSidebar } from "components/organisms/FilterSidebar";
import { ProductsPageAttributeFragment, ProductsQuery } from "@generated";

import classes from "./scss/index.module.scss";

import { IProps as ProductListHeaderProps } from "../../organisms/ProductListHeader/types";
import { IProps as ProductListProps } from "../../organisms/ProductList/types";
import { IProps as FilterSidebarProps } from "../../organisms/FilterSidebar/types";

interface PageProps {
  attributes: ProductsPageAttributeFragment[];
  displayLoader: boolean;
  filters: FilterSidebarProps["filters"];
  hasNextPage: boolean;
  menu: ProductsQuery["menu"];
  products: ProductsQuery["products"];
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  // TODO: There might be a better way,
  //  since we do not use `sortOptions` and others
  //  in this component and just pass them further
  sortOptions: ProductListHeaderProps["sortOptions"];
  clearFilters: ProductListHeaderProps["clearFilters"];
  onLoadMore: ProductListProps["onLoadMore"];
  onOrder: ProductListHeaderProps["onChange"];
  activeSortOption: ProductListHeaderProps["activeSortOption"];
  activeFilters: ProductListHeaderProps["activeFilters"];
}

const Page = ({
  activeFilters,
  activeSortOption,
  attributes,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  menu,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}: PageProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);

  const createBreadcrumbs = () => {
    const constructLink = () => ({
      link: "/products",
      value: "All Products",
    });

    return [constructLink()];
  };

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName:
      // TODO: attributes can not be undefined here, can it? is that a non-valid type issue?
      // @ts-ignore
      attributes.find(
        // TODO: attributes can not contain null values like [null, {}, ...]. That is a BE error
        // @ts-ignore
        ({ slug }) => attributeSlug === slug
      )
        ?.values.find(
        // TODO: values can not contain null values like [null, {}, ...]. That is a BE error
        // @ts-ignore
        ({ slug }) => valueSlug === slug
      )?.name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map((valueSlug) =>
            getAttribute(key, valueSlug) as ProductListHeaderProps["activeFiltersAttributes"][number]
          )
        ),
      [] as ProductListHeaderProps["activeFiltersAttributes"]
    );
  return (
    <Box className={classes.category}>
      {/* // TODO: how to import "container" className? */}
      <Box className="container">
        <Breadcrumbs breadcrumbs={createBreadcrumbs()} />
        <ProductSideNavbar
          show={showDirectory}
          onHide={() => setShowDirectory(false)}
          // TODO: items can not contain `null`. e.g. [null, {}, ...]. This is a BE issue
          // @ts-ignore
          items={menu?.items}
        />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          openDirectoryMenu={() => setShowDirectory(true)}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products?.totalCount ?? 0}
          activeFilters={activeFilters}
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
        <ProductList
          products={products?.edges.map((edge) => edge.node) ?? []}
          canLoadMore={hasNextPage}
          loading={displayLoader}
          onLoadMore={onLoadMore}
        />
      </Box>
    </Box>
  );
};

export default Page;
