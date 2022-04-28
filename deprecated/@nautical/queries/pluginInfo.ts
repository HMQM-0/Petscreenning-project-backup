import gql from "graphql-tag";

export const getLoyaltyAndReferralsInfo = gql`
  query GetLoyaltyAndReferralsInfo {
    loyaltyAndReferralsInfo {
      awardLoyaltyPointsEnabled
      pointsForMakingPurchaseEnabled
      pointsUsedPerDollarSaved
      pointsGainedPerDollarSpent
    }
  }
`;
