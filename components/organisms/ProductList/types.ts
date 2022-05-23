import { ProductsListProductFragment } from "@generated";

export interface IProps {
  products: ProductsListProductFragment[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}
