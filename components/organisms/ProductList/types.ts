import { ProductsPageProductFragment } from "@generated";

export interface IProps {
  // TODO: We might need to replace this with some other type (once this component is used on any other page)
  products: ProductsPageProductFragment[];
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}
