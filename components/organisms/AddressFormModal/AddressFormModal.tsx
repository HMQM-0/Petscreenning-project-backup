import React, { useEffect } from "react";

import { AddressForm, AddressFormFields, AddressFormSubmitButton } from "components/atoms/AddressForm";
import { Modal } from "components/organisms/Modal";
import {
  useCreateUserAddressMutation,
  useUpdateUserAddressMutation,
} from "components/templates/AddressBookPage/mutations.graphql.generated";
import { CountryCode } from "@generated";
import { useShopContext } from "components/providers/ShopProvider";
import { UserDetailsDocument } from "components/providers/Nautical/Auth/queries.graphql.generated";

import { IProps } from "./types";

export const AddressFormModal = ({
  hideModal,
  show,
  submitBtnText,
  target,
  title,
  userId,
  address,
  formId,
}: IProps) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const { countries } = useShopContext();

  const [setCreatUserAddress, { data: createData, error: addressCreateErrors }] = useCreateUserAddressMutation({
    refetchQueries: () => {
      return [
        {
          query: UserDetailsDocument,
        },
      ];
    },
  });

  const [setUpdateUserAddress, { data: updateData, error: addressUpdateErrors }] = useUpdateUserAddressMutation({
    refetchQueries: () => {
      return [
        {
          query: UserDetailsDocument,
        },
      ];
    },
  });

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

  const values = {
    ...(address
      ? {
          ...address.address,
          country: address.address.country.code,
        }
      : {}),
    email: undefined,
  };

  return (
    <Modal
      submitButtonTestingContext="submitAddressFormModalButton"
      testingContext="submitAddressFormModal"
      title={title}
      hide={() => {
        hideModal();
      }}
      formId={formId}
      disabled={false}
      show={show}
      target={target}
    >
      <AddressForm
        values={values}
        onSubmit={async (values) => {
          const country = countries.find((country) => country.code === values.country)?.code ?? "";
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
      >
        {({ isSubmitting, touched, errors }) => (
          <>
            <AddressFormFields
              errorMessage={errorMessage}
              touched={touched}
              errors={errors}
            />
            <AddressFormSubmitButton
              isSubmitting={isSubmitting}
              buttonText={submitBtnText}
            />
          </>
        )}
      </AddressForm>
    </Modal>
  );
};
