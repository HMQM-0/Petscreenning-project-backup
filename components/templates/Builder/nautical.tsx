// Remove any of these that aren't being actively used
// Move these to individual files so they can be imported as required, rather than wholesale

import { useAlert } from "react-alert";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { InsertMenuConfig, InsertMenuItem } from "@builder.io/sdk/dist/src/builder.class";
import { Builder } from "@builder.io/react";
import { StringParam, useQueryParam, useQueryParams } from "next-query-params";
import { FormattedMessage } from "react-intl";
import { gql, useQuery } from "@apollo/client";
import { ReactSVG } from "react-svg";

import filterImage from "deprecated/images/filter.svg";
import { IFilters } from "@types";
import { useVisibility } from "deprecated/_nautical/hooks";
import { DropdownSelect, AddToWishlist, FilterSidebar } from "components/organisms";
import { useCart } from "nautical-api";
import { TaxedMoney } from "components/molecules/TaxedMoney";

import ProductGallery from "./components/ProductGallery";
import { enumsAlert, enumsButtonVariant, enumsColor } from "./mui";
import { AlertIcon, ButtonIcon, GridIcon, TextfieldIcon } from "./icons";
import {
  BuilderPageAttributeFragment,
  BuilderPageProductFragment,
  BuilderPageProductVariantImagesFragment,
} from "./queries.graphql.generated";

import { FilterQuerySet } from "../ProductsList/View";

export const BuilderCard = (props: {
  message: string;
  fontSize: number;
  color: string;
  circle: boolean;
  size: number;
}) => {
  const theme: Theme = useTheme();

  const getColor = () => {
    switch (props.color) {
      case "error":
        return theme.palette.error.main;
      case "info":
        return theme.palette.info.main;
      case "primary":
        return theme.palette.primary.main;
      case "secondary":
        return theme.palette.secondary.main;
      case "success":
        return theme.palette.success.main;
      case "warning":
        return theme.palette.warning.main;
      default:
        return "#FFF";
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: getColor(),
        borderRadius: props.circle ? "50%" : 4,
        fontSize: props.fontSize ? props.fontSize : "1rem",
        width: props.size ? props.size : 100,
        height: props.size ? props.size : 100,
        color: (theme) => theme.palette.getContrastText(getColor()),
        textAlign: "center",
      }}
    >
      <CardContent>{props.message}</CardContent>
    </Card>
  );
};

Builder.registerComponent(BuilderCard, {
  name: "Card",
  friendlyName: "Material Card",
  noWrap: false, // Important!
  inputs: [
    { name: "message", type: "string", defaultValue: "Text Field" },
    { name: "fontSize", type: "string", defaultValue: "1rem" },
    {
      name: "color",
      type: "string",
      defaultValue: "primary",
      enum: enumsColor,
    },
    { name: "circle", type: "boolean", defaultValue: true },
    { name: "size", type: "number", defaultValue: 160 },
  ],
});

const cardMenuItem: InsertMenuItem = {
  name: "Card",
  icon: GridIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "Card",
    },
  },
};

export const BuilderAddToCartQuick = (props: { variantId: string; productName: string; color: string }) => {
  const alert = useAlert();
  const { addItem } = useCart();

  const handleAddToCart = (event: React.MouseEvent, variantId: string, quantity: number) => {
    event.stopPropagation();
    event.preventDefault();
    addItem(variantId, quantity);
    alert.show(
      {
        title: "Added " + quantity + "x " + props.productName,
      },
      { type: "success" }
    );
  };

  return (
    <IconButton
      // @ts-ignore
      color={props.color ? props.color : "primary"}
      onClick={(event) => {
        handleAddToCart(event, props.variantId, 1);
      }}
      aria-label="Add to Cart"
    >
      <AddCircleIcon />
    </IconButton>
  );
};

Builder.registerComponent(BuilderAddToCartQuick, {
  name: "AddToCartQuick",
  friendlyName: "Nautical AddToCartQuick",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [
    { name: "variantId", type: "string" },
    { name: "productName", type: "string" },
    { name: "color", type: "string", enum: enumsColor },
  ],
  docsLink: "https://mui.com/components/alert/",
});

export const BuilderAddToWishlist = (props: { productId: string }) => {
  return <AddToWishlist productId={props.productId} showButtonText={false} />;
};

Builder.registerComponent(BuilderAddToWishlist, {
  name: "AddToWishlist",
  friendlyName: "Nautical AddToWishlist",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "productId", type: "string" }],
  docsLink: "https://mui.com/components/alert/",
});

export const BuilderAddToCart = (props: {
  message: string;
  severity: AlertColor;
  button: "contained" | "outlined" | "text" | null;
  color: "primary" | "secondary" | null;
  width: string;
  variantId: string;
}) => {
  const [open, setOpen] = React.useState(false);

  console.info("ADD TO CART PROPS");
  console.info(props.variantId);

  const { addItem, removeItem } = useCart();

  const handleClick = async () => {
    await addItem(props.variantId, 1);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={async () => await removeItem(props.variantId)}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Button
        color={props.color ? props.color : "primary"}
        style={{
          alignSelf: "center",
          width: props.width ? `${props.width}px` : "100%",
          marginBottom: 24,
        }}
        onClick={handleClick}
        variant={props.button ? props.button : "contained"}
      >
        Add to Cart
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Added to cart" action={action} />
    </>
  );
};

