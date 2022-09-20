import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePasswordChangeMutation } from "src/components/providers/Nautical/Auth/mutations.graphql.generated";
import { Tile } from "src/components/atoms/Tile";
import { IconButton } from "src/components/molecules/IconButton";
import { commonMessages } from "src/core/intl";

import { Attribute } from "./Attribute";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChangeMutation();
  const intl = useIntl();

  React.useEffect(() => {
    if (data && !error && !data.passwordChange?.errors.length) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="MY PASSWORD" />
            {!isEditing && (
              <IconButton
                testingContext="editPasswordButton"
                name="edit"
                size={22}
                onClick={() => setIsEditing((isEditing) => !isEditing)}
              />
            )}
          </S.Header>
          <S.Content>
            {isEditing ? (
              <S.ContentEdit>
                <PasswordChangeForm
                  handleSubmit={(data) => {
                    setPasswordChange({ variables: data });
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                  error={error?.extraInfo?.userInputErrors || data?.passwordChange?.errors || []}
                />
              </S.ContentEdit>
            ) : (
              <Attribute
                description={intl.formatMessage(commonMessages.password)}
                attributeValue="**************"
                testingContext="passwordText"
              />
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
