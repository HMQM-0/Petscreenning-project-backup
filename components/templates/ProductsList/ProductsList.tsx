import React, { useState } from "react";
import { useQueryParam, StringParam } from "next-query-params";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import Media from "react-media";

import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import { useNetworkStatus } from "@hooks";
import { IProps as FilterSidebarProps } from "components/organisms/FilterSidebar/types";
import { IProps as ProductListHeaderProps } from "components/organisms/ProductListHeader/types";
import { prodListHeaderCommonMsg } from "deprecated/intl";
import Breadcrumbs, { Breadcrumb } from "components/atoms/Breadcrumbs";
import { ProductSideNavbar } from "components/organisms/ProductSideNavbar";
import { FilterSidebar } from "components/organisms/FilterSidebar";
import { ProductListHeader } from "components/organisms/ProductListHeader";
import { ProductList } from "components/organisms/ProductList";
import { xLargeScreen } from "@styles/constants";
import { ProductSideNavbarGrid } from "components/organisms/ProductSideNavbarGrid";
import ProductListBanner from "components/atoms/ProductListBanner/ProductListBanner";
import {
  ProductsQueryResult,
  ProductsQueryVariables,
} from "components/templates/ProductsPage/queries.graphql.generated";

import { FilterQuerySet } from "./View";
import classes from "./scss/index.module.scss";
import { useProductsPageMenuAndAttributesQuery } from "./queries.graphql.generated";
import Search from "./Search";

interface ProductsProps {
  variables: ProductsQueryVariables;
  filters: {
    attributes: FilterSidebarProps["filters"]["attributes"];
    sortBy: ProductListHeaderProps["activeSortOption"];
  };
  loading: ProductsQueryResult["loading"];
  data: ProductsQueryResult["data"];
  fetchMore: ProductsQueryResult["fetchMore"];
  backgroundImageUrl?: string;
  showSidebar?: boolean;
  showSearch?: boolean;
  showNoResultFeaturedProducts?: boolean;
  breadcrumbs?: Breadcrumb[];
}

const ProductsList = ({
  loading,
  data,
  fetchMore,
  filters,
  backgroundImageUrl,
  showSidebar,
  showSearch,
  showNoResultFeaturedProducts,
  breadcrumbs,
}: ProductsProps) => {
  const intl = useIntl();
  const [showFilters, setShowFilters] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);
  const [, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const { data: { attributes: attributesResult, menu: menuResult } = {} } =
    useProductsPageMenuAndAttributesQuery();

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
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
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
        variables: { after: data?.productList?.pageInfo.endCursor },
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

  const attributes = attributesResult?.edges.map((edge) => edge.node) ?? [];

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName:
      // TODO: adding `ts-ignore` as a tmp fix, since values has incorrect type. To be fixed on BE
      // @ts-ignore
      attributes
        .find(
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
          filters.attributes[key].map(
            (valueSlug) =>
              getAttribute(
                key,
                valueSlug
              ) as ProductListHeaderProps["activeFiltersAttributes"][number]
          )
        ),
      [] as ProductListHeaderProps["activeFiltersAttributes"]
    );

  const products = data?.productList;

  const showFeatured =
    showNoResultFeaturedProducts && !products?.totalCount && !loading;

  const productsListComponents = (
    <Box className={classes.category}>
      {showSearch && (<Search />)}
      <Box className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs ?? []} />
        <ProductSideNavbar
          show={showDirectory}
          onHide={() => setShowDirectory(false)}
          // TODO: items can not contain `null`. e.g. [null, {}, ...]. This is a BE issue
          // @ts-ignore
          items={menuResult?.items ?? []}
        />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        {backgroundImageUrl && <ProductListBanner image={backgroundImageUrl} />}
        <ProductListHeader
          activeSortOption={filters.sortBy}
          openDirectoryMenu={() => setShowDirectory(true)}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products?.totalCount ?? 0}
          activeFilters={
            filters.attributes ? Object.keys(filters.attributes).length : 0
          }
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={(value) => {
            setSort(value.value);
          }}
          onCloseFilterAttribute={onFiltersChange}
        />
        <ProductList
          products={products?.products.map((edge) => edge.product) ?? []}
          canLoadMore={!!data?.productList?.pageInfo.hasNextPage ?? false}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </Box>
      {!showFeatured && (
        <></>
        // TODO: To be refactored in future tasks
        // <ProductsFeatured
        //   title={intl.formatMessage(commonMessages.youMightLike)}
        // />
      )}
    </Box>
  );

  if (!showSidebar || !menuResult?.items?.length) {
    return productsListComponents;
  }

  return (
    <Media
      query={{
        minWidth: xLargeScreen,
      }}
    >
      {(matches: boolean) => {
        return (
          <ProductSideNavbarGrid matches={matches} menu={menuResult}>
            {productsListComponents}
          </ProductSideNavbarGrid>
        );
      }}
    </Media>
  );
};

export default ProductsList;
