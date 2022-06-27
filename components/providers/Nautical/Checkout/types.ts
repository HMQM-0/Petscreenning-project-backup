import { PaymentGatewayFragment, ProductVariantFragment, ShippingMethodFragment } from "./fragments.graphql.generated";

export interface ICheckoutAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string | null;
  country?: {
    code?: string;
    country?: string;
  };
}

export interface ICheckoutModelPriceValue {
  amount: number;
  currency: string;
}

export interface ICheckoutModelPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICheckoutModelShippingMethod {
  id: string;
  name: string;
  price: ICheckoutModelPriceValue | null;
}

export interface ICheckoutModelPromoCodeDiscount {
  voucherCode?: string | null;
  discount?: ICheckoutModelPriceValue | null;
  discountName?: string | null;
}

export interface ICheckoutModelLineTotalPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICheckoutModelLineVariant {
  quantityAvailable?: number;
  id: string;
  name?: string;
  sku?: string;
  pricing?: ProductVariantFragment["pricing"] | null;
  product?: ProductVariantFragment["product"];
  isAvailable?: boolean | null;
  attributes?: ProductVariantFragment["attributes"];
}

export interface ICheckoutModelLine {
  quantity: number;
  id?: string;
  variant: ICheckoutModelLineVariant;
  totalPrice?: ICheckoutModelLineTotalPrice | null;
  undiscountedPrice?: ICheckoutModelLineTotalPrice | null;
  seller?: string;
}

export interface IMultiSellerAvailableShippingMethods_mapping {
  value: ShippingMethodFragment[];
  seller: number;
}

export interface IMultiSellerVolumeDiscount {
  seller: number;
  volumeDiscount: any;
}

export interface IShippingMethod {
  id: string;
  name: string;
  price?: ICheckoutModelPriceValue | null | undefined;
}

export interface IMultiSellerShippingMethods {
  seller: number;
  shippingMethodSelection: IShippingMethod;
}

export interface ICheckoutModel {
  id?: string;
  token?: any;
  email?: string;
  shippingAddress?: ICheckoutAddress | null;
  billingAddress?: ICheckoutAddress | null;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  billingAsShipping?: boolean;
  promoCodeDiscount?: ICheckoutModelPromoCodeDiscount;
  lines?: ICheckoutModelLine[];
  availableShippingMethods?: ShippingMethodFragment[];
  availablePaymentGateways?: PaymentGatewayFragment[];
  availableShippingMethodsBySeller?: IMultiSellerAvailableShippingMethods_mapping[];
  applicableVolumeDiscounts?: ICheckoutModelPriceValue;
  applicableVolumeDiscountsBySeller?: IMultiSellerVolumeDiscount[];
  shippingMethod?: ICheckoutModelShippingMethod | null;
  sellerShippingMethods?: IMultiSellerShippingMethods[];
}
