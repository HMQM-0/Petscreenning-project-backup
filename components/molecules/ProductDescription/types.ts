export interface IProps {
  description?: string;
  descriptionJson?: string;
  features?: Array<{
      description?: string | null | undefined; name?: string | null | undefined;
    }>
    | null;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }>;
  }>;
  productId: string;
  ratingsAndReviewsSectionRef?: any;
}

export interface RatingsAndReviewProps {
  productId: string;
}
