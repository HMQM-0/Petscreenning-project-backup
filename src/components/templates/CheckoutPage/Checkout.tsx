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
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";

import { Money } from "src/components/atoms/Money";
import { useAuth, useCheckout } from "nautical-api";
import { ICardData, IFormError } from "src/types";
import { LoyaltyPoints } from "src/components/atoms/LoyaltyPoints";
import { useShopContext } from "src/components/providers/ShopProvider";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { IItems } from "src/components/providers/Nautical/Cart/types";
import { useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation } from "src/components/providers/Nautical/Auth/mutations.graphql.generated";
import { AddressForm, AddressFormFields, AddressFormValues } from "src/components/atoms";

import Payment from "./Payment";
import { IProduct } from "./types";
import { CartSummary } from "./CartSummary";
import { SellerMethod } from "./SellerMethod";
import {
  breadcrumb,
  button,
  buttonPopover,
  buttonsGrid,
  buttonsGridAddress,
  cartSummary,
  gridspan,
  tabs,
  title,
  or,
  account_login,
  account_guest,
  singleTab,
  returnCustomer,
} from "./styles";
import { Plugins } from "./constants";
import classes from "./scss/index.module.scss";
import sendFidoTabbyAlertTag, { FIDO_TABBY_ALERT_TAGS_COOKIE, IFidoTabbyAlertTag } from "./ZapierHook/FidoTabbyAlert";

import { ICheckoutModelLine, ICheckoutModelPriceValue } from "../../providers/Nautical/Checkout/types";
import { mapItemsForRoktPlacement, PLACEMENT_DATA } from "../OrderFinalized";

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
    <Alert
      sx={{ marginTop: "8px" }}
      severity="error"
    >
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
  setHasFailedFinalizingPayment: React.Dispatch<boolean>;
  close(): void;
}

function usePersistedState(key: string, defaultValue: unknown): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = React.useState(() => localStorage.getItem(key) || String(defaultValue));
  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

