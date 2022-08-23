import { BuilderContent } from "@builder.io/sdk";
import React from "react";

import { useProductsQuery } from "components/templates/ProductsList/queries.graphql.generated";
import Builder from "components/templates/ProductsList/Builder";
import ProductsList from "components/templates/ProductsList/ProductsList";
import { useProductListVariables } from "components/templates/ProductsList/View";

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
