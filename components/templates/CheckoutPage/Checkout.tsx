import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Link,
  Popover,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockIcon from "@mui/icons-material/Lock";
import * as React from "react";
import { useQueryParams, StringParam } from "next-query-params";
import { useRouter } from "next/router";
import { isArray } from "lodash";

import { Money } from "components/atoms/Money";
import { useAuth, useCheckout } from "nautical-api";
import { ICardData, IFormError } from "types";
import { maybe } from "@utils/misc";
import { LoyaltyPoints } from "components/atoms/LoyaltyPoints";
import { Plugins } from "deprecated/@nautical";
import { useShopContext } from "components/providers/ShopProvider";
import { ITaxedMoney } from "components/molecules/TaxedMoney/types";
import { IItems } from "components/providers/Nautical/Cart/types";
import { useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation } from "components/providers/Nautical/Auth/mutations.graphql.generated";
import { AddressForm, AddressFormValues } from "components/atoms";

import Payment from "./Payment";
import { IProduct } from "./types";
import { CartSummary } from "./CartSummary";
import { SellerMethod } from "./SellerMethod";
import {
  breadcrumb,
  button,
  buttonPopover,
  buttonsGrid,
  buttonText,
  cartSummary,
  gridspan,
  tabs,
  title,
} from "./styles";

import { ICheckoutModelLine, ICheckoutModelPriceValue } from "../../providers/Nautical/Checkout/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Box>
  );
};

const Errors = ({ errorMessage }: { errorMessage?: React.ReactNode | undefined }) =>
  errorMessage ? (
    <Alert sx={{ marginTop: "8px" }} severity="error">
      {errorMessage}
    </Alert>
  ) : null;

enum CheckoutTabs {
  CUSTOMER = "customer",
  SHIPPING = "shipping",
  PAYMENT = "payment",
}

interface ICheckoutProps {
  subtotal?: ITaxedMoney;
  promoCode?: ITaxedMoney;
  shipping?: ITaxedMoney;
  total?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue;
  products?: IProduct[] | null;
  items?: IItems | null;
  logo?: React.ReactNode;

  close(): void;
}

function usePersistedState(key: string, defaultValue: unknown): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = React.useState(() => localStorage.getItem(key) || String(defaultValue));
  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

