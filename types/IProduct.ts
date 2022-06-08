// import { ProductList_products_edges_node } from "@nautical/sdk/lib/queries/gqlTypes/ProductList";
import { ProductsListProductFragment } from "components/templates/ProductsList/queries.graphql.generated";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IProduct = WithOptional<ProductsListProductFragment, "slug">;
