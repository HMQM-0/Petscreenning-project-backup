import { NauticalOrderDetailFragment } from "components/providers/Nautical/Checkout/fragments.graphql.generated";

export type AddressType = Partial<NauticalOrderDetailFragment["shippingAddress"]> & {
  email?: string;
};

export interface FormAddressType extends Omit<AddressType, "country"> {
  asBilling?: boolean;
  asNew?: boolean;
  email?: string;
  country: { country?: string; code?: string; value?: string };
}
