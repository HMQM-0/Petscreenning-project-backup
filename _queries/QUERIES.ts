import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from "@apollo/client";

import { RequireOnlyOne } from "@utils/tsHelpers";
import {
  AttributesQuery,
  AttributesQueryVariables,
  CategoryDetailsQuery,
  CategoryDetailsQueryVariables,
  CollectionListQuery,
  CollectionListQueryVariables,
  GetLoyaltyAndReferralsInfoQuery,
  GetProductRatingsAndReviewsQuery,
  GetShopQuery,
  GetYotpoLoyaltyAndReferralsCustomerDetailsQuery,
  NauticalOrderByTokenQuery,
  NauticalOrderByTokenQueryVariables,
  NauticalOrdersByUserQuery,
  NauticalOrdersByUserQueryVariables,
  OrderByTokenQuery,
  OrderByTokenQueryVariables,
  OrdersByUserQuery,
  OrdersByUserQueryVariables,
  ProductDetailsQuery,
  ProductDetailsQueryVariables,
  ProductListQuery,
  ProductListQueryVariables,
  UserNauticalOrderByTokenQuery,
  UserNauticalOrderByTokenQueryVariables,
  UserOrderByTokenQuery,
  UserOrderByTokenQueryVariables,
  VariantsProductsQuery,
  VariantsProductsQueryVariables,
  WishlistQuery,
  WishlistQueryVariables,
} from "@generated";

import * as AttributesList from "./attributes";
import * as Category from "./category";
import * as Collections from "./collections";
import * as Orders from "./orders";
import * as Product from "./products";
import * as Shop from "./shop";
import * as Wishlist from "./wishlist";
import * as User from "./user";
import * as PluginInfo from "./pluginInfo";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

/**
 * @deprecated
 * TODO: This needs to go
 */
export const QUERIES = {
  Attributes: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<AttributesQueryVariables>
  ): ObservableQuery<AttributesQuery, any> =>
    client.watchQuery({
      query: AttributesList.attributes,
      ...options,
    }),
  CategoryDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CategoryDetailsQueryVariables>
  ): ObservableQuery<CategoryDetailsQuery, any> =>
    client.watchQuery({
      query: Category.categoryQuery,
      ...options,
    }),
  CollectionList: (
    client: ApolloClient<any>,
    options: QueryOptions<CollectionListQueryVariables>
  ): ObservableQuery<CollectionListQuery, any> =>
    client.watchQuery({
      query: Collections.collections,
      ...options,
    }),
  GetShopDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShopQuery, any> =>
    client.watchQuery({
      query: Shop.getShop,
      ...options,
    }),
  GetLoyaltyAndReferralsInfo: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetLoyaltyAndReferralsInfoQuery, any> =>
    client.watchQuery({
      query: PluginInfo.getLoyaltyAndReferralsInfo,
      ...options,
    }),
  NauticalOrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<NauticalOrderByTokenQueryVariables>
  ): ObservableQuery<NauticalOrderByTokenQuery, any> =>
    client.watchQuery({
      query: Orders.nauticalOrderDetailsByTokenQuery,
      ...options,
    }),
  NauticalOrderDetailsByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<UserNauticalOrderByTokenQueryVariables>
  ): ObservableQuery<UserNauticalOrderByTokenQuery, any> =>
    client.watchQuery({
      query: Orders.userNauticalOrderDetailsByTokenQuery,
      ...options,
    }),
  NauticalOrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<NauticalOrdersByUserQueryVariables>
  ): ObservableQuery<NauticalOrdersByUserQuery, any> =>
    client.watchQuery({
      query: Orders.nauticalOrdersByUser,
      ...options,
    }),
  OrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenQueryVariables>
  ): ObservableQuery<OrderByTokenQuery, any> =>
    client.watchQuery({
      query: Orders.orderDetailsByTokenQuery,
      ...options,
    }),
  OrderDetailsByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<UserOrderByTokenQueryVariables>
  ): ObservableQuery<UserOrderByTokenQuery, any> =>
    client.watchQuery({
      query: Orders.userOrderDetailsByTokenQuery,
      ...options,
    }),
  OrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserQueryVariables>
  ): ObservableQuery<OrdersByUserQuery, any> =>
    client.watchQuery({
      query: Orders.ordersByUser,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsQueryVariables>
  ): ObservableQuery<ProductDetailsQuery, any> =>
    client.watchQuery({
      query: Product.productDetails,
      ...options,
    }),
  ProductList: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductListQueryVariables>
  ): ObservableQuery<ProductListQuery, any> =>
    client.watchQuery({
      query: Product.productList,
      ...options,
    }),
  VariantsProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<VariantsProductsQueryVariables>
  ): ObservableQuery<VariantsProductsQuery, any> =>
    client.watchQuery({
      query: Product.variantsProducts,
      ...options,
    }),
  Wishlist: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<WishlistQueryVariables>
  ): ObservableQuery<WishlistQuery, any> =>
    client.watchQuery({
      query: Wishlist.userWishlist,
      ...options,
    }),
  GetProductRatingsAndReviews: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetProductRatingsAndReviewsQuery, any> =>
    client.watchQuery({
      query: Product.getProductRatingsAndReviews,
      ...options,
    }),
  GetYotpoLoyaltyAndReferralsCustomerDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<{ email: String }>
  ): ObservableQuery<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, any> =>
    client.watchQuery({
      query: User.getYotpoLoyaltyAndReferralsCustomerDetails,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
