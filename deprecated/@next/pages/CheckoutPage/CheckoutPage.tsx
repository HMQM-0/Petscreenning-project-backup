// import React, { useEffect, useRef, useState } from "react";
import React from "react";
import { makeStyles } from "@mui/styles";

// import { useIntl } from "react-intl";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { useQuery } from "@apollo/client";

import logoImg from "deprecated/images/wine-logo.png";
// import { Button, CircularProgress } from "@mui/material";
// import { CheckoutProgressBar } from "@components/molecules";
// import {
//   CartSummary,
//   PaymentGatewaysList,
//   translateAdyenConfirmationError,
//   adyenNotNegativeConfirmationStatusCodes,
// } from "@components/organisms";
// import { Checkout } from "@components/templates";
// import { useCart, useCheckout } from "@nautical/sdk";
import { useCart, useCheckout } from "@nautical/react";
// import { IItems } from "@nautical/sdk/lib/api/Cart/types";
// import { IItems } from "@nautical/api/Cart/types";
// import {
//   CHECKOUT_STEPS,
//   CheckoutStep,
//   MICROSITE_CHECKOUT_STEPS,
// } from "deprecated/core/config";
// import { checkoutMessages } from "deprecated/intl";
// import { ITaxedMoney, ICheckoutStep, ICardData, IFormError } from "@types";
// import { ITaxedMoney, ICardData, IFormError } from "@types";
import { ITaxedMoney } from "@types";
// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
//   // parseQueryString,
// } from "core/utils";
// import { CompleteCheckout_checkoutComplete_order } from "@nautical/sdk/lib/mutations/gqlTypes/CompleteCheckout";
// import { CompleteCheckout_checkoutComplete_order } from "@nautical/mutations/gqlTypes/CompleteCheckout";

// import { CheckoutRouter } from "./CheckoutRouter";
// import {
//   CheckoutAddressSubpage,
//   CheckoutPaymentSubpage,
//   CheckoutReviewSubpage,
//   CheckoutShippingSubpage,
//   ICheckoutAddressSubpageHandles,
//   ICheckoutPaymentSubpageHandles,
//   ICheckoutReviewSubpageHandles,
//   ICheckoutShippingSubpageHandles,
// } from "./subpages";
// import { ICheckoutModelPriceValue } from "@nautical/sdk/lib/helpers";
// import { ICheckoutModelPriceValue } from "@nautical/helpers";

import MuiCheckout from "deprecated/components/Checkout/Checkout";
import { maybe } from "@utils/misc";
import Loader from "deprecated/components/Loader";

import { brandingQuery } from "../../../app/queries";
// import { Spacer } from "@components/molecules/ProductTile/styles";

const convertToTaxedMoney = (value: ITaxedMoney | null | undefined) => {
  const converted = value;
  return converted;
};

// const prepareCartSummary = (
//   totalPrice?: ITaxedMoney | null,
//   subtotalPrice?: ITaxedMoney | null,
//   shippingTaxedPrice?: ITaxedMoney | null,
//   promoTaxedPrice?: ITaxedMoney | null,
//   items?: IItems,
//   applicableVolumeDiscounts?: ICheckoutModelPriceValue
// ) => {
//   const products = items?.map(({ id, variant, totalPrice, quantity }) => ({
//     id: id || "",
//     name: variant.name || "",
//     price: {
//       gross: {
//         amount: totalPrice?.gross.amount || 0,
//         currency: totalPrice?.gross.currency || "",
//       },
//       net: {
//         amount: totalPrice?.net.amount || 0,
//         currency: totalPrice?.net.currency || "",
//       },
//     },
//     quantity,
//     sku: variant.sku || "",
//     thumbnail: {
//       alt: variant.product?.thumbnail?.alt || undefined,
//       url: variant.product?.thumbnail?.url,
//       url2x: variant.product?.thumbnail2x?.url,
//     },
//   }));

//   return (
//     <CartSummary
//       shipping={shippingTaxedPrice}
//       subtotal={subtotalPrice}
//       promoCode={promoTaxedPrice}
//       total={totalPrice}
//       products={products}
//       volumeDiscount={applicableVolumeDiscounts}
//     />
//   );
// };

// const getCheckoutProgress = (
//   loaded: boolean,
//   activeStepIndex: number,
//   steps: ICheckoutStep[]
// ) => {
//   return loaded ? (
//     <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
//   ) : null;
// };

// const getButton = (text?: string, onClick?: () => void) => {
//   if (text) {
//     return (
//       <Button
//         // testingContext="checkoutPageNextStepButton"
//         onClick={onClick}
//         type="submit"
//       >
//         {text}
//       </Button>
//     );
//   }
//   return null;
// };

