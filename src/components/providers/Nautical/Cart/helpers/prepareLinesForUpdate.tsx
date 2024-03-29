import { ICheckoutStateContext } from "../../Checkout/context";

const prepareLinesForUpdate = (variantId: string, lines: ICheckoutStateContext["lines"]) => {
  const linesDeepCopy = lines?.map((line) => ({ ...line })) ?? [];
  const variantToModify = linesDeepCopy.find((variant) => variant.variant.id === variantId);
  const linesWithoutVariant = linesDeepCopy.filter((variant) => variant.variant.id !== variantId);
  return { variantToModify, linesWithoutVariant };
};

export { prepareLinesForUpdate };
