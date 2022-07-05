import { IImage } from "@types";
import { ITaxedMoney } from "components/molecules/TaxedMoney/types";
import { ICheckoutModelPriceValue } from "components/providers/Nautical/Checkout/types";

export interface ICostLine {
  name: string;
  cost?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue;
  last?: boolean;
  negative?: boolean;
}

export interface ICosts {
  subtotal?: ITaxedMoney | null;
  promoCode?: ITaxedMoney | null;
  shipping?: ITaxedMoney | null;
  total?: ITaxedMoney | null;
  volumeDiscount?: ICheckoutModelPriceValue;
}

export interface IProduct {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  priceUndiscounted?: ITaxedMoney;
  thumbnail: IImage;
}
