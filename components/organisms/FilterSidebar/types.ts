import { ProductsPageAttributeFragment } from "components/templates/ProductsList/queries.graphql.generated";

interface Attributes {
  [key: string]: string[];
}

export interface IProps {
  attributes: ProductsPageAttributeFragment[];
  filters: { attributes: Attributes };
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
}
