import { BuilderContent } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react";
import * as React from "react";
import { StringParam, useQueryParams } from "next-query-params";

import { MicrositePageQueryResult } from "components/templates/MicrositePage/queries.graphql.generated";
import { SearchPageQueryResult } from "components/templates/SearchPage/queries.graphql.generated";
import { CollectionPageQueryResult } from "components/templates/CollectionPage/queries.graphql.generated";
import { CategoryPageQueryResult } from "components/templates/CategoryPage/queries.graphql.generated";
import useBuilderStateData from "components/hooks/useBuilderStateData";
import {
  ProductsPageQueryResult
} from "components/templates/ProductsPage/queries.graphql.generated";
import builderConfig from "config/builder";

import {
  ProductsPageAttributeFragment,
  ProductsQueryResult
} from "./queries.graphql.generated";

interface ProductsPageBuilderProps {
  type: "products";
  pageData: ProductsPageQueryResult["data"];
}

interface CategoryPageBuilderProps {
  type: "category";
  pageData: CategoryPageQueryResult["data"];
}

interface CollectionPageBuilderProps {
  type: "collection";
  pageData: CollectionPageQueryResult["data"];
}

interface SearchPageBuilderProps {
  type: "search";
  pageData: SearchPageQueryResult["data"];
}

interface MicrositePageBuilderProps {
  type: "microsite";
  pageData: MicrositePageQueryResult["data"];
}

type BuilderProductsProps = (
  ProductsPageBuilderProps
  | CategoryPageBuilderProps
  | CollectionPageBuilderProps
  | SearchPageBuilderProps
  | MicrositePageBuilderProps
  ) & {
  content: BuilderContent;
  productsData: ProductsQueryResult["data"];
  attributes: ProductsPageAttributeFragment[];
  loading: boolean;
}

const BuilderProducts = ({ type, pageData, productsData, content, attributes, loading }: BuilderProductsProps) => {
  const category = type === 'category' && {
    category: pageData?.category,
    // TODO: how to deprecate these ones and force using them directly from state root?
    productList: productsData?.productList,
    attributeList: pageData?.attributes,
    menu: pageData?.menu,
  };

  const collection = type === 'collection' && {
    collection: {
      ...pageData?.collection,
      // TODO: how to deprecate these ones and force using them directly from state root?
      productList: productsData?.productList,
    },
    // TODO: how to deprecate these ones and force using them directly from state root?
    attributeList: pageData?.attributes,
    menu: pageData?.menu,
  };

  const search = type === 'search' && {
    // TODO: how to deprecate these ones and force using them directly from state root?
    productList: productsData?.productList,
    attributeList: pageData?.attributes,
    menu: pageData?.menu,
  };

  const products = type === 'products' && {
    // TODO: how to deprecate these ones and force using them directly from state root?
    productList: productsData?.productList,
    attributes: pageData?.attributes,
    menu: pageData?.menu,
  };

  const microsite = type === 'microsite' && {
    microsite: {
      ...pageData?.microsite,
      // TODO: how to deprecate these ones and force using them directly from state root?
      productList: productsData?.productList,
    },
    // TODO: how to deprecate these ones and force using them directly from state root?
    attributeList: pageData?.attributes,
    menu: pageData?.menu,
  };

  const stateData =
    useBuilderStateData({
      products,
      category,
      collection,
      search,
      microsite,
    });

  const [, setQueryParams] = useQueryParams({
    'after': StringParam,
    'before': StringParam,
  });

  const loadNextPage = () => {
    setQueryParams({
      before: undefined,
      after: productsData?.productList?.pageInfo.endCursor,
    });
  };
  const loadPrevPage = () => {
    setQueryParams({
      before: productsData?.productList?.pageInfo.startCursor,
      after: undefined,
    });
  };

  return (
    <BuilderComponent
      model={builderConfig.storeModel}
      content={content}
      data={{
        ...stateData,
        // TODO: how to force users to use these ones instead of legacy data on builder.io side?
        productsPageInfo: productsData?.productList?.pageInfo || {},
        productsPageTotalCount: productsData?.productList?.totalCount || 0,
        productList: productsData?.productList?.products ?? [],
        attributes,
        menu: pageData?.menu ?? [],
        loadNextPage,
        loadPrevPage,
        loading
      }}
    />
  );
};

export default BuilderProducts;
