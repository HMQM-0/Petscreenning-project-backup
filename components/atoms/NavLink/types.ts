import { NavLinkProps } from "react-router-dom";

import { PartialBy } from "@utils/tsUtils";
import { SecondaryMenuSubItemFragment } from "@generated";

export interface IProps extends PartialBy<NavLinkProps, "to"> {
  fullWidth?: boolean;
  item: SecondaryMenuSubItemFragment;
}
