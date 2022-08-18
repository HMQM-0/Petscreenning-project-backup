// TODO: refactor
import { AddressInterface } from "deprecated/core/types";

export interface AddressType extends Partial<AddressInterface> {
  email?: string;
}

export interface FormAddressType extends Omit<AddressType, "country"> {
  asBilling?: boolean;
  asNew?: boolean;
  email?: string;
  country: { country?: string; code?: string; value?: string };
}
