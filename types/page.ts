import { BrandingFragment } from "queries/branding.graphql.generated";

export type DocumentHead = {
  branding: BrandingFragment;
  description: string;
  title: string;
  schema: string;
  image?: string;
  url: string;
};