const useStyles = makeStyles((theme) => ({
  backdrop: {
    height: "100vh",
    width: "100vw",
    // @ts-ignore
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  modal: {
    overflow: "auto",
    display: "block",
    width: "100vw",
    height: "100vh",
    // @ts-ignore
    "& .MuiBackdrop-root": {
      backgroundColor: "white",
    },
  },
}));

interface ICheckoutProps {
  logo?: React.ReactNode;
}

// const CheckoutPage: React.FC<ICheckoutProps> = ({ logo }) => {
const CheckoutPage: React.FC<ICheckoutProps> = () => {
  // const location = useLocation();
  const classes = useStyles();
  const [modal, setModal] = React.useState(true);
  // const querystring = parseQueryString(location);
  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    applicableVolumeDiscounts,
    // payment,
    // applicableVolumeDiscounts,
    // availablePaymentGateways,
    // createPayment,
    // completeCheckout,
  } = useCheckout();
  // const intl = useIntl();

  // if (cartLoaded && (!items || !items?.length)) {
  //   return (
  //     <Navigate
  //       to={
  //         !!isMicrosite()
  //           ? `${generateMicrositeUrl(
  //               getMicrositeId(),
  //               getMicrositeSlug()
  //             )}cart/`
  //           : "/cart/"
  //       }
  //     />
  //   );
  // }

  const { data, loading } = useQuery(brandingQuery, {
    fetchPolicy: "cache-and-network",
  });

  const logo = data?.branding?.logo ? (
    <img
      src={data.branding.logo.url}
      width={maybe(() => data.branding.logoWidth, 188)}
      height={maybe(() => data.branding.logoHeight, 28)}
      alt="Logo"
    />
  ) : (
    <img style={{ height: 28 }} src={logoImg} />
  );

  // const [submitInProgress, setSubmitInProgress] = useState(false);
  // const [paymentConfirmation, setPaymentConfirmation] = useState(false);

  // const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
  //   string | undefined
  // >(payment?.gateway);
  // const [selectedPaymentGatewayToken, setSelectedPaymentGatewayToken] =
  //   useState<string | undefined>(payment?.token);
  // const [paymentGatewayErrors, setPaymentGatewayErrors] = useState<
  //   IFormError[]
  // >([]);

  // useEffect(() => {
  //   setSelectedPaymentGateway(payment?.gateway);
  // }, [payment?.gateway]);
  // useEffect(() => {
  //   setSelectedPaymentGatewayToken(payment?.token);
  // }, [payment?.token]);

  // const isShippingRequiredForProducts =
  //   items &&
  //   items.some(
  //     ({ variant }) => variant.product?.productType.isShippingRequired
  //   );

  // const stepsWithViews = !!isMicrosite()
  //   ? MICROSITE_CHECKOUT_STEPS.filter(({ withoutOwnView }) => !withoutOwnView)
  //   : CHECKOUT_STEPS.filter(({ withoutOwnView }) => !withoutOwnView);
  // const steps = isShippingRequiredForProducts
  //   ? stepsWithViews
  //   : stepsWithViews.filter(
  //       ({ onlyIfShippingRequired }) => !onlyIfShippingRequired
  //     );
  // const getActiveStepIndex = () => {
  //   const matchingStepIndex = steps.findIndex(
  //     ({ link }) => link === location?.pathname
  //   );
  //   return matchingStepIndex !== -1 ? matchingStepIndex : steps.length - 1;
  // };
  // const getActiveStep = () => {
  //   return steps[getActiveStepIndex()];
  // };

  // const checkoutAddressSubpageRef =
  //   useRef<ICheckoutAddressSubpageHandles>(null);
  // const checkoutShippingSubpageRef =
  //   useRef<ICheckoutShippingSubpageHandles>(null);
  // const checkoutPaymentSubpageRef =
  //   useRef<ICheckoutPaymentSubpageHandles>(null);
  // const checkoutReviewSubpageRef = useRef<ICheckoutReviewSubpageHandles>(null);
  // const checkoutGatewayFormId = "gateway-form";
  // const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);

  // const handleNextStepClick = () => {
  //   // Some magic above and below ensures that the activeStepIndex will always
  //   // be in 0-3 range
  //   /* eslint-disable default-case */
  //   switch (getActiveStep().index) {
  //     case 0:
  //       if (checkoutAddressSubpageRef.current?.submitAddress) {
  //         checkoutAddressSubpageRef.current?.submitAddress();
  //       }
  //       break;
  //     case 1:
  //       if (checkoutShippingSubpageRef.current?.submitShipping) {
  //         checkoutShippingSubpageRef.current?.submitShipping();
  //       }
  //       break;
  //     case 2:
  //       if (checkoutPaymentSubpageRef.current?.submitPayment) {
  //         checkoutPaymentSubpageRef.current?.submitPayment();
  //       }
  //       break;
  //     case 3:
  //       if (checkoutReviewSubpageRef.current?.complete) {
  //         checkoutReviewSubpageRef.current?.complete();
  //       }
  //       break;
  //   }
  // };
  // const handleStepSubmitSuccess = (
  //   currentStep: CheckoutStep,
  //   data?: object,
  // ) => {
  //   const activeStepIndex = getActiveStepIndex();
  //   if (currentStep === CheckoutStep.Review) {
  //     // @ts-ignore
  //     navigate({
  //       pathname: !!isMicrosite()
  //         ? `${generateMicrositeUrl(
  //             getMicrositeId(),
  //             getMicrositeSlug()
  //           )}order-finalized`
  //         : "/order-finalized",
  //       state: data,
  //     });
  //   } else {
  //     navigate(steps[activeStepIndex + 1].link);
  //   }
  // };

  const shippingTaxedPrice =
    // checkout?.shippingMethod?.id && shippingPrice
    checkout?.sellerShippingMethods &&
    checkout?.sellerShippingMethods.length > 5 &&
    shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  // const checkoutView =
  //   cartLoaded && checkoutLoaded ? (
  //     <CheckoutRouter
  //       items={items}
  //       checkout={checkout}
  //       payment={payment}
  //       totalPrice={totalPrice}
  //       renderAddress={(props) => (
  //         <CheckoutAddressSubpage
  //           ref={checkoutAddressSubpageRef}
  //           changeSubmitProgress={setSubmitInProgress}
  //           onSubmitSuccess={() =>
  //             handleStepSubmitSuccess(CheckoutStep.Address)
  //           }
  //           {...props}
  //         />
  //       )}
  //       renderShipping={(props) => (
  //         <CheckoutShippingSubpage
  //           ref={checkoutShippingSubpageRef}
  //           changeSubmitProgress={setSubmitInProgress}
  //           onSubmitSuccess={() =>
  //             handleStepSubmitSuccess(CheckoutStep.Shipping)
  //           }
  //           {...props}
  //         />
  //       )}
  //       renderPayment={(props) => (
  //         <CheckoutPaymentSubpage
  //           ref={checkoutPaymentSubpageRef}
  //           paymentGatewayFormRef={checkoutGatewayFormRef}
  //           changeSubmitProgress={setSubmitInProgress}
  //           onSubmitSuccess={() =>
  //             handleStepSubmitSuccess(CheckoutStep.Payment)
  //           }
  //           onPaymentGatewayError={setPaymentGatewayErrors}
  //           {...props}
  //         />
  //       )}
  //       renderReview={(props) => (
  //         <CheckoutReviewSubpage
  //           ref={checkoutReviewSubpageRef}
  //           paymentGatewayFormRef={checkoutGatewayFormRef}
  //           selectedPaymentGatewayToken={selectedPaymentGatewayToken}
  //           changeSubmitProgress={setSubmitInProgress}
  //           onSubmitSuccess={(data) =>
  //             handleStepSubmitSuccess(CheckoutStep.Review, data)
  //           }
  //           {...props}
  //         />
  //       )}
  //     />
  //   ) : (
  //     <Loader />
  //   );

  // const handleCreatePayment = async (
  //   gateway: string,
  //   token?: string,
  //   creditCardData?: ICardData
  // ) => {
  //   const paymentConfirmStepLink = !!isMicrosite()
  //     ? MICROSITE_CHECKOUT_STEPS.find(
  //         (step) => step.step === CheckoutStep.PaymentConfirm
  //       )?.link
  //     : CHECKOUT_STEPS.find((step) => step.step === CheckoutStep.PaymentConfirm)
  //         ?.link;
  //   const { dataError } = await createPayment({
  //     gateway,
  //     token,
  //     // @ts-ignore
  //     creditCard: creditCardData,
  //     returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
  //   });
  //   const errors = dataError?.error;
  //   setSubmitInProgress(false);
  //   if (errors) {
  //     setPaymentGatewayErrors(errors);
  //   } else {
  //     setPaymentGatewayErrors([]);
  //     handleStepSubmitSuccess(CheckoutStep.Payment);
  //   }
  // };

  // // @ts-ignore
  // const authNetResponseHandler = (
  //   response: any,
  //   gateway: string,
  //   creditCardData: ICardData
  // ) => {
  //   if (response.messages.resultCode === "Error") {
  //     let i = 0;
  //     while (i < response.messages.message.length) {
  //       console.error(
  //         response.messages.message[i].code +
  //           ": " +
  //           response.messages.message[i].text
  //       );
  //       i = i + 1;
  //     }
  //   } else {
  //     handleCreatePayment(
  //       gateway,
  //       response.opaqueData.dataValue,
  //       creditCardData
  //     );
  //   }
  // };

  // const handleProcessPayment = (
  //   gateway: string,
  //   token?: string,
  //   creditCardData?: ICardData
  // ) => {
  //   if (gateway === "nautical.payments.authorize_net") {
  //     const publicClientKey = creditCardData?.config?.find(
  //       (comnfiguration) => comnfiguration.field === "client_key"
  //     )?.value;
  //     const apiLoginID = creditCardData?.config?.find(
  //       (comnfiguration) => comnfiguration.field === "api_login_id"
  //     )?.value;
  //     const authData = {
  //       clientKey: publicClientKey,
  //       apiLoginID,
  //     };
  //     const cardData = {
  //       cardNumber:
  //         creditCardData?.fullNumber && creditCardData.fullNumber.toString(),
  //       month: creditCardData?.expMonth && creditCardData.expMonth.toString(),
  //       year: creditCardData?.expYear && creditCardData.expYear.toString(),
  //       cardCode: creditCardData?.cvv && creditCardData.cvv.toString(),
  //     };
  //     const secureData = {
  //       authData,
  //       cardData,
  //     };

  //     const sterilizedCreditCardData = {
  //       brand: creditCardData?.brand,
  //       expMonth: creditCardData?.expMonth,
  //       expYear: creditCardData?.expYear,
  //       firstDigits: creditCardData?.firstDigits,
  //       lastDigits: creditCardData?.lastDigits,
  //     };
  //     // @ts-ignore
  //     // Accept is a Javascript Library we imported via a script tag injected into the Head HTML Element of our
  //     // App via the Helmet React Component.
  //     // The Helmet component with this script can be found in the AuthorizeNetPaymentGateway(.tsx) component.
  //     Accept.dispatchData(secureData, (res) =>
  //       // @ts-ignore
  //       authNetResponseHandler(res, gateway, sterilizedCreditCardData)
  //     );
  //   } else {
  //     handleCreatePayment(gateway, token, creditCardData);
  //   }
  // };

  // const handleSubmitPayment = async (paymentData?: object) => {
  //   const response = await completeCheckout({ paymentData });
  //   return {
  //     confirmationData: response.data?.confirmationData,
  //     confirmationNeeded: response.data?.confirmationNeeded,
  //     order: response.data?.order,
  //     errors: response.dataError?.error,
  //   };
  // };
  // const handleSubmitPaymentSuccess = (
  //   order?: CompleteCheckout_checkoutComplete_order
  // ) => {
  //   setSubmitInProgress(false);
  //   setPaymentGatewayErrors([]);
  //   handleStepSubmitSuccess(CheckoutStep.Review, {
  //     id: order?.id,
  //     orderNumber: order?.number,
  //     token: order?.token,
  //   });
  // };
  // const handlePaymentGatewayError = (errors: IFormError[]) => {
  //   setSubmitInProgress(false);
  //   setPaymentGatewayErrors(errors);
  //   const paymentStepLink = steps.find(
  //     (step) => step.step === CheckoutStep.Payment
  //   )?.link;
  //   if (paymentStepLink) {
  //     navigate(paymentStepLink);
  //   }
  // };

  // const paymentGatewaysView = availablePaymentGateways && (
  //   <PaymentGatewaysList
  //     paymentGateways={availablePaymentGateways}
  //     processPayment={handleProcessPayment}
  //     submitPayment={handleSubmitPayment}
  //     submitPaymentSuccess={handleSubmitPaymentSuccess}
  //     formId={checkoutGatewayFormId}
  //     formRef={checkoutGatewayFormRef}
  //     selectedPaymentGateway={selectedPaymentGateway}
  //     selectedPaymentGatewayToken={selectedPaymentGatewayToken}
  //     selectPaymentGateway={setSelectedPaymentGateway}
  //     onError={handlePaymentGatewayError}
  //     errors={paymentGatewayErrors}
  //   />
  // );

  // const activeStep = getActiveStep();
  // let buttonText = activeStep.nextActionName;
  // /* eslint-disable default-case */
  // switch (activeStep.nextActionName) {
  //   case "Continue to Shipping":
  //     buttonText = intl.formatMessage(checkoutMessages.addressNextActionName);
  //     break;
  //   case "Continue to Payment":
  //     buttonText = intl.formatMessage(checkoutMessages.shippingNextActionName);
  //     break;
  //   case "Continue to Review":
  //     buttonText = intl.formatMessage(checkoutMessages.paymentNextActionName);
  //     break;
  //   case "Place order":
  //     buttonText = intl.formatMessage(checkoutMessages.reviewNextActionName);
  //     break;
  // }

  // useEffect(() => {
  //   const paymentConfirmStepLink = CHECKOUT_STEPS.find(
  //     (step) => step.step === CheckoutStep.PaymentConfirm
  //   )?.link;
  //   if (
  //     !submitInProgress &&
  //     checkout &&
  //     location?.pathname === paymentConfirmStepLink &&
  //     !paymentConfirmation
  //   ) {
  //     handlePaymentConfirm();
  //   }
  // }, [location?.pathname, querystring, submitInProgress, checkout]);

  // const handlePaymentConfirm = async () => {
  //   /**
  //    * Prevent proceeding in confirmation flow in case of gateways that don't support it to prevent unknown bugs.
  //    */
  //   if (payment?.gateway !== "nautical.payments.adyen") {
  //     const paymentStepLink = steps.find(
  //       (step) => step.step === CheckoutStep.Payment
  //     )?.link;
  //     if (paymentStepLink) {
  //       navigate(paymentStepLink);
  //     }
  //   }

  //   setSubmitInProgress(true);
  //   setPaymentConfirmation(true);
  //   /**
  //    * Nautical API creates an order for not fully authorised payments, thus we accept all non negative payment result codes,
  //    * assuming the payment is completed, what means we can proceed further.
  //    * https://docs.adyen.com/checkout/drop-in-web?tab=http_get_1#step-6-present-payment-result
  //    */
  //   if (
  //     adyenNotNegativeConfirmationStatusCodes.includes(
  //       querystring.resultCode as string
  //     )
  //   ) {
  //     console.info("HANDLE PAYMENT CONFIRM");
  //     const { data, dataError } = await completeCheckout();
  //     const errors = dataError?.error;
  //     setSubmitInProgress(false);
  //     if (errors) {
  //       setPaymentGatewayErrors(errors);
  //       const paymentStepLink = steps.find(
  //         (step) => step.step === CheckoutStep.Payment
  //       )?.link;
  //       if (paymentStepLink) {
  //         navigate(paymentStepLink);
  //       }
  //     } else {
  //       setPaymentGatewayErrors([]);
  //       handleStepSubmitSuccess(CheckoutStep.Review, {
  //         id: data?.order?.id,
  //         orderNumber: data?.order?.number,
  //         token: data?.order?.token,
  //       });
  //     }
  //   } else {
  //     setPaymentGatewayErrors([
  //       {
  //         message: translateAdyenConfirmationError(
  //           querystring.resultCode as string,
  //           intl
  //         ),
  //       },
  //     ]);
  //     const paymentStepLink = steps.find(
  //       (step) => step.step === CheckoutStep.Payment
  //     )?.link;
  //     if (paymentStepLink) {
  //       navigate(paymentStepLink);
  //       setSubmitInProgress(false);
  //       setPaymentConfirmation(false);
  //     }
  //   }
  // };

  // const activeStepIndex = getActiveStepIndex();

  return (
    <>
      <Modal open={modal} className={classes.modal}>
        <Box className={classes.backdrop}>
          {!checkoutLoaded || !cartLoaded || loading ? (
            <Loader />
          ) : (
            <MuiCheckout
              items={items}
              logo={logo}
              subtotal={convertToTaxedMoney(subtotalPrice)}
              promoCode={convertToTaxedMoney(promoTaxedPrice)}
              shipping={convertToTaxedMoney(shippingTaxedPrice)}
              volumeDiscount={applicableVolumeDiscounts}
              total={convertToTaxedMoney(totalPrice)}
              close={() => setModal(false)}
            />
          )}
        </Box>
      </Modal>
      {/* <Checkout
      loading={submitInProgress}
      navigation={getCheckoutProgress(
        cartLoaded && checkoutLoaded,
        activeStepIndex,
        steps
      )}
      cartSummary={prepareCartSummary(
        totalPrice,
        subtotalPrice,
        shippingTaxedPrice,
        promoTaxedPrice,
        items,
        applicableVolumeDiscounts
      )}
      checkout={checkoutView}
      paymentGateways={paymentGatewaysView}
      hidePaymentGateways={steps[activeStepIndex].step !== CheckoutStep.Payment}
      button={getButton(buttonText?.toUpperCase(), handleNextStepClick)}
    /> */}
    </>
  );
};

export { CheckoutPage };
