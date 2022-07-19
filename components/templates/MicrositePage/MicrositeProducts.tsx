import { BuilderContent } from "@builder.io/sdk";
import React from "react";

import Builder from "components/templates/ProductsList/Builder";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "components/templates/ProductsList/View";
import { useProductsQuery } from "components/templates/ProductsPage/queries.graphql.generated";

import { BasicMicrositeFragment, MicrositePageQueryResult } from "./queries.graphql.generated";

type CollectionProductsProps = {
  microsite: BasicMicrositeFragment;
  builderContent: BuilderContent | null;
  pageData: MicrositePageQueryResult["data"];
};

const MicrositeProducts = ({
  microsite,
  builderContent,
  pageData,
}: CollectionProductsProps) => {
  const variables = useProductListVariables();
  const { loading, data, fetchMore } = useProductsQuery({
    variables: {
      ...variables,
      micrositeId: microsite.id,
    },
    errorPolicy: "all",
  });

  const attributes = pageData?.attributes?.attributes.map(({ attribute }) => attribute) ?? [];

  if (builderContent) {
    return <Builder
      type="microsite"
      pageData={pageData}
      productsData={data}
      loading={loading}
      attributes={attributes}
      content={builderContent}
    />;
  }

  return (
    <ProductsList
      data={data}
      attributes={attributes}
      menuResult={pageData?.menu}
      loading={loading}
      fetchMore={fetchMore}
      variables={variables}
      backgroundImageUrl={microsite.bannerImage?.url}
    />
  );
};

export default MicrositeProducts;
