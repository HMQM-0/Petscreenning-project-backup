import { WishlistItemFragment } from "components/providers/Wishlist/fragments.graphql.generated";

export interface IProps {
  wishlist: WishlistItemFragment[] | null;
}
