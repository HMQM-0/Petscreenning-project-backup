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
  MenuItem,
  Popover,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockIcon from "@mui/icons-material/Lock";
import * as React from "react";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { useQueryParams, StringParam } from "next-query-params";
import { useRouter } from "next/router";
import { isArray } from "lodash";

import { useAuth, useCheckout } from "nautical-api";
import { ICardData, IFormError } from "types";
import { maybe } from "@utils/misc";
import { LoyaltyPoints } from "components/atoms/LoyaltyPoints";
import { Plugins } from "deprecated/@nautical";
import { useShopContext } from "components/providers/ShopProvider";
import { ITaxedMoney } from "components/molecules/TaxedMoney/types";
import { Loader } from "components/atoms/Loader";
import { IItems } from "components/providers/Nautical/Cart/types";
import {
  useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation,
  useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation,
} from "components/providers/Nautical/Auth/mutations.graphql.generated";

import { StripePaymentGateway } from "./StripePaymentGateway";
import { AuthorizeNetPaymentGateway } from "./AuthorizeNetPaymentGateway";
import { IProduct } from "./types";
import { CartSummary } from "./CartSummary";
import { SellerMethod } from "./SellerMethod";
import { useStyles } from "./styles";

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

type FormFields = {
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string;
  country?: string;
  billingAsShipping?: boolean;
  billingFirstName?: string;
  billingLastName?: string;
  billingCompanyName?: string;
  billingStreetAddress1?: string;
  billingStreetAddress2?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountryArea?: string;
  billingPhone?: string;
  billingCountry?: string;
};

