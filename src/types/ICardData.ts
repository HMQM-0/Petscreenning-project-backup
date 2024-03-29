import { GatewayConfigLine } from "@generated";

export interface ICardData {
  /**
   * Card brand.
   */
  brand: string | null | undefined;
  /**
   * First 4 digits of the card number.
   */
  firstDigits: string | null;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits: string;
  /**
   * Two-digit number representing the card’s expiration month.
   */
  expMonth: number | null;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear: number | null;
  config?: GatewayConfigLine[];
  cvv?: number | null;
  fullNumber?: number | null;
}
