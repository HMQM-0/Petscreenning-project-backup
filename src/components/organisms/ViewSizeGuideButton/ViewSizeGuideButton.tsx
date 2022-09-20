import React, { useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

import { Icon } from "src/components/atoms/Icon";
import { Modal } from "src/components/organisms/Modal";

import * as S from "./styles";
import { IProps } from "./types";

export const ViewSizeGuideButton = ({ sizeGuideUrl }: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <S.Wrapper onClick={() => setModalOpen(true)}>
      <Icon
        name="ruler"
        size={32}
      />
      <Box
        component="span"
        onClick={() => setModalOpen(true)}
        style={{ marginLeft: "0.8rem" }}
      >
        Size Guide
      </Box>
      <Modal
        submitButtonTestingContext="submitAddressFormModalButton"
        testingContext="submitAddressFormModal"
        title="Size Guide"
        hide={() => {
          setModalOpen(false);
        }}
        disabled={false}
        show={modalOpen}
        submitBtnText="Close"
        onSubmit={() => setModalOpen(false)}
      >
        <Image
          src={sizeGuideUrl}
          width="100%"
          alt="Size Guide"
        />
      </Modal>
    </S.Wrapper>
  );
};
