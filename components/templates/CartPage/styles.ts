import { media, styled } from "@styles";

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
  margin: 30px 0 100px 0;
`;

export const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
`;

export const CartHeader = styled.div`
  ${media.mediumScreen`
    display: none;
  `};
`;

export const CartFooter = styled.div``;

export const Cart = styled.div`
  border-top: 1px solid rgba(50, 50, 50, 0.1);
`;

export const ProceedButton = styled.div`
  text-align: right;
  margin-top: 40px;
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
    ". subtotalText subtotalPrice ."
    ${(props) => props.showShipping && `". shippingText shippingPrice ."`}
    ${(props) => props.showDiscount && `". discountText discountPrice ."`}
    ". taxText taxPrice ."
    ". totalText totalPrice .";
  grid-template-columns: 4fr 1.1fr 0.9fr 0.5fr;
  grid-gap: 2rem;
  padding: 2rem 0;
  ${(props) => media.mediumScreen`
    grid-template-areas:
      ". subtotalText subtotalPrice"
      ${props.showShipping && `". shippingText shippingPrice"`}
      ${props.showDiscount && `". discountText discountPrice"`}
      ". taxText taxPrice"
      ". totalText totalPrice";
    grid-template-columns: 0.5fr 3.5fr 2fr;
  `}
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
`;

export const SubtotalText = styled.div`
  grid-area: subtotalText;
`;

export const SubtotalPrice = styled.div`
  grid-area: subtotalPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const ShippingText = styled.div`
  grid-area: shippingText;
`;

export const ShippingPrice = styled.div`
  grid-area: shippingPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const DiscountText = styled.div`
  grid-area: discountText;
`;

export const DiscountPrice = styled.div`
  grid-area: discountPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const TotalText = styled.div`
  grid-area: totalText;
  font-weight: bold;
`;

export const TotalPrice = styled.div`
  grid-area: totalPrice;
  font-weight: bold;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const TaxText = styled.div`
  grid-area: taxText;
  font-weight: bold;
`;

export const TaxPrice = styled.div`
  grid-area: taxPrice;
  font-weight: bold;
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
