import { SxProps } from "@mui/material";

import { media, styled } from "src/styles";

export const mainWrapper = styled.div`
  background-color: #cfcdcd;
`;

export const Container = styled.div`
  width: ${(props) => `${props.theme.container.width}px`};
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.spacer};

  ${media.largeScreen`
    width: 100%;      
  `}
`;

export const Wrapper = styled.div`
  margin: 60px 0 100px 0;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2%;
`;

export const Left = styled.div`
  background: #fff;
  width: 60%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px;
  ${media.largeScreen`
    width: 100%;  
    margin-bottom:20px;    
  `}
`;

export const Right = styled.div`
  background: #fff;
  width: 38%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 25px;
  place-self: flex-start;
  ${media.largeScreen`
    width: 100%;      
  `}
`;

export const Title = styled.div`
  margin-top: 0;
  margin-bottom: 20px;
`;

export const CartHeader = styled.div`
  display: none;
`;

export const CartFooter = styled.div``;

export const Cart = styled.div`
  border-top: 1px solid rgba(50, 50, 50, 0.1);
`;

export const ProceedButton = styled.div`
  text-align: right;
  margin-top: 40px;
  button {
    width: 100%;
    margin-bottom: 12px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.03em;
    box-shadow: none;
    line-height: 1.5;
  }
  .MuiButton-containedPrimary:hover,
  .MuiButton-containedSecondary {
    background-color: #0e6eff;
    color: #fff;
    border: 1px solid #fff;
  }
  .MuiButton-containedSecondary:hover,
  .MuiButton-containedPrimary {
    color: #0e6eff;
    border: 1px solid #0e6eff;
    background-color: #fff;
  }
`;

export const HeaderWrapper = styled.div`
  display: grid;
  min-height: 60px;
  max-height: min-content;
  width: 100%;
  grid-template-areas: "products price quantity taxPrice totalPrice";
  grid-template-columns: 2.5fr 1.1fr 1.1fr 1.1fr 1.3fr;
  align-items: center;
  font-size: ${(props) => props.theme.typography.smallFontSize};
  color: rgba(40, 35, 74, 0.6);
`;

export const Column = styled.div`
  padding: 0.5rem;
`;

export const FooterWrapper = styled.div<{
  showShipping: boolean;
  showDiscount: boolean;
}>`
  display: grid;
  font-size: ${(props) => props.theme.typography.h4FontSize};
  grid-template-areas:
    "subtotalText subtotalPrice"
    ${(props) => props.showShipping && `"shippingText shippingPrice"`}
    ${(props) => props.showDiscount && `"discountText discountPrice"`}
    "taxText taxPrice"
    "totalText totalPrice";
  grid-template-rows: auto auto auto;
  grid-row-gap: 1rem;
  padding: 2rem 0 0 0;
  ${(props) => media.mediumScreen`
    grid-template-areas:
      "subtotalText subtotalPrice"
      ${props.showShipping && `"shippingText shippingPrice"`}
      ${props.showDiscount && `"discountText discountPrice"`}
      "taxText taxPrice"
      "totalText totalPrice";
    grid-template-rows: auto auto auto;
  `}
`;

export const SubtotalText = styled.div`
  grid-area: subtotalText;
  padding-right: 10px;
  color: #828282;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.3;
`;

export const SubtotalPrice = styled.div`
  grid-area: subtotalPrice;
  color: #828282;
  padding-left: 10px;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.3;
  text-align: right;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const ShippingText = styled.div`
  grid-area: shippingText;
  padding-right: 10px;
`;

export const ShippingPrice = styled.div`
  grid-area: shippingPrice;
  text-align: right;
  padding-left: 10px;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const DiscountText = styled.div`
  grid-area: discountText;
  padding-right: 10px;
`;

export const DiscountPrice = styled.div`
  grid-area: discountPrice;
  text-align: right;
  padding-left: 10px;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const TotalText = styled.div`
  grid-area: totalText;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  color: #001a5d;
  line-height: 1.3;
  padding: 30px 10px 0 0;
  border-top: 1px solid rgba(50, 50, 50, 0.1);
`;

export const TotalPrice = styled.div`
  grid-area: totalPrice;
  font-size: 20px;
  font-weight: 700;
  color: #001a5d;
  text-align: right;
  line-height: 1.3;
  border-top: 1px solid rgba(50, 50, 50, 0.1);
  padding: 30px 0 0 10px;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const TaxText = styled.div`
  grid-area: taxText;
  font-weight: bold;
  color: #828282;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.3;
  padding-right: 10px;
`;

export const TaxPrice = styled.div`
  grid-area: taxPrice;
  color: #828282;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.3;
  text-align: right;
  padding-left: 10px;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const EmptyWrapper = styled.div`
  margin: 100px 0 100px 0;

  ${media.mediumScreen`
    margin: 80px 0 80px 0;
  `}
`;

export const TitleFirstLine = styled.h1`
  font-size: ${(props) => props.theme.typography.h1FontSize};

  ${(props) => media.mediumScreen`
    font-size: ${props.theme.typography.h2FontSize};
  `}
`;

export const Breadcrumbs = styled.div``;

export const TitleSecondLine = styled.h1`
  font-size: ${(props) => props.theme.typography.h1FontSize};
  font-weight: bold;

  ${(props) => media.mediumScreen`
    font-size: ${props.theme.typography.h2FontSize};
  `}
`;

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.baseFontColorTransparent};
  margin: 40px 0;
  padding: 0;

  ${media.mediumScreen`
    margin: 30px 0;
  `}
`;

export const Subtitle = styled.p`
  margin: 40px 0;

  ${media.mediumScreen`
    margin: 30px 0;
  `}
`;

export const ContinueButton = styled.div``;

export const title: SxProps = {
  fontSize: "1.3rem",
  fontWeight: "700",
  color: "#001A5D",
};

export const ImageWithTextWrapper = styled.div`
  background-color: #fff;
  background-image: url("https://cdn.builder.io/api/v1/image/assets%2F77351f890251406eb2d564008d339e95%2F10ffae0af6434eefb21fbcf97b9bdea5");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  padding: 80px 0;
`;

export const ImageWithTextContainer = styled.div`
  display: flex;
  align-items: center;
  ${media.mediumScreen`
    flex-direction: column-reverse;
    gap: 20px;
  `}
`;

export const ImageText = styled.div`
  flex-basis: 50%;
  max-width: 50%;
  width: 100%;
  p {
    color: #000000;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
  }
  p:nth-child(2) {
    margin-bottom: 45px;
  }
  p:first-child,
  p:nth-child(2) {
    font-weight: 700;
    font-size: 30px;
    color: #001a5d;
    line-height: 1.33;
  }
  p.MuiTypography-body2 {
    margin-bottom: 60px;
  }
  button {
    height: 46px;
    padding: 12px 30px;
  }
  ${media.mediumScreen`
    flex-basis: 100%;
    max-width:100%;
  `}
`;

export const ImageBanner = styled.div`
  flex-basis: 50%;
  max-width: 50%;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
  ${media.mediumScreen`
    flex-basis: 100%;
    max-width: 100%;
  `}
`;
