import React from "react";
import { Box } from "@mui/material";

import { IAddress } from "src/types";

import * as S from "./styles";

export const Address = ({
  firstName,
  lastName,
  companyName,
  streetAddress1,
  streetAddress2,
  city,
  postalCode,
  countryArea,
  country,
  phone,
}: IAddress) => (
  <Box>
    <S.Name>{`${firstName} ${lastName}`}</S.Name>
    {companyName && (
      <>
        {companyName} <br />
      </>
    )}
    {streetAddress1}
    <br />
    {streetAddress2 && (
      <>
        {streetAddress2} <br />
      </>
    )}
    {postalCode && `${postalCode},`} {city}
    <br />
    {countryArea && <>{countryArea}, </>}
    {country!.country}
    <br />
    {phone && (
      <>
        Phone number: {phone} <br />
      </>
    )}
  </Box>
);
