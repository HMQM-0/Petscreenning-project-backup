export interface IMoney {
  amount: number;
  currency: string;
}

export interface ITaxedMoney {
  net: IMoney;
  gross: IMoney;
}

export interface IProps {
  taxedMoney?: ITaxedMoney | null;
  defaultValue?: string;
  showCurrency?: boolean;
}
