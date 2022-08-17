import React, { useEffect } from "react";

import { AddressForm } from "components/atoms/AddressForm";
import { Modal } from "components/organisms/Modal";
import {
  useCreateUserAddressMutation,
  useUpdateUserAddressMutation,
} from "components/templates/AddressBookPage/mutations.graphql.generated";
import { CountryCode } from "@generated";
import { useShopContext } from "components/providers/ShopProvider";

import { IProps } from "./types";

export const AddressFormModal = ({ hideModal, submitBtnText, target, title, userId, address, formId }: IProps) => {
  const [show, setShow] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { countries } = useShopContext();

  const [setCreatUserAddress, { data: createData, error: addressCreateErrors }] = useCreateUserAddressMutation();

  const [setUpdateUserAddress, { data: updateData, error: addressUpdateErrors }] = useUpdateUserAddressMutation();

  const handleErrors = (errors: any[]) => {
    const messages = errors?.flatMap((error) => error.message) ?? [];
    setErrorMessage(messages.join(" \n"));
  };

  useEffect(() => {
    if (addressCreateErrors?.extraInfo.userInputErrors) {
      const errors = addressCreateErrors.extraInfo.userInputErrors;
      handleErrors(errors);
    } else if (addressUpdateErrors?.extraInfo.userInputErrors) {
      const errors = addressUpdateErrors.extraInfo.userInputErrors;
      handleErrors(errors);
    }
  }, [addressCreateErrors, addressUpdateErrors]);

  React.useEffect(() => {
    if ((createData && !addressCreateErrors) || (updateData && !addressUpdateErrors)) {
      hideModal();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors, hideModal]);

  const values = address?.address || {};

  return (
    <Modal
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      formId={formId}
      disabled={false}
      show={show}
      target={target}
      submitBtnText={submitBtnText}
    >
      <AddressForm
        values={values}
        errorMessage={errorMessage}
        submitText={userId ? "Add New Address" : "Update Address"}
        onSubmit={async (values) => {
          const country = countries.find((country) => country.code === values.country)?.country ?? "";
          if (userId) {
            setCreatUserAddress({
              variables: {
                input: {
                  ...values,
                  country: country as CountryCode,
                },
              },
            });
          } else {
            setUpdateUserAddress({
              variables: {
                id: address!.id,
                input: {
                  ...values,
                  country: country as CountryCode,
                },
              },
            });
          }
        }}
      />
    </Modal>
  );
};
