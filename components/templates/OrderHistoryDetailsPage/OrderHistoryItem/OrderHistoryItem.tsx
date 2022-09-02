import * as React from "react";
import { Box } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

import { NauticalOrderDetailFragment } from "components/providers/Nautical/Checkout/fragments.graphql.generated";
import { InvoiceFragmentFragment } from "components/templates/OrderHistoryDetailsPage/queries.graphql.generated";
import AddressSummary from "components/atoms/AddressSummary";
import { DropdownMenu } from "components/atoms/DropdownMenu";
import { TaxedMoney } from "components/molecules/TaxedMoney";
import { IconButton } from "components/molecules/IconButton";
import { checkoutMessages, translateOrderStatus, translatePaymentStatus } from "core/intl";
import { Money } from "components/atoms/Money";

import styles from "./scss/index.module.scss";

import { CartTable } from "../CartTable";

interface IOrderHistoryItemProps {
  order: NauticalOrderDetailFragment | null | undefined;
  invoices?: InvoiceFragmentFragment[] | null;
}

export const OrderHistoryItem = ({ order, invoices }: IOrderHistoryItemProps) => {
  const intl = useIntl();

  if (!order) {
    return null;
  }

  const handleDownloadInvoice = () => {
    if (invoices && invoices?.length > 0) {
      // Always download latest invoice
      const invoice = invoices
        ?.filter((invoice) => {
          return invoice!.number?.includes("INV");
        })
        .reduce((a, b) => {
          return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
        });

      if (invoice?.url) {
        window.open(invoice.url, "_blank");
      }
    }
  };

  const invInvoices =
    invoices &&
    invoices.filter((invoice) => {
      // FIXME What INV means and rename this variable to something more appropriate
      return invoice?.number?.includes("INV");
    }).length > 0;

  return (
    <>
      <Box className={styles["order-details__header"]}>
        <Box>
          <h3>
            <FormattedMessage defaultMessage="Order Number: {orderNum}" values={{ orderNum: order.number }} />
          </h3>
          <p className={styles["order-details__status"]}>
            {order.paymentStatusDisplay && translatePaymentStatus(order.paymentStatusDisplay, intl)} /{" "}
            {order.statusDisplay && translateOrderStatus(order.statusDisplay, intl)}
          </p>
        </Box>
        {invInvoices && (
          <Box className={styles["order-details__header-menu"]}>
            <DropdownMenu
              type="clickable"
              header={<IconButton testingContext="expandButton" name="expand" size={28} />}
              items={[
                {
                  onClick: handleDownloadInvoice,
                  content: (
                    <span>
                      <FormattedMessage
                        defaultMessage="Download invoice"
                        description="action in popup menu in order view"
                      />
                    </span>
                  ),
                },
              ]}
            />
          </Box>
        )}
      </Box>
      <CartTable
        lines={order.lines}
        // Showing Subtotal With taxes always
        totalCost={<Money money={order.total?.gross} />}
        // Showing Shipping without taxes always (since taxes are shown separately below)
        deliveryCost={<Money money={order.shippingPrice?.net} />}
        // Showing Subtotal without taxes always (since taxes are shown separately below)
        subtotal={<Money money={order.subtotal?.net} />}
        volumeDiscount={<TaxedMoney taxedMoney={order.volumeDiscount} />}
        discount={
          order.discount && (
            <TaxedMoney
              taxedMoney={{
                gross: order.discount,
                net: order.discount,
              }}
            />
          )
        }
        discountName={order?.discountName || undefined}
        taxes={
          !!order.total && (
            <Money
              money={{
                amount: order.total.gross.amount - order.total.net.amount,
                currency: order.total.gross.currency,
              }}
            />
          )
        }
      />
      <Box className={styles["order-details__summary"]}>
        <Box>
          <h4>
            <FormattedMessage {...checkoutMessages.shippingAddress} />
          </h4>
          {order.shippingAddress && (
            <AddressSummary address={order.shippingAddress} email={order?.userEmail || undefined} />
          )}
        </Box>
      </Box>
    </>
  );
};
