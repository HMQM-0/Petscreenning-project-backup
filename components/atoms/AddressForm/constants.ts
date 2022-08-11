import { AddressFormValues } from "./types";

export const fields: {
  name: keyof AddressFormValues;
  label: string;
  autoComplete: string;
  span: boolean;
  required: boolean;
  type?: string;
}[] = [
  { name: "firstName", label: "first name", required: true, autoComplete: "given-name", span: false },
  { name: "lastName", label: "last name", required: true, autoComplete: "family-name", span: false },
  { name: "companyName", label: "companyName", required: false, autoComplete: "companyName", span: true },
  { name: "streetAddress1", label: "address line 1", required: true, autoComplete: "address-line1", span: false },
  { name: "streetAddress2", label: "address line 2", required: false, autoComplete: "address-line2", span: false },
  { name: "city", label: "city", required: true, autoComplete: "address-level2", span: false },
  { name: "countryArea", label: "state/province/area", required: false, autoComplete: "address-level1", span: false },
  { name: "postalCode", label: "zip/postal code", required: true, autoComplete: "postal-code", span: false },
  { name: "phone", label: "phone", autoComplete: "shipping tel-national", required: false, span: false, type: "tel" },
  { name: "country", label: "country", required: true, autoComplete: "country", span: false },
];
