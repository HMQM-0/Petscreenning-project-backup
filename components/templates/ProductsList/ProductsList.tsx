import { QueryResult } from "@apollo/client";
import React, { useState } from "react";
import { useQueryParam, StringParam } from "next-query-params";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import Media from "react-media";

import { ProductsPageAttributeFragment } from "components/templates/ProductsList/queries.graphql.generated";
import { commonMessages, prodListHeaderCommonMsg } from "core/intl";
import ProductsFeatured from "components/organisms/ProductsFeatured";
import OfflinePlaceholder from "components/atoms/OfflinePlaceholder";
import NotFound from "components/molecules/NotFound";
import { useNetworkStatus } from "@hooks";
import { IProps as ProductListHeaderProps } from "components/organisms/ProductListHeader/types";
import Breadcrumbs, { Breadcrumb } from "components/atoms/Breadcrumbs";
import { ProductSideNavbar } from "components/organisms/ProductSideNavbar";
import { FilterSidebar } from "components/organisms/FilterSidebar";
import { ProductListHeader } from "components/organisms/ProductListHeader";
import { ProductList } from "components/organisms/ProductList";
import { xLargeScreen } from "@styles/constants";
import { ProductSideNavbarGrid } from "components/organisms/ProductSideNavbarGrid";
import ProductListBanner from "components/atoms/ProductListBanner/ProductListBanner";
import {
  ProductsPageQuery,
  ProductsQueryResult,
  ProductsQueryVariables,
} from "components/templates/ProductsPage/queries.graphql.generated";

import classes from "./scss/index.module.scss";
import Search from "./Search";

interface ProductsProps {
  variables: ProductsQueryVariables;
  loading: ProductsQueryResult["loading"];
  data: ProductsQueryResult["data"];
  // TODO: types should be synced between products/category/collection/search pages
  attributes: ProductsPageAttributeFragment[];
  menuResult: ProductsPageQuery["menu"];
  fetchMore: QueryResult["fetchMore"];
  backgroundImageUrl?: string;
  showSidebar?: boolean;
  showSearch?: boolean;
  showNoResultFeaturedProducts?: boolean;
  breadcrumbs?: Breadcrumb[];
}

const ProductsList = ({
  loading,
  data,
  attributes,
  menuResult,
  fetchMore,
  backgroundImageUrl,
  showSidebar,
  showSearch,
  showNoResultFeaturedProducts,
  breadcrumbs,
}: ProductsProps) => {
  const intl = useIntl();
  const [showFilters, setShowFilters] = useState(false);
  const [showDirectory, setShowDirectory] = useState(false);

  const { online } = useNetworkStatus();

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
      // Refactor loadMore into the new fetchMore structure.
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
          // items can not contain `null`. e.g. [null, {}, ...]. This is a BE issue
          // @ts-ignore
          items={menuResult?.items ?? []}
        />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          attributes={attributes}
        />
        {backgroundImageUrl && <ProductListBanner image={backgroundImageUrl} />}
        <ProductListHeader
          attributes={attributes}
          openDirectoryMenu={() => setShowDirectory(true)}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products?.totalCount ?? 0}
        />
        <ProductList
          products={products?.products.map((edge) => edge.product) ?? []}
          canLoadMore={!!data?.productList?.pageInfo.hasNextPage ?? false}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </Box>
      {showFeatured && (
        <ProductsFeatured
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
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