Builder.registerComponent(BuilderAddToCart, {
  name: "AddToCart",
  friendlyName: "Nautical Snackbar",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [
    {
      name: "message",
      type: "string",
      defaultValue: "This is an error message",
    },
    {
      name: "severity",
      type: "string",
      enum: enumsAlert,
      defaultValue: "error",
    },
    {
      name: "button",
      type: "string",
      enum: enumsButtonVariant,
      defaultValue: "contained",
    },
    {
      name: "color",
      type: "string",
      enum: enumsColor,
      defaultValue: "primary",
    },
    { name: "variantId", type: "string" },
    { name: "width", type: "string", defaultValue: "150px" },
  ],
  docsLink: "https://mui.com/components/alert/",
});

const addToCartMenuItem: InsertMenuItem = {
  name: "Add to Cart",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "AddToCart",
    },
  },
};

export const MakeQuery = (props: { queryString: string }) => {
  const queryDocument = gql(props.queryString);

  const { loading, error, data } = useQuery(queryDocument);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return <Box>{JSON.stringify(data)}</Box>;
};

Builder.registerComponent(MakeQuery, {
  name: "MakeQuery",
  friendlyName: "Make GraphQL Query",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "queryString", type: "string" }],
  docsLink: "https://mui.com/components/alert/",
});

const makeQueryMenuItem: InsertMenuItem = {
  name: "Make Query",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "MakeQuery",
    },
  },
};

export const BuilderAddToCartSection = ({ product }: { product: BuilderPageProductFragment }) => {
  // const [open, setOpen] = React.useState(false);
  const [selectedVariant, setSelectedVariant] = React.useState(product?.defaultVariant?.id);
  const {
    addItem,
    // removeItem
  } = useCart();

  if (!product || (product.variants?.length ?? 0) === 0) {
    return <Typography>MISSING PRODUCT BINDING</Typography>;
  }

  // const handleClick = async () => {
  //   await addItem(selectedVariantId, 1);
  //   setOpen(true);
  // };

  // const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  const handleSelect = async () => {
    if (selectedVariant) {
      await addItem(selectedVariant, 1);
    }
  };

  // const action = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleSelect()} >
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  // Determine what part of price range TaxedMoney should receive
  const variants = product.variants ?? [];
  return (
    <>
      <TaxedMoney taxedMoney={product.pricing?.priceRange?.start} />
      <Select
        defaultValue={product.defaultVariant}
        onChange={(event) => {
          const value = event.target.value as string;
          setSelectedVariant(value);
        }}
      >
        {variants.map((variant) => {
          const id = variant?.id ?? "";
          const name = variant?.name ?? "";
          return (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
      <Button
        color={"primary"}
        style={{ alignSelf: "center", width: "100%", marginBottom: 24 }}
        disabled={!selectedVariant}
        onClick={handleSelect}
        variant={"contained"}
      >
        Add to Cart
      </Button>
    </>
    //   <Snackbar
    //     open={open}
    //     autoHideDuration={6000}
    //     onClose={handleClose}
    //     message="Added to cart"
    //     action={action}
    //   />
    // </>
  );
};

Builder.registerComponent(BuilderAddToCartSection, {
  name: "AddToCartSection",
  friendlyName: "Nautical Snackbar",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "product", type: "object" }],
  docsLink: "https://mui.com/components/alert/",
});

export const BuilderProductGallery = ({ images }: { images: BuilderPageProductVariantImagesFragment["images"] }) => {
  // This is a BE issue where images has values which are potentially null
  // @ts-ignore
  return <ProductGallery images={images} />;
};

Builder.registerComponent(BuilderProductGallery, {
  name: "ProductGallery",
  friendlyName: "Nautical ProductGallery",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "images", type: "object" }],
  docsLink: "https://mui.com/components/alert/",
});

const productGalleryMenuItem: InsertMenuItem = {
  name: "Product Gallery",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductGallery",
    },
  },
};

const addToCartSectionMenuItem: InsertMenuItem = {
  name: "Add to Cart Section",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "AddToCartSection",
    },
  },
};

const taxedMoneyMenuItem: InsertMenuItem = {
  name: "Moneyfield",
  icon: TextfieldIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "TaxedMoney",
    },
  },
};

const addToWishlistMenuItem: InsertMenuItem = {
  name: "AddToWishlist",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "AddToWishlist",
    },
  },
};

const addToCartQuickMenuItem: InsertMenuItem = {
  name: "AddToCartQuick",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "AddToCartQuick",
    },
  },
};

