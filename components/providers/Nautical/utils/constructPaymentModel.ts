import { PaymentFragment } from "../Checkout/fragments.graphql.generated";
import { IPaymentModel } from "../Checkout/types";

export const constructPaymentModel = ({ id, gateway, token, creditCard, total }: PaymentFragment): IPaymentModel => ({
  creditCard,
  gateway,
  id,
  token,
  total,
});
