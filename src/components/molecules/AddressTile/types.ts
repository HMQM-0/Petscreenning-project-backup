import { IAddressWithAddressType } from "src/types";

export interface IProps {
  onEdit: () => void;
  onRemove: () => void;
  setDefault: (arg0: string) => void;
  address: IAddressWithAddressType;
}
