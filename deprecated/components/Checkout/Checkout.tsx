// import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControlLabel,
  Link,
  MenuItem,
  Popover,
  Switch,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockIcon from "@mui/icons-material/Lock";
import * as React from "react";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";

import { useAuth, useCheckout } from "@nautical/react";
import { TypedSellerNameQuery } from "@components/organisms/CheckoutShipping/queries";
import { CachedImage } from "@components/molecules";
import { Money } from "@components/containers";
import { StripePaymentGateway } from "@components/organisms";
import Loader from "deprecated/components/Loader";
import { ICardData, IFormError, ITaxedMoney } from "@types";
import { ICheckoutModelPriceValue } from "deprecated/@nautical/helpers";
import { IItems } from "deprecated/@nautical/api/Cart/types";
import { maybe } from "@utils/misc";
import { LoyaltyPoints } from "@components/organisms/LoyaltyPoints";
import { AuthorizeNetPaymentGateway } from "@components/organisms/AuthorizeNetPaymentGateway/AuthorizeNetPaymentGateway";
import { Plugins } from "deprecated/@nautical";
import {
  useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints,
  useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord,
} from "@nautical/react/mutations";
import { useShopContext } from "components/providers/ShopProvider";

import { IProduct } from "./types";
import CartSummary from "./CartSummary";

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

