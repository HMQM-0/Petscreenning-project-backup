import React from "react";
import { useIntl } from "react-intl";
import { Box, Typography } from "@mui/material";

import { AddressGrid, AddressGridProps } from "src/components/organisms/AddressGrid";
import { AddressFormModal, AddressFormModalProps } from "src/components/organisms/AddressFormModal";
import { checkoutMessages, commonMessages } from "src/core/intl";
import { useShopContext } from "src/components/providers/ShopProvider";
import { AddressTypeEnum } from "@generated";
import { UserDetailsDocument } from "src/components/providers/Nautical/Auth/queries.graphql.generated";
import { useAuth } from "nautical-api";

import { useDeleteUserAddressMutation, useSetCustomerDefaultAddressMutation } from "./mutations.graphql.generated";
import { container, notAuthenticatedHeader, notAuthenticatedWrapper } from "./styles";

const AddressBookPage = () => {
  const { user, loaded } = useAuth();
  const { defaultCountry, countries } = useShopContext();
  const [modal, setModal] = React.useState<"new" | "edit" | null>(null);
  const [addressData, setAddressData] = React.useState<AddressFormModalProps["address"]>();
  const [setDefaultUserAddress] = useSetCustomerDefaultAddressMutation({
    refetchQueries: () => {
      return [
        {
          query: UserDetailsDocument,
        },
      ];
    },
  });
  const [deleteUserAddressMutation] = useDeleteUserAddressMutation({
    refetchQueries: () => {
      return [
        {
          query: UserDetailsDocument,
        },
      ];
    },
  });
  const intl = useIntl();

  const userAddresses: AddressGridProps["addresses"] =
    user?.addresses?.map((address) => ({
      id: address.id,
      address: {
        ...address,
        isDefaultBillingAddress: !!address.isDefaultBillingAddress,
        isDefaultShippingAddress: !!address.isDefaultShippingAddress,
      },
      onEdit: () => {
        setModal("edit");
        setAddressData({
          address,
          id: address.id,
        });
      },
      onRemove: () =>
        deleteUserAddressMutation({
          variables: {
            addressId: address.id,
          },
        }),
      setDefault: (type: string) => {
        setDefaultUserAddress({
          variables: {
            id: address.id,
            type: type === "BILLING" ? AddressTypeEnum.Billing : AddressTypeEnum.Shipping,
          },
        });
      },
    })) ?? [];

  if (!user && loaded) {
    return (
      <Box sx={notAuthenticatedWrapper}>
        <Typography
          variant="h1"
          sx={notAuthenticatedHeader}
        >
          Not Authenticated
        </Typography>
        <Typography variant="body1">Please login to access your address book</Typography>
      </Box>
    );
  }

  const showNewModal = modal === "new";
  const showEditModal = modal === "edit";

  return (
    <Box sx={container}>
      <AddressGrid
        addresses={userAddresses}
        addNewAddress={() => {
          setModal("new");
        }}
      />
      {showNewModal && (
        <AddressFormModal
          hideModal={() => {
            setModal(null);
          }}
          show={showNewModal}
          userId={user?.id}
          {...{ defaultValue: defaultCountry || {} }}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
      {showEditModal && (
        <AddressFormModal
          hideModal={() => {
            setModal(null);
          }}
          show={showEditModal}
          address={addressData}
          submitBtnText={intl.formatMessage(commonMessages.save)}
          title={intl.formatMessage({ defaultMessage: "Edit address" })}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
    </Box>
  );
};

export { AddressBookPage };
