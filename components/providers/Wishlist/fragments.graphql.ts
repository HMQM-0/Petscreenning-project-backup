import { gql } from "@apollo/client";

export const wishlistProductInfoFragment = gql`
  fragment productInfo on Product {
    id
    name
    brand
    description
    descriptionJson
    entityId: id
    isAvailable
    seller {
      id
      companyName
      microsite {
        id
        name
      }
      logo {
        url
      }
    }
    price: minimalVariantPrice {
      currency
      amount
    }
    pricing {
      priceRange {
        start {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        stop {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
      }
      priceRangeUndiscounted {
        start {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        stop {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
      }
    }
    attributes {
      attribute {
        id
        name
        valueRequired
        values {
          id
          name
        }
      }
      values {
        id
        name
      }
    }
    thumbnail {
      url
    }
    defaultVariant {
      id
      name
      quantityAvailable
    }
    variants {
      id
      name
      sku
      images {
        url
      }
      pricing {
        price {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        priceUndiscounted {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
      }
      attributes {
        attribute {
          id
          name
          valueRequired
          values {
            id
            name
          }
        }
        values {
          id
          name
        }
      }
    }
    path: slug
  }
`;

export const wishlistItemVariantFragment = gql`
  fragment WishlistItemVariant on ProductVariant {
    id
    name
    sku
    pricing {
      price {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
    }
  }
`;

export const wishlistItemFragment = gql`
  ${wishlistItemVariantFragment}
  fragment WishlistItem on WishlistItem {
    id
    product {
      ...productInfo
      countableImages(first: 100) {
        edges {
          node {
            id
            altText: alt
            urlOriginal: url
          }
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          ...WishlistItemVariant
        }
      }
    }
  }
  ${wishlistProductInfoFragment}
`;
