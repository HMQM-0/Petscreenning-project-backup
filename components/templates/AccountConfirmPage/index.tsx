import React from "react";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

import { Loader } from "components/atoms/Loader";

import { useAccountConfirmMutation } from "./queries.graphql.generated";

type AccountConfirmProps = {
  email: string;
  token: string;
};

const AccountConfirm = ({ email, token }: AccountConfirmProps) => {
  const [confirmAccount] = useAccountConfirmMutation();
  const router = useRouter();
  const alert = useAlert();

  const showErrors = (errors: { message: string }[]) => {
    alert.show(
      {
        content: errors.map((error) => error.message).join(" "),
        title: "Error",
      },
      { type: "error", timeout: 5000 },
    );
  };

  const displayConfirmationAlert = (anyErrors: { message: string }[]) => {
    alert.show(
      {
        content: anyErrors.length > 0 ? anyErrors.map((error) => error.message).join(" ") : "You can now log in",
        title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      },
      { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 },
    );
  };

  React.useEffect(
    () => {
      confirmAccount({
        variables: { email, token },
      })
        .then((result) => {
          const possibleErrors = result.data?.confirmAccount?.errors;
          if (possibleErrors?.length) {
            // Error messages should not be null|undefined. A BE issue?
            // @ts-ignore
            showErrors(possibleErrors);
            return;
          }
          alert.show(
            {
              content: "You can now log in",
              title: "Account confirmed",
            },
            { type: "success", timeout: 5000 },
          );
        })
        .catch(() => {
          const errors = [
            {
              message: "Something went wrong while activating your account.",
            },
          ];
          displayConfirmationAlert(errors);
        })
        .finally(() => {
          router.replace("/");
        });
    },
    // We want this code to be executed only once
    // eslint-disable-next-line
    [],
  );

  return <Loader />;
};

export default AccountConfirm;
