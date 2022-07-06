import { CountryCode } from "@generated";

export const getCountryCode = (code: string) => {
  const index = code
    .slice(0, 2)
    .split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join("") as keyof typeof CountryCode;

  return CountryCode[index];
};
