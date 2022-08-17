import React from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";

import { AddressGrid, AddressGridProps } from "components/organisms/AddressGrid";
import { AddressFormModal, AddressFormModalProps } from "components/organisms/AddressFormModal";
import { checkoutMessages, commonMessages } from "core/intl";
import { useShopContext } from "components/providers/ShopProvider";
import { AccountErrorCode, AddressTypeEnum } from "@generated";
import { UserDetailsDocument } from "components/providers/Nautical/Auth/queries.graphql.generated";
import { useAuth } from "nautical-api";

import { useDeleteUserAddressMutation, useSetCustomerDefaultAddressMutation } from "./mutations.graphql.generated";
import { container } from "./styles";

const AddressBookPage = () => {
  const { user } = useAuth();
  const { defaultCountry, countries } = useShopContext();
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState<AddressFormModalProps["address"]>();
  const [setDefaultUserAddress] = useSetCustomerDefaultAddressMutation({
    refetchQueries: (result) => {
      if (result?.data?.accountSetDefaultAddress?.errors?.length ?? 0 > 0) {
        if (result?.data?.accountSetDefaultAddress?.errors?.find((err) => err.code === AccountErrorCode.NotFound)) {
          return [
            {
              query: UserDetailsDocument,
            },
          ];
        }
      }
      return [];
    },
  });
  const [setDeleteUserAddress] = useDeleteUserAddressMutation({
    refetchQueries: (result) => {
      if (result?.data?.accountAddressDelete?.errors?.length ?? 0 > 0) {
        if (result?.data?.accountAddressDelete?.errors.find((err) => err.code === AccountErrorCode.NotFound)) {
          return [
            {
              query: UserDetailsDocument,
            },
          ];
        }
      }
      return [];
    },
  });
  const intl = useIntl();

  const userAddresses: AddressGridProps["addresses"] =
    user?.addresses?.map((address) => {
      const addressToDisplay: any = { address: { ...address } };

      addressToDisplay.onEdit = () => {
        setDisplayEditModal(true);
        setAddressData({
          address,
          id: address.id,
        });
      };

      addressToDisplay.onRemove = () =>
        setDeleteUserAddress({
          variables: {
            addressId: address.id,
          },
        });

      addressToDisplay.setDefault = (type: string) => {
        setDefaultUserAddress({
          variables: {
            id: address.id,
            type: type === "BILLING" ? AddressTypeEnum.Billing : AddressTypeEnum.Shipping,
          },
        });
      };
      return addressToDisplay;
    }) ?? [];

  return (
    <Box sx={container}>
      <AddressGrid
        addresses={userAddresses}
        addNewAddress={() => {
          setDisplayNewModal(true);
        }}
      />
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user?.id}
          {...{ defaultValue: defaultCountry || {} }}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
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
