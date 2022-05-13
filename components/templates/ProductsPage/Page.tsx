import React, { useState } from "react";
import { Box } from "@mui/material";

import { ProductSideNavbar } from "components/organisms/ProductSideNavbar/ProductSideNavbar";
import { maybe } from "core/utils";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import { ProductListHeader } from "components/organisms/ProductListHeader";
import { ProductList } from "components/organisms/ProductList";
import { FilterSidebar } from "components/organisms/FilterSidebar";
import { Menu, ProductsPageAttributeFragment, ProductsPageMenuFragment, ProductsQuery } from "@generated";

import classes from "./scss/index.module.scss";

import { ProductFilters } from "../../../types/Product";

interface SortItem {
  label: string;
  value?: string | null;
}

// TODO: Export this
interface SortOptions extends Array<SortItem> {
}

interface PageProps {
  activeFilters: number;
  attributes: ProductsPageAttributeFragment[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: ProductFilters;
  hasNextPage: boolean;
  menu: ProductsPageMenuFragment;
  products: ProductsQuery["products"];
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
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
  const canDisplayProducts = maybe(
    // TODO: products is NOT undefined
    () => !!products!.edges && products!.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);

  const createBreadcrumbs = () => {
    const constructLink = () => ({
      link: "/products",
      value: "All Products",
    });

    const breadcrumbs = [constructLink()];
    return breadcrumbs;
  };

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      // @ts-ignore
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        // TODO: values can not contain null values like [null, {}, ...]. That is a BE error
        // @ts-ignore
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          // @ts-ignore
          filters.attributes[key].map((valueSlug) =>
            getAttribute(key, valueSlug)
          )
        ),
      []
    );

  return (
    <Box className={classes.category}>
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
        {canDisplayProducts && (
          <ProductList
            // TODO: products is NOT undefined here. That is a BE issue (probably?)
            products={products!.edges.map((edge) => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </Box>
    </Box>
  );
};

export default Page;
