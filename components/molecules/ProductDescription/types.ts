export interface IProps {
  description?: string;
  descriptionJson?: string;
  features?: Array<{
      description?: string | null | undefined; name?: string | null | undefined;
    }// TODO: A BE issue. null should not be here
      | null>
    | null;
  attributes?: Array<{
    // TODO: A BE issue? undefined/null should not be here probably
    attribute: { name?: string | undefined | null };

    values: Array<// TODO: A BE issue? undefined/null should not be here probably
      { name?: string | undefined | null }
      // TODO: A BE issue. null should not be here
      | null>;
  }>;
  productId: string;
  ratingsAndReviewsSectionRef?: any;
}

export interface RatingsAndReviewProps {
  productId: string;
}