const MuiCheckout = ({
  items,
  subtotal,
  promoCode,
  shipping,
  total,
  logo,
  volumeDiscount,
  setHasFailedFinalizingPayment,
  close,
}: ICheckoutProps) => {
  const creatingPayment = React.useRef(false);
  const [popover, setPopover] = React.useState(false);

  const [currentTab, setCurrentTab] = React.useState<CheckoutTabs>(CheckoutTabs.CUSTOMER);
  const [completeCheckoutRunnning, setCompleteCheckoutRunning] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<React.ReactNode | string>("");

  const [shippingFormError, setShippingFormError] = React.useState(false);

  const [launcher, setLauncher] = React.useState<any>(null);
  const [createdInstance, setCreatedIntance] = React.useState(false);

  const [shippingAddressError, setShippingAddressError] = React.useState<string>("");
  const [billingAddressError, setBillingAddressError] = React.useState<string>("");
  const [submittingPayment, setSubmittingPayment] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
  const [loyaltyAndReferralsActive, setLoyaltyAndReferralsActive] = React.useState(false);

  const [isSubmittingShippingAddress, setIsSubmittingShippingAddress] = React.useState(false);

  const { countries, activePlugins, minCheckoutAmount } = useShopContext();

  const [loyaltyPointsToBeEarnedOnOrderComplete, setLoyaltyPointsToBeEarnedOnOrderComplete] = usePersistedState(
    "loyaltyPoints",
    0,
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
    invalidate,
  } = useCheckout();

  const allShippingMethodsSelected = sellerShippingMethods?.length === availableShippingMethodsBySeller?.length;

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

  React.useEffect(() => {
    if (!payment_intent) {
      invalidate();
    }
  }, [currentTab, invalidate, payment_intent]);

  React.useEffect(() => {
    const selectRoktPlacements = async () => {
      if (currentTab === CheckoutTabs.PAYMENT) {
        await selectPlacements();
      }
    };

    selectRoktPlacements();
  }, [currentTab]);

  const router = useRouter();

  const sellers = lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict: Record<string, ICheckoutModelLine[]> = {};
  const onPaymentStep = currentTab === CheckoutTabs.PAYMENT;
  const initialSellerValues: Record<string, string> = {};
  for (const seller of sellerSet) {
    if (seller) {
      mappingDict[seller] = lines?.filter((line) => line.seller === seller) ?? [];
    }
  }
  availableShippingMethodsBySeller?.forEach(
    (data) =>
      (initialSellerValues[data.seller ?? ""] =
        sellerShippingMethods.find((sellerAndMethod: { seller: number }) => {
          return +sellerAndMethod.seller === data.seller;
        })?.shippingMethod?.id || []),
  );

  const [awardCustomerLoyaltyPoints /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation();

  const checkIfLoyaltyAndReferralsActive = React.useCallback(() => {
    const yotpoLoyaltyAndReferralsPluginActive = Boolean(
      activePlugins?.find((plugin) => plugin?.identifier === Plugins.YOTPO_LOYALTY),
    );
    setLoyaltyAndReferralsActive(yotpoLoyaltyAndReferralsPluginActive);
    return yotpoLoyaltyAndReferralsPluginActive;
  }, [activePlugins]);

  const handleErrors = React.useCallback(
    (errors: IFormError[]) => {
      const messages = errors?.flatMap((error) => error.message) ?? [];
      setErrorMessage(messages.join(" \n"));
      invalidate();
    },
    [invalidate],
  );

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
      const orderId = response.data?.order?.id;

      const fiddoTabyAlertTagsCookie = Cookies.get(FIDO_TABBY_ALERT_TAGS_COOKIE);

      if (fiddoTabyAlertTagsCookie) {
        const fiddoTabyAlertTags: IFidoTabbyAlertTag[] = JSON.parse(fiddoTabyAlertTagsCookie);
        if (fiddoTabyAlertTags.length) {
          fiddoTabyAlertTags.forEach(async (tag: IFidoTabbyAlertTag) => {
            console.log("Sending tags");
            await sendFidoTabbyAlertTag(tag, email, orderId);
          });
          Cookies.remove(FIDO_TABBY_ALERT_TAGS_COOKIE);
        }
      }

      if (token && orderNumber) {
        location.href = `/order-finalized?token=${token}&orderNumber=${orderNumber}`;
      }
    } else {
      if (isArray(response.dataError.error)) {
        handleErrors(response.dataError.error);
      }
      invalidate();
      setCompleteCheckoutRunning(false);
    }
  }, [
    awardCustomerLoyaltyPoints,
    checkIfLoyaltyAndReferralsActive,
    completeCheckout,
    handleErrors,
    invalidate,
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
          await onCompleteCheckout();
        } else {
          handleErrors(errors);
          setHasFailedFinalizingPayment(true);
        }
        creatingPayment.current = false;
        setSubmittingPayment(false);
      }
    },
    [createPayment, setHasFailedFinalizingPayment, onCompleteCheckout, handleErrors],
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

  React.useEffect(() => {
    const createRoktLauncher = async () => {
      if (document) {
        await new Promise<void>((resolve) =>
          (window as any).Rokt
            ? resolve()
            : document.getElementById("rokt-launcher")?.addEventListener("load", () => resolve()),
        );
      }

      if (!createdInstance) {
        const launcherInstance = await (window as any).Rokt.createLauncher({
          accountId: "3071804547766951791",
          sandbox: true,
        });
        setCreatedIntance(true);
        setLauncher(launcherInstance);
      }
    };

    createRoktLauncher();
  }, []);

  const handleSubmitAddress =
    (
      checkoutMethod: typeof setShippingAddress | typeof setBillingAddress,
      errorHandler: React.Dispatch<string>,
      nextStep?: CheckoutTabs,
      onComplete?: () => void,
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
        values?.email ?? (email || ""),
      );
      if (submission.dataError?.error) {
        if (isArray(submission.dataError.error)) {
          const error = parseErrors(submission.dataError.error);
          errorHandler(error);
          invalidate();
        }
        onComplete?.();
        return submission;
      } else {
        errorHandler("");
        if (nextStep) {
          setCurrentTab(nextStep);
        }
      }
      onComplete?.();
      return submission;
    };

  // these refs will be used to store the onSubmit prop passed to the AddressForm respective to each address type
  const submitShippingAddressRef = React.useRef<() => Promise<ReturnType<typeof setShippingAddress>>>();
  const submitBillingAddressRef = React.useRef<() => Promise<ReturnType<typeof setBillingAddress>>>();

  const confirmAndPurchase = async () => {
    setSubmittingPayment(true);
    const orderTotal = Number(total?.gross.amount);
    const minOrderTotal = Number(minCheckoutAmount);

    if (orderTotal === 0) {
      await onCompleteCheckout();
      return;
    }

    if (orderTotal < minOrderTotal) {
      setErrorMessage(
        <>
          Minimum order is <Money money={{ amount: minOrderTotal, currency: total?.gross.currency || "" }} />
        </>,
      );
      setSubmittingPayment(false);
      return;
    }

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

  const submitShippingAddress = handleSubmitAddress(
    setShippingAddress,
    setShippingAddressError,
    CheckoutTabs.SHIPPING,
    () => setIsSubmittingShippingAddress(false),
  );

  const submitBillingAddress = handleSubmitAddress(setBillingAddress, setBillingAddressError);

  const shippingStepDisabled = !shippingAddress;
  const paymentStepDisabled = !shippingAddress || !allShippingMethodsSelected;

  const selectPlacements = async () => {
    if (launcher) {
      const mappedItems = mapItemsForRoktPlacement(items);

      const attributes = {
        email: user?.email || email,
        firstname: shippingAddress?.firstName,
        lastname: shippingAddress?.lastName,
        address1: shippingAddress?.streetAddress1,
        address2: shippingAddress?.streetAddress2,
        city: shippingAddress?.city,
        state: shippingAddress?.countryArea,
        country: shippingAddress?.country.country,
        zipcode: shippingAddress?.postalCode,
        amount: total?.gross.amount,
        cartItems: mappedItems,
      };

      Cookies.set(PLACEMENT_DATA, JSON.stringify(attributes), { expires: 1 });

      await launcher.selectPlacements({
        identifier: "payment_page",
        attributes: {
          // Required
          amount: total?.net.amount,
          siteCountry: "US",
          siteLanguage: "en",
          currency: "USD",
          //Order Data
          clientcustomerid: "",
          cartId: "",
          subtotal,
          totalTax: "",
          totalShipping: shipping,
          margin: "",
          paymenttype: "",
          ccbin: "",
          cartItems: JSON.stringify(mappedItems),
          //Customer Data
          customerType: "",
          hasAccount: "",
          isReturning: "",
          lastVisited: "",
          isLoyalty: "",
          loyaltyTier: "",
          email: user?.email || email,
          mobile: billingAddress?.phone,
          title: "",
          firstname: billingAddress?.firstName,
          lastname: billingAddress?.lastName,
          age: "",
          gender: "",
          dob: "",
          billingAddress1: billingAddress?.streetAddress1,
          billingAddress2: billingAddress?.streetAddress2,
          billingCity: billingAddress?.city,
          billingState: billingAddress?.countryArea,
          billingZipcode: billingAddress?.postalCode,
          billingCountry: billingAddress?.country.country,
          shippingAddress1: shippingAddress?.streetAddress1,
          shippingAddress2: shippingAddress?.streetAddress2,
          shippingCity: shippingAddress?.city,
          shippingState: shippingAddress?.countryArea,
          shippingZipcode: shippingAddress?.postalCode,
          shippingCountry: shippingAddress?.country.country,
        },
      });
    }
  };

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
        <Link
          style={{ alignItems: "center", display: "flex" }}
          onClick={handlePopover}
        >
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
              <Button
                sx={buttonPopover}
                size="small"
                variant="outlined"
                onClick={() => handleDismiss()}
              >
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
          className={classes["checkout-page"]}
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
              <Breadcrumbs
                sx={breadcrumb}
                style={{ display: "none" }}
              >
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
              <Tabs
                variant="fullWidth"
                sx={tabs}
                value={currentTab}
              >
                <Tab
                  value={CheckoutTabs.CUSTOMER}
                  label="Customer"
                  disableRipple
                  sx={singleTab}
                  onClick={() => setCurrentTab(CheckoutTabs.CUSTOMER)}
                />
                <Tab
                  value={CheckoutTabs.SHIPPING}
                  label="Shipping"
                  disableRipple
                  sx={singleTab}
                  onClick={() => setCurrentTab(CheckoutTabs.SHIPPING)}
                  disabled={shippingStepDisabled}
                />
                <Tab
                  value={CheckoutTabs.PAYMENT}
                  label="Payment"
                  disableRipple
                  sx={singleTab}
                  disabled={paymentStepDisabled}
                  onClick={() => setCurrentTab(CheckoutTabs.PAYMENT)}
                />
              </Tabs>
            </Box>

            <TabPanel
              value={currentTab}
              index={CheckoutTabs.CUSTOMER}
            >
              <Box mb={2}>
                <Typography
                  sx={title}
                  variant="h6"
                >
                  <Link
                    href={"/login"}
                    className="account-login"
                    sx={account_login}
                  >
                    <FormattedMessage defaultMessage="Login" />
                  </Link>
                  <Box
                    sx={or}
                    component="span"
                  >
                    or
                  </Box>
                  <Link
                    href={"/checkout?guest=1"}
                    className="account-guest"
                    sx={account_guest}
                  >
                    <FormattedMessage defaultMessage="Continue As A Guest" />
                  </Link>
                </Typography>
              </Box>
              <AddressForm
                values={{
                  email: email || "",
                  ...shippingAddress,
                  country: shippingAddress?.country.code,
                }}
                onSubmit={async (values) => submitShippingAddress(values)}
              >
                {({ touched, errors, submitForm }) => {
                  submitShippingAddressRef.current = submitForm;
                  return (
                    <AddressFormFields
                      errorMessage={shippingAddressError}
                      hasEmail
                      touched={touched}
                      errors={errors}
                    />
                  );
                }}
              </AddressForm>
              <Box sx={buttonsGridAddress}>
                <Button
                  color="primary"
                  disableElevation
                  sx={button}
                  variant="contained"
                  disabled={isSubmittingShippingAddress}
                  onClick={async () => {
                    setIsSubmittingShippingAddress(true);
                    await submitShippingAddressRef.current?.();
                    setIsSubmittingShippingAddress(false);
                  }}
                >
                  {isSubmittingShippingAddress ? <CircularProgress /> : "continue to shipping"}
                </Button>
              </Box>
            </TabPanel>
            <TabPanel
              value={currentTab}
              index={CheckoutTabs.SHIPPING}
            >
              <Box mb={2}>
                <Typography
                  sx={title}
                  variant="h6"
                >
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
                <Box
                  style={{ display: "block" }}
                  sx={gridspan}
                >
                  <Errors errorMessage={errorMessage} />
                </Box>
              )}
              <Box sx={buttonsGrid}>
                <Button
                  disableRipple
                  disableElevation
                  sx={returnCustomer}
                  onClick={() => setCurrentTab(CheckoutTabs.CUSTOMER)}
                >
                  Return to Customer
                </Button>
                <Button
                  color="primary"
                  disableElevation
                  disabled={paymentStepDisabled}
                  sx={button}
                  variant="contained"
                  onClick={() => {
                    if (!shippingFormError) {
                      setCurrentTab(CheckoutTabs.PAYMENT);
                    }
                  }}
                >
                  <LockIcon style={{ height: 16, width: 16, marginRight: 12 }} /> continue to payment
                </Button>
              </Box>
            </TabPanel>
            <TabPanel
              value={currentTab}
              index={CheckoutTabs.PAYMENT}
            >
              <Payment
                handleCreatePayment={handleCreatePayment}
                submittingPayment={submittingPayment}
                setSubmittingPayment={setSubmittingPayment}
              />
              <Box mb={2}>
                <Typography
                  sx={title}
                  variant="h6"
                >
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
                onSubmit={async (values) => submitBillingAddress(values)}
                noValidate={billingAsShipping}
              >
                {({ touched, errors, submitForm }) => {
                  submitBillingAddressRef.current = submitForm;
                  return (
                    <>
                      {!billingAsShipping && (
                        <AddressFormFields
                          errorMessage={billingAddressError}
                          touched={touched}
                          errors={errors}
                        />
                      )}
                    </>
                  );
                }}
              </AddressForm>
              {!!errorMessage && (
                <Box
                  style={{ display: "block" }}
                  sx={gridspan}
                >
                  <Errors errorMessage={errorMessage} />
                </Box>
              )}
              <Box sx={buttonsGrid}>
                <Button
                  disableRipple
                  disableElevation
                  onClick={() => setCurrentTab(CheckoutTabs.SHIPPING)}
                  sx={returnCustomer}
                >
                  Return to Shipping
                </Button>
                <Button
                  color="primary"
                  disableElevation
                  sx={button}
                  variant="contained"
                  disabled={submittingPayment}
                  onClick={async () => {
                    if (!billingAsShipping) {
                      const result = await submitBillingAddressRef.current?.();
                      if (!result || result.dataError?.error) {
                        return;
                      }
                    }
                    await confirmAndPurchase();
                  }}
                >
                  {submittingPayment ? <CircularProgress /> : "Confirm Payment"}
                </Button>
              </Box>
            </TabPanel>
          </Box>
          <Box
            sx={cartSummary}
            className={classes["checkout-summary"]}
            style={{ padding: 0 }}
          >
            <CartSummary
              total={total}
              promoCode={promoCode}
              subtotal={subtotal}
              shipping={shipping}
              volumeDiscount={volumeDiscount}
              onPaymentStep={onPaymentStep}
              loyaltyPoints={loyaltyPointsView}
              products={products}
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
      <div id="rokt-placeholder"></div>
    </>
  );
};

export default MuiCheckout;