const useStyles = makeStyles((theme: Theme) => ({
  backdropWhite: {
    backgroundColor: "#FFF",
    minWidth: 800,
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      minWidth: "auto",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  breadcrumb: {
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "center",
    },
  },
  button: {
    borderRadius: 2,
    "& .MuiButton-label": {
      fontSize: "1.0rem",
      fontWeight: 400,
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: 84,
    },
  },
  buttonGroupButton: {
    borderWidth: "1px important",
    borderColor: `${theme.palette.divider}`,
    fontSize: "1rem",
  },
  buttonPopover: {
    borderRadius: 8,
    minWidth: 180,
    fontSize: "0.8rem",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    minHeight: 43,
    marginLeft: "0 !important",
  },
  buttonText: {
    borderRadius: 2,
    "& .MuiButton-label": {
      color: theme.palette.text.disabled,
      fontSize: "1.0rem",
      fontWeight: 400,
      justifyContent: "start",
      marginLeft: 12,
    },
  },
  cardButtonActive: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.getContrastText(theme.palette.primary.main)}`,
    fontSize: "0.9rem",
  },
  cardButton: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
  },
  cardGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    flexFlow: "wrap",
    gap: 16,
  },
  cartSummary: {
    backgroundColor: "#F8FAFB",
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
      borderLeft: "none",
    },
  },
  checkoutBanner: {
    placeContent: "center",
    backgroundColor: "#FFF",
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: 96,
    width: "100vw",
  },
  checkoutWrapper: {
    background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  checkoutGrid: {
    // backgroundColor: 'transparent',
    // border: `1px solid ${theme.palette.divider}`,
    // display: 'grid',
    // gridTemplateColumns: '1fr 40%',
    // height: '100%',
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  buttonsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  gridspan: {
    gridColumn: "1 / span 2",
  },
  marginBottomDivider: {
    marginBottom: "12px",
  },
  productShippingRow: {
    display: "grid",
    marginTop: "16px",
    gridRowGap: "6px",
    gridColumnGap: "20px",
    gridTemplateColumns: "72px auto 50px",
    "& img": {
      maxHeight: 72,
      maxWidth: 72,
    },
  },
  popoverActions: {
    justifyContent: "space-around",
    display: "flex",
    // flex-direction: column;
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
  quantityText: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  sellerName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  sellerShippingMethodSelect: {
    display: "grid",
    gridTemplateColumns: "auto 200px",
  },
  shippingCard: {
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
  shippingMethodSelectMenuName: {
    width: "100%",
  },
  shippingMethodSelectMenuOption: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gridTemplateColumns: "1fr 1fr",
    // gridColumnGap: "0.2fr"
  },
  shippingMethodSelectMenuPrice: {
    width: "100%",
    alignContent: "flex-end",
  },
  stackedText: {
    display: "grid",
    marginTop: "auto",
    marginBottom: "auto",
    gridTemplateColumns: "auto",
  },
  tabs: {
    borderBottom: "1px solid #ddd",
    marginBottom: 16,
    "& .MuiTab-wrapper": {
      fontWeight: 600,
    },
  },
  textfield: {
    marginTop: 8,
    "& .MuiFormLabel-root": {
      left: -12,
      marginBottom: 0,
      textTransform: "uppercase",
      top: -8,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      height: 56,
      top: 0,
      "& legend": {
        display: "none",
      },
    },
  },
  title: {
    marginBottom: 16,
  },
}));

interface ICheckoutProps {
  subtotal: ITaxedMoney | null | undefined;
  promoCode?: ITaxedMoney | null | undefined;
  shipping?: ITaxedMoney | null | undefined;
  total?: ITaxedMoney | null | undefined;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
  products?: IProduct[] | null;
  items?: IItems | null;
  logo?: React.ReactNode;
  close?(): void;
}

const MuiCheckout: React.FunctionComponent<ICheckoutProps> = (props) => {
  // ***** USE_STATE *****
  const [popover, setPopover] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("customer");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [billingFormError, setBillingFormError] = React.useState(false);
  const [paymentFormError, setPaymentFormError] = React.useState(false);
  const [shippingFormError, setShippingFormError] = React.useState(false);
  const [customerFormError, setCustomerFormError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );
  const [loyaltyAndReferralsActive, setLoyaltyAndReferralsActive] =
    React.useState(false);

  const { countries } = useShopContext();

  // Used in place of React.useState(<initital_value>) to persist state in local storage.
  function usePersistedState(key, defaultValue) {
    const [state, setState] = React.useState(
      () => localStorage.getItem(key) || defaultValue
    );
    React.useEffect(() => {
      localStorage.setItem(key, state);
    }, [key, state]);
    return [state, setState];
  }
  const [
    loyaltyPointsToBeEarnedOnOrderComplete,
    setLoyaltyPointsToBeEarnedOnOrderComplete,
  ] = usePersistedState("loyaltyPoints", 0);
  // const [method, setMethod] = React.useState('creditcard');

  // ***** VARIABLES *****
  // Props
  const {
    items,
    subtotal,
    promoCode,
    shipping,
    total,
    logo,
    volumeDiscount,
    close,
  } = props;
  // Checkout Info
  const {
    setBillingAddress,
    setShippingAddress,
    setSellerShippingMethods,
    availableShippingMethodsBySeller,
    availablePaymentGateways,
    billingAsShipping,
    setBillingAsShippingAddress,
    checkout,
    createPayment,
    completeCheckout,
    loaded: checkoutLoaded,
    // payment
  } = useCheckout();
  // Products
  const products: IProduct[] | null = items?.map(
    ({ id, variant, totalPrice, quantity }) => ({
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
    })
  );
  // Other
  const { user } = useAuth();
  const checkoutGatewayFormId = "gateway-form";
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles({});
  const sellers = checkout?.lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict = {};
  const onPaymentStep = value === "payment";
  const initialSellerValues = {};
  const parsedInitialSellerMethods = JSON.parse(
    // @ts-ignore
    checkout?.sellerShippingMethods ? checkout.sellerShippingMethods : "[]"
  );
  for (const seller of sellerSet) {
    mappingDict[seller] = checkout?.lines?.filter(
      (line) => line.seller === seller
    );
  }
  availableShippingMethodsBySeller?.forEach(
    (data) =>
      (initialSellerValues[data.seller] =
        parsedInitialSellerMethods.find((sellerAndMethod) => {
          return +sellerAndMethod.seller === data.seller;
        })?.shippingMethod?.id || [])
  );
  const customerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    streetAddress1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    //   postalCode: Yup.string().required("Required"),
    //   countryArea: Yup.string().required("Required"),
    //   phone: Yup.string().required("Required"),
    //   billingFirstName: Yup.string().required('Required'),
    //   billingLastName: Yup.string().required('Required'),
    //   billingStreetAddress1: Yup.string().required('Required'),
    //   billingCity: Yup.string().required('Required'),
    //   billingPostalCode: Yup.string().required('Required'),
    //   billingCountryArea: Yup.string().required('Required'),
    //   billingPhone: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  // const theme = useTheme();
  // const handleMethod = (event, newValue) => {
  //     setMethod(newValue);
  // }

  // ***** USE_REF *****
  const checkoutGatewayFormRef = React.useRef<HTMLFormElement>(null);

  // ***** USE_CONTEXT *****
  const { activePlugins } = React.useContext(ShopContext);

  // ***** USE_EFFECT *****
  React.useEffect(() => {
    if (
      params.get("payment_intent") &&
      params.get("payment_intent_client_secret") &&
      checkout
    ) {
      handleCreatePayment(
        "nautical.payments.stripe",
        params.get("payment_intent")
      );
    }
  }, []);

  React.useEffect(() => {
    checkIfLoyaltyAndReferralsActive();
  }, []);

  React.useEffect(() => {
    if (user) {
      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      createOrUpdateCustomerRecord({ user: userInfo });
    }
  }, [loyaltyAndReferralsActive]);

  // ***** MUTATIONS *****
  const [createOrUpdateCustomerRecord /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord();

  const [awardCustomerLoyaltyPoints /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints();

  // ***** EVENT HANDLERS *****
  const handleChange = async (event, newValue, values = null) => {
    if (value === "customer") {
      setLoading(true);
      const shippingSubmission = await setShippingAddress(
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
          country: values.country,
        },
        values.email
      );
      setLoading(false);
      if (shippingSubmission.dataError?.error) {
        setCustomerFormError(true);
        handleErrors(shippingSubmission.dataError.error);
        return;
      } else {
        setCustomerFormError(false);
        setValue(newValue);
      }
    } else if (value === "shipping") {
      if (newValue === "payment") {
        if (
          // @ts-ignore
          JSON.parse(checkout.sellerShippingMethods).length ===
          availableShippingMethodsBySeller.length
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
              firstName: values.firstName,
              lastName: values.lastName,
              companyName: values.companyName,
              streetAddress1: values.streetAddress1,
              streetAddress2: values.streetAddress2,
              city: values.city,
              postalCode: values.postalCode,
              countryArea: values.countryArea,
              phone: values.phone,
              country: values.country,
            },
            values.email
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            document.getElementById("gatewayButton").click();
          } else {
            setBillingFormError(true);
            handleErrors(billingSubmission.dataError.error);
          }
        } else {
          const billingSubmission = await setBillingAddress(
            {
              firstName: values.billingFirstName,
              lastName: values.billingLastName,
              companyName: values.billingCompanyName,
              streetAddress1: values.billingStreetAddress1,
              streetAddress2: values.billingStreetAddress2,
              city: values.billingCity,
              postalCode: values.billingPostalCode,
              countryArea: values.billingCountryArea,
              phone: values.billingPhone,
              country: values.billingCountry,
            },
            values.email
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            document.getElementById("gatewayButton").click();
          } else {
            setBillingFormError(true);
            handleErrors(billingSubmission.dataError.error);
          }
        }
      }
    }
  };

  const handleSetSellerShippingMethods = async (
    seller: number,
    shippingMethodSelection: string
  ) => {
    setLoading(true);
    const { dataError } = await setSellerShippingMethods(
      seller,
      shippingMethodSelection
    );

    const errors = dataError?.error;
    if (errors) {
      setShippingFormError(true);
      handleErrors(errors);
    }
    setLoading(false);
  };

  const handleBreadcrumb = (newValue) => {
    setValue(newValue);
  };

  const handleCreatePayment = async (
    gateway: string,
    token?: string,
    creditCardData?: ICardData
  ) => {
    let errors: any[] = [];

    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: creditCardData,
      // returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    errors = dataError?.error;

    if (!errors) {
      const response = await completeCheckout();
      if (!response.dataError?.error) {
        if (checkIfLoyaltyAndReferralsActive() && user) {
          awardCustomerLoyaltyPoints({
            input: {
              customerEmail: user.email,
              pointAdjustmentAmount: loyaltyPointsToBeEarnedOnOrderComplete,
              applyAdjustmentToPointsEarned: true,
            },
          });
        }
        // Reset checkout for subsequent checkouts
        navigate("/order-finalized/", {
          // navigate("/order-history/" + response.data?.order?.token, {
          replace: true,
          state: {
            confirmationData: response.data?.confirmationData,
            confirmationNeeded: response.data?.confirmationNeeded,
            order: response.data?.order,
            errors: response.dataError?.error,
            token: response.data?.order?.token,
            orderNumber: response.data?.order?.number,
          },
        });
      } else {
        errors = response.dataError?.error;
        handleErrors(errors);
        setPaymentFormError(errors.length > 0);
      }
      // return {
      //     confirmationData: response.data?.confirmationData,
      //     confirmationNeeded: response.data?.confirmationNeeded,
      //     order: response.data?.order,
      //     errors: response.dataError?.error,
      // };
    } else {
      handleErrors(errors);
      setPaymentFormError(errors.length > 0);
    }
  };

  const handleErrors = (errors: IFormError[]) => {
    const messages = maybe(() => errors.flatMap((error) => error.message), []);
    setErrorMessage(messages.join(" \n"));
  };

  const authNetResponseHandler = (
    response: any,
    gateway: string,
    creditCardData: ICardData
  ) => {
    if (response.messages.resultCode === "Error") {
      let i = 0;
      while (i < response.messages.message.length) {
        console.error(
          response.messages.message[i].code +
            ": " +
            response.messages.message[i].text
        );
        i = i + 1;
      }
    } else {
      handleCreatePayment(
        gateway,
        response.opaqueData.dataValue,
        creditCardData
      );
    }
  };

  const handleProcessPayment = (
    gateway: string,
    token?: string,
    creditCardData?: ICardData
  ) => {
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
        cardNumber:
          creditCardData?.fullNumber && creditCardData.fullNumber.toString(),
        month: creditCardData?.expMonth && creditCardData.expMonth.toString(),
        year: creditCardData?.expYear && creditCardData.expYear.toString(),
        cardCode: creditCardData?.cvv && creditCardData.cvv.toString(),
      };
      const secureData = {
        authData,
        cardData,
      };

      const sterilizedCreditCardData = {
        brand: creditCardData?.brand,
        expMonth: creditCardData?.expMonth,
        expYear: creditCardData?.expYear,
        firstDigits: creditCardData?.firstDigits,
        lastDigits: creditCardData?.lastDigits,
      };
      // @ts-ignore
      // Accept is a Javascript Library we imported via a script tag injected into the Head HTML Element of our
      // App via the Helmet React Component.
      // The Helmet component with this script can be found in the AuthorizeNetPaymentGateway(.tsx) component.
      Accept.dispatchData(secureData, (res) =>
        authNetResponseHandler(res, gateway, sterilizedCreditCardData)
      );
    } else {
      handleCreatePayment(gateway, token, creditCardData);
    }
  };

  // const handleSubmitPayment = async (paymentData?: object) => {
  //     const response = await completeCheckout({ paymentData });
  //     return {
  //         confirmationData: response.data?.confirmationData,
  //         confirmationNeeded: response.data?.confirmationNeeded,
  //         order: response.data?.order,
  //         errors: response.dataError?.error,
  //     };
  // };

  const handlePopover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover(true);
  };

  const handleClose = () => {
    navigate("/cart/");
    setAnchorEl(null);
    setPopover(false);
    close();
  };

  const handleDismiss = () => {
    setAnchorEl(null);
    setPopover(false);
  };

  async function handleSubmit(values, { setSubmitting }) {
    setTimeout(() => setSubmitting(false), 5000);
  }

  // ***** HELPER FUNCTIONS *****
  const checkIfLoyaltyAndReferralsActive = () => {
    const yotpoLoyaltyAndReferralsPluginActive = Boolean(
      activePlugins.find(
        (plugin) => plugin.identifier === Plugins.YOTPO_LOYALTY
      )
    );
    setLoyaltyAndReferralsActive(yotpoLoyaltyAndReferralsPluginActive);
    return yotpoLoyaltyAndReferralsPluginActive;
  };

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
    setLoyaltyPointsToBeEarnedOnOrderComplete(points);
  };

  // ***** COMPONENTS *****
  const loyaltyPointsView = loyaltyAndReferralsActive && user && (
    <LoyaltyPoints
      // activeStepIndex={activeStepIndex}
      netOrderPrice={total?.net.amount}
      totalPrice={total}
      user={user}
      updateLoyaltyPointsToBeEarnedOnOrderComplete={
        updateLoyaltyPointsToBeEarnedOnOrderComplete
      }
    />
  );

  return (
    <>
      <Box className={classes.checkoutBanner}>
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
            <CardActions
              className={classes.popoverActions}
              style={{ justifyContent: "space-around" }}
            >
              <Button
                className={classes.buttonPopover}
                size="small"
                variant="outlined"
                onClick={() => handleDismiss()}
              >
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
      {checkoutLoaded &&
      !params.get("payment_intent") &&
      !params.get("payment_intent_client_secret") ? (
        <Box className={classes.checkoutWrapper}>
          <Box className={classes.backdropWhite}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Breadcrumbs
                className={classes.breadcrumb}
                style={{ display: "none" }}
              >
                <Box
                  color={value === "address" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("address")}
                >
                  Address
                </Box>
                <Box
                  color={value === "shipping" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("shipping")}
                >
                  Shipping
                </Box>
                <Box
                  color={value === "payment" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("payment")}
                >
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
                email: checkout.email || "",
                // SHIPPING ADDRESS FIELDS
                firstName: checkout.shippingAddress?.firstName || "",
                lastName: checkout.shippingAddress?.lastName || "",
                companyName: checkout.shippingAddress?.companyName || "",
                streetAddress1: checkout.shippingAddress?.streetAddress1 || "",
                streetAddress2: checkout.shippingAddress?.streetAddress2 || "",
                city: checkout.shippingAddress?.city || "",
                postalCode: checkout.shippingAddress?.postalCode || "",
                countryArea: checkout.shippingAddress?.countryArea || "",
                phone: checkout.shippingAddress?.phone || "",
                country: {
                  code: checkout.shippingAddress?.country?.code || "",
                  country: checkout.shippingAddress?.country?.country || "",
                },
                // BILLING ADDRESS FIELDS
                billingAsShipping: billingAsShipping || true,
                billingFirstName: checkout.billingAddress?.firstName || "",
                billingLastName: checkout.billingAddress?.lastName || "",
                billingCompanyName: checkout.billingAddress?.companyName || "",
                billingStreetAddress1:
                  checkout.billingAddress?.streetAddress1 || "",
                billingStreetAddress2:
                  checkout.billingAddress?.streetAddress2 || "",
                billingCity: checkout.billingAddress?.city || "",
                billingPostalCode: checkout.billingAddress?.postalCode || "",
                billingCountryArea: checkout.billingAddress?.countryArea || "",
                billingPhone: checkout.billingAddress?.phone || "",
                billingCountry: {
                  code: checkout.billingAddress?.country?.code || "",
                  country: checkout.billingAddress?.country?.country || "",
                },
                // SHIPPING FIELDS
                // PAYMENT FIELDS
              }}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                validateForm,
                isSubmitting,
                values,
                isValid,
                setSubmitting,
              }) => {
                const formValidation = (event: any) => {
                  validateForm()
                    .then(() => {
                      isValid
                        ? handleChange(event, "shipping", values)
                        : console.error("Form validation failed.");
                    })
                    .finally(() => {
                      isValid
                        ? setCustomerFormError(false)
                        : setCustomerFormError(true);
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
                              // @ts-ignore
                              <MenuItem key={option.code} value={option}>
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
                            {errorMessage
                              ? errorMessage
                              : "Please ensure all required fields are entered"}
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
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
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
                        <TypedSellerNameQuery
                          variables={{ id: String(sellerMethod.seller) }}
                        >
                          {({ data, loading, error }) => {
                            return (
                              <Box>
                                <Box mb={2}>
                                  <Box
                                    className={
                                      classes.sellerShippingMethodSelect
                                    }
                                  >
                                    <Typography
                                      variant="h4"
                                      className={classes.sellerName}
                                    >
                                      {data?.sellerName?.companyName}
                                    </Typography>
                                    <Field
                                      className={classes.textfield}
                                      component={TextField}
                                      name={
                                        "shippingMethod" +
                                        String(sellerMethod.seller)
                                      }
                                      label="Shipping Method"
                                      variant="outlined"
                                      InputLabelProps={{ shrink: true }}
                                      select
                                      required
                                    >
                                      {sellerMethod.value.map((option) => (
                                        <MenuItem
                                          key={option.name}
                                          value={option.id}
                                          onClick={(event) =>
                                            handleSetSellerShippingMethods(
                                              sellerMethod.seller,
                                              option.id
                                            )
                                          }
                                        >
                                          <Box
                                            className={
                                              classes.shippingMethodSelectMenuOption
                                            }
                                          >
                                            <Box
                                              className={
                                                classes.shippingMethodSelectMenuName
                                              }
                                            >
                                              <Typography>
                                                {option.name}&nbsp;|&nbsp;
                                              </Typography>
                                            </Box>
                                            <Box
                                              className={
                                                classes.shippingMethodSelectMenuPrice
                                              }
                                            >
                                              <Money money={option.price} />
                                            </Box>
                                          </Box>
                                        </MenuItem>
                                      ))}
                                    </Field>
                                  </Box>
                                  {mappingDict[sellerMethod.seller]?.map(
                                    (sellerMapping) => (
                                      <Box
                                        className={classes.productShippingRow}
                                      >
                                        <CachedImage
                                          {...sellerMapping.variant?.product
                                            ?.thumbnail}
                                        />
                                        <Box className={classes.stackedText}>
                                          <Typography>
                                            {
                                              sellerMapping.variant?.product
                                                ?.name
                                            }
                                          </Typography>
                                          <Typography variant="caption">
                                            {sellerMapping.variant?.name}
                                          </Typography>
                                        </Box>
                                        <Typography
                                          className={classes.quantityText}
                                        >
                                          {"Qty: " + sellerMapping.quantity}
                                        </Typography>
                                      </Box>
                                    )
                                  )}
                                </Box>
                                <Divider
                                  className={classes.marginBottomDivider}
                                />
                              </Box>
                            );
                          }}
                        </TypedSellerNameQuery>
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
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
                          Continue
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index="payment">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          Payment Information
                        </Typography>
                      </Box>
                      {/* <Box>
                                            <Box className={classes.cardGroup}>
                                                <Card variant='outlined' className={method === "creditcard" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "creditcard")}>
                                                    <PaymentOutlinedIcon fontSize='large' />
                                                    Credit Card
                                                </Card>
                                                <Card variant='outlined' className={method === "banktransfer" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "banktransfer")}>
                                                    <AccountBalanceOutlinedIcon fontSize='large' />
                                                    Bank Transfer
                                                </Card>
                                                <Card variant='outlined' className={method === "purchaseorder" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "purchaseorder")}>
                                                    <DescriptionOutlinedIcon fontSize='large' />
                                                    Purchase Order
                                                </Card>
                                                <Card variant='outlined' className={method === "digitalwallet" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "digitalwallet")}>
                                                    <AccountBalanceWalletOutlinedIcon fontSize='large' />
                                                    Wallets &amp; More
                                                </Card>
                                            </Box>
                                        </Box> */}
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
                                processPayment={(token, cardData) =>
                                  handleProcessPayment(id, token, cardData)
                                }
                                errors={[]}
                                onError={(errors) => handleErrors(errors)}
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                      <Box
                        mb={3}
                        style={{ display: paymentFormError ? "block" : "none" }}
                        className={classes.gridspan}
                      >
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
                            onChange={async () =>
                              await setBillingAsShippingAddress(
                                !billingAsShipping
                              )
                            }
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
                            className={clsx(
                              classes.textfield,
                              classes.gridspan
                            )}
                            autoComplete="billing address-line1"
                            component={TextField}
                            required
                            name="billingStreetAddress1"
                            label="address line 1"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            className={clsx(
                              classes.textfield,
                              classes.gridspan
                            )}
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
                                // @ts-ignore
                                <MenuItem key={option.code} value={option}>
                                  {option.country}
                                </MenuItem>
                              ))}
                            </Field>
                          )}
                          {/* <Field
                                                    className={classes.textfield}
                                                    component={TextField}
                                                    required
                                                    name="email"
                                                    label="email"
                                                    type="email"
                                                    autoComplete="billing email"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        helperText: touched ? validateEmail('email') : null,
                                                    }}
                                                /> */}
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
                              {errorMessage
                                ? errorMessage
                                : "Please ensure all required fields are entered"}
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
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
                          {isSubmitting ? (
                            <CircularProgress />
                          ) : (
                            "Confirm Payment"
                          )}
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
        <>
          <Typography variant="h4">Confirming your payment...</Typography>
          <Loader />
        </>
      )}
    </>
  );
};

export default MuiCheckout;
