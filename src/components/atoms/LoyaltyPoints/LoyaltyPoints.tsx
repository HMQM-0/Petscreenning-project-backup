import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useCart, useCheckout } from "nautical-api";
import { useShopContext } from "src/components/providers/ShopProvider";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { IAuthContext } from "src/components/providers/Nautical/Auth/context";
import { useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation } from "src/components/providers/Nautical/Auth/mutations.graphql.generated";
import {
  useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery,
  useGetLoyaltyAndReferralsInfoQuery,
} from "src/components/providers/Nautical/Auth/queries.graphql.generated";

import { customSliderStyles } from "./styles";
import * as S from "./styles";

interface LoyaltyPointsProps {
  // activeStepIndex: number;
  netOrderPrice: number | null | undefined;
  totalPrice: ITaxedMoney | null | undefined;
  user: IAuthContext["user"];
  updateLoyaltyPointsToBeEarnedOnOrderComplete: (points: number) => void;
}

const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({
  // activeStepIndex,
  netOrderPrice,
  totalPrice,
  user,
  updateLoyaltyPointsToBeEarnedOnOrderComplete,
}) => {
  // STATE
  const [loyaltyPointsAvailable, setLoyaltyPointsAvailable] = React.useState(0);
  const [pointsToRedeem, setPointsToRedeem] = React.useState(1);

  // CONTEXT
  const { displayGrossPrices } = useShopContext();

  // CUSTOM HOOKS
  const { addPromoCode, removePromoCode, promoCodeDiscount } = useCheckout();
  const { discount } = useCart();

  // QUERIES
  const {
    data: customerPointsData,
    refetch: refetchCustomerPointsData,
    loading: loadingCustomerPointsData,
    error: customerPointsDataError,
  } = useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery({
    variables: { email: user?.email ?? "" },
    fetchPolicy: "network-only",
  });
  const {
    data: loyaltyAndReferralsData,
    loading: loadingLoyaltyAndReferralsData,
    error: loyaltyAndReferralsDataError,
  } = useGetLoyaltyAndReferralsInfoQuery({ fetchPolicy: "network-only" });

  // MUTATIONS
  const [awardCustomerLoyaltyPoints, { /* data, error, */ loading: loadingAwardCustomerLoyaltyPoints }] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation();

  const pointsGainedPerDollarSpent = Number(
    loyaltyAndReferralsData?.loyaltyAndReferralsInfo?.pointsGainedPerDollarSpent,
  );
  const pointsUsedPerDollarSaved = Number(loyaltyAndReferralsData?.loyaltyAndReferralsInfo?.pointsUsedPerDollarSaved);
  const pointsBalance = Number(customerPointsData?.customerLoyaltyAndReferralsDetails?.pointsBalance);

  // USE EFFECT
  React.useEffect(() => {
    if (pointsBalance) {
      setLoyaltyPointsAvailable(pointsBalance);
    }
  }, [pointsBalance]);

  React.useEffect(() => {
    const updatedPointsToRedeem = parseInt(
      promoCodeDiscount?.voucherCode?.split("|")[5].split(":")[1] || pointsToRedeem.toString(),
    );
    if (updatedPointsToRedeem !== pointsToRedeem) {
      setPointsToRedeem(updatedPointsToRedeem);
    }
  }, [pointsToRedeem, promoCodeDiscount]);

  React.useEffect(() => {
    pointsGainedPerDollarSpent &&
      netOrderPrice &&
      updateLoyaltyPointsToBeEarnedOnOrderComplete(Math.round(pointsGainedPerDollarSpent * netOrderPrice));
  }, [pointsGainedPerDollarSpent, netOrderPrice, updateLoyaltyPointsToBeEarnedOnOrderComplete]);

  // EVENT HANDLERS
  const handleRedeemButtonClick = async () => {
    if (discount?.amount === 0) {
      const currentDate = getMonthDateAndYear();
      const date = `${currentDate.month}/${currentDate.date}/${currentDate.year}`;
      const timeUTC = new Date().toLocaleTimeString("en-US", {
        timeZone: "UTC",
        timeZoneName: "short",
      });

      const discountAmount = pointsUsedPerDollarSaved
        ? convertToCurrencyWithCommas(pointsToRedeem / pointsUsedPerDollarSaved)
        : "Error calculating discount amount.";
      const oneTimeVoucherCode = `loyaltyDiscount|${user?.firstName}|${user?.lastName}|${user?.email}|${date} ${timeUTC}|pointsRedeemed:${pointsToRedeem}|discount:${discountAmount}`;
      const { dataError } = await addPromoCode(oneTimeVoucherCode);
      awardCustomerLoyaltyPoints({
        variables: {
          input: {
            customerEmail: user?.email,
            pointAdjustmentAmount: -pointsToRedeem,
            applyAdjustmentToPointsEarned: false,
          },
        },
      });
      setLoyaltyPointsAvailable(loyaltyPointsAvailable - pointsToRedeem);
      if (dataError?.error) {
        console.error("ERRORS: ", dataError?.error);
      }
    } else {
      setLoyaltyPointsAvailable(loyaltyPointsAvailable + pointsToRedeem);
      setPointsToRedeem(1);
      removePromoCode(promoCodeDiscount?.voucherCode || "");
      await awardCustomerLoyaltyPoints({
        variables: {
          input: {
            customerEmail: user?.email,
            pointAdjustmentAmount: pointsToRedeem,
            applyAdjustmentToPointsEarned: false,
          },
        },
      });
    }
    refetchCustomerPointsData();
  };

  const handleChange = (e: any) => {
    const updatedPointsToRedeem = e.target.value;
    setPointsToRedeem(updatedPointsToRedeem);
  };

  // HELPER FUNCTIONS
  const convertToNumberWithCommas = (num: number | undefined) => {
    if (num === undefined) {
      return;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const valueText = (value: number) => {
    return `${value} loyalty points`;
  };

  const convertToCurrencyWithCommas = (num: number) => {
    let numWithCommas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const numWithCommasToTwoDecimalPoints = parseFloat(numWithCommas).toFixed(2).toString();
    return numWithCommasToTwoDecimalPoints;
  };

  const getMonthDateAndYear = () => {
    return {
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      year: new Date().getFullYear(),
    };
  };

  // CONSTANTS
  const onReviewStep = true;

  const orderTotal = displayGrossPrices ? totalPrice?.gross.amount : totalPrice?.net.amount;

  const maxPointsCanUseBasedOnTotal = orderTotal && pointsUsedPerDollarSaved && orderTotal * pointsUsedPerDollarSaved;

  const maxPointsCanUseBasedOnPoints = loyaltyPointsAvailable;

  const maxPointsThatCanBeUsed = Math.min(maxPointsCanUseBasedOnTotal || 1, maxPointsCanUseBasedOnPoints);

  if (!user) {
    return (
      <>
        <Box style={{ marginBottom: "16px", marginTop: "16px" }}>Must be logged in to use loyalty rewards</Box>
        <Divider />
      </>
    );
  }

  return onReviewStep && !customerPointsDataError && !loyaltyAndReferralsDataError ? (
    <>
      {!loadingAwardCustomerLoyaltyPoints && !loadingCustomerPointsData && !loadingLoyaltyAndReferralsData ? (
        <>
          <S.mainText>You have {convertToNumberWithCommas(loyaltyPointsAvailable)} loyalty point&#40;s&#41;</S.mainText>
          {customerPointsData?.customerLoyaltyAndReferralsDetails?.pointsBalance || discount?.amount !== 0 ? (
            <>
              {discount?.amount === 0 ? (
                <>
                  <S.SubTextTop>
                    Redeem {convertToNumberWithCommas(Math.floor(pointsToRedeem))} point&#40;s&#41;
                  </S.SubTextTop>
                  <S.FlexCentered>
                    <Box sx={{ width: "95%" }}>
                      <Slider
                        onChange={handleChange}
                        min={1}
                        max={maxPointsThatCanBeUsed}
                        step={1}
                        valueLabelDisplay="off"
                        aria-label="loyaltyPoints"
                        getAriaValueText={valueText}
                        marks={false}
                        sx={customSliderStyles}
                      />
                    </Box>
                  </S.FlexCentered>
                  <S.DiscountAmount>
                    &#36;
                    {pointsUsedPerDollarSaved &&
                      convertToCurrencyWithCommas(pointsToRedeem / pointsUsedPerDollarSaved)}{" "}
                    off
                  </S.DiscountAmount>
                </>
              ) : (
                <S.CongratulatoryText>Congrats! Your award has been applied to the cart.</S.CongratulatoryText>
              )}
              <S.Button>
                <Button
                  // testingContext="checkoutRedeemButton"
                  onClick={handleRedeemButtonClick}
                  type="submit"
                >
                  {discount?.amount === 0 ? "Redeem" : "Undo"}
                </Button>
              </S.Button>
              {pointsGainedPerDollarSpent && netOrderPrice && (
                <S.SubTextBottom>
                  You will earn {Math.round(pointsGainedPerDollarSpent * netOrderPrice)} points with this purchase!
                </S.SubTextBottom>
              )}
            </>
          ) : (
            <>
              <S.SubTextBottom>
                Start earning points today! You accumulate points with each purchase. These points can be used toward
                discounts in future purchases!
              </S.SubTextBottom>
              <S.SubTextBottom>
                For every dollar spent, you&apos;ll earn{" "}
                {loyaltyAndReferralsData?.loyaltyAndReferralsInfo?.pointsGainedPerDollarSpent} point&#40;s&#41; towards
                future purchases!
              </S.SubTextBottom>
            </>
          )}
          <S.HR />
          <S.MarginBottom />
        </>
      ) : (
        <>
          <S.LoadingContainer>
            <S.CongratulatoryText>Updating your points...</S.CongratulatoryText>
            <Box sx={{ display: "flex" }}>
              <CircularProgress sx={{ color: "#0082a0" }} />
            </Box>
          </S.LoadingContainer>
          <S.HR />
          <S.MarginBottom />
        </>
      )}
    </>
  ) : (
    <></>
  );
};

export { LoyaltyPoints };
