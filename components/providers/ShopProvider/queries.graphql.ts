import { gql } from "@apollo/client";

export const getShop = gql`
  query GetShop {
    shop {
      displayGrossPrices
      loginForPrice
      loginForProducts
      builderKey
      activePlugins {
        identifier
        name
        description
        active
      }
      crispWebsiteId
      gaMeasurementId
      defaultCountry {
        code
        country
      }
      countries {
        country
        code
      }
      geolocalization {
        country {
          code
          country
        }
      }
    }
  }
`;