export const BuilderProductSort = (props: { products: BuilderPageProductFragment[] }) => {
  const sortOptions = [
    {
      label: "Clear...",
      value: null,
    },
    {
      label: "Price Low-High",
      value: "price",
    },
    {
      label: "Price High-Low",
      value: "-price",
    },
    {
      label: "Name Increasing",
      value: "name",
    },
    {
      label: "Name Decreasing",
      value: "-name",
    },
    {
      label: "Last updated Ascending",
      value: "updated_at",
    },
    {
      label: "Last updated Descending",
      value: "-updated_at",
    },
  ];

  // const [sort, setSort] = useQueryParam("sortBy", StringParam);
  // const [after, setAfter] = useQueryParam("after", StringParam);
  // const [before, setBefore] = useQueryParam("before", StringParam);

  const [queryParams, setQueryParams] = useQueryParams({
    sortBy: StringParam,
    after: StringParam,
    before: StringParam,
  });

  // @ts-ignore
  const { sortBy: sort, after, before } = queryParams;

  const handleSortChange = (value: any) => {
    // setSort(value.value);
    setQueryParams({
      sortBy: value.value,
      after: null,
      before: null,
    });
  };

  return (
    <DropdownSelect
      onChange={handleSortChange}
      options={sortOptions}
      value={sortOptions.find((option) => option.value === sort)}
    />
  );
};

Builder.registerComponent(BuilderProductSort, {
  name: "ProductSort",
  friendlyName: "Nautical Snackbar",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "products", type: "object" }],
  docsLink: "https://mui.com/components/alert/",
});

const productSortMenuItem: InsertMenuItem = {
  name: "ProductSort",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductSort",
    },
  },
};

export const BuilderProductFilters = ({ attributes }: { attributes: BuilderPageAttributeFragment[] }) => {
  const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name: string, value: string) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter((item) => item !== value),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  // This value wasn't being used - the filters only accept attributes right now
  // const [sort, setSort] = useQueryParam("sortBy", StringParam);

  const filters = {
    attributes: attributeFilters,
  };

  const activeFilters = filters!.attributes ? Object.keys(filters!.attributes).length : 0;

  // const [showFilters, setShowFilters] = usePersistedState("filtersOpen", false);
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <>
      <Box
        style={{
          display: "flex",
          fontSize: "0.875rem",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setShowFilters(!showFilters)}
      >
        <ReactSVG src={filterImage} />
        &nbsp;&nbsp;
        <Box style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <Box>
            FILTERS &nbsp;
            {activeFilters > 0 && <Box component="span">({activeFilters})</Box>}
          </Box>
          {activeFilters > 0 && (
            <Box onClick={clearFilters}>
              <CloseIcon />
            </Box>
          )}
        </Box>
      </Box>
      <FilterSidebar
        show={showFilters}
        hide={() => setShowFilters(false)}
        onAttributeFiltersChange={onFiltersChange}
        attributes={attributes}
        filters={filters}
      />
    </>
  );
};

Builder.registerComponent(BuilderProductFilters, {
  name: "ProductFilters",
  friendlyName: "Nautical Product Filters",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [{ name: "attributes", type: "object" }],
  docsLink: "https://mui.com/components/alert/",
});

const productFiltersMenuItem: InsertMenuItem = {
  name: "ProductFilters",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductFilters",
    },
  },
};

export const BuilderLoadMore = (props: { hasMore: boolean; buttonText: string; onLoadMore: () => void }) => {
  console.info("BUILDER LOAD MORE");
  console.info(props);
  const moreButton = useVisibility(
    (visible) => {
      // if (!loading) {
      if (visible && props.hasMore) {
        setTimeout(() => {
          props.onLoadMore;
        }, 50000);
      }
      // }
    },
    // [loading, props.hasMore, products]
    [props.hasMore]
  );

  return (
    <Box ref={moreButton}>
      <Button
        variant="contained"
        // testingContext="loadMoreProductsButton"
        color="secondary"
        onClick={props.onLoadMore}
      >
        {props.buttonText || <FormattedMessage defaultMessage="More +" />}
      </Button>
    </Box>
  );
};

Builder.registerComponent(BuilderLoadMore, {
  name: "LoadMore",
  friendlyName: "Nautical Snackbar",
  // noWrap: false, // Important!
  image: AlertIcon,
  inputs: [
    { name: "hasMore", type: "boolean" },
    { name: "buttonText", type: "string" },
    { name: "loadMore", type: "object" },
  ],
  docsLink: "https://mui.com/components/alert/",
});

const loadMoreMenuItem: InsertMenuItem = {
  name: "LoadMore",
  icon: ButtonIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "LoadMore",
    },
  },
};

const nauticalMenu: InsertMenuConfig = {
  name: "Nautical Commerce",
  items: [
    addToCartMenuItem,
    addToCartSectionMenuItem,
    addToCartQuickMenuItem,
    addToWishlistMenuItem,
    cardMenuItem,
    productGalleryMenuItem,
    productSortMenuItem,
    taxedMoneyMenuItem,
    loadMoreMenuItem,
    makeQueryMenuItem,
    productFiltersMenuItem,
  ],
};

Builder.register("insertMenu", nauticalMenu);
