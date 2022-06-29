import React from "react";
import {
  InsertMenuConfig,
  InsertMenuItem,
} from "@builder.io/sdk/dist/src/builder.class";
import { Builder } from "@builder.io/react";

import { ProductFilters } from "./components/ProductFilters";
import { TaxedMoney } from "./components/TaxedMoney";
import { AddToCartSection } from "./components/AddToCartSection";
import { AddToCartQuick } from "./components/AddToCartQuick";
import { AddToCart } from "./components/AddToCart";
import { AddToWishlist } from "./components/AddToWishlist";
import { ProductSort } from "./components/ProductSort";
import ProductGallery from "./components/ProductGallery";
import { enumsAlert, enumsButtonVariant, enumsColor } from "./mui";
import { ButtonIcon, TextfieldIcon, BoxIcon, DrawerIcon, SliderIcon, CheckboxIcon } from "./icons";

Builder.registerComponent(AddToCartQuick, {
  name: "AddToCartQuick",
  friendlyName: "Nautical Add To Cart Quick",
  image: ButtonIcon,
  inputs: [
    { name: "variantId", type: "string" },
    { name: "productName", type: "string" },
    { name: "color", type: "string", enum: enumsColor },
  ],
});

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

Builder.registerComponent(AddToWishlist, {
  name: "AddToWishlist",
  friendlyName: "Nautical Add To Wishlist",
  image: ButtonIcon,
  inputs: [{ name: "productId", type: "string", required: true }],
});

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

Builder.registerComponent(AddToCart, {
  name: "AddToCart",
  friendlyName: "Nautical Add To Cart",
  image: ButtonIcon,
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

Builder.registerComponent(AddToCartSection, {
  name: "AddToCartSection",
  friendlyName: "Nautical Add To Cart Section",
  image: DrawerIcon,
  inputs: [
    {
      name: "product",
      type: "object",
      required: true,
      subFields: [
        {
          name: "variants",
          type: "list",
          required: true,
          subFields: [
            {
              name: "id",
              type: "string",
              required: true,
            },
            {
              name: "name",
              type: "string",
              required: true,
            },
          ],
        },
        {
          name: "pricing",
          type: "object",
          required: true,
          subFields: [
            {
              name: "price",
              type: "object",
              required: true,
              subFields: [
                {
                  name: "gross",
                  type: "object",
                  required: true,
                  subFields: [
                    {
                      name: "currency",
                      type: "number",
                      required: true,
                    },
                    {
                      name: "amount",
                      type: "number",
                      required: true,
                    },
                  ],
                },
                {
                  name: "net",
                  type: "object",
                  required: true,
                  subFields: [
                    {
                      name: "currency",
                      type: "number",
                      required: true,
                    },
                    {
                      name: "amount",
                      type: "number",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "name",
          type: "string",
          required: true,
        },
        {
          name: "isAvailableForPurchase",
          type: "boolean",
        },
        {
          name: "availableForPurchase",
          type: "number",
          required: true,
        },
      ],
      helperText: "You can add binding `state.product` here",
    }
  ],
});

const addToCartSectionMenuItem: InsertMenuItem = {
  name: "Add to Cart Section",
  icon: DrawerIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "AddToCartSection",
    },
    bindings: {
      'component.options.product': "state.product",
    },
  },
};

Builder.registerComponent(ProductGallery, {
  name: "ProductGallery",
  friendlyName: "Nautical ProductGallery",
  image: BoxIcon,
  inputs: [
    {
      name: "images",
      type: "object",
      subFields: [
        {
          name: "alt",
          type: "string",
          required: true,
        },
        {
          name: "url",
          type: "string",
          required: true,
        },
      ],
      defaultValue: [],
      helperText: "You can add binding `product.images` here",
    }
  ],
});

const productGalleryMenuItem: InsertMenuItem = {
  name: "Product Gallery",
  icon: BoxIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductGallery",
    },
    bindings: {
      'component.options.images': "state.product?.images",
    },
  },
};

Builder.registerComponent(TaxedMoney, {
  name: "TaxedMoney",
  friendlyName: "Nautical TaxedMoney",
  noWrap: false, // Important!
  image: TextfieldIcon,
  inputs: [
    {
      name: "TaxedMoney",
      type: "object",
      required: true,
      subFields: [
        {
          name: "gross",
          type: "object",
          required: true,
          subFields: [
            {
              name: "currency",
              type: "number",
              required: true,
            },
            {
              name: "amount",
              type: "number",
              required: true,
            },
          ],
        },
        {
          name: "net",
          type: "object",
          required: true,
          subFields: [
            {
              name: "currency",
              type: "number",
              required: true,
            },
            {
              name: "amount",
              type: "number",
              required: true,
            },
          ],
        },
      ],
      helperText: "You can add binding `product.pricing.priceRange.start`, `variant.pricing.price`, etc.",
    }
  ],
});

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

Builder.registerComponent(ProductSort, {
  name: "ProductSort",
  friendlyName: "Nautical Product Sort",
  image: SliderIcon,
});

const productSortMenuItem: InsertMenuItem = {
  name: "ProductSort",
  icon: SliderIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductSort",
    },
  },
};

Builder.registerComponent(ProductFilters, {
  name: "ProductFilters",
  friendlyName: "Nautical Product Filters",
  image: CheckboxIcon,
  inputs: [
    {
      name: "attributes",
      type: "list",
      subFields: [
        {
          name: "id",
          type: "string",
          required: true,
        },
        {
          name: "name",
          type: "string",
          required: true,
        },
        {
          name: "slug",
          type: "string",
          required: true,
        },
        {
          name: "values",
          type: "list",
          required: true,
          subFields: [
            {
              name: "id",
              type: "string",
              required: true,
            },
            {
              name: "name",
              type: "string",
              required: true,
            },
            {
              name: "slug",
              type: "string",
              required: true,
            },
          ],
        },
      ],
      required: true,
      helperText: "You can add binding `state.attributes` here",
      defaultValue: [],
    }
  ],
});

const productFiltersMenuItem: InsertMenuItem = {
  name: "ProductFilters",
  icon: CheckboxIcon,
  item: {
    "@type": "@builder.io/sdk:Element",
    layerLocked: false,
    component: {
      name: "ProductFilters",
    },
    bindings: {
      'component.options.attributes': "state.attributes",
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
    productGalleryMenuItem,
    productSortMenuItem,
    taxedMoneyMenuItem,
    productFiltersMenuItem,
  ],
};

Builder.register("insertMenu", nauticalMenu);
