import { IMoney, ITaxedMoney } from "components/molecules/TaxedMoney/types";

export const calculateTax = (value: ITaxedMoney | null | undefined): IMoney => {
  if (!value) {
    return {
      amount: 0,
      currency: "USD",
    };
  }
  return {
    amount: value.gross.amount - value.net.amount,
    currency: value.gross.currency,
  };
};
