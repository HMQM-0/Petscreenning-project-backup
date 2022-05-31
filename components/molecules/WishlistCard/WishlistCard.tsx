import React, { useState, useEffect } from "react";
import { MenuItem, Select, InputLabel, Box, Button } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { useAlert } from "react-alert";
import Link from "next/link";

import { useCart } from "@nautical/react";
import { Trash } from "components/icons/trash";
import {
  generateMicrositeProductUrl,
  generateProductUrl,
  getMicrositeId,
  getMicrositeSlug,
  isMicrosite,
} from "core/utils";
import { WishlistContext } from "components/providers/Wishlist/context";
import { useRemoveWishlistProductMutation } from "components/providers/Wishlist/mutations.graphql.generated";
import {
  WishlistItemFragment,
  WishlistItemVariantFragment,
} from "components/providers/Wishlist/fragments.graphql.generated";

import ProductPrice from "../../organisms/ProductPrice";
import ProductVariantPrice from "../../organisms/ProductVariantPrice";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      width: "100%",
      gap: "1.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid lightgrey",
      transitionProperty:
        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
      transitionDuration: "150ms;",
    },
    image: {
      gridColumn: "span 3 / span 3",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gridColumn: "span 7 / span 7",
    },
    trash: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gridArea: "trash",
    },
    productName: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      marginBottom: "0.5rem",
      fontWeight: 700,
      cursor: "pointer",
    },
    productDescription: {
      marginBottom: "0.5rem",
      fontSize: "1.2em",
    },
    selectLabel: {
      marginBottom: 0,
      marginTop: "0.5rem",
      fontSize: "0.85em",
    },
    select: {
      maxWidth: "24rem",
      marginBottom: "1rem",
    },
    addToCart: {
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      marginTop: "0.75rem",
      border: "1px",
      borderRadius: "0.375rem",
      "--tw-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      boxShadow:
        "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      width: "max-content",
    },
    pricing: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gridColumn: "span 2 / span 2",
    },
    pricing_price: {
      display: "flex",
      justifyContent: "flex-end",
      fontWeight: 700,
    },
    pricing_trash: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface WhishlistCardProps {
  item: WishlistItemFragment;
}

const WishlistCard = ({ item }: WhishlistCardProps) => {
  const product = item.product;
  const [variant, setVariant] = useState<WishlistItemVariantFragment | null>(
    null
  );
  const alert = useAlert();

  const { update } = React.useContext(WishlistContext);

  const [removeWishlistProduct] = useRemoveWishlistProductMutation({
    variables: { productId: product.id },
  });

  const classes = useStyles();

  useEffect(() => {
    if (product.variants?.length === 1 && !variant) {
      setVariant(product.variants?.[0]);
    }
  }, [product.variants, variant]);

  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const { addItem } = useCart();

  const handleRemove = async () => {
    setRemoving(true);

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeWishlistProduct();
      update();
      setRemoving(false);
    } catch (error) {
      setRemoving(false);
    }
  };
  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem(variant?.id!, 1);
      alert.show(
        {
          title: "Added 1x " + product.name,
        },
        { type: "success" }
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const showVariants = product.variants && product.variants.length > 1;

  return (
    <Box className={classes.root}>
      <Box className={classes.image}>
        <img
          src={product.countableImages?.edges?.[0]?.node.urlOriginal}
          width="100%"
          height="auto"
          alt={
            product.countableImages?.edges?.[0]?.node.altText || "Product Image"
          }
        />
      </Box>

      <Box className={classes.details}>
        <Link
          href={
            isMicrosite()
              ? generateMicrositeProductUrl(
                  item.product.id,
                  item.product.name,
                  getMicrositeId()!,
                  getMicrositeSlug()
                )
              : generateProductUrl(item.product.id, item.product.name)
          }
          passHref
        >
          <a>
            <h3 className={classes.productName}>{product.name}</h3>
          </a>
        </Link>
        <Box className={classes.productDescription} />
        {showVariants && (
          <>
            <InputLabel
              htmlFor={`variant${product.id}`}
              className={classes.selectLabel}
            >
              {variant ? "Variant" : "Choose Variant"}
            </InputLabel>
            <Select
              className={classes.select}
              name="variant"
              id={`variant${product.id}`}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                style: {
                  maxHeight: 480,
                },
              }}
              onChange={(event) => {
                const selectedVariant =
                  // TODO: variantItem can NOT be null. A BE issue
                  product.variants?.find(
                    (variantItem) => variantItem!.id === event.target.value
                  );
                setVariant(selectedVariant || null);
              }}
            >
              {product.variants?.map((variant) => {
                // TODO: v is not null. a BE issue
                return (
                  <MenuItem key={variant!.id} value={variant!.id}>
                    {variant!.name}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        )}
        <Button
          aria-label="Add to Cart"
          type="button"
          className={classes.addToCart}
          onClick={addToCart}
          disabled={!variant || loading || removing}
        >
          Add to Cart
        </Button>
      </Box>
      <Box className={classes.pricing}>
        <Box className={classes.pricing_price}>
          {variant ? (
            <ProductVariantPrice pricing={variant.pricing} />
          ) : (
            <ProductPrice pricing={product.pricing} />
          )}
        </Box>
        <Box className={classes.pricing_trash}>
          <button onClick={handleRemove} className={classes.trash}>
            <Trash />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistCard;
