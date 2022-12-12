import { media, styled } from "src/styles";

export const Wrapper = styled.div`
  display: grid;
  min-height: 140px;
  max-height: min-content;
  width: 100%;
  /*grid-template-areas: "photo description unitPrice quantity taxPrice totalPrice trash";
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 0.5fr;*/
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
    "photo description totalPrice"
    "photo description trash"
    "photo quantity trash"
    ". taxPrice unitPrice";
  align-items: center;
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
  padding: 2rem 0.5rem;
  &:last-child {
    border-bottom: none;
  }
  &[data-product-id="UHJvZHVjdDoxODk0"] [data-quantity-box],
  &[data-product-id="UHJvZHVjdDoxODk1"] [data-quantity-box] {
    display: none;
  }
  ${media.mediumScreen`
    grid-template-columns: 1fr 2fr 2fr;
    grid-row-gap: 15px;
    grid-column-gap: 20px;
    grid-template-areas: "photo description description"
    "trash description description"
    "trash unitPrice quantity"
    ". taxPrice totalPrice";
    padding: 1rem 0rem;
  `};
`;

export const QuantityButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  justify-content: space-between;
  padding: 0;
  width: auto;
  [data-test="subtractButton"] {
    position: absolute;
    left: 0;
    top: 2px;
  }
  [data-test="increaseButton"] {
    position: absolute;
    right: 0;
    top: 2px;
  }
  svg {
    width: 14px;
    path {
      fill: #828282;
    }
  }
`;

export const Photo = styled.div`
  grid-area: photo;
  display: flex;
  align-items: center;
  align-self: top;
  width: 100px;
  height: 100px;

  background-color: transparent;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Description = styled.div`
  grid-area: description;
  height: 100%;
  margin-top: 20px;
  margin-left: 20px;
  ${media.mediumScreen`
    margin-left: 0px;
  `}
`;

export const Sku = styled.p`
  margin: 6px 0;
  text-align: left;
  margin-bottom: 10px;
`;

export const Attributes = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(166px, 500px));
  margin-left: -15px;
  ${media.mediumScreen`
    flex-flow: column;
  `};
`;

export const SingleAttribute = styled.p`
  margin: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  background-color: white;
  padding: 0px 15px;
  color: #828282;
`;

export const Name = styled.p`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  font-size: calc(${(props) => props.theme.typography.h4FontSize} + 2px);
  text-align: left;
  text-transform: Capitalize;
  margin-bottom: 6px;
  color: #001a5d;
  letter-spacing: 0.03em;
`;

export const LightFont = styled.span`
  font-size: calc(${(props) => props.theme.typography.smallFontSize} + 2px);
  color: rgba(125, 125, 125, 0.6);
  text-transform: uppercase;
  color: #828282;
  letter-spacing: 0.08em;
`;

export const Price = styled.div`
  font-size: ${(props) => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: center;
  font-weight: bold;
  ${media.mediumScreen`
    font-weight: normal;
    flex-direction: column;
  `}

  p {
    margin: 0;
  }
`;

export const PriceLabel = styled.p`
  display: none;
  ${media.mediumScreen`
    display: block;
  `}
`;

export const TotalPrice = styled(Price)`
  grid-area: totalPrice;
  justify-content: flex-end;
  margin-top: 20px;
  ${media.mediumScreen`
    p {
      text-align: right;
    }
  `}
`;

export const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  grid-area: trash;
  color: #828282;
  font-weight: 500;
  svg {
    path {
      fill: #828282;
    }
  }
  ${media.mediumScreen`
    margin: 12px 0 0 0;
  `}
`;

export const UnitPrice = styled(Price)`
  grid-area: unitPrice;
  display: none;
`;

export const TaxPrice = styled(Price)`
  grid-area: taxPrice;
  display: none;
`;

export const Quantity = styled.div`
  grid-area: quantity;
  min-width: 120px;
  margin: 12px 15px 0;
  .MuiOutlinedInput-root {
    max-width: 120px;
    padding: 0 30px;
    border: 1px solid #cfcdcd;
    border-radius: 10px;
  }
  label {
    display: none;
  }
  fieldset {
    border: 0;
  }
  input {
    padding: 6px 14px;
    color: #828282;
    text-align: center;
  }
  ${media.mediumScreen`
    text-align: right;
    margin-right: 0;
  `}
`;