const MuiCheckout = ({ items, subtotal, promoCode, shipping, total, logo, volumeDiscount, close }: ICheckoutProps) => {
  const creatingPayment = React.useRef(false);
  const [popover, setPopover] = React.useState(false);

  const [currentTab, setCurrentTab] = React.useState<CheckoutTabs>(CheckoutTabs.CUSTOMER);
  const [completeCheckoutRunnning, setCompleteCheckoutRunning] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<React.ReactNode | string>("");

  const [shippingFormError, setShippingFormError] = React.useState(false);

  const [shippingAddressError, setShippingAddressError] = React.useState<string>("");
  const [billingAddressError, setBillingAddressError] = React.useState<string>("");
  const [submittingPayment, setSubmittingPayment] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
  const [loyaltyAndReferralsActive, setLoyaltyAndReferralsActive] = React.useState(false);

  const { countries, activePlugins, minCheckoutAmount } = useShopContext();

  const [loyaltyPointsToBeEarnedOnOrderComplete, setLoyaltyPointsToBeEarnedOnOrderComplete] = usePersistedState(
    "loyaltyPoints",
    0
  );

  const {
    billingAddress,
    shippingAddress,
    setBillingAddress,
    setShippingAddress,
    setSellerShippingMethods,
    availableShippingMethodsBySeller,
    availablePaymentGateways,
    billingAsShipping,
    setBillingAsShippingAddress,
    sellerShippingMethods,
    createPayment,
    completeCheckout,
    lines,
    email,
    payment,
    loaded: checkoutLoaded,
  } = useCheckout();

  const products: IProduct[] | null =
    items?.map(({ id, variant, totalPrice, quantity }) => ({
      id: id || "",
      name: variant.product?.name || "",
      variant: variant.name || "",
      price: {
        gross: {
          amount: totalPrice?.gross.amount || 0,
          currency: totalPrice?.gross.currency || "",
        },
        net: {
          amount: totalPrice?.net.amount || 0,
          currency: totalPrice?.net.currency || "",
        },
      },
      priceUndiscounted: {
        gross: {
          amount: totalPrice?.gross.amount || 0,
          currency: totalPrice?.gross.currency || "",
        },
        net: {
          amount: totalPrice?.net.amount || 0,
          currency: totalPrice?.net.currency || "",
        },
      },
      quantity,
      sku: variant.sku || "",
      thumbnail: {
        alt: variant.product?.thumbnail?.alt || undefined,
        url: variant.product?.thumbnail?.url,
        url2x: variant.product?.thumbnail2x?.url,
      },
    })) ?? [];
  // Other
  const { user } = useAuth();
  const [{ payment_intent, payment_intent_client_secret }] = useQueryParams({
    payment_intent: StringParam,
    payment_intent_client_secret: StringParam,
  });
  const router = useRouter();

  const sellers = lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict: Record<string, ICheckoutModelLine[]> = {};
  const onPaymentStep = currentTab === CheckoutTabs.PAYMENT;
  const initialSellerValues: Record<string, string> = {};
  const parsedInitialSellerMethods = JSON.parse(sellerShippingMethods || "[]");
  for (const seller of sellerSet) {
    if (seller) {
      mappingDict[seller] = lines?.filter((line) => line.seller === seller) ?? [];
    }
  }
  availableShippingMethodsBySeller?.forEach(
    (data) =>
      (initialSellerValues[data.seller ?? ""] =
        parsedInitialSellerMethods.find((sellerAndMethod: { seller: number }) => {
          return +sellerAndMethod.seller === data.seller;
        })?.shippingMethod?.id || [])
  );

  const [awardCustomerLoyaltyPoints /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation();

  const checkIfLoyaltyAndReferralsActive = React.useCallback(() => {
    const yotpoLoyaltyAndReferralsPluginActive = Boolean(
      activePlugins?.find((plugin) => plugin?.identifier === Plugins.YOTPO_LOYALTY)
    );
    setLoyaltyAndReferralsActive(yotpoLoyaltyAndReferralsPluginActive);
    return yotpoLoyaltyAndReferralsPluginActive;
  }, [activePlugins]);

  const onCompleteCheckout = React.useCallback(async () => {
    setCompleteCheckoutRunning(true);
    const response = await completeCheckout();

    if (!response.dataError?.error) {
      if (checkIfLoyaltyAndReferralsActive() && user) {
        awardCustomerLoyaltyPoints({
          variables: {
            input: {
              customerEmail: user.email,
              pointAdjustmentAmount: Number(loyaltyPointsToBeEarnedOnOrderComplete),
              applyAdjustmentToPointsEarned: true,
            },
          },
        });
      }
      const token = response.data?.order?.token;
      const orderNumber = response.data?.order?.number;

      if (token && orderNumber) {
        router.push(`/order-finalized?token=${token}&orderNumber=${orderNumber}`);
      }
    } else {
      if (isArray(response.dataError.error)) {
        handleErrors(response.dataError.error);
      }
    }
    setCompleteCheckoutRunning(false);
  }, [
    awardCustomerLoyaltyPoints,
    checkIfLoyaltyAndReferralsActive,
    completeCheckout,
    loyaltyPointsToBeEarnedOnOrderComplete,
    router,
    user,
  ]);

  const handleCreatePayment = React.useCallback(
    async (gateway: string, token?: string, creditCardData?: ICardData) => {
      if (!creatingPayment.current) {
        creatingPayment.current = true;
        let errors: any[] = [];

        const { dataError } = await createPayment({
          gateway,
          token,
          creditCard: {
            ...creditCardData,
            brand: creditCardData?.brand ?? "",
            lastDigits: creditCardData?.lastDigits ?? "",
          },
        });
        if (dataError?.error && isArray(dataError?.error)) {
          errors = dataError.error;
        }

        if (!errors || errors.length === 0) {
          onCompleteCheckout();
        } else {
          handleErrors(errors);
        }
        creatingPayment.current = false;
      }
    },
    [onCompleteCheckout, createPayment]
  );

  React.useEffect(() => {
    const haveNeededPayment = (payment_intent && payment_intent_client_secret) || payment?.token;
    const paymentToken = payment_intent || payment?.token;
    if (haveNeededPayment) {
      handleCreatePayment("nautical.payments.stripe", paymentToken);
    }
  }, [handleCreatePayment, payment, payment_intent, payment_intent_client_secret]);

  React.useEffect(() => {
    checkIfLoyaltyAndReferralsActive();
  }, [checkIfLoyaltyAndReferralsActive]);

  const handleSubmitAddress =
    (
      checkoutMethod: typeof setShippingAddress | typeof setBillingAddress,
      errorHandler: React.Dispatch<string>,
      nextStep?: CheckoutTabs
    ) =>
    async (values: AddressFormValues) => {
      const country = countries.find((country) => country.code === values.country)?.country ?? "";
      const submission = await checkoutMethod(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          streetAddress1: values.streetAddress1,
          streetAddress2: values.streetAddress2,
          city: values.city,
          postalCode: values.postalCode,
          countryArea: values.countryArea,
          phone: values.phone,
          country: {
            code: values.country,
            country,
          },
        },
        values?.email ?? (email || "")
      );
      if (submission.dataError?.error) {
        if (isArray(submission.dataError.error)) {
          const error = parseErrors(submission.dataError.error);
          errorHandler(error);
        }
        return;
      } else {
        errorHandler("");
        if (nextStep) {
          setCurrentTab(nextStep);
        }
      }
    };

  const confirmAndPurchase = async () => {
    const orderTotal = Number(total?.gross.amount);
    const minOrderTotal = Number(minCheckoutAmount);

    if (orderTotal === 0) {
      setSubmittingPayment(true);
      onCompleteCheckout();
      return;
    }

    if (orderTotal < minOrderTotal) {
      setErrorMessage(
        <>
          Minimum order is <Money money={{ amount: minOrderTotal, currency: total?.gross.currency || "" }} />
        </>
      );
      return;
    }

    setSubmittingPayment(true);
    if (typeof document !== "undefined") {
      document.getElementById("gatewayButton")?.click();
    }
  };

  const handleSetSellerShippingMethods = async (seller: number, shippingMethodSelection: string) => {
    const { dataError } = await setSellerShippingMethods(seller, shippingMethodSelection);

    const errors = dataError?.error;
    if (errors) {
      setShippingFormError(true);
      if (isArray(errors)) {
        handleErrors(errors);
      }
    }
  };

  const handleBreadcrumb = (nextTab: CheckoutTabs) => {
    setCurrentTab(nextTab);
  };

  const handleErrors = (errors: IFormError[]) => {
    const messages = maybe(() => errors.flatMap((error) => error.message), []);
    setErrorMessage(messages.join(" \n"));
  };

  const parseErrors = (errors: IFormError[]) => {
    const messages = errors?.flatMap((error) => error.message) ?? [];
    return messages.join(" \n");
  };

  const handlePopover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopover(false);
    close();
  };

  const handleDismiss = () => {
    setAnchorEl(null);
    setPopover(false);
  };

  const updateLoyaltyPointsToBeEarnedOnOrderComplete = (points: number) => {
    setLoyaltyPointsToBeEarnedOnOrderComplete(String(points));
  };

  // ***** COMPONENTS *****
  const loyaltyPointsView = loyaltyAndReferralsActive && user && (
    <LoyaltyPoints
      // activeStepIndex={activeStepIndex}
      netOrderPrice={total?.net.amount}
      totalPrice={total}
      user={user}
      updateLoyaltyPointsToBeEarnedOnOrderComplete={updateLoyaltyPointsToBeEarnedOnOrderComplete}
    />
  );

  return (
    <>
      <Box
        sx={{
          placeContent: "center",
          backgroundColor: "#FFF",
          display: "flex",
          borderBottom: 1,
          borderBottomColor: "divider",
          height: 96,
          width: "100vw",
        }}
      >
        <Link style={{ alignItems: "center", display: "flex" }} onClick={handlePopover}>
          {logo}
        </Link>
        <Popover
          id={"simple-popover"}
          open={popover}
          anchorEl={anchorEl}
          onClose={handleDismiss}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card>
            <CardContent>Are you sure you want to exit checkout?</CardContent>
            <CardActions
              sx={{
                justifyContent: "space-around",
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: {
                  xs: 1,
                  sm: 4,
                },
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              }}
            >
              <Button sx={buttonPopover} size="small" variant="outlined" onClick={() => handleDismiss()}>
                Stay in Checkout
              </Button>
              <Button
                sx={buttonPopover}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  router.push("/cart/");
                  handleClose();
                }}
              >
                Return to Cart
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </Box>
      {checkoutLoaded && !payment_intent && !payment_intent_client_secret ? (
        <Box
          sx={{
            background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
            display: {
              xs: "flex",
            },
            gridTemplateColumns: "1.5fr 1fr",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF",
              padding: {
                xs: 2,
                sm: 6,
              },
              borderTop: 1,
              borderTopColor: "divider",
              width: "100%",
              maxWidth: {
                xs: "auto",
                sm: 800,
              },
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Breadcrumbs sx={breadcrumb} style={{ display: "none" }}>
                <Box
                  color={currentTab === CheckoutTabs.CUSTOMER ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb(CheckoutTabs.CUSTOMER)}
                >
                  Address
                </Box>
                <Box
                  color={currentTab === CheckoutTabs.SHIPPING ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb(CheckoutTabs.SHIPPING)}
                >
                  Shipping
                </Box>
                <Box
                  color={currentTab === CheckoutTabs.PAYMENT ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb(CheckoutTabs.PAYMENT)}
                >
                  Payment
                </Box>
              </Breadcrumbs>
              <Tabs variant="fullWidth" sx={tabs} value={currentTab}>
                <Tab value={CheckoutTabs.CUSTOMER} label="Customer" disableRipple />
                <Tab value={CheckoutTabs.SHIPPING} label="Shipping" disableRipple />
                <Tab value={CheckoutTabs.PAYMENT} label="Payment" disableRipple />
              </Tabs>
            </Box>

            <TabPanel value={currentTab} index={CheckoutTabs.CUSTOMER}>
              <Box mb={2}>
                <Typography sx={title} variant="h6">
                  Customer Information
                </Typography>
              </Box>
              <AddressForm
                values={{
                  email,
                  ...shippingAddress,
                  country: shippingAddress?.country.code,
                }}
                onSubmit={handleSubmitAddress(setShippingAddress, setShippingAddressError, CheckoutTabs.SHIPPING)}
                errorMessage={shippingAddressError}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={CheckoutTabs.SHIPPING}>
              <Box mb={2}>
                <Typography sx={title} variant="h6">
                  Shipping Information
                </Typography>
              </Box>
              {availableShippingMethodsBySeller?.map((sellerMethod) => (
                <SellerMethod
                  key={sellerMethod.seller}
                  sellerMethod={sellerMethod}
                  handleSetSellerShippingMethods={handleSetSellerShippingMethods}
                  mappingDict={mappingDict}
                  shippingMethod={initialSellerValues[Number(sellerMethod.seller)]}
                />
              ))}
              {shippingFormError && (
                <Box style={{ display: "block" }} sx={gridspan}>
                  <Errors errorMessage={errorMessage} />
                </Box>
              )}
              <Box sx={buttonsGrid}>
                <Button
                  disableRipple
                  disableElevation
                  sx={buttonText}
                  onClick={() => setCurrentTab(CheckoutTabs.CUSTOMER)}
                >
                  <KeyboardBackspaceIcon /> Back to customer information
                </Button>
                <Button
                  color="primary"
                  disableElevation
                  sx={button}
                  variant="contained"
                  onClick={() => {
                    if (!shippingFormError) {
                      setCurrentTab(CheckoutTabs.PAYMENT);
                    }
                  }}
                >
                  <LockIcon style={{ height: 16, width: 16, marginRight: 12 }} /> Continue
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={currentTab} index={CheckoutTabs.PAYMENT}>
              <Payment handleCreatePayment={handleCreatePayment} />
              <Box mb={2}>
                <Typography sx={title} variant="h6">
                  Billing Address
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={billingAsShipping}
                    onChange={async () => await setBillingAsShippingAddress(!billingAsShipping)}
                  />
                }
                label="Same as shipping address"
                style={{ marginBottom: "16px" }}
              />

              <AddressForm
                values={{
                  ...billingAddress,
                  country: billingAddress?.country.code,
                }}
                onSubmit={async (values) => {
                  if (!billingAsShipping) {
                    handleSubmitAddress(setBillingAddress, setBillingAddressError)(values);
                  }
                  confirmAndPurchase();
                }}
                errorMessage={errorMessage || billingAddressError}
                submitText={submittingPayment ? <CircularProgress /> : "Confirm Payment"}
                secondaryButton={
                  <Button disableRipple disableElevation onClick={() => setCurrentTab(CheckoutTabs.SHIPPING)}>
                    <KeyboardBackspaceIcon /> Back to shipping
                  </Button>
                }
                hideFields={billingAsShipping}
              />
            </TabPanel>
          </Box>
          <Box sx={cartSummary}>
            <CartSummary
              products={products}
              total={total}
              promoCode={promoCode}
              subtotal={subtotal}
              shipping={shipping}
              volumeDiscount={volumeDiscount}
              onPaymentStep={onPaymentStep}
              loyaltyPoints={loyaltyPointsView}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h4">Confirming your payment...</Typography>
            {completeCheckoutRunnning && <CircularProgress />}
          </Box>
          <Errors errorMessage={errorMessage} />
        </Box>
      )}
    </>
  );
};

export default MuiCheckout;
