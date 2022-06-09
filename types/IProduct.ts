import { ProductsListProductFragment } from "components/templates/ProductsList/queries.graphql.generated";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IProduct = WithOptional<ProductsListProductFragment, "slug">;
