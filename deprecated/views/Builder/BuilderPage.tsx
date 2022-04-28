import "./mui";
import "./nautical";
import "@builder.io/widgets";
import * as React from "react";
// import appState from '@builder.io/app-context';
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { CircularProgress } from "@mui/material";
import { useAuth, useCart } from "@nautical/react";
import { useAlert } from "react-alert";
import { StringParam, useQueryParams } from "use-query-params";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { QUERY_BUILDER_PRODUCTS } from "./queries";

const model = "page";

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

function sanitizeModel(model: any) {
  if (model === null || model === undefined) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(model));
  }
}

const BuilderPage: React.FunctionComponent = (props) => {
  // @ts-ignore
  const [searchParams, setSearchParams] = useQueryParams({
    q: StringParam,
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pageJson, setPage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;
  const { addItem } = useCart();
  const alert = useAlert();

  const path = window.location.pathname.replace("/builder/", "/");

  let category: any;
  let collection: any;
  const product: any = checkPath("product")
    ? useQuery(QUERY_BUILDER_PRODUCTS).data
    : null;
  let landing: any;
  const products: any = checkPath("products")
    ? useQuery(QUERY_BUILDER_PRODUCTS, { variables: { $pageSize: 100 } }).data
    : null;
  let loadMore: any;
  let search: any;
  let wishlist: any;
  let microsite: any;

  const stateData = {
    category: sanitizeModel(category),
    collection: sanitizeModel(collection),
    product: sanitizeModel(product),
    variantId: product?.defaultVariant?.id || "",
    variant: sanitizeModel(product?.defaultVariant),
    shop: sanitizeModel(landing),
    products: sanitizeModel(products),
    search: sanitizeModel(search),
    wishlist: sanitizeModel(wishlist),
    user: sanitizeModel(user),
    microsite: sanitizeModel(microsite),
    quantity: 1,
    addToCart: (name: string, variantId: string, quantity: number) =>
      handleAddToCart(name, variantId, quantity),
    searchFor: (query: string) => handleSetSearch(query),
    navigate: (to: string, replace: boolean) => navigate(to, { replace }),
    decodeId: (id: string) => atob(id).split(":")[1],
    loadMore: () => loadMore(),
  };

  function checkPath(value) {
    return path === `/store/${value}`;
  }

  function handleAddToCart(name: string, variantId: string, quantity: number) {
    addItem(variantId, quantity);
    alert.show(
      {
        title: "Added " + quantity + "x " + name,
      },
      { type: "success" }
    );
  }

  function handleSetSearch(query: string) {
    setTimeout(() => {
      setSearchParams({
        q: query,
      });
    }, 1000);
  }

  React.useMemo(() => {
    // console.info("BUILDER PAGE LOADED");
    // console.info(path);
    // console.info(stateData);
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        const content = await builder.get(model, { url: path }).promise();
        setPage(content);
        setLoading(false);
      };
      fetchPage();
    }
  }, []);

  if (!pageJson && !isEditingOrPreviewing) {
    return isLoading ? (
      <NoComponent />
    ) : (
      <CircularProgress sx={{ placeSelf: "center" }} />
    );
  } else {
    return (
      <BuilderComponent model={model} content={pageJson} data={stateData} />
    );
  }
};

export default BuilderPage;
