export interface IProps {
  description?: string;
  descriptionJson?: string;
  features?: Array<{
      description?: string | null | undefined; name?: string | null | undefined;
    }// TODO: A BE issue. null should not be here
      | null>
    | null;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }
      // TODO: A BE issue. null should not be here
      | null>;
  }>;
  productId: string;
  ratingsAndReviewsSectionRef?: any;
}

export interface RatingsAndReviewProps {
  productId: string;
}
