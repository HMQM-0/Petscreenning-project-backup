import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useAccountUpdateMutation } from "components/providers/Nautical/Auth/mutations.graphql.generated";
import { Tile } from "components/atoms/Tile";
import { IconButton } from "components/molecules/IconButton";
import { commonMessages } from "core/intl";
import { useAuth } from "nautical-api";

import { Attribute } from "./Attribute";
import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdateMutation();
  const intl = useIntl();
  const { user } = useAuth();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="MY DATA" />
          </S.Header>
          <S.Content>
            <S.HeaderSmall>
              <FormattedMessage defaultMessage="Personal details" />
              {!isEditing && (
                <IconButton
                  testingContext="editDetailsButton"
                  name="edit"
                  size={22}
                  onClick={() => setIsEditing((isEditing) => !isEditing)}
                />
              )}
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || "",
                  lastName: (user && user.lastName) || "",
                  companyName: (user && user.companyName) || "",
                }}
                handleSubmit={(data) => {
                  setAccountUpdate({ variables: { input: data } });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : (
              <S.ContentOneLine data-test="personalDetailsSection">
                <Attribute
                  description={intl.formatMessage(commonMessages.firstName)}
                  attributeValue={(user && user.firstName) || "-"}
                  testingContext="firstNameText"
                />
                <Attribute
                  description={intl.formatMessage(commonMessages.lastName)}
                  attributeValue={(user && user.lastName) || "-"}
                  testingContext="lastNameText"
                />
                <Attribute
                  description={intl.formatMessage(commonMessages.companyName)}
                  attributeValue={(user && user.companyName) || "-"}
                  testingContext="companyNameText"
                />
              </S.ContentOneLine>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
