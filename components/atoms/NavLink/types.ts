import { NavLinkProps } from "react-router-dom";

import { PartialBy } from "@utils/tsUtils";
import { SecondaryMenuSubItemFragment } from "components/molecules/Footer/queries.graphql.generated";

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  fullWidth?: boolean;
  item: SecondaryMenuSubItemFragment;
}
