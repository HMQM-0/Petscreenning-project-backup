import { AddressFragment } from "components/providers/Nautical/Checkout/fragments.graphql.generated";

export interface IProps {
  hideModal: () => void;
  submitBtnText: string;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
  userId?: string;
  address?: {
    address: AddressFragment;
    id: string;
  };
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
}
