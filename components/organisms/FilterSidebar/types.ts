import { AttributeValue } from "@generated";
import { ProductsPageAttributeFragment } from "components/templates/ProductsList/queries.graphql.generated";

export interface IProps {
  attributes: Array<
    Pick<ProductsPageAttributeFragment, "id" | "name" | "slug"> & {
      values?: Array<Pick<AttributeValue, "id" | "name" | "slug">> | null;
    }
  >;
  hide: () => void;
  show: boolean;
  target?: HTMLElement | null;
}
