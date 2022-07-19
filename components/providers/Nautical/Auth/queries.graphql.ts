import { gql } from "@apollo/client";

import { userFragment } from "./fragments.graphql";

const getUserDetailsQuery = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;

const getYotpoLoyaltyAndReferralsCustomerDetails = gql`
  query GetYotpoLoyaltyAndReferralsCustomerDetails($email: String!) {
    customerLoyaltyAndReferralsDetails(email: $email) {
      firstName
      lastName
      email
      pointsBalance
      pointsEarned
    }
  }
`;

const getLoyaltyAndReferralsInfo = gql`
  query GetLoyaltyAndReferralsInfo {
    loyaltyAndReferralsInfo {
      awardLoyaltyPointsEnabled
      pointsForMakingPurchaseEnabled
      pointsUsedPerDollarSaved
      pointsGainedPerDollarSpent
    }
  }
`;
