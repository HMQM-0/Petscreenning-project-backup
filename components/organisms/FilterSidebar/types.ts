import { ProductsPageAttributeFragment } from "@generated";

import { ProductFilters } from "../../../types/Product";

export interface IProps {
  attributes: ProductsPageAttributeFragment[];
  filters: ProductFilters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