const MuiCheckout = ({ items, subtotal, promoCode, shipping, total, logo, volumeDiscount, close }: ICheckoutProps) => {
  const creatingPayment = React.useRef(false);
  const [popover, setPopover] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("customer");
  const [completeCheckoutRunnning, setCompleteCheckoutRunning] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [billingFormError, setBillingFormError] = React.useState(false);
  const [paymentFormError, setPaymentFormError] = React.useState(false);
  const [shippingFormError, setShippingFormError] = React.useState(false);
  const [customerFormError, setCustomerFormError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
  const [loyaltyAndReferralsActive, setLoyaltyAndReferralsActive] = React.useState(false);

  const { countries, activePlugins } = useShopContext();

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
  const checkoutGatewayFormId = "gateway-form";
  const [{ payment_intent, payment_intent_client_secret }] = useQueryParams({
    payment_intent: StringParam,
    payment_intent_client_secret: StringParam,
  });
  const router = useRouter();
  const classes = useStyles({});
  const sellers = lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict: Record<string, ICheckoutModelLine[]> = {};
  const onPaymentStep = value === "payment";
  const initialSellerValues: Record<string, unknown> = {};
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
  const customerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    streetAddress1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const checkoutGatewayFormRef = React.useRef<HTMLFormElement>(null);

  const [createOrUpdateCustomerRecord /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation();

  const [awardCustomerLoyaltyPoints /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation();

  const checkIfLoyaltyAndReferralsActive = React.useCallback(() => {
    const yotpoLoyaltyAndReferralsPluginActive = Boolean(
      activePlugins?.find((plugin) => plugin?.identifier === Plugins.YOTPO_LOYALTY)
    );
    setLoyaltyAndReferralsActive(yotpoLoyaltyAndReferralsPluginActive);
    return yotpoLoyaltyAndReferralsPluginActive;
  }, [activePlugins]);

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
              errors = response.dataError.error;
            }
            handleErrors(errors);
            setPaymentFormError(errors.length > 0);
          }
          setCompleteCheckoutRunning(false);
        } else {
          handleErrors(errors);
          setPaymentFormError(errors.length > 0);
        }
        creatingPayment.current = false;
      }
    },
    [
      awardCustomerLoyaltyPoints,
      checkIfLoyaltyAndReferralsActive,
      completeCheckout,
      createPayment,
      loyaltyPointsToBeEarnedOnOrderComplete,
      router,
      user,
    ]
  );

  React.useEffect(() => {
    if (payment_intent && payment_intent_client_secret) {
      handleCreatePayment("nautical.payments.stripe", payment_intent);
    }
  }, [handleCreatePayment, payment_intent, payment_intent_client_secret]);

  React.useEffect(() => {
    checkIfLoyaltyAndReferralsActive();
  }, [checkIfLoyaltyAndReferralsActive]);

  const handleChange = async (event: any, newValue: string, values: FormFields | null = null) => {
    if (value === "customer") {
      setLoading(true);
      const country = countries.find((country) => country.code === values?.country)?.country ?? "";
      const shippingSubmission = await setShippingAddress(
        {
          firstName: values?.firstName,
          lastName: values?.lastName,
          companyName: values?.companyName,
          streetAddress1: values?.streetAddress1,
          streetAddress2: values?.streetAddress2,
          city: values?.city,
          postalCode: values?.postalCode,
          countryArea: values?.countryArea,
          phone: values?.phone,
          country: {
            code: values?.country,
            country,
          },
        },
        values?.email ?? ""
      );
      setLoading(false);
      if (shippingSubmission.dataError?.error) {
        setCustomerFormError(true);
        if (isArray(shippingSubmission.dataError.error)) {
          handleErrors(shippingSubmission.dataError.error);
        }
        return;
      } else {
        setCustomerFormError(false);
        setValue(newValue);
      }
    } else if (value === "shipping") {
      if (newValue === "payment") {
        if (
          // @ts-ignore
          JSON.parse(sellerShippingMethods ?? "{}").length === availableShippingMethodsBySeller?.length
        ) {
          setValue(newValue);
        }
      }
      if (newValue === "customer") {
        setValue(newValue);
      }
    } else if (value === "payment") {
      if (newValue === "shipping") {
        setValue(newValue);
      } else {
        setLoading(true);
        if (billingAsShipping) {
          const billingSubmission = await setBillingAddress(
            {
              firstName: values?.firstName,
              lastName: values?.lastName,
              companyName: values?.companyName,
              streetAddress1: values?.streetAddress1,
              streetAddress2: values?.streetAddress2,
              city: values?.city,
              postalCode: values?.postalCode,
              countryArea: values?.countryArea,
              phone: values?.phone,
              country: {
                code: values?.country ?? "",
                country: countries?.find((country) => country.code === values?.country)?.country ?? "",
              },
            },
            values?.email ?? ""
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            if (typeof document !== "undefined") {
              document.getElementById("gatewayButton")?.click();
            }
          } else {
            setBillingFormError(true);
            if (isArray(billingSubmission.dataError.error)) {
              handleErrors(billingSubmission.dataError.error);
            }
          }
        } else {
          const billingSubmission = await setBillingAddress(
            {
              firstName: values?.billingFirstName,
              lastName: values?.billingLastName,
              companyName: values?.billingCompanyName,
              streetAddress1: values?.billingStreetAddress1,
              streetAddress2: values?.billingStreetAddress2,
              city: values?.billingCity,
              postalCode: values?.billingPostalCode,
              countryArea: values?.billingCountryArea,
              phone: values?.billingPhone,
              country: {
                code: values?.billingCountry ?? "",
                country: countries.find((country) => country.code === values?.billingCountry)?.country ?? "",
              },
            },
            values?.email
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            if (typeof document !== "undefined") {
              document.getElementById("gatewayButton")?.click();
            }
          } else {
            setBillingFormError(true);
            if (isArray(billingSubmission.dataError.error)) {
              handleErrors(billingSubmission.dataError.error);
            }
          }
        }
      }
    }
  };

  const handleSetSellerShippingMethods = async (seller: number, shippingMethodSelection: string) => {
    setLoading(true);
    const { dataError } = await setSellerShippingMethods(seller, shippingMethodSelection);

    const errors = dataError?.error;
    if (errors) {
      setShippingFormError(true);
      if (isArray(errors)) {
        handleErrors(errors);
      }
    }
    setLoading(false);
  };

  const handleBreadcrumb = (newValue: string) => {
    setValue(newValue);
  };

  const handleErrors = (errors: IFormError[]) => {
    const messages = maybe(() => errors.flatMap((error) => error.message), []);
    setErrorMessage(messages.join(" \n"));
  };

  const authNetResponseHandler = (response: any, gateway: string, creditCardData: ICardData) => {
    if (response.messages.resultCode === "Error") {
      let i = 0;
      while (i < response.messages.message.length) {
        console.error(response.messages.message[i].code + ": " + response.messages.message[i].text);
        i = i + 1;
      }
    } else {
      handleCreatePayment(gateway, response.opaqueData.dataValue, creditCardData);
    }
  };

  const handleProcessPayment = (gateway: string, token?: string, creditCardData?: ICardData) => {
    if (gateway === "nautical.payments.authorize_net") {
      const publicClientKey = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "client_key"
      )?.value;
      const apiLoginID = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "api_login_id"
      )?.value;
      const authData = {
        clientKey: publicClientKey,
        apiLoginID,
      };
      const cardData = {
        cardNumber: creditCardData?.fullNumber && creditCardData.fullNumber.toString(),
        month: creditCardData?.expMonth && creditCardData.expMonth.toString(),
        year: creditCardData?.expYear && creditCardData.expYear.toString(),
        cardCode: creditCardData?.cvv && creditCardData.cvv.toString(),
      };
      const secureData = {
        authData,
        cardData,
      };

      const sterilizedCreditCardData = {
        brand: creditCardData?.brand ?? "",
        expMonth: creditCardData?.expMonth ?? 0,
        expYear: creditCardData?.expYear ?? 0,
        firstDigits: creditCardData?.firstDigits ?? "",
        lastDigits: creditCardData?.lastDigits ?? "",
      };
      // @ts-ignore
      // Accept is a Javascript Library we imported via a script tag injected into the Head HTML Element of our
      // App via the Helmet React Component.
      // The Helmet component with this script can be found in the AuthorizeNetPaymentGateway(.tsx) component.
      Accept.dispatchData(secureData, (res) => authNetResponseHandler(res, gateway, sterilizedCreditCardData));
    } else {
      handleCreatePayment(gateway, token, creditCardData);
    }
  };

  const handlePopover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover(true);
  };

  const handleClose = () => {
    router.push("/cart/");
    setAnchorEl(null);
    setPopover(false);
    close();
  };

  const handleDismiss = () => {
    setAnchorEl(null);
    setPopover(false);
  };

  async function handleSubmit(
    values: FormFields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) {
    setTimeout(() => setSubmitting(false), 5000);
  }

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
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
      <Box className={classes.checkoutBanner}>
        <Link style={{ alignItems: "center", display: "flex" }} onClick={handlePopover}>
          {logo}
        </Link>
        <Popover
          id={"simple-popover"}
          open={popover}
          anchorEl={anchorEl}
          onClose={handleClose}
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
            <CardActions className={classes.popoverActions} style={{ justifyContent: "space-around" }}>
              <Button className={classes.buttonPopover} size="small" variant="outlined" onClick={() => handleDismiss()}>
                Stay in Checkout
              </Button>
              <Button
                className={classes.buttonPopover}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                Return to Cart
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </Box>
      {checkoutLoaded && !payment_intent && !payment_intent_client_secret ? (
        <Box className={classes.checkoutWrapper}>
          <Box className={classes.backdropWhite}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Breadcrumbs className={classes.breadcrumb} style={{ display: "none" }}>
                <Box color={value === "address" ? "secondary" : "inherit"} onClick={() => handleBreadcrumb("address")}>
                  Address
                </Box>
                <Box
                  color={value === "shipping" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("shipping")}
                >
                  Shipping
                </Box>
                <Box color={value === "payment" ? "secondary" : "inherit"} onClick={() => handleBreadcrumb("payment")}>
                  Payment
                </Box>
              </Breadcrumbs>
              <Tabs variant="fullWidth" className={classes.tabs} value={value}>
                <Tab value="customer" label="Customer" disableRipple />
                <Tab value="shipping" label="Shipping" disableRipple />
                <Tab value="payment" label="Payment" disableRipple />
              </Tabs>
            </Box>
            <Formik
              validationSchema={customerValidationSchema}
              initialValues={{
                // CUSTOMER FIELDS
                email: email ?? "",
                // SHIPPING ADDRESS FIELDS
                firstName: shippingAddress?.firstName ?? "",
                lastName: shippingAddress?.lastName ?? "",
                companyName: shippingAddress?.companyName ?? "",
                streetAddress1: shippingAddress?.streetAddress1 ?? "",
                streetAddress2: shippingAddress?.streetAddress2 ?? "",
                city: shippingAddress?.city ?? "",
                postalCode: shippingAddress?.postalCode ?? "",
                countryArea: shippingAddress?.countryArea ?? "",
                phone: shippingAddress?.phone ?? "",
                country: shippingAddress?.country?.code ?? "",

                billingAsShipping: billingAsShipping || true,
                billingFirstName: billingAddress?.firstName ?? "",
                billingLastName: billingAddress?.lastName ?? "",
                billingCompanyName: billingAddress?.companyName ?? "",
                billingStreetAddress1: billingAddress?.streetAddress1 ?? "",
                billingStreetAddress2: billingAddress?.streetAddress2 ?? "",
                billingCity: billingAddress?.city ?? "",
                billingPostalCode: billingAddress?.postalCode ?? "",
                billingCountryArea: billingAddress?.countryArea ?? "",
                billingPhone: billingAddress?.phone ?? "",
                billingCountry: billingAddress?.country?.code ?? "",
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, validateForm, isSubmitting, values, isValid, setSubmitting }) => {
                const formValidation = (event: any) => {
                  validateForm()
                    .then(() => {
                      isValid ? handleChange(event, "shipping", values) : console.error("Form validation failed.");
                    })
                    .finally(() => {
                      isValid ? setCustomerFormError(false) : setCustomerFormError(true);
                    });
                };
                return (
                  <Form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setSubmitting(true);
                      handleChange(event, "complete", values);
                      setTimeout(() => setSubmitting(false), 5000);
                    }}
                  >
                    <TabPanel value={value} index="customer">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          Customer Information
                        </Typography>
                      </Box>
                      <Box className={classes.fieldsGrid}>
                        <Field
                          required
                          autoComplete="shipping given-name"
                          className={classes.textfield}
                          component={TextField}
                          name="firstName"
                          label="first name"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Field
                          className={classes.textfield}
                          autoComplete="shipping family-name"
                          component={TextField}
                          required
                          name="lastName"
                          label="last name"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Field
                          className={clsx(classes.textfield, classes.gridspan)}
                          autoComplete="shipping address-line1"
                          component={TextField}
                          required
                          name="streetAddress1"
                          label="address line 1"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Field
                          className={clsx(classes.textfield, classes.gridspan)}
                          autoComplete="shipping address-line2"
                          component={TextField}
                          name="streetAddress2"
                          label="address line 2"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          required
                          name="city"
                          autoComplete="shipping address-level2"
                          label="city"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          name="countryArea"
                          required
                          autoComplete="shipping address-level1"
                          label="state/province/area"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          required
                          name="postalCode"
                          label="zip/postal code"
                          autoComplete="shipping postal-code"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        {!!countries && (
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            name="country"
                            label="country"
                            variant="outlined"
                            required
                            // NEED TO FIGURE OUT HOW AUTOCOMPLETE INTERACTS WITH DROPDOWN SELECTOR
                            autoComplete="shipping country"
                            InputLabelProps={{ shrink: true }}
                            select
                          >
                            {countries?.map((option) => (
                              <MenuItem key={option.code} value={option.code}>
                                {option.country}
                              </MenuItem>
                            ))}
                          </Field>
                        )}
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          required
                          name="email"
                          label="email"
                          type="email"
                          autoComplete="email"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                            helperText: touched ? validateEmail("email") : null,
                          }}
                        />
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          // required
                          name="phone"
                          label="phone"
                          type="tel"
                          autoComplete="shipping tel-national"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Box
                          style={{
                            display: customerFormError ? "block" : "none",
                          }}
                          className={classes.gridspan}
                        >
                          <Alert severity="error">
                            {errorMessage ? errorMessage : "Please ensure all required fields are entered"}
                          </Alert>
                        </Box>
                        <Box></Box>
                        <Button
                          color="primary"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          onClick={(e) => formValidation(e)}
                        >
                          <LockIcon style={{ height: 16, width: 16, marginRight: 12 }} />{" "}
                          {loading ? <CircularProgress /> : "Continue"}
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index="shipping">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          Shipping Information
                        </Typography>
                      </Box>
                      {availableShippingMethodsBySeller?.map((sellerMethod) => (
                        <SellerMethod
                          key={sellerMethod.seller}
                          sellerMethod={sellerMethod}
                          handleSetSellerShippingMethods={handleSetSellerShippingMethods}
                          mappingDict={mappingDict}
                        />
                      ))}
                      <Box
                        style={{
                          display: shippingFormError ? "block" : "none",
                        }}
                        className={classes.gridspan}
                      >
                        <Alert severity="error">{errorMessage}</Alert>
                      </Box>
                      <Box className={classes.fieldsGrid}>
                        <Button
                          disableRipple
                          disableElevation
                          className={classes.buttonText}
                          onClick={(e) => handleChange(e, "customer")}
                        >
                          <KeyboardBackspaceIcon /> Back to information
                        </Button>
                        <Button
                          color="primary"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          onClick={(e) => handleChange(e, "payment", values)}
                        >
                          <LockIcon style={{ height: 16, width: 16, marginRight: 12 }} /> Continue
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index="payment">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          Payment Information
                        </Typography>
                      </Box>

                      {availablePaymentGateways?.map(({ id, name, config }) => {
                        switch (name) {
                          case "Stripe":
                            return (
                              <StripePaymentGateway
                                config={config}
                                formRef={checkoutGatewayFormRef}
                                formId={checkoutGatewayFormId}
                                processPayment={(token, cardData) => {
                                  handleProcessPayment(id, token, cardData);
                                }}
                                errors={[]}
                                onError={(errors) => handleErrors(errors)}
                                total={total}
                              />
                            );
                          case "Authorize.Net":
                            return (
                              <AuthorizeNetPaymentGateway
                                config={config}
                                formRef={checkoutGatewayFormRef}
                                formId={checkoutGatewayFormId}
                                processPayment={(token, cardData) => handleProcessPayment(id, token, cardData)}
                                errors={[]}
                                onError={(errors) => handleErrors(errors)}
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                      <Box mb={3} style={{ display: paymentFormError ? "block" : "none" }} className={classes.gridspan}>
                        <Alert severity="error">{errorMessage}</Alert>
                      </Box>
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
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
                      {!billingAsShipping && (
                        <Box className={classes.fieldsGrid}>
                          <Field
                            required
                            autoComplete="billing given-name"
                            className={classes.textfield}
                            component={TextField}
                            name="billingFirstName"
                            label="first name"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Field
                            className={classes.textfield}
                            autoComplete="billing family-name"
                            component={TextField}
                            required
                            name="billingLastName"
                            label="last name"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Field
                            className={clsx(classes.textfield, classes.gridspan)}
                            autoComplete="billing address-line1"
                            component={TextField}
                            required
                            name="billingStreetAddress1"
                            label="address line 1"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            className={clsx(classes.textfield, classes.gridspan)}
                            autoComplete="billing address-line2"
                            component={TextField}
                            name="billingStreetAddress2"
                            label="address line 2"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            required
                            name="billingCity"
                            autoComplete="billing address-level2"
                            label="city"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            name="billingCountryArea"
                            required
                            autoComplete="billing address-level1"
                            label="state/province/area"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            required
                            name="billingPostalCode"
                            label="zip/postal code"
                            autoComplete="billing postal-code"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          {!!countries && (
                            <Field
                              className={classes.textfield}
                              component={TextField}
                              name="billingCountry"
                              label="country"
                              variant="outlined"
                              required
                              // NEED TO FIGURE OUT HOW AUTOCOMPLETE INTERACTS WITH DROPDOWN SELECTOR
                              autoComplete="billing country"
                              InputLabelProps={{ shrink: true }}
                              select
                            >
                              {countries.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                  {option.country}
                                </MenuItem>
                              ))}
                            </Field>
                          )}

                          <Field
                            className={classes.textfield}
                            component={TextField}
                            // required
                            name="billingPhone"
                            label="phone"
                            type="tel"
                            autoComplete="billing tel-national"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Box
                            style={{
                              display: billingFormError ? "block" : "none",
                            }}
                            className={classes.gridspan}
                          >
                            <Alert severity="error">
                              {errorMessage ? errorMessage : "Please ensure all required fields are entered"}
                            </Alert>
                          </Box>
                        </Box>
                      )}
                      <Box className={classes.buttonsGrid}>
                        <Button
                          disableRipple
                          disableElevation
                          className={classes.buttonText}
                          onClick={(e) => handleChange(e, "shipping")}
                        >
                          <KeyboardBackspaceIcon /> Back to shipping
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          disabled={isSubmitting || !availablePaymentGateways}
                        >
                          <LockIcon style={{ height: 16, width: 16, marginRight: 12 }} />{" "}
                          {isSubmitting ? <CircularProgress /> : "Confirm Payment"}
                        </Button>
                      </Box>
                    </TabPanel>
                  </Form>
                );
              }}
            </Formik>
          </Box>
          <Box className={classes.cartSummary}>
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
        <Box p={3}>
          <Typography variant="h4">Confirming your payment...</Typography>
          {completeCheckoutRunnning && <Loader />}
          {errorMessage && (
            <Alert sx={{ marginTop: "8px" }} severity="error">
              {errorMessage}
            </Alert>
          )}
        </Box>
      )}
    </>
  );
};

export default MuiCheckout;
