import { createContext } from "react";

import { GetShopQuery } from "./queries.graphql.generated";

export const defaultCountry = {
  __typename: "CountryDisplay" as "CountryDisplay",
  code: "US",
  country: "United States of America",
};

export const defaultContext: GetShopQuery["shop"] = {
  __typename: "Shop",
  countries: [],
  builderKey: null,
  crispWebsiteId: null,
  gaMeasurementId: null,
  defaultCountry,
  displayGrossPrices: true,
  loginForPrice: false,
  loginForProducts: false,
  geolocalization: { __typename: "Geolocalization", country: defaultCountry },
  activePlugins: [],
};

export const ShopContext = createContext(defaultContext);
