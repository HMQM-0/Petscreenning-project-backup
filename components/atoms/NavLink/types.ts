import { NavLinkProps } from "react-router-dom";

import { PartialBy } from "types/utils";
import { SecondaryMenuSubItemFragment } from "components/molecules/Footer/queries.graphql.generated";

type ClassNameProps = { isActive: boolean };

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  fullWidth?: boolean;
  item: Pick<SecondaryMenuSubItemFragment, "name" | "url" | "page" | "collection" | "category">;
  className?: string | ((props: ClassNameProps) => string);
}
