import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BarcodeObjectField: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Custom Decimal implementation.
   *
   * Returns Decimal as a float in the API,
   * parses float to the Decimal on the way back.
   */
  Decimal: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  GoogleAnalyticsObjectField: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  NauticalObjectField: any;
  NauticalUUID: any;
  /**
   * Positive Decimal scalar implementation.
   *
   * Should be used in places where value must be positive.
   */
  PositiveDecimal: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
  Upload: any;
  WeightScalar: any;
  /** Anything */
  _Any: any;
};

export type AbstractOrderSellerReportType = {
  __typename?: 'AbstractOrderSellerReportType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type AbstractPaymentsType = {
  __typename?: 'AbstractPaymentsType';
  average?: Maybe<Scalars['Float']>;
  captured?: Maybe<Scalars['Float']>;
  payments?: Maybe<Scalars['Int']>;
  totalAuthorized?: Maybe<Scalars['Float']>;
};

export type AbstractPercentReportType = {
  __typename?: 'AbstractPercentReportType';
  average?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Float']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type AbstractProductVariantType = {
  __typename?: 'AbstractProductVariantType';
  avgPrice?: Maybe<Scalars['Float']>;
  avgPriceGrossAmount?: Maybe<Scalars['Float']>;
  grossRevenue?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  maxPriceGrossAmount?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  minPriceGrossAmount?: Maybe<Scalars['Float']>;
  quantityOrdered?: Maybe<Scalars['Int']>;
  revenue?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
};

/** Create a new address for the customer. */
export type AccountAddressCreate = {
  __typename?: 'AccountAddressCreate';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
};

/** Delete an address of the logged-in user. */
export type AccountAddressDelete = {
  __typename?: 'AccountAddressDelete';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
};

/** Updates an address of the logged-in user. */
export type AccountAddressUpdate = {
  __typename?: 'AccountAddressUpdate';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
};

/** Remove user account. */
export type AccountDelete = {
  __typename?: 'AccountDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type AccountError = {
  __typename?: 'AccountError';
  /** The error code. */
  code: AccountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AccountErrorCode {
  ActivateOwnAccount = 'ACTIVATE_OWN_ACCOUNT',
  ActivateSuperuserAccount = 'ACTIVATE_SUPERUSER_ACCOUNT',
  DeactivateOwnAccount = 'DEACTIVATE_OWN_ACCOUNT',
  DeactivateSuperuserAccount = 'DEACTIVATE_SUPERUSER_ACCOUNT',
  DeleteNonStaffUser = 'DELETE_NON_STAFF_USER',
  DeleteOwnAccount = 'DELETE_OWN_ACCOUNT',
  DeleteStaffAccount = 'DELETE_STAFF_ACCOUNT',
  DeleteSuperuserAccount = 'DELETE_SUPERUSER_ACCOUNT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidPhone = 'INVALID_PHONE',
  JwtDecodeError = 'JWT_DECODE_ERROR',
  JwtInvalidCsrfToken = 'JWT_INVALID_CSRF_TOKEN',
  JwtInvalidToken = 'JWT_INVALID_TOKEN',
  JwtMissingToken = 'JWT_MISSING_TOKEN',
  JwtSignatureExpired = 'JWT_SIGNATURE_EXPIRED',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  MustChoosePermissionGroup = 'MUST_CHOOSE_PERMISSION_GROUP',
  NotFound = 'NOT_FOUND',
  NoSeller = 'NO_SELLER',
  OutOfScopeGroup = 'OUT_OF_SCOPE_GROUP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeServiceAccount = 'OUT_OF_SCOPE_SERVICE_ACCOUNT',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  PasswordEntirelyNumeric = 'PASSWORD_ENTIRELY_NUMERIC',
  PasswordIdentical = 'PASSWORD_IDENTICAL',
  PasswordTooCommon = 'PASSWORD_TOO_COMMON',
  PasswordTooShort = 'PASSWORD_TOO_SHORT',
  PasswordTooSimilar = 'PASSWORD_TOO_SIMILAR',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type AccountInput = {
  /** Company name. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
};

/** Register a new user. */
export type AccountRegister = {
  __typename?: 'AccountRegister';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Informs whether users need to confirm their email address. */
  requiresConfirmation?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type AccountRegisterInput = {
  /** Optional name of the company that a user is associated with. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The email address of the user. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Base of frontend URL that will be needed to create confirmation URL. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/** Sends an email with the account removal link for the logged-in user. */
export type AccountRequestDeletion = {
  __typename?: 'AccountRequestDeletion';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Sets a default address for the authenticated user. */
export type AccountSetDefaultAddress = {
  __typename?: 'AccountSetDefaultAddress';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/** Updates the account of the logged-in user. */
export type AccountUpdate = {
  __typename?: 'AccountUpdate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Updates metadata of the logged-in user. */
export type AccountUpdateMeta = {
  __typename?: 'AccountUpdateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type AddProductReviewComment = {
  __typename?: 'AddProductReviewComment';
  ok?: Maybe<Scalars['Boolean']>;
  productReview?: Maybe<ProductReviewType>;
};

/** Add user document. */
export type AddUserDocument = {
  __typename?: 'AddUserDocument';
  accountErrors: Array<AccountError>;
  /** The newly created user document. */
  document?: Maybe<UserDocument>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Represents user address data. */
export type Address = Node & {
  __typename?: 'Address';
  city: Scalars['String'];
  cityArea: Scalars['String'];
  companyName: Scalars['String'];
  /** Shop's default country. */
  country: CountryDisplay;
  countryArea: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Address is user's default billing address. */
  isDefaultBillingAddress?: Maybe<Scalars['Boolean']>;
  /** Address is user's default shipping address. */
  isDefaultShippingAddress?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  streetAddress1: Scalars['String'];
  streetAddress2: Scalars['String'];
};

/** Creates user address. */
export type AddressCreate = {
  __typename?: 'AddressCreate';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
};

/** Deletes an address. */
export type AddressDelete = {
  __typename?: 'AddressDelete';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
};

export type AddressInput = {
  /** City. */
  city?: InputMaybe<Scalars['String']>;
  /** District. */
  cityArea?: InputMaybe<Scalars['String']>;
  /** Company or organization. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Country. */
  country?: InputMaybe<CountryCode>;
  /** State or province. */
  countryArea?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress1?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress2?: InputMaybe<Scalars['String']>;
};

/** Sets a default address for the given user. */
export type AddressSetDefault = {
  __typename?: 'AddressSetDefault';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum AddressTypeEnum {
  Billing = 'BILLING',
  Shipping = 'SHIPPING'
}

/** Updates an address. */
export type AddressUpdate = {
  __typename?: 'AddressUpdate';
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
};

export type AddressValidationData = {
  __typename?: 'AddressValidationData';
  addressFormat?: Maybe<Scalars['String']>;
  addressLatinFormat?: Maybe<Scalars['String']>;
  allowedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  cityAreaChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  cityAreaType?: Maybe<Scalars['String']>;
  cityChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  cityType?: Maybe<Scalars['String']>;
  countryAreaChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  countryAreaType?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  postalCodeExamples?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCodeMatchers?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCodePrefix?: Maybe<Scalars['String']>;
  postalCodeType?: Maybe<Scalars['String']>;
  requiredFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  upperFields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Create an affiliate avatar. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type AffiliateAvatarUpdate = {
  __typename?: 'AffiliateAvatarUpdate';
  accountErrors: Array<AccountError>;
  /** An updated affiliate instance. */
  affiliate?: Maybe<User>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deletes affiliates. */
export type AffiliateBulkDelete = {
  __typename?: 'AffiliateBulkDelete';
  affiliateErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Activate or deactivate affiliate codes. */
export type AffiliateCodeBulkSetActive = {
  __typename?: 'AffiliateCodeBulkSetActive';
  codeErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates an affiliate code channel */
export type AffiliateCodeChannelUpdate = {
  __typename?: 'AffiliateCodeChannelUpdate';
  /** Updated affiliate code instance */
  affiliateCode?: Maybe<AffiliateCodes>;
  channelErrors: Array<ChannelError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Creates a new affiliate code */
export type AffiliateCodeCreate = {
  __typename?: 'AffiliateCodeCreate';
  affiliateCodes?: Maybe<AffiliateCodes>;
  affiliateErrors: Array<AffiliateError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AffiliateCodeCreateInput = {
  /** The id of the affiliate that the code belongs to */
  affiliate: Scalars['ID'];
  /** ID of the channel code is used for */
  channel?: InputMaybe<Scalars['ID']>;
  /** The new affiliate code */
  code?: InputMaybe<Scalars['String']>;
};

export type AffiliateCodeFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

/** Sets whether code is active */
export type AffiliateCodeSetActive = {
  __typename?: 'AffiliateCodeSetActive';
  affiliateCodes?: Maybe<AffiliateCodes>;
  affiliateErrors: Array<AffiliateError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export enum AffiliateCodeSortField {
  /** Sort affiliate codes by code. */
  Code = 'CODE',
  /** Sort affiliate codes by referrals. */
  Referrals = 'REFERRALS',
  /** Sort affiliate codes by status. */
  Status = 'STATUS'
}

export type AffiliateCodeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort affiliate_codes by the selected field. */
  field: AffiliateCodeSortField;
};

/** Increments affiliate code uses */
export type AffiliateCodeUse = {
  __typename?: 'AffiliateCodeUse';
  affiliateCodes?: Maybe<AffiliateCodes>;
  affiliateErrors: Array<AffiliateError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Represents an affiliate code */
export type AffiliateCodes = Node & {
  __typename?: 'AffiliateCodes';
  /** The id of the affiliate that the code belongs to */
  affiliate?: Maybe<User>;
  affiliateNauticalOrders: NauticalOrderCountableConnection;
  affiliateOrders: OrderCountableConnection;
  /** Channel the code is associated with */
  channel?: Maybe<Channel>;
  /** The new affiliate code */
  code?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  earnings?: Maybe<Money>;
  externalId?: Maybe<Scalars['String']>;
  externalInventoryId?: Maybe<Scalars['String']>;
  externalSource?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Whether or not the code is active */
  isActive?: Maybe<Scalars['Boolean']>;
  orders?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  /** Number of times the code has been submitted (this includes when the customer did not complete an order) */
  uses?: Maybe<Scalars['Int']>;
};


/** Represents an affiliate code */
export type AffiliateCodesAffiliateNauticalOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents an affiliate code */
export type AffiliateCodesAffiliateOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AffiliateCodesCountableConnection = {
  __typename?: 'AffiliateCodesCountableConnection';
  edges: Array<AffiliateCodesCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AffiliateCodesCountableEdge = {
  __typename?: 'AffiliateCodesCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AffiliateCodes;
};

/** Creates a new affiliate. */
export type AffiliateCreate = {
  __typename?: 'AffiliateCreate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Deletes a affiliate. */
export type AffiliateDelete = {
  __typename?: 'AffiliateDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type AffiliateError = {
  __typename?: 'AffiliateError';
  /** The error code. */
  code: AffiliateErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AffiliateErrorCode {
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type AffiliateFilterInput = {
  dateJoined?: InputMaybe<DateRangeInput>;
  moneySpent?: InputMaybe<PriceRangeInput>;
  numberOfOrders?: InputMaybe<IntRangeInput>;
  placedOrders?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type AffiliateInput = {
  /** Only filled out if the account is a business account. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User account is affiliate. */
  isAffiliate?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** Password url */
  passwordUrl?: InputMaybe<Scalars['String']>;
  /** Personal phone number. */
  personalPhone?: InputMaybe<Scalars['String']>;
  /** ID of the plan to assign affiliate to. */
  plan?: InputMaybe<Scalars['ID']>;
};

/** Updates an existing affiliate. */
export type AffiliateUpdate = {
  __typename?: 'AffiliateUpdate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** A marketplace agreement created, edited and maintianed in the dashboard */
export type Agreement = Node & ObjectWithMetadata & {
  __typename?: 'Agreement';
  commissionUniform?: Maybe<Scalars['Boolean']>;
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  created?: Maybe<Scalars['DateTime']>;
  defaultCommission: Scalars['Float'];
  feeFormat?: Maybe<Scalars['String']>;
  fixedFee?: Maybe<Scalars['Float']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isPublished: Scalars['Boolean'];
  jurisdiction?: Maybe<Scalars['String']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  planDescription: Scalars['String'];
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  publicationDate?: Maybe<Scalars['Date']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Deletes agreements. */
export type AgreementBulkDelete = {
  __typename?: 'AgreementBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Publish agreements. */
export type AgreementBulkPublish = {
  __typename?: 'AgreementBulkPublish';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AgreementCountableConnection = {
  __typename?: 'AgreementCountableConnection';
  edges: Array<AgreementCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AgreementCountableEdge = {
  __typename?: 'AgreementCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Agreement;
};

/** Creates a new agreement. */
export type AgreementCreate = {
  __typename?: 'AgreementCreate';
  agreement?: Maybe<Agreement>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deletes a agreement. */
export type AgreementDelete = {
  __typename?: 'AgreementDelete';
  agreement?: Maybe<Agreement>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AgreementFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

export type AgreementInput = {
  /** Are commissions uniform across the marketplace? */
  commissionUniform?: InputMaybe<Scalars['Boolean']>;
  /** Agreement content. May consist of ordinary text, HTML and images. */
  content?: InputMaybe<Scalars['String']>;
  /** Agreement content in JSON format. */
  contentJson?: InputMaybe<Scalars['JSONString']>;
  /** Default commission for all orders */
  defaultCommission?: InputMaybe<Scalars['Decimal']>;
  /** Fee format: per sale or month */
  feeFormat?: InputMaybe<Scalars['String']>;
  /** Default fees per sale or month */
  fixedFee?: InputMaybe<Scalars['Decimal']>;
  /** Is this agreement active? */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Determines if agreement is visible in the storefront. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Agreement legal jurisdiction. */
  jurisdiction?: InputMaybe<Scalars['String']>;
  /** Number of products allowed on the agreement */
  products?: InputMaybe<Scalars['String']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Agreement internal name. */
  slug?: InputMaybe<Scalars['String']>;
  /** Number of staff members allowed on the agreement */
  staff?: InputMaybe<Scalars['String']>;
  /** Agreement title. */
  title?: InputMaybe<Scalars['String']>;
  /** Last update date. ISO 8601 standard. */
  updatedAt?: InputMaybe<Scalars['String']>;
};

export type AgreementOrder = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort marketplace agreements by the selected field. */
  field?: InputMaybe<AgreementSortField>;
};

/** A seller agreement mapping */
export type AgreementSellers = Node & ObjectWithMetadata & {
  __typename?: 'AgreementSellers';
  acknowledgedOn?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  plan?: Maybe<Agreement>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  seller: Seller;
};

export type AgreementSellersCountableConnection = {
  __typename?: 'AgreementSellersCountableConnection';
  edges: Array<AgreementSellersCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AgreementSellersCountableEdge = {
  __typename?: 'AgreementSellersCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AgreementSellers;
};

export enum AgreementSortField {
  /** Sort agreements by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort agreements by publication date. */
  PublicationDate = 'PUBLICATION_DATE',
  /** Sort agreements by slug. */
  Slug = 'SLUG',
  /** Sort agreements by title. */
  Title = 'TITLE',
  /** Sort agreements by visibility. */
  Visibility = 'VISIBILITY'
}

export type AgreementTranslatableContent = Node & {
  __typename?: 'AgreementTranslatableContent';
  /** ('A static agreement that can be manually added by a shop operator ', 'through the dashboard.') */
  agreement?: Maybe<Agreement>;
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  products: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  staff: Scalars['String'];
  title: Scalars['String'];
  /** Returns translated agreement fields for the given language code. */
  translation?: Maybe<AgreementTranslation>;
};


export type AgreementTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Agreement. */
export type AgreementTranslate = {
  __typename?: 'AgreementTranslate';
  agreement?: Maybe<Agreement>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AgreementTranslation = Node & {
  __typename?: 'AgreementTranslation';
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type AgreementTranslationInput = {
  content?: InputMaybe<Scalars['String']>;
  contentJson?: InputMaybe<Scalars['JSONString']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Updates an existing agreement. */
export type AgreementUpdate = {
  __typename?: 'AgreementUpdate';
  agreement?: Maybe<Agreement>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Represents allocation. */
export type Allocation = Node & {
  __typename?: 'Allocation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Quantity allocated for orders. */
  quantity: Scalars['Int'];
  /** The warehouse were items were allocated. */
  warehouse: Warehouse;
};

/** Represents app data. */
export type App = Node & ObjectWithMetadata & {
  __typename?: 'App';
  /** Description of this app. */
  aboutApp?: Maybe<Scalars['String']>;
  /** JWT token used to authenticate by thridparty app. */
  accessToken?: Maybe<Scalars['String']>;
  /** Url to iframe with the app. */
  appUrl?: Maybe<Scalars['String']>;
  /** Url to iframe with the configuration for the app. */
  configurationUrl?: Maybe<Scalars['String']>;
  /** The date and time when the app was created. */
  created?: Maybe<Scalars['DateTime']>;
  /** Description of the data privacy defined for this app. */
  dataPrivacy?: Maybe<Scalars['String']>;
  /** Url to details about the privacy policy on the app owner page. */
  dataPrivacyUrl?: Maybe<Scalars['String']>;
  /** Homepage of the app. */
  homepageUrl?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Determine if app will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Name of the app. */
  name?: Maybe<Scalars['String']>;
  /** List of the app's permissions. */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Support page for the app. */
  supportUrl?: Maybe<Scalars['String']>;
  /** Last 4 characters of the tokens. */
  tokens?: Maybe<Array<Maybe<AppToken>>>;
  /** Type of the app. */
  type?: Maybe<AppTypeEnum>;
  /** Version number of the app. */
  version?: Maybe<Scalars['String']>;
  /** List of webhooks assigned to this app. */
  webhooks?: Maybe<Array<Maybe<Webhook>>>;
};

/** Activate the app. */
export type AppActivate = {
  __typename?: 'AppActivate';
  app?: Maybe<App>;
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AppCountableConnection = {
  __typename?: 'AppCountableConnection';
  edges: Array<AppCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AppCountableEdge = {
  __typename?: 'AppCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: App;
};

/** Creates a new app. */
export type AppCreate = {
  __typename?: 'AppCreate';
  app?: Maybe<App>;
  appErrors: Array<AppError>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deactivate the app. */
export type AppDeactivate = {
  __typename?: 'AppDeactivate';
  app?: Maybe<App>;
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deletes an app. */
export type AppDelete = {
  __typename?: 'AppDelete';
  app?: Maybe<App>;
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Delete failed installation. */
export type AppDeleteFailedInstallation = {
  __typename?: 'AppDeleteFailedInstallation';
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AppError = {
  __typename?: 'AppError';
  /** The error code. */
  code: AppErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
};

/** An enumeration. */
export enum AppErrorCode {
  Forbidden = 'FORBIDDEN',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidManifestFormat = 'INVALID_MANIFEST_FORMAT',
  InvalidPermission = 'INVALID_PERMISSION',
  InvalidStatus = 'INVALID_STATUS',
  InvalidUrlFormat = 'INVALID_URL_FORMAT',
  ManifestUrlCantConnect = 'MANIFEST_URL_CANT_CONNECT',
  NotFound = 'NOT_FOUND',
  OutOfScopeApp = 'OUT_OF_SCOPE_APP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Fetch and validate manifest. */
export type AppFetchManifest = {
  __typename?: 'AppFetchManifest';
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  manifest?: Maybe<Manifest>;
};

export type AppFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AppTypeEnum>;
};

export type AppInput = {
  /** DEPRECATED: Use the `appActivate` and `appDeactivate` mutations instead. This field will be removed after 2020-07-31. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Name of the app. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<InputMaybe<PermissionEnum>>>;
};

/** Install new app by using app manifest. */
export type AppInstall = {
  __typename?: 'AppInstall';
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AppInstallInput = {
  /** Determine if app will be set active or not. */
  activateAfterInstallation?: InputMaybe<Scalars['Boolean']>;
  /** Name of the app to install. */
  appName?: InputMaybe<Scalars['String']>;
  /** Url to app's manifest in JSON format. */
  manifestUrl?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<InputMaybe<PermissionEnum>>>;
};

/** Represents ongoing installation of app. */
export type AppInstallation = Job & Node & {
  __typename?: 'AppInstallation';
  appName: Scalars['String'];
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  manifestUrl: Scalars['String'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
};

/** Retry failed installation of new app. */
export type AppRetryInstall = {
  __typename?: 'AppRetryInstall';
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export enum AppSortField {
  /** Sort apps by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort apps by name. */
  Name = 'NAME'
}

export type AppSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort apps by the selected field. */
  field: AppSortField;
};

/** Represents token data. */
export type AppToken = Node & {
  __typename?: 'AppToken';
  /** Last 4 characters of the token. */
  authToken?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of the authenticated token. */
  name?: Maybe<Scalars['String']>;
};

/** Creates a new token. */
export type AppTokenCreate = {
  __typename?: 'AppTokenCreate';
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deletes an authentication token assigned to app. */
export type AppTokenDelete = {
  __typename?: 'AppTokenDelete';
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type AppTokenInput = {
  /** ID of app. */
  app: Scalars['ID'];
  /** Name of the token. */
  name?: InputMaybe<Scalars['String']>;
};

/** Verify provided app token. */
export type AppTokenVerify = {
  __typename?: 'AppTokenVerify';
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Determine if token is valid or not. */
  valid: Scalars['Boolean'];
};

/** An enumeration. */
export enum AppTypeEnum {
  Local = 'LOCAL',
  Thirdparty = 'THIRDPARTY'
}

/** Updates an existing app. */
export type AppUpdate = {
  __typename?: 'AppUpdate';
  app?: Maybe<App>;
  appErrors: Array<AppError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Assigns storefront's navigation menus. */
export type AssignNavigation = {
  __typename?: 'AssignNavigation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Assigned navigation menu. */
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type Attribute = Node & ObjectWithMetadata & {
  __typename?: 'Attribute';
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid: Scalars['Boolean'];
  /** ID of the Seller that created the Product Type, or null if Marketplace Operator */
  createdBy?: Maybe<Seller>;
  /** External source from which the attribute is imported. */
  externalSource?: Maybe<Scalars['String']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard: Scalars['Boolean'];
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront: Scalars['Boolean'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Name of an attribute displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  productTypes: ProductTypeCountableConnection;
  productVariantTypes: ProductTypeCountableConnection;
  /** Internal representation of an attribute name. */
  slug?: Maybe<Scalars['String']>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition: Scalars['Int'];
  /** Returns translated attribute fields for the given language code. */
  translation?: Maybe<AttributeTranslation>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired: Scalars['Boolean'];
  /** List of attribute's values. */
  values?: Maybe<Array<Maybe<AttributeValue>>>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront: Scalars['Boolean'];
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductVariantTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Assign attributes to a given product type. */
export type AttributeAssign = {
  __typename?: 'AttributeAssign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
};

export type AttributeAssignInput = {
  /** The ID of the attribute to assign. */
  id: Scalars['ID'];
  /** The attribute type to be assigned as. */
  type: AttributeTypeEnum;
};

/** Deletes attributes. */
export type AttributeBulkDelete = {
  __typename?: 'AttributeBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata item for attribute. */
export type AttributeClearMeta = {
  __typename?: 'AttributeClearMeta';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata item for attribute. */
export type AttributeClearPrivateMeta = {
  __typename?: 'AttributeClearPrivateMeta';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeCountableConnection = {
  __typename?: 'AttributeCountableConnection';
  edges: Array<AttributeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeCountableEdge = {
  __typename?: 'AttributeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Attribute;
};

/** Creates an attribute. */
export type AttributeCreate = {
  __typename?: 'AttributeCreate';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeCreateInput = {
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  /** ID of the Seller that created the Attribute, or null if Marketplace Operator */
  createdBy?: InputMaybe<Scalars['String']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: InputMaybe<AttributeInputTypeEnum>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  /** Name of an attribute displayed in the interface. */
  name: Scalars['String'];
  /** Internal representation of an attribute name. */
  slug?: InputMaybe<Scalars['String']>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition?: InputMaybe<Scalars['Int']>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  /** List of attribute's values. */
  values?: InputMaybe<Array<InputMaybe<AttributeValueCreateInput>>>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

/** Deletes an attribute. */
export type AttributeDelete = {
  __typename?: 'AttributeDelete';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeError = {
  __typename?: 'AttributeError';
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of values which caused the error. */
  values?: Maybe<Array<Scalars['String']>>;
};

export type AttributeFilterInput = {
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  inCategory?: InputMaybe<Scalars['ID']>;
  inCollection?: InputMaybe<Scalars['ID']>;
  inMicrosite?: InputMaybe<Scalars['ID']>;
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  showExternal?: InputMaybe<Scalars['Boolean']>;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

export type AttributeInput = {
  /** Internal representation of an attribute name. */
  slug: Scalars['String'];
  /** [Deprecated] Internal representation of a value (unique per attribute). This field will be removed after 2020-07-31. */
  value?: InputMaybe<Scalars['String']>;
  /** Internal representation of a value (unique per attribute). */
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** An enumeration. */
export enum AttributeInputTypeEnum {
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Dropdown = 'DROPDOWN',
  Multiselect = 'MULTISELECT'
}

/** Reorder the values of an attribute. */
export type AttributeReorderValues = {
  __typename?: 'AttributeReorderValues';
  /** Attribute from which values are reordered. */
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export enum AttributeSortField {
  /** Sort attributes based on whether they can be displayed or not in a product grid. */
  AvailableInGrid = 'AVAILABLE_IN_GRID',
  /** Sort attributes by external source */
  ExternalSource = 'EXTERNAL_SOURCE',
  /** Sort attributes by the filterable in dashboard flag */
  FilterableInDashboard = 'FILTERABLE_IN_DASHBOARD',
  /** Sort attributes by the filterable in storefront flag */
  FilterableInStorefront = 'FILTERABLE_IN_STOREFRONT',
  /** Sort attributes by the variant only flag */
  IsVariantOnly = 'IS_VARIANT_ONLY',
  /** Sort attributes by name */
  Name = 'NAME',
  /** Sort attributes by slug */
  Slug = 'SLUG',
  /** Sort attributes by their position in storefront */
  StorefrontSearchPosition = 'STOREFRONT_SEARCH_POSITION',
  /** Sort attributes by the value required flag */
  ValueRequired = 'VALUE_REQUIRED',
  /** Sort attributes by visibility in the storefront */
  VisibleInStorefront = 'VISIBLE_IN_STOREFRONT'
}

export type AttributeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attributes by the selected field. */
  field: AttributeSortField;
};

export type AttributeTranslatableContent = Node & {
  __typename?: 'AttributeTranslatableContent';
  /** Custom attribute of a product. */
  attribute?: Maybe<Attribute>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated attribute fields for the given language code. */
  translation?: Maybe<AttributeTranslation>;
};


export type AttributeTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for attribute. */
export type AttributeTranslate = {
  __typename?: 'AttributeTranslate';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
};

export type AttributeTranslation = Node & {
  __typename?: 'AttributeTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

export enum AttributeTypeEnum {
  Product = 'PRODUCT',
  Variant = 'VARIANT'
}

/** Un-assign attributes from a given product type. */
export type AttributeUnassign = {
  __typename?: 'AttributeUnassign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
};

/** Updates attribute. */
export type AttributeUpdate = {
  __typename?: 'AttributeUpdate';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeUpdateInput = {
  /** New values to be created for this attribute. */
  addValues?: InputMaybe<Array<InputMaybe<AttributeValueCreateInput>>>;
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  /** ID of the Seller that created the Attribute, or null if Marketplace Operator */
  createdBy?: InputMaybe<Scalars['String']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  /** Name of an attribute displayed in the interface. */
  name?: InputMaybe<Scalars['String']>;
  /** IDs of values to be removed from this attribute. */
  removeValues?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Internal representation of an attribute name. */
  slug?: InputMaybe<Scalars['String']>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition?: InputMaybe<Scalars['Int']>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

/** Update public metadata for attribute. */
export type AttributeUpdateMeta = {
  __typename?: 'AttributeUpdateMeta';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Update public metadata for attribute. */
export type AttributeUpdatePrivateMeta = {
  __typename?: 'AttributeUpdatePrivateMeta';
  attribute?: Maybe<Attribute>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Represents a value of an attribute. */
export type AttributeValue = Node & {
  __typename?: 'AttributeValue';
  attribute: Attribute;
  /** Populated if the attribute has date input_type, represent actual datetime for filtering */
  date?: Maybe<Scalars['Date']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
  /** Name of a value displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /** Internal representation of a value (unique per attribute). */
  slug?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
  translations: AttributeValueTranslationCountableConnection;
  /** Type of value (used only when `value` field is set). */
  type?: Maybe<AttributeValueType>;
  /** Supporting information like color, links, etc. */
  value?: Maybe<Scalars['String']>;
};


/** Represents a value of an attribute. */
export type AttributeValueTranslationArgs = {
  languageCode: LanguageCodeEnum;
};


/** Represents a value of an attribute. */
export type AttributeValueTranslationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Creates attribute values for a given attribute. */
export type AttributeValueBulkCreate = {
  __typename?: 'AttributeValueBulkCreate';
  attributeErrors: Array<AttributeError>;
  /** List of the created attribute values. */
  attributeValues: Array<AttributeValue>;
  /** Returns how many objects were created. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Deletes values of attributes. */
export type AttributeValueBulkDelete = {
  __typename?: 'AttributeValueBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Creates a value for an attribute. */
export type AttributeValueCreate = {
  __typename?: 'AttributeValueCreate';
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  attributeValue?: Maybe<AttributeValue>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeValueCreateInput = {
  /** Date representation of attribute value */
  date?: InputMaybe<Scalars['Date']>;
  /** Name of a value displayed in the interface. */
  name: Scalars['String'];
  /** Supporting information like color, links, etc. */
  value?: InputMaybe<Scalars['String']>;
};

/** Deletes a value of an attribute. */
export type AttributeValueDelete = {
  __typename?: 'AttributeValueDelete';
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  attributeValue?: Maybe<AttributeValue>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AttributeValueInput = {
  /** ID of the selected attribute. */
  id?: InputMaybe<Scalars['ID']>;
  /** The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created. */
  values: Array<InputMaybe<Scalars['String']>>;
};

export type AttributeValueTranslatableContent = Node & {
  __typename?: 'AttributeValueTranslatableContent';
  /** Represents a value of an attribute. */
  attributeValue?: Maybe<AttributeValue>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
};


export type AttributeValueTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for attribute value. */
export type AttributeValueTranslate = {
  __typename?: 'AttributeValueTranslate';
  attributeValue?: Maybe<AttributeValue>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
};

export type AttributeValueTranslation = Node & {
  __typename?: 'AttributeValueTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

export type AttributeValueTranslationCountableConnection = {
  __typename?: 'AttributeValueTranslationCountableConnection';
  edges: Array<AttributeValueTranslationCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeValueTranslationCountableEdge = {
  __typename?: 'AttributeValueTranslationCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AttributeValueTranslation;
};

export enum AttributeValueType {
  Color = 'COLOR',
  Gradient = 'GRADIENT',
  String = 'STRING',
  Url = 'URL'
}

/** Updates value of an attribute. */
export type AttributeValueUpdate = {
  __typename?: 'AttributeValueUpdate';
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  attributeValue?: Maybe<AttributeValue>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type AuthorizationKey = {
  __typename?: 'AuthorizationKey';
  /** Authorization key (client ID). */
  key: Scalars['String'];
  /** Name of the authorization backend. */
  name: AuthorizationKeyType;
};

/** Adds an authorization key. */
export type AuthorizationKeyAdd = {
  __typename?: 'AuthorizationKeyAdd';
  /** Newly added authorization key. */
  authorizationKey?: Maybe<AuthorizationKey>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Deletes an authorization key. */
export type AuthorizationKeyDelete = {
  __typename?: 'AuthorizationKeyDelete';
  /** Authorization key that was deleted. */
  authorizationKey?: Maybe<AuthorizationKey>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type AuthorizationKeyInput = {
  /** Client authorization key (client ID). */
  key: Scalars['String'];
  /** Client secret. */
  password: Scalars['String'];
};

/** An enumeration. */
export enum AuthorizationKeyType {
  Facebook = 'FACEBOOK',
  GoogleOauth2 = 'GOOGLE_OAUTH2'
}

export type BottomLine = {
  __typename?: 'BottomLine';
  /** Average star rating over all ratings. */
  averageScore?: Maybe<Scalars['Float']>;
  /** Total ratings/reviews. */
  totalReview?: Maybe<Scalars['Int']>;
};

export type BrandingInput = {
  /** Favicon file. */
  favicon?: InputMaybe<Scalars['Upload']>;
  footerText?: InputMaybe<Scalars['String']>;
  /** Icon file. */
  icon?: InputMaybe<Scalars['Upload']>;
  jsonContent?: InputMaybe<Scalars['JSONString']>;
  /** Logo file. */
  logo?: InputMaybe<Scalars['Upload']>;
  logoHeight?: InputMaybe<Scalars['Int']>;
  logoWidth?: InputMaybe<Scalars['Int']>;
};

export type BrandingType = {
  __typename?: 'BrandingType';
  favicon?: Maybe<Image>;
  footerText: Scalars['String'];
  icon?: Maybe<Image>;
  id: Scalars['ID'];
  jsonContent: Scalars['JSONString'];
  logo?: Maybe<Image>;
  logoHeight?: Maybe<Scalars['Int']>;
  logoWidth?: Maybe<Scalars['Int']>;
};


export type BrandingTypeFaviconArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


export type BrandingTypeIconArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


export type BrandingTypeLogoArgs = {
  size?: InputMaybe<Scalars['Int']>;
};

/** Processes return requests by grabbing the return status and creating resulting Fulfillment and FulfillmentLine instances. */
export type BulkFulfillmentReturn = {
  __typename?: 'BulkFulfillmentReturn';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** List of returned fulfillments. */
  fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
  orderErrors: Array<OrderError>;
};

export type BulkFulfillmentReturnInput = {
  /** Status of the return */
  decision?: InputMaybe<Scalars['String']>;
  /** ID of an fulfillment to return */
  fulfillmentId: Scalars['ID'];
  /** ID of the fulfillment line being returned */
  lineId: Scalars['ID'];
  /** ID of the order line that the fulfillment line is hooked in to */
  orderLineId?: InputMaybe<Scalars['ID']>;
  /** Total quantity of the fulfillment line */
  quantity: Scalars['Int'];
  /** Customer-stated reason for the return */
  returnReason?: InputMaybe<Scalars['String']>;
  /** Quantity being returned for given fulfillment line */
  returnRequestedQty: Scalars['Int'];
};

export type BulkProductError = {
  __typename?: 'BulkProductError';
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

export type BulkStockError = {
  __typename?: 'BulkStockError';
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

export type CatalogueInput = {
  /** Categories related to the discount. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Collections related to the discount. */
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Products related to the discount. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type Category = Node & ObjectWithMetadata & {
  __typename?: 'Category';
  /** List of ancestors of the category. */
  ancestors?: Maybe<CategoryCountableConnection>;
  backgroundImage?: Maybe<Image>;
  /** List of children of the category. */
  children?: Maybe<CategoryCountableConnection>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  level: Scalars['Int'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  name: Scalars['String'];
  parent?: Maybe<Category>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of products in the category. */
  products?: Maybe<ProductCountableConnection>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  /** List providing entire parent-to-child lineage of categories leading to current category */
  trailingBreadcrumbs?: Maybe<Array<Maybe<Category>>>;
  /** Returns translated category fields for the given language code. */
  translation?: Maybe<CategoryTranslation>;
  /**
   * The storefront's URL for the category.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url?: Maybe<Scalars['String']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryAncestorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryBackgroundImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Deletes categories. */
export type CategoryBulkDelete = {
  __typename?: 'CategoryBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata for category. */
export type CategoryClearMeta = {
  __typename?: 'CategoryClearMeta';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears private metadata for category. */
export type CategoryClearPrivateMeta = {
  __typename?: 'CategoryClearPrivateMeta';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type CategoryCountableConnection = {
  __typename?: 'CategoryCountableConnection';
  edges: Array<CategoryCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryCountableEdge = {
  __typename?: 'CategoryCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Category;
};

/** Creates a new category. */
export type CategoryCreate = {
  __typename?: 'CategoryCreate';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Deletes a category. */
export type CategoryDelete = {
  __typename?: 'CategoryDelete';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type CategoryFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  search?: InputMaybe<Scalars['String']>;
};

export type CategoryInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /** Category description (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Category description (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Category name. */
  name?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Category slug. */
  slug?: InputMaybe<Scalars['String']>;
};

export enum CategorySortField {
  /** Sort categories by name. */
  Name = 'NAME',
  /** Sort categories by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort categories by subcategory count. */
  SubcategoryCount = 'SUBCATEGORY_COUNT'
}

export type CategorySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export type CategoryTranslatableContent = Node & {
  __typename?: 'CategoryTranslatableContent';
  /** Represents a single category of products. */
  category?: Maybe<Category>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated category fields for the given language code. */
  translation?: Maybe<CategoryTranslation>;
};


export type CategoryTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Category. */
export type CategoryTranslate = {
  __typename?: 'CategoryTranslate';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
};

export type CategoryTranslation = Node & {
  __typename?: 'CategoryTranslation';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/** Updates a category. */
export type CategoryUpdate = {
  __typename?: 'CategoryUpdate';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Update public metadata for category. */
export type CategoryUpdateMeta = {
  __typename?: 'CategoryUpdateMeta';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Update private metadata for category. */
export type CategoryUpdatePrivateMeta = {
  __typename?: 'CategoryUpdatePrivateMeta';
  category?: Maybe<Category>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Represents unique channel in Nautical. */
export type Channel = Node & {
  __typename?: 'Channel';
  affiliateCodes: AffiliateCodesCountableConnection;
  channel: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  nauticalOrders: NauticalOrderCountableConnection;
  orders: OrderCountableConnection;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


/** Represents unique channel in Nautical. */
export type ChannelAffiliateCodesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents unique channel in Nautical. */
export type ChannelNauticalOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents unique channel in Nautical. */
export type ChannelOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ChannelCountableConnection = {
  __typename?: 'ChannelCountableConnection';
  edges: Array<ChannelCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ChannelCountableEdge = {
  __typename?: 'ChannelCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Channel;
};

/** Creates a new channel */
export type ChannelCreate = {
  __typename?: 'ChannelCreate';
  channel?: Maybe<Channel>;
  channelErrors: Array<ChannelError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type ChannelError = {
  __typename?: 'ChannelError';
  /** The error code. */
  code: ChannelErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ChannelErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  JwtDecodeError = 'JWT_DECODE_ERROR',
  JwtInvalidCsrfToken = 'JWT_INVALID_CSRF_TOKEN',
  JwtInvalidToken = 'JWT_INVALID_TOKEN',
  JwtMissingToken = 'JWT_MISSING_TOKEN',
  JwtSignatureExpired = 'JWT_SIGNATURE_EXPIRED',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type ChannelFilterInput = {
  created?: InputMaybe<DateRangeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ChannelInput = {
  /** Name of the channel. */
  channel?: InputMaybe<Scalars['String']>;
};

export enum ChannelSortField {
  Channel = 'CHANNEL',
  CreatedAt = 'CREATED_AT'
}

export type ChannelSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort channels by the selected field. */
  field: ChannelSortField;
};

/** Updates a channel. */
export type ChannelUpdate = {
  __typename?: 'ChannelUpdate';
  channel?: Maybe<Channel>;
  channelErrors: Array<ChannelError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Checkout object. */
export type Checkout = Node & ObjectWithMetadata & {
  __typename?: 'Checkout';
  /** Applicable volume discounts */
  applicableVolumeDiscounts?: Maybe<Money>;
  applicableVolumeDiscountsBySeller?: Maybe<Array<Maybe<SellerVolumeDiscount>>>;
  /** List of available payment gateways. */
  availablePaymentGateways: Array<PaymentGateway>;
  /** Shipping methods that can be used with this order. */
  availableShippingMethods: Array<Maybe<ShippingMethod>>;
  availableShippingMethodsBySeller?: Maybe<Array<Maybe<MultiSellerShippingMethod>>>;
  billingAddress?: Maybe<Address>;
  created: Scalars['DateTime'];
  discount?: Maybe<Money>;
  discountName?: Maybe<Scalars['String']>;
  /** The domain that the checkout came from. */
  domain?: Maybe<NauticalSite>;
  /** Email of a customer. */
  email: Scalars['String'];
  /** List of gift cards associated with this checkout. */
  giftCards?: Maybe<Array<Maybe<GiftCard>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Returns True, if checkout requires shipping. */
  isShippingRequired: Scalars['Boolean'];
  lastChange: Scalars['DateTime'];
  /** A list of checkout lines, each containing information about an item in the checkout. */
  lines?: Maybe<Array<Maybe<CheckoutLine>>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  note: Scalars['String'];
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  quantity: Scalars['Int'];
  sellerShippingMethods: Scalars['JSONString'];
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  /** The price of the shipping, with all the taxes included. */
  shippingPrice?: Maybe<TaxedMoney>;
  /** The price of the checkout before shipping, with taxes included. */
  subtotalPrice?: Maybe<TaxedMoney>;
  /** The checkout's token. */
  token: Scalars['NauticalUUID'];
  /** The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included. */
  totalPrice?: Maybe<TaxedMoney>;
  translatedDiscountName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  voucherCode?: Maybe<Scalars['String']>;
};

/** Adds a gift card or a voucher to a checkout. */
export type CheckoutAddPromoCode = {
  __typename?: 'CheckoutAddPromoCode';
  /** The checkout with the added gift card or voucher. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Update billing address in the existing checkout. */
export type CheckoutBillingAddressUpdate = {
  __typename?: 'CheckoutBillingAddressUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Clear metadata for checkout. */
export type CheckoutClearMeta = {
  __typename?: 'CheckoutClearMeta';
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Clear private metadata for checkout. */
export type CheckoutClearPrivateMeta = {
  __typename?: 'CheckoutClearPrivateMeta';
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
export type CheckoutComplete = {
  __typename?: 'CheckoutComplete';
  checkoutErrors: Array<CheckoutError>;
  /** Confirmation data used to process additional authorization steps. */
  confirmationData?: Maybe<Scalars['JSONString']>;
  /** Set to true if payment needs to be confirmed before checkout is complete. */
  confirmationNeeded: Scalars['Boolean'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Placed order. */
  order?: Maybe<NauticalOrder>;
};

export type CheckoutCountableConnection = {
  __typename?: 'CheckoutCountableConnection';
  edges: Array<CheckoutCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutCountableEdge = {
  __typename?: 'CheckoutCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Checkout;
};

/** Create a new checkout. */
export type CheckoutCreate = {
  __typename?: 'CheckoutCreate';
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /** Whether the checkout was created or the current active one was returned. Refer to checkoutLinesAdd and checkoutLinesUpdate to merge a cart with an active checkout. */
  created?: Maybe<Scalars['Boolean']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type CheckoutCreateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** The customer's email address. */
  email?: InputMaybe<Scalars['String']>;
  /** A list of checkout lines, each containing information about an item in the checkout. */
  lines: Array<InputMaybe<CheckoutLineInput>>;
  /** The mailing address to where the checkout will be shipped. Note: the address will be ignored if the checkout doesn't contain shippable items. */
  shippingAddress?: InputMaybe<AddressInput>;
};

/** Sets the customer as the owner of the checkout. */
export type CheckoutCustomerAttach = {
  __typename?: 'CheckoutCustomerAttach';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Removes the user assigned as the owner of the checkout. */
export type CheckoutCustomerDetach = {
  __typename?: 'CheckoutCustomerDetach';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates email address in the existing checkout object. */
export type CheckoutEmailUpdate = {
  __typename?: 'CheckoutEmailUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type CheckoutError = {
  __typename?: 'CheckoutError';
  /** The error code. */
  code: CheckoutErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of varint IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum CheckoutErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  CheckoutNotFullyPaid = 'CHECKOUT_NOT_FULLY_PAID',
  GraphqlError = 'GRAPHQL_ERROR',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Invalid = 'INVALID',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  NotFound = 'NOT_FOUND',
  PaymentError = 'PAYMENT_ERROR',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  QuantityGreaterThanLimit = 'QUANTITY_GREATER_THAN_LIMIT',
  Required = 'REQUIRED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  ShippingNotRequired = 'SHIPPING_NOT_REQUIRED',
  TaxError = 'TAX_ERROR',
  Unique = 'UNIQUE',
  VoucherNotApplicable = 'VOUCHER_NOT_APPLICABLE',
  ZeroQuantity = 'ZERO_QUANTITY'
}

/** Represents an item in the checkout. */
export type CheckoutLine = Node & {
  __typename?: 'CheckoutLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  /** Indicates whether the item need to be delivered. */
  requiresShipping?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Scalars['ID']>;
  /** The sum of the checkout line price, taxes and discounts. */
  totalPrice?: Maybe<TaxedMoney>;
  variant: ProductVariant;
};

export type CheckoutLineCountableConnection = {
  __typename?: 'CheckoutLineCountableConnection';
  edges: Array<CheckoutLineCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutLineCountableEdge = {
  __typename?: 'CheckoutLineCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CheckoutLine;
};

/** Deletes a CheckoutLine. */
export type CheckoutLineDelete = {
  __typename?: 'CheckoutLineDelete';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type CheckoutLineInput = {
  /** The number of items purchased. */
  quantity: Scalars['Int'];
  /** ID of the product variant. */
  variantId: Scalars['ID'];
};

/** Adds a checkout line to the existing checkout. */
export type CheckoutLinesAdd = {
  __typename?: 'CheckoutLinesAdd';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates checkout line in the existing checkout. */
export type CheckoutLinesUpdate = {
  __typename?: 'CheckoutLinesUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Create a new payment for given checkout. */
export type CheckoutPaymentCreate = {
  __typename?: 'CheckoutPaymentCreate';
  /** Related checkout object. */
  checkout?: Maybe<Checkout>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A newly created payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

/** Remove a gift card or a voucher from a checkout. */
export type CheckoutRemovePromoCode = {
  __typename?: 'CheckoutRemovePromoCode';
  /** The checkout with the removed gift card or voucher. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates the seller shipping methods of the checkout. */
export type CheckoutSellerShippingMethodsUpdate = {
  __typename?: 'CheckoutSellerShippingMethodsUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Update shipping address in the existing checkout. */
export type CheckoutShippingAddressUpdate = {
  __typename?: 'CheckoutShippingAddressUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates the shipping address of the checkout. */
export type CheckoutShippingMethodUpdate = {
  __typename?: 'CheckoutShippingMethodUpdate';
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates metadata for checkout. */
export type CheckoutUpdateMeta = {
  __typename?: 'CheckoutUpdateMeta';
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Updates private metadata for checkout. */
export type CheckoutUpdatePrivateMeta = {
  __typename?: 'CheckoutUpdatePrivateMeta';
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type ChoiceValue = {
  __typename?: 'ChoiceValue';
  raw?: Maybe<Scalars['String']>;
  verbose?: Maybe<Scalars['String']>;
};

/** Represents a collection of products. */
export type Collection = Node & ObjectWithMetadata & {
  __typename?: 'Collection';
  backgroundImage?: Maybe<Image>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Whether the collection is published. */
  isPublished: Scalars['Boolean'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  name: Scalars['String'];
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of products in this collection. */
  products?: Maybe<ProductCountableConnection>;
  publicationDate?: Maybe<Scalars['Date']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  /** Returns translated collection fields for the given language code. */
  translation?: Maybe<CollectionTranslation>;
};


/** Represents a collection of products. */
export type CollectionBackgroundImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents a collection of products. */
export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductOrder>;
};


/** Represents a collection of products. */
export type CollectionTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Adds products to a collection. */
export type CollectionAddProducts = {
  __typename?: 'CollectionAddProducts';
  /** Collection to which products will be added. */
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Deletes collections. */
export type CollectionBulkDelete = {
  __typename?: 'CollectionBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Publish collections. */
export type CollectionBulkPublish = {
  __typename?: 'CollectionBulkPublish';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata for collection. */
export type CollectionClearMeta = {
  __typename?: 'CollectionClearMeta';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears private metadata item for collection. */
export type CollectionClearPrivateMeta = {
  __typename?: 'CollectionClearPrivateMeta';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type CollectionCountableConnection = {
  __typename?: 'CollectionCountableConnection';
  edges: Array<CollectionCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionCountableEdge = {
  __typename?: 'CollectionCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Collection;
};

/** Creates a new collection. */
export type CollectionCreate = {
  __typename?: 'CollectionCreate';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type CollectionCreateInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /** Description of the collection (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Description of the collection (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Informs whether a collection is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Name of the collection. */
  name?: InputMaybe<Scalars['String']>;
  /** List of products to be added to the collection. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the collection. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Deletes a collection. */
export type CollectionDelete = {
  __typename?: 'CollectionDelete';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type CollectionFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published?: InputMaybe<CollectionPublished>;
  search?: InputMaybe<Scalars['String']>;
};

export type CollectionInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /** Description of the collection (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Description of the collection (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Informs whether a collection is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Name of the collection. */
  name?: InputMaybe<Scalars['String']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the collection. */
  slug?: InputMaybe<Scalars['String']>;
};

export enum CollectionPublished {
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

/** Remove products from a collection. */
export type CollectionRemoveProducts = {
  __typename?: 'CollectionRemoveProducts';
  /** Collection from which products will be removed. */
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Reorder the products of a collection. */
export type CollectionReorderProducts = {
  __typename?: 'CollectionReorderProducts';
  /** Collection from which products are reordered. */
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export enum CollectionSortField {
  /** Sort collections by availability. */
  Availability = 'AVAILABILITY',
  /** Sort collections by name. */
  Name = 'NAME',
  /** Sort collections by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort collections by publication date. */
  PublicationDate = 'PUBLICATION_DATE'
}

export type CollectionSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort collections by the selected field. */
  field: CollectionSortField;
};

export type CollectionTranslatableContent = Node & {
  __typename?: 'CollectionTranslatableContent';
  /** Represents a collection of products. */
  collection?: Maybe<Collection>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated collection fields for the given language code. */
  translation?: Maybe<CollectionTranslation>;
};


export type CollectionTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for collection. */
export type CollectionTranslate = {
  __typename?: 'CollectionTranslate';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
};

export type CollectionTranslation = Node & {
  __typename?: 'CollectionTranslation';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/** Updates a collection. */
export type CollectionUpdate = {
  __typename?: 'CollectionUpdate';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Update public metadata for collection. */
export type CollectionUpdateMeta = {
  __typename?: 'CollectionUpdateMeta';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Update private metadata for collection. */
export type CollectionUpdatePrivateMeta = {
  __typename?: 'CollectionUpdatePrivateMeta';
  collection?: Maybe<Collection>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type ColumnObjectType = {
  __typename?: 'ColumnObjectType';
  display?: Maybe<Scalars['String']>;
  fieldType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
};

export type CommentInput = {
  /** Customer comment on review */
  comment?: InputMaybe<Scalars['String']>;
  /** Customer providing the review */
  user?: InputMaybe<Scalars['ID']>;
};

/** Stores information about a single configuration field. */
export type ConfigurationItem = {
  __typename?: 'ConfigurationItem';
  /** Help text for the field. */
  helpText?: Maybe<Scalars['String']>;
  /** Label for the field. */
  label?: Maybe<Scalars['String']>;
  /** Name of the field. */
  name: Scalars['String'];
  /** Type of the field. */
  type?: Maybe<ConfigurationTypeFieldEnum>;
  /** Current value of the field. */
  value?: Maybe<Scalars['String']>;
};

export type ConfigurationItemInput = {
  /** Name of the field to update. */
  name: Scalars['String'];
  /** Value of the given field to update. */
  value?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum ConfigurationTypeFieldEnum {
  Boolean = 'BOOLEAN',
  Password = 'PASSWORD',
  Secret = 'SECRET',
  String = 'STRING'
}

/** Confirm user account with token sent by email during registration. */
export type ConfirmAccount = {
  __typename?: 'ConfirmAccount';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An activated user account. */
  user?: Maybe<User>;
};

/** Confirm the email change of the logged-in user. */
export type ConfirmEmailChange = {
  __typename?: 'ConfirmEmailChange';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance with a new email. */
  user?: Maybe<User>;
};

export type CoreDataInput = {
  jsonContent?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CoreDataType = {
  __typename?: 'CoreDataType';
  jsonContent: Scalars['JSONString'];
  name: Scalars['String'];
};

/** An enumeration. */
export enum CountryCode {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bl = 'BL',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Bq = 'BQ',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bv = 'BV',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cc = 'CC',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cu = 'CU',
  Cv = 'CV',
  Cw = 'CW',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Eu = 'EU',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  Im = 'IM',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mf = 'MF',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pf = 'PF',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pr = 'PR',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Sv = 'SV',
  Sx = 'SX',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vg = 'VG',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type CountryDisplay = {
  __typename?: 'CountryDisplay';
  /** Country code. */
  code: Scalars['String'];
  /** Country name. */
  country: Scalars['String'];
  /** Country tax. */
  vat?: Maybe<Vat>;
};

export type CountryState = {
  __typename?: 'CountryState';
  area?: Maybe<Scalars['String']>;
  areaName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
};

export type CreateCoreData = {
  __typename?: 'CreateCoreData';
  coredata?: Maybe<CoreDataType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateDesignerData = {
  __typename?: 'CreateDesignerData';
  designerdata?: Maybe<DesignerDataType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateHashtag = {
  __typename?: 'CreateHashtag';
  hashtag?: Maybe<HashtagType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateMention = {
  __typename?: 'CreateMention';
  mention?: Maybe<MentionNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateProductReview = {
  __typename?: 'CreateProductReview';
  ok?: Maybe<Scalars['Boolean']>;
  productReview?: Maybe<ProductReviewType>;
};

export type CreateSellerData = {
  __typename?: 'CreateSellerData';
  ok?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Seller>;
};

export type CreateSellerNote = {
  __typename?: 'CreateSellerNote';
  note?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateSellerShell = {
  __typename?: 'CreateSellerShell';
  ok?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Seller>;
};

export type CreateSellerUserMapping = {
  __typename?: 'CreateSellerUserMapping';
  ok?: Maybe<Scalars['Boolean']>;
  sellerUser?: Maybe<SellerUserType>;
};

/** Create JWT token. */
export type CreateToken = {
  __typename?: 'CreateToken';
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type CreateVaultData = {
  __typename?: 'CreateVaultData';
  ok?: Maybe<Scalars['Boolean']>;
  vault?: Maybe<VaultType>;
};

export type CreditCard = {
  __typename?: 'CreditCard';
  /** Card brand. */
  brand: Scalars['String'];
  /** Two-digit number representing the card’s expiration month. */
  expMonth?: Maybe<Scalars['Int']>;
  /** Four-digit number representing the card’s expiration year. */
  expYear?: Maybe<Scalars['Int']>;
  /** First 4 digits of the card number. */
  firstDigits?: Maybe<Scalars['String']>;
  /** Last 4 digits of the card number. */
  lastDigits: Scalars['String'];
};

export type CustomDateRangeInput = {
  Dropoff?: InputMaybe<DateRangeInput>;
  Pickup?: InputMaybe<DateRangeInput>;
};

/** Deletes customers. */
export type CustomerBulkDelete = {
  __typename?: 'CustomerBulkDelete';
  accountErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Creates a new customer. */
export type CustomerCreate = {
  __typename?: 'CustomerCreate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Deletes a customer. */
export type CustomerDelete = {
  __typename?: 'CustomerDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** History log of the customer. */
export type CustomerEvent = Node & {
  __typename?: 'CustomerEvent';
  /** Number of objects concerned by the event. */
  count?: Maybe<Scalars['Int']>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** The concerned order. */
  order?: Maybe<Order>;
  /** The concerned order line. */
  orderLine?: Maybe<OrderLine>;
  /** Customer event type. */
  type?: Maybe<CustomerEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum CustomerEventsEnum {
  AccountCreated = 'ACCOUNT_CREATED',
  CustomerDeleted = 'CUSTOMER_DELETED',
  DigitalLinkDownloaded = 'DIGITAL_LINK_DOWNLOADED',
  EmailAssigned = 'EMAIL_ASSIGNED',
  EmailChanged = 'EMAIL_CHANGED',
  EmailChangedRequest = 'EMAIL_CHANGED_REQUEST',
  NameAssigned = 'NAME_ASSIGNED',
  NoteAdded = 'NOTE_ADDED',
  NoteAddedToOrder = 'NOTE_ADDED_TO_ORDER',
  PasswordChanged = 'PASSWORD_CHANGED',
  PasswordReset = 'PASSWORD_RESET',
  PasswordResetLinkSent = 'PASSWORD_RESET_LINK_SENT',
  PlacedOrder = 'PLACED_ORDER'
}

export type CustomerFilterInput = {
  dateJoined?: InputMaybe<DateRangeInput>;
  moneySpent?: InputMaybe<PriceRangeInput>;
  numberOfOrders?: InputMaybe<IntRangeInput>;
  placedOrders?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type CustomerInput = {
  /** Only filled out if the account is a business account. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User account is affiliate. */
  isAffiliate?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** Password url */
  passwordUrl?: InputMaybe<Scalars['String']>;
  /** Personal phone number. */
  personalPhone?: InputMaybe<Scalars['String']>;
};

/** Updates an existing customer. */
export type CustomerUpdate = {
  __typename?: 'CustomerUpdate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type DasbhoardOrdersSummaryType = {
  __typename?: 'DasbhoardOrdersSummaryType';
  current?: Maybe<AbstractOrderSellerReportType>;
  deltas?: Maybe<OrderSummaryDeltaDataType>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  ordersToFulfill?: Maybe<Scalars['Int']>;
  paymentsToProcess?: Maybe<Scalars['Int']>;
  pendingPayouts?: Maybe<Scalars['Int']>;
  pendingReviews?: Maybe<Scalars['Int']>;
  previous?: Maybe<AbstractOrderSellerReportType>;
  returnsToProcess?: Maybe<Scalars['Int']>;
};

export type DasbhoardTopSellerPerformanceType = {
  __typename?: 'DasbhoardTopSellerPerformanceType';
  current?: Maybe<Array<Maybe<DashboardSellerOrderPerformanceType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  previous?: Maybe<Array<Maybe<DashboardSellerOrderPerformanceType>>>;
};

export type DashboardGraphType = {
  __typename?: 'DashboardGraphType';
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  graph?: Maybe<Array<Maybe<GraphDataType>>>;
};

export type DashboardSellerOrderPerformanceType = {
  __typename?: 'DashboardSellerOrderPerformanceType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  seller?: Maybe<Seller>;
  sellerId?: Maybe<Scalars['Int']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type DateRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['Date']>;
  /** End date. */
  lte?: InputMaybe<Scalars['Date']>;
};

export type DateTimeRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** End date. */
  lte?: InputMaybe<Scalars['DateTime']>;
};

/** Deactivate all JWT tokens of the currently authenticated user. */
export type DeactivateAllUserTokens = {
  __typename?: 'DeactivateAllUserTokens';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type DeleteBrandingImages = {
  __typename?: 'DeleteBrandingImages';
  branding?: Maybe<BrandingType>;
};

/** Delete metadata of an object. */
export type DeleteMetadata = {
  __typename?: 'DeleteMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  item?: Maybe<ObjectWithMetadata>;
  metadataErrors: Array<MetadataError>;
};

/** Delete object's private metadata. */
export type DeletePrivateMetadata = {
  __typename?: 'DeletePrivateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  item?: Maybe<ObjectWithMetadata>;
  metadataErrors: Array<MetadataError>;
};

export type DesignerDataInput = {
  jsonContent?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
};

export type DesignerDataType = {
  __typename?: 'DesignerDataType';
  domainSet: NauticalSiteCountableConnection;
  jsonContent: Scalars['JSONString'];
  name: Scalars['String'];
};


export type DesignerDataTypeDomainSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type DigitalContent = Node & ObjectWithMetadata & {
  __typename?: 'DigitalContent';
  automaticFulfillment: Scalars['Boolean'];
  /** The URL of file to download. */
  contentFile?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  maxDownloads?: Maybe<Scalars['Int']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  productVariant: ProductVariant;
  urlValidDays?: Maybe<Scalars['Int']>;
  /** List of URLs for the digital variant. */
  urls?: Maybe<Array<Maybe<DigitalContentUrl>>>;
  useDefaultSettings: Scalars['Boolean'];
};

export type DigitalContentCountableConnection = {
  __typename?: 'DigitalContentCountableConnection';
  edges: Array<DigitalContentCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type DigitalContentCountableEdge = {
  __typename?: 'DigitalContentCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: DigitalContent;
};

/** Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type DigitalContentCreate = {
  __typename?: 'DigitalContentCreate';
  content?: Maybe<DigitalContent>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

/** Remove digital content assigned to given variant. */
export type DigitalContentDelete = {
  __typename?: 'DigitalContentDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

export type DigitalContentInput = {
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: InputMaybe<Scalars['Boolean']>;
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: InputMaybe<Scalars['Int']>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: InputMaybe<Scalars['Int']>;
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
};

/** Update digital content. */
export type DigitalContentUpdate = {
  __typename?: 'DigitalContentUpdate';
  content?: Maybe<DigitalContent>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

export type DigitalContentUploadInput = {
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: InputMaybe<Scalars['Boolean']>;
  /** Represents an file in a multipart request. */
  contentFile: Scalars['Upload'];
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: InputMaybe<Scalars['Int']>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: InputMaybe<Scalars['Int']>;
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
};

export type DigitalContentUrl = Node & {
  __typename?: 'DigitalContentUrl';
  content: DigitalContent;
  created: Scalars['DateTime'];
  downloadNum: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** UUID of digital content. */
  token: Scalars['NauticalUUID'];
  /** URL for digital content. */
  url?: Maybe<Scalars['String']>;
};

/** Generate new URL to digital content. */
export type DigitalContentUrlCreate = {
  __typename?: 'DigitalContentUrlCreate';
  digitalContentUrl?: Maybe<DigitalContentUrl>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type DigitalContentUrlCreateInput = {
  /** Digital content ID which URL will belong to. */
  content: Scalars['ID'];
};

/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type Directory = Node & ObjectWithMetadata & {
  __typename?: 'Directory';
  /** List of ancestors of the directory. */
  ancestors?: Maybe<DirectoryCountableConnection>;
  /** List of children of the directory. */
  children?: Maybe<DirectoryCountableConnection>;
  description: Scalars['String'];
  directoryImage?: Maybe<Image>;
  /** The ID of the object. */
  id: Scalars['ID'];
  level: Scalars['Int'];
  /** List of listings in the directory. */
  listings?: Maybe<ListingCountableConnection>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  name: Scalars['String'];
  parent?: Maybe<Directory>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  /** List providing entire parent-to-child lineage of directories leading to current directory */
  trailingBreadcrumbs?: Maybe<Array<Maybe<Directory>>>;
  /** Returns translated directory fields for the given language code. */
  translation?: Maybe<DirectoryTranslation>;
  /**
   * The storefront's URL for the listing.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url?: Maybe<Scalars['String']>;
};


/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type DirectoryAncestorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type DirectoryChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type DirectoryDirectoryImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type DirectoryListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a single directory of listings. Directories allow to organize listings in a tree-hierarchy which can be used for navigation in the storefront. */
export type DirectoryTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type DirectoryCountableConnection = {
  __typename?: 'DirectoryCountableConnection';
  edges: Array<DirectoryCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type DirectoryCountableEdge = {
  __typename?: 'DirectoryCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Directory;
};

/** Creates a new directory. */
export type DirectoryCreate = {
  __typename?: 'DirectoryCreate';
  directory?: Maybe<Directory>;
  directoryErrors: Array<DirectoryError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type DirectoryError = {
  __typename?: 'DirectoryError';
  /** The error code. */
  code: DirectoryErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum DirectoryErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type DirectoryFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  search?: InputMaybe<Scalars['String']>;
};

export type DirectoryInput = {
  /** Directory description (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Directory image file. */
  directoryImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  directoryImageAlt?: InputMaybe<Scalars['String']>;
  /** Directory name. */
  name?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Directory slug. */
  slug?: InputMaybe<Scalars['String']>;
};

export enum DirectorySortField {
  /** Sort directories by listing count. */
  ListingCount = 'LISTING_COUNT',
  /** Sort directories by name. */
  Name = 'NAME',
  /** Sort directories by subdirectory count. */
  SubdirectoryCount = 'SUBDIRECTORY_COUNT'
}

export type DirectorySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort directories by the selected field. */
  field: DirectorySortField;
};

export type DirectoryTranslation = Node & {
  __typename?: 'DirectoryTranslation';
  description: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

export type DiscountError = {
  __typename?: 'DiscountError';
  /** The error code. */
  code: DiscountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum DiscountErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export enum DiscountStatusEnum {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Scheduled = 'SCHEDULED'
}

export enum DiscountValueTypeEnum {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export enum DistanceUnit {
  Km = 'KM',
  Mi = 'MI'
}

/** Represents shop's domain. */
export type Domain = {
  __typename?: 'Domain';
  /** The host name of the domain. */
  host: Scalars['String'];
  /** Inform if SSL is enabled. */
  sslEnabled: Scalars['Boolean'];
  /** Shop's absolute URL. */
  url: Scalars['String'];
};

/** Deletes draft orders. */
export type DraftOrderBulkDelete = {
  __typename?: 'DraftOrderBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
};

/** Completes creating an order. */
export type DraftOrderComplete = {
  __typename?: 'DraftOrderComplete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Completed order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Creates a new draft order. */
export type DraftOrderCreate = {
  __typename?: 'DraftOrderCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type DraftOrderCreateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: InputMaybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Variant line input consisting of variant ID and quantity of products. */
  lines?: InputMaybe<Array<InputMaybe<OrderLineCreateInput>>>;
  seller?: InputMaybe<Scalars['ID']>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
  /** ID of the voucher associated with the order. */
  voucher?: InputMaybe<Scalars['ID']>;
};

/** Deletes a draft order. */
export type DraftOrderDelete = {
  __typename?: 'DraftOrderDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type DraftOrderInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: InputMaybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
  /** ID of the voucher associated with the order. */
  voucher?: InputMaybe<Scalars['ID']>;
};

/** Deletes an order line from a draft order. */
export type DraftOrderLineDelete = {
  __typename?: 'DraftOrderLineDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
  /** An order line that was deleted. */
  orderLine?: Maybe<OrderLine>;
};

/** Updates an order line of a draft order. */
export type DraftOrderLineUpdate = {
  __typename?: 'DraftOrderLineUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
  orderLine?: Maybe<OrderLine>;
};

/** Deletes order lines. */
export type DraftOrderLinesBulkDelete = {
  __typename?: 'DraftOrderLinesBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
};

/** Create order lines for a draft order. */
export type DraftOrderLinesCreate = {
  __typename?: 'DraftOrderLinesCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
  /** List of newly added order lines. */
  orderLines?: Maybe<Array<OrderLine>>;
};

/** Updates a draft order. */
export type DraftOrderUpdate = {
  __typename?: 'DraftOrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Register a new user. */
export type EnhancedAccountRegister = {
  __typename?: 'EnhancedAccountRegister';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Informs whether users need to confirm their email address. */
  requiresConfirmation?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type EnhancedAccountRegisterInput = {
  /** The email address of the user. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
};

/** Represents an error in the input of a mutation. */
export type Error = {
  __typename?: 'Error';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** Export catalog. */
export type ExportCatalog = {
  __typename?: 'ExportCatalog';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  ok?: Maybe<Scalars['Boolean']>;
  /** Plugin ID */
  plugin?: Maybe<Scalars['ID']>;
  pluginsErrors: Array<PluginError>;
};

/** Export customer list. */
export type ExportCustomers = {
  __typename?: 'ExportCustomers';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  ok?: Maybe<Scalars['Boolean']>;
  /** Plugin ID */
  plugin?: Maybe<Scalars['ID']>;
  pluginsErrors: Array<PluginError>;
};

export type ExportError = {
  __typename?: 'ExportError';
  /** The error code. */
  code: ExportErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ExportErrorCode {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

/** History log of export file. */
export type ExportEvent = Node & {
  __typename?: 'ExportEvent';
  /** App which performed the action. */
  app?: Maybe<App>;
  /** Date when event happened at in ISO 8601 format. */
  date: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Content of the event. */
  message: Scalars['String'];
  /** Export event type. */
  type: ExportEventsEnum;
  /** User who performed the action. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum ExportEventsEnum {
  ExportedFileSent = 'EXPORTED_FILE_SENT',
  ExportDeleted = 'EXPORT_DELETED',
  ExportFailed = 'EXPORT_FAILED',
  ExportFailedInfoSent = 'EXPORT_FAILED_INFO_SENT',
  ExportPending = 'EXPORT_PENDING',
  ExportSuccess = 'EXPORT_SUCCESS'
}

/** Represents a job data of exported file. */
export type ExportFile = Job & Node & {
  __typename?: 'ExportFile';
  app?: Maybe<App>;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** List of events associated with the export. */
  events?: Maybe<Array<ExportEvent>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** The URL of field to download. */
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ExportFileCountableConnection = {
  __typename?: 'ExportFileCountableConnection';
  edges: Array<ExportFileCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ExportFileCountableEdge = {
  __typename?: 'ExportFileCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ExportFile;
};

export type ExportFileFilterInput = {
  app?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<JobStatusEnum>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
  user?: InputMaybe<Scalars['String']>;
};

export enum ExportFileSortField {
  /** Sort export file by created at. */
  CreatedAt = 'CREATED_AT',
  /** Sort export file by status. */
  Status = 'STATUS',
  /** Sort export file by updated at. */
  UpdatedAt = 'UPDATED_AT'
}

export type ExportFileSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort export file by the selected field. */
  field: ExportFileSortField;
};

export type ExportInfoInput = {
  /** List of attribute ids witch should be exported. */
  attributes?: InputMaybe<Array<Scalars['ID']>>;
  /** List of product fields witch should be exported. */
  fields?: InputMaybe<Array<ProductFieldEnum>>;
  /** List of warehouse ids witch should be exported. */
  warehouses?: InputMaybe<Array<Scalars['ID']>>;
};

/** Export products to csv file. */
export type ExportProducts = {
  __typename?: 'ExportProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  exportErrors: Array<ExportError>;
  /** The newly created export file job which is responsible for export data. */
  exportFile?: Maybe<ExportFile>;
};

export type ExportProductsInput = {
  /** Input with info about fields which should be exported. */
  exportInfo?: InputMaybe<ExportInfoInput>;
  /** Type of exported file. */
  fileType: FileTypesEnum;
  /** Filtering options for products. */
  filter?: InputMaybe<ProductFilterInput>;
  /** List of products IDS to export. */
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /** Determine which products should be exported. */
  scope: ExportScope;
};

export enum ExportScope {
  /** Export all products. */
  All = 'ALL',
  /** Export the filtered products. */
  Filter = 'FILTER',
  /** Export products with given ids. */
  Ids = 'IDS'
}

export type FeatureItems = {
  __typename?: 'FeatureItems';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  visible?: Maybe<Scalars['Boolean']>;
};

/** An enumeration. */
export enum FileTypesEnum {
  Csv = 'CSV',
  Xlsx = 'XLSX'
}

export type FilterObjectType = {
  __typename?: 'FilterObjectType';
  display?: Maybe<Scalars['String']>;
  fieldType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
};

/** Flow mapping for a plugin */
export type Flow = {
  __typename?: 'Flow';
  formId: Scalars['String'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  mapping: Scalars['JSONString'];
  process: FlowProcess;
  seller?: Maybe<Seller>;
};

export type FlowCountableConnection = {
  __typename?: 'FlowCountableConnection';
  edges: Array<FlowCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type FlowCountableEdge = {
  __typename?: 'FlowCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Flow;
};

/** An enumeration. */
export enum FlowProcess {
  /** customer_creation */
  CustomerCreation = 'CUSTOMER_CREATION',
  /** seller_creation */
  SellerCreation = 'SELLER_CREATION'
}

/** Represents order fulfillment. */
export type Fulfillment = Node & ObjectWithMetadata & {
  __typename?: 'Fulfillment';
  created: Scalars['DateTime'];
  fulfillmentOrder: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of lines for the fulfillment. */
  lines?: Maybe<Array<Maybe<FulfillmentLine>>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Nautical order via order mapping */
  nauticalOrder?: Maybe<NauticalOrder>;
  order: Order;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  relatedTo?: Maybe<Fulfillment>;
  /** Seller who made the fulfillment. */
  seller?: Maybe<Seller>;
  status: FulfillmentStatus;
  /** User-friendly fulfillment status. */
  statusDisplay?: Maybe<Scalars['String']>;
  /** Total price across all quantities across all lines. */
  totalLinesPrice?: Maybe<Scalars['Float']>;
  /** Sum of quantities across all lines. */
  totalLinesQuantity?: Maybe<Scalars['Int']>;
  trackingNumber?: Maybe<Scalars['String']>;
  trackingUrl?: Maybe<Scalars['String']>;
  /** Warehouse from fulfillment was fulfilled. */
  warehouse?: Maybe<Warehouse>;
};

/** Cancels existing fulfillment and optionally restocks items. */
export type FulfillmentCancel = {
  __typename?: 'FulfillmentCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A canceled fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was cancelled. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type FulfillmentCancelInput = {
  /** ID of warehouse where items will be restock. */
  warehouseId: Scalars['ID'];
};

/** Clears metadata for fulfillment. */
export type FulfillmentClearMeta = {
  __typename?: 'FulfillmentClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Clears private metadata for fulfillment. */
export type FulfillmentClearPrivateMeta = {
  __typename?: 'FulfillmentClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

export type FulfillmentCountableConnection = {
  __typename?: 'FulfillmentCountableConnection';
  edges: Array<FulfillmentCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type FulfillmentCountableEdge = {
  __typename?: 'FulfillmentCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Fulfillment;
};

/** Represents line of the fulfillment. */
export type FulfillmentLine = Node & {
  __typename?: 'FulfillmentLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  orderLine?: Maybe<OrderLine>;
  quantity: Scalars['Int'];
  /** Reason customer requested item return. */
  returnReason?: Maybe<Scalars['String']>;
};

/** Returns selected quantity from fulfillment lines and restocks items. */
export type FulfillmentReturn = {
  __typename?: 'FulfillmentReturn';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A returned fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was returned for. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type FulfillmentReturnInput = {
  /** ID of the fulfillment line that a return is being made against */
  fulfillmentLineId: Scalars['ID'];
  /** Number of items being returned for the given fulfillment line */
  returnQuantity: Scalars['Int'];
};

/** Updated return status of existing fulfillment and optionally restocks items. */
export type FulfillmentReturnStatusBulkUpdate = {
  __typename?: 'FulfillmentReturnStatusBulkUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A returned fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was returned. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** An enumeration. */
export enum FulfillmentStatus {
  /** Canceled */
  Canceled = 'CANCELED',
  /** Declined */
  Declined = 'DECLINED',
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Returned */
  Returned = 'RETURNED',
  /** Return authorized */
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  /** Return cancelled */
  ReturnCancelled = 'RETURN_CANCELLED',
  /** Return complete */
  ReturnComplete = 'RETURN_COMPLETE',
  /** Return declined */
  ReturnDeclined = 'RETURN_DECLINED',
  /** Return received */
  ReturnReceived = 'RETURN_RECEIVED',
  /** Return requested */
  ReturnRequested = 'RETURN_REQUESTED'
}

export enum FulfillmentStatusFilter {
  Canceled = 'CANCELED',
  Declined = 'DECLINED',
  Fulfilled = 'FULFILLED',
  Returned = 'RETURNED',
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  ReturnCancelled = 'RETURN_CANCELLED',
  ReturnComplete = 'RETURN_COMPLETE',
  ReturnDeclined = 'RETURN_DECLINED',
  ReturnReceived = 'RETURN_RECEIVED',
  ReturnRequested = 'RETURN_REQUESTED'
}

/** Updates metadata for fulfillment. */
export type FulfillmentUpdateMeta = {
  __typename?: 'FulfillmentUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Updates metadata for fulfillment. */
export type FulfillmentUpdatePrivateMeta = {
  __typename?: 'FulfillmentUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

export type FulfillmentUpdateReturnStatusInput = {
  /** Return status that fulfillment should be updated with. */
  status?: InputMaybe<Scalars['String']>;
};

/** Updates a fulfillment for an order. */
export type FulfillmentUpdateTracking = {
  __typename?: 'FulfillmentUpdateTracking';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A fulfillment with updated tracking. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order for which fulfillment was updated. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type FulfillmentUpdateTrackingInput = {
  /** If true, send an email notification to the customer. */
  notifyCustomer?: InputMaybe<Scalars['Boolean']>;
  /** Fulfillment tracking number. */
  trackingNumber?: InputMaybe<Scalars['String']>;
};

/** Payment gateway client configuration key and value pair. */
export type GatewayConfigLine = {
  __typename?: 'GatewayConfigLine';
  /** Gateway config key. */
  field: Scalars['String'];
  /** Gateway config value for key. */
  value?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum GenericWebhookTransactionType {
  /** A paylod for customer create was received */
  CustomerCreate = 'CUSTOMER_CREATE',
  /** A payload for fulfillment create was received. */
  FulfillmentCreate = 'FULFILLMENT_CREATE',
  /** A payload for fulfillment update was received. */
  FulfillmentUpdate = 'FULFILLMENT_UPDATE',
  /** A payload for product inventory tracking update was received. */
  InventoryTrackingUpdate = 'INVENTORY_TRACKING_UPDATE',
  /** A payload for item shipment that was received */
  ItemShipNotify = 'ITEM_SHIP_NOTIFY',
  /** A payload for order cancel was received */
  OrderCancel = 'ORDER_CANCEL',
  /** A payload for order create was received */
  OrderCreate = 'ORDER_CREATE',
  /** A payload for order update was received */
  OrderUpdate = 'ORDER_UPDATE',
  /** A payload for product create was received. */
  ProductCreate = 'PRODUCT_CREATE',
  /** A payload for product delete was received. */
  ProductDelete = 'PRODUCT_DELETE',
  /** A payload for product update was received. */
  ProductUpdate = 'PRODUCT_UPDATE',
  /** A payload for seller create was received */
  SellerCreate = 'SELLER_CREATE',
  /** A payload for stock create was received. */
  StockCreate = 'STOCK_CREATE',
  /** A payload for stock delete was received. */
  StockDelete = 'STOCK_DELETE',
  /** A payload for stock update was received. */
  StockUpdate = 'STOCK_UPDATE',
  /** A payload for vehicles was received */
  VehiclePayload = 'VEHICLE_PAYLOAD',
  /** A payload for warehouse create was received. */
  WarehouseCreate = 'WAREHOUSE_CREATE',
  /** A payload for warehouse delete was received. */
  WarehouseDelete = 'WAREHOUSE_DELETE',
  /** A payload for warehouse update was received. */
  WarehouseUpdate = 'WAREHOUSE_UPDATE'
}

/** Represents customers's geolocalization data. */
export type Geolocalization = {
  __typename?: 'Geolocalization';
  /** Country of the user acquired by his IP address. */
  country?: Maybe<CountryDisplay>;
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCard = Node & {
  __typename?: 'GiftCard';
  /** Gift card code. */
  code?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  currentBalance?: Maybe<Money>;
  /** Code in format which allows displaying in a user interface. */
  displayCode?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  initialBalance?: Maybe<Money>;
  isActive: Scalars['Boolean'];
  lastUsedOn?: Maybe<Scalars['DateTime']>;
  startDate: Scalars['Date'];
  /** The customer who bought a gift card. */
  user?: Maybe<User>;
};

/** Activate a gift card. */
export type GiftCardActivate = {
  __typename?: 'GiftCardActivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A gift card to activate. */
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardCountableConnection = {
  __typename?: 'GiftCardCountableConnection';
  edges: Array<GiftCardCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GiftCardCountableEdge = {
  __typename?: 'GiftCardCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: GiftCard;
};

/** Creates a new gift card. */
export type GiftCardCreate = {
  __typename?: 'GiftCardCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardCreateInput = {
  /** Value of the gift card. */
  balance?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Code to use the gift card. */
  code?: InputMaybe<Scalars['String']>;
  /** End date of the gift card in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['Date']>;
  /** Start date of the gift card in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['Date']>;
  /** The customer's email of the gift card buyer. */
  userEmail?: InputMaybe<Scalars['String']>;
};

/** Deactivate a gift card. */
export type GiftCardDeactivate = {
  __typename?: 'GiftCardDeactivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A gift card to deactivate. */
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardError = {
  __typename?: 'GiftCardError';
  /** The error code. */
  code: GiftCardErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum GiftCardErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Update a gift card. */
export type GiftCardUpdate = {
  __typename?: 'GiftCardUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardUpdateInput = {
  /** Value of the gift card. */
  balance?: InputMaybe<Scalars['PositiveDecimal']>;
  /** End date of the gift card in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['Date']>;
  /** Start date of the gift card in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['Date']>;
  /** The customer's email of the gift card buyer. */
  userEmail?: InputMaybe<Scalars['String']>;
};

export type GraphDataType = {
  __typename?: 'GraphDataType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  period?: Maybe<Scalars['DateTime']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

/** Represents permission group data. */
export type Group = Node & {
  __typename?: 'Group';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** List of group permissions */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** True, if the currently authenticated user has rights to manage a group. */
  userCanManage: Scalars['Boolean'];
  /** List of group users */
  users?: Maybe<Array<Maybe<User>>>;
};

export type GroupCountableConnection = {
  __typename?: 'GroupCountableConnection';
  edges: Array<GroupCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GroupCountableEdge = {
  __typename?: 'GroupCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Group;
};

/** Adds products to a grouped product. */
export type GroupedProductAddProducts = {
  __typename?: 'GroupedProductAddProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Grouped product to which products will be added. */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Remove products from a grouped product. */
export type GroupedProductRemoveProducts = {
  __typename?: 'GroupedProductRemoveProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Grouped product from which products will be removed. */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type HashtagInput = {
  creator?: InputMaybe<Scalars['ID']>;
  hashtag?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type HashtagType = Node & {
  __typename?: 'HashtagType';
  createdAt: Scalars['DateTime'];
  creator: User;
  hashtag: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  url: Scalars['String'];
};

export type HashtagTypeCountableConnection = {
  __typename?: 'HashtagTypeCountableConnection';
  edges: Array<HashtagTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type HashtagTypeCountableEdge = {
  __typename?: 'HashtagTypeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: HashtagType;
};

/** Updates homepage collection of the shop. */
export type HomepageCollectionUpdate = {
  __typename?: 'HomepageCollectionUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Represents an image. */
export type Image = {
  __typename?: 'Image';
  /** Alt text for an image. */
  alt?: Maybe<Scalars['String']>;
  /** The URL of the image. */
  url: Scalars['String'];
};

/** Import foreign catalog. */
export type ImportCatalog = {
  __typename?: 'ImportCatalog';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  ok?: Maybe<Scalars['Boolean']>;
  /** Plugin ID */
  plugin?: Maybe<Scalars['ID']>;
  pluginsErrors: Array<PluginError>;
};

export type ImportError = {
  __typename?: 'ImportError';
  /** The error code. */
  code: ImportErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ImportErrorCode {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

/** History log of import file. */
export type ImportEvent = Node & {
  __typename?: 'ImportEvent';
  /** App which performed the action. */
  app?: Maybe<App>;
  /** Date when event happened at in ISO 8601 format. */
  date: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Content of the event. */
  message: Scalars['String'];
  /** Import event type. */
  type: ImportEventsEnum;
  /** User who performed the action. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum ImportEventsEnum {
  ImportedFileSent = 'IMPORTED_FILE_SENT',
  ImportDeleted = 'IMPORT_DELETED',
  ImportFailed = 'IMPORT_FAILED',
  ImportPending = 'IMPORT_PENDING',
  ImportSuccess = 'IMPORT_SUCCESS'
}

/** Represents a job data of exported file. */
export type ImportFile = Job & Node & {
  __typename?: 'ImportFile';
  app?: Maybe<App>;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** List of events associated with the import. */
  events?: Maybe<Array<ImportEvent>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** The URL of file to download. */
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Import products with csv file. */
export type ImportProducts = {
  __typename?: 'ImportProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  importErrors: Array<ImportError>;
  /** The newly created import file which is responsible for import data. */
  importFile?: Maybe<ImportFile>;
};

/** Import vins with csv file. */
export type ImportVinFile = {
  __typename?: 'ImportVinFile';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  importErrors: Array<ImportError>;
  /** The newly created import file which is responsible for import data. */
  importFile?: Maybe<ImportFile>;
};

export type InReportMaretplacePaymentsSummaryType = {
  __typename?: 'InReportMaretplacePaymentsSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<PaymentsDayReportType>>>;
  summary?: Maybe<AbstractPaymentsType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportMaretplaceTaxSummaryType = {
  __typename?: 'InReportMaretplaceTaxSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<MarketplaceTaxReportType>>>;
  summary?: Maybe<AbstractOrderSellerReportType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportMaretplaceTaxesByCountryType = {
  __typename?: 'InReportMaretplaceTaxesByCountryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<MarketplaceTaxReportByLocaleType>>>;
  summary?: Maybe<AbstractOrderSellerReportType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportMarketplaceAffiliatePayoutsSummaryType = {
  __typename?: 'InReportMarketplaceAffiliatePayoutsSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderAffiliateReportType>>>;
  summary?: Maybe<OrderAffiliateSummaryType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportMarketplacePayoutsSummaryType = {
  __typename?: 'InReportMarketplacePayoutsSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderSellerReportType>>>;
  summary?: Maybe<OrderSellerSummaryType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportOrderCustomerSummaryType = {
  __typename?: 'InReportOrderCustomerSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderCustomerReportType>>>;
  summary?: Maybe<OrderSellerSummaryType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportOrderMarketplaceSummaryType = {
  __typename?: 'InReportOrderMarketplaceSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderMarketplaceReportType>>>;
  summary?: Maybe<OrderSellerSummaryType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportOrderSellerSummaryType = {
  __typename?: 'InReportOrderSellerSummaryType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderSellerReportType>>>;
  summary?: Maybe<OrderSellerSummaryType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportTopPerformingCategoriesType = {
  __typename?: 'InReportTopPerformingCategoriesType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<ProductCategoryReportType>>>;
  summary?: Maybe<AbstractProductVariantType>;
  title?: Maybe<Scalars['String']>;
};

export type InReportTopPerformingProductsType = {
  __typename?: 'InReportTopPerformingProductsType';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<ProductVariantReportType>>>;
  summary?: Maybe<AbstractProductVariantType>;
  title?: Maybe<Scalars['String']>;
};

export type IntRangeInput = {
  /** Value greater than or equal to. */
  gte?: InputMaybe<Scalars['Int']>;
  /** Value less than or equal to. */
  lte?: InputMaybe<Scalars['Int']>;
};

/** Represents an Invoice. */
export type Invoice = Job & Node & ObjectWithMetadata & {
  __typename?: 'Invoice';
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  externalUrl?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  number?: Maybe<Scalars['String']>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** URL to download an invoice. */
  url?: Maybe<Scalars['String']>;
};

/** Creates a ready to send invoice. */
export type InvoiceCreate = {
  __typename?: 'InvoiceCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
};

export type InvoiceCreateInput = {
  /** Invoice number. */
  number: Scalars['String'];
  /** URL of an invoice to download. */
  url: Scalars['String'];
};

/** Deletes an invoice. */
export type InvoiceDelete = {
  __typename?: 'InvoiceDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
};

export type InvoiceError = {
  __typename?: 'InvoiceError';
  /** The error code. */
  code: InvoiceErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum InvoiceErrorCode {
  EmailNotSet = 'EMAIL_NOT_SET',
  InvalidStatus = 'INVALID_STATUS',
  NotFound = 'NOT_FOUND',
  NotReady = 'NOT_READY',
  NumberNotSet = 'NUMBER_NOT_SET',
  Required = 'REQUIRED',
  UrlNotSet = 'URL_NOT_SET'
}

/** Request an invoice for the order using plugin. */
export type InvoiceRequest = {
  __typename?: 'InvoiceRequest';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
  /** Nautical order related to an invoice. */
  nauticalOrder?: Maybe<NauticalOrder>;
  /** Order related to an invoice. */
  order?: Maybe<Order>;
};

/** Requests deletion of an invoice. */
export type InvoiceRequestDelete = {
  __typename?: 'InvoiceRequestDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
};

/** Send an invoice by email. */
export type InvoiceSendEmail = {
  __typename?: 'InvoiceSendEmail';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
};

/** Updates an invoice. */
export type InvoiceUpdate = {
  __typename?: 'InvoiceUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoice?: Maybe<Invoice>;
  invoiceErrors: Array<InvoiceError>;
};

export type Job = {
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
};

/** An enumeration. */
export enum JobStatusEnum {
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Success = 'SUCCESS'
}

/** An enumeration. */
export enum LanguageCodeEnum {
  Ar = 'AR',
  Az = 'AZ',
  Bg = 'BG',
  Bn = 'BN',
  Ca = 'CA',
  Cs = 'CS',
  Da = 'DA',
  De = 'DE',
  El = 'EL',
  En = 'EN',
  Es = 'ES',
  EsCo = 'ES_CO',
  Et = 'ET',
  Fa = 'FA',
  Fi = 'FI',
  Fr = 'FR',
  Hi = 'HI',
  Hu = 'HU',
  Hy = 'HY',
  Id = 'ID',
  Is = 'IS',
  It = 'IT',
  Ja = 'JA',
  Ka = 'KA',
  Km = 'KM',
  Ko = 'KO',
  Lt = 'LT',
  Mn = 'MN',
  My = 'MY',
  Nb = 'NB',
  Nl = 'NL',
  Pl = 'PL',
  Pt = 'PT',
  PtBr = 'PT_BR',
  Ro = 'RO',
  Ru = 'RU',
  Sk = 'SK',
  Sl = 'SL',
  Sq = 'SQ',
  Sr = 'SR',
  Sv = 'SV',
  Sw = 'SW',
  Ta = 'TA',
  Th = 'TH',
  Tr = 'TR',
  Uk = 'UK',
  Vi = 'VI',
  ZhHans = 'ZH_HANS',
  ZhHant = 'ZH_HANT'
}

export type LanguageDisplay = {
  __typename?: 'LanguageDisplay';
  /** ISO 639 representation of the language name. */
  code: LanguageCodeEnum;
  /** Full name of the language. */
  language: Scalars['String'];
};

export type LayoutType = {
  __typename?: 'LayoutType';
  id: Scalars['ID'];
  layoutJson: Scalars['JSONString'];
  sellers: Array<Scalars['Int']>;
};

/** Represents an individual listing in the storefront. */
export type Listing = Node & ObjectWithMetadata & {
  __typename?: 'Listing';
  description: Scalars['String'];
  /** List of directories for the listing. */
  directories?: Maybe<Array<Maybe<Directory>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** The image for a listing. */
  image?: Maybe<Image>;
  /** Whether the listing is published. */
  isPublished: Scalars['Boolean'];
  /** List of all product's locations. */
  locations?: Maybe<Array<Maybe<Location>>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  name: Scalars['String'];
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  publicationDate?: Maybe<Scalars['Date']>;
  seller?: Maybe<Seller>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The storefront URL for the listing.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url: Scalars['String'];
};


/** Represents an individual listing in the storefront. */
export type ListingImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};

export type ListingCountableConnection = {
  __typename?: 'ListingCountableConnection';
  edges: Array<ListingCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ListingCountableEdge = {
  __typename?: 'ListingCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Listing;
};

export type ListingFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ListingOrder = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort listings by the selected field. */
  field?: InputMaybe<ListingOrderField>;
};

export enum ListingOrderField {
  /** Sort listings by name. */
  Name = 'NAME'
}

/** Represents location data. */
export type Location = Node & {
  __typename?: 'Location';
  city: Scalars['String'];
  cityArea: Scalars['String'];
  companyName: Scalars['String'];
  /** Shop's default country. */
  country: CountryDisplay;
  countryArea: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  lat?: Maybe<Scalars['Float']>;
  locationType?: Maybe<LocationLocationType>;
  lon?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  streetAddress1: Scalars['String'];
  streetAddress2: Scalars['String'];
};

/** Geocode locations */
export type LocationGeocode = {
  __typename?: 'LocationGeocode';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  locations?: Maybe<Array<Maybe<Scalars['GenericScalar']>>>;
  pluginsErrors: Array<PluginError>;
};

export type LocationInput = {
  /** City. */
  city?: InputMaybe<Scalars['String']>;
  /** District. */
  cityArea?: InputMaybe<Scalars['String']>;
  /** Company or organization. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Country. */
  country?: InputMaybe<CountryCode>;
  /** State or province. */
  countryArea?: InputMaybe<Scalars['String']>;
  /** Latitude of the location. */
  lat?: InputMaybe<Scalars['Float']>;
  /** Longitude of the location. */
  lon?: InputMaybe<Scalars['Float']>;
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress1?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress2?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum LocationLocationType {
  /** DESTINATION */
  Destination = 'DESTINATION',
  /** ORIGIN */
  Origin = 'ORIGIN',
  /** PRIMARY */
  Primary = 'PRIMARY'
}

/** Search locations */
export type LocationSearch = {
  __typename?: 'LocationSearch';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  locations?: Maybe<Array<Maybe<Scalars['GenericScalar']>>>;
  pluginsErrors: Array<PluginError>;
};

/** An enumeration. */
export enum LocationTypeEnum {
  Destination = 'DESTINATION',
  Origin = 'ORIGIN',
  Primary = 'PRIMARY'
}

/** Gets loyalty and referrals configuration details. */
export type LoyaltyAndReferrals = {
  __typename?: 'LoyaltyAndReferrals';
  /** States whether loyalty points rewarding is enabled. */
  awardLoyaltyPointsEnabled?: Maybe<Scalars['Boolean']>;
  /** States whether loyalty points for making purchases is enabled. */
  pointsForMakingPurchaseEnabled?: Maybe<Scalars['Boolean']>;
  /** The number of loyalty points gained per dollar spent on purchases. */
  pointsGainedPerDollarSpent?: Maybe<Scalars['Int']>;
  /** The number of loyalty points used per dollar in credit on a purchase. */
  pointsUsedPerDollarSaved?: Maybe<Scalars['Int']>;
};

/** The manifest definition. */
export type Manifest = {
  __typename?: 'Manifest';
  about?: Maybe<Scalars['String']>;
  appUrl?: Maybe<Scalars['String']>;
  configurationUrl?: Maybe<Scalars['String']>;
  dataPrivacy?: Maybe<Scalars['String']>;
  dataPrivacyUrl?: Maybe<Scalars['String']>;
  homepageUrl?: Maybe<Scalars['String']>;
  identifier: Scalars['String'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  supportUrl?: Maybe<Scalars['String']>;
  tokenTargetUrl?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

/** Map orders to a new nautical order. */
export type MapOrdersToNauticalOrder = {
  __typename?: 'MapOrdersToNauticalOrder';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** New nautical order created from supplied seller orders. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
  success?: Maybe<Scalars['Boolean']>;
  /** List of warnings generated during Order <-> Nautical Order mapping. */
  warnings?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Margin = {
  __typename?: 'Margin';
  start?: Maybe<Scalars['Int']>;
  stop?: Maybe<Scalars['Int']>;
};

/** Represents a marketplace configuration resource. */
export type MarketplaceConfiguration = {
  __typename?: 'MarketplaceConfiguration';
  /** Primary key name of the current marketplace */
  marketplaceName?: Maybe<Scalars['String']>;
  /** Maximum quantity per line allowed in a single checkout */
  maxCheckoutLineQuantity?: Maybe<Scalars['Int']>;
  /** Maximum total quantity allowed in a single checkout */
  maxCheckoutQuantity?: Maybe<Scalars['Int']>;
  /** Maximum number of products allowed in a grouped product */
  maxProductsInGroup?: Maybe<Scalars['Int']>;
};

export type MarketplaceConfigurationError = {
  __typename?: 'MarketplaceConfigurationError';
  /** The error code. */
  code: MarketplaceConfigurationErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MarketplaceConfigurationErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID'
}

export type MarketplaceConfigurationInput = {
  /** Maximum quantity per line allowed in a single checkout. */
  maxCheckoutLineQuantity?: InputMaybe<Scalars['Int']>;
  /** Maximum total cart quantity allowed in a single checkout. */
  maxCheckoutQuantity?: InputMaybe<Scalars['Int']>;
  /** Maximum number of products allowed in a grouped product. */
  maxProductsInGroup?: InputMaybe<Scalars['Int']>;
};

/** Updates marketplace configuration. */
export type MarketplaceConfigurationUpdate = {
  __typename?: 'MarketplaceConfigurationUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated marketplace configuration. */
  marketplaceConfiguration?: Maybe<MarketplaceConfiguration>;
  marketplaceConfigurationErrors: Array<MarketplaceConfigurationError>;
};

/** Represents a marketplace notifications settings resource. */
export type MarketplaceNotificationsConfiguration = {
  __typename?: 'MarketplaceNotificationsConfiguration';
  /** Name of notification to set */
  notificationName?: Maybe<Scalars['String']>;
  /** Boolean value describing whether to enable or disable notification setting */
  notificationValue?: Maybe<Scalars['Boolean']>;
};

export type MarketplaceNotificationsInput = {
  /** Describes the notification to set. */
  notificationName?: InputMaybe<Scalars['String']>;
  /** Describes what boolean value to set the notification to. */
  notificationValue?: InputMaybe<Scalars['Boolean']>;
};

/** Updates marketplace notifications settings. */
export type MarketplaceNotificationsUpdate = {
  __typename?: 'MarketplaceNotificationsUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  marketplaceConfigurationErrors: Array<MarketplaceConfigurationError>;
  /** Updated set of marketplace notifications settings. */
  marketplaceNotifications?: Maybe<MarketplaceNotificationsConfiguration>;
};

export type MarketplaceTaxReportByLocaleType = {
  __typename?: 'MarketplaceTaxReportByLocaleType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  billingAddress_Country?: Maybe<Scalars['String']>;
  billingAddress_CountryArea?: Maybe<Scalars['String']>;
  commission?: Maybe<Scalars['Float']>;
  country?: Maybe<Scalars['String']>;
  countryArea?: Maybe<Scalars['String']>;
  countryAreaName?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  countryState?: Maybe<CountryState>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type MarketplaceTaxReportType = {
  __typename?: 'MarketplaceTaxReportType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Date']>;
};

export type MentionInput = {
  content?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['JSONString']>;
  /** ID of the user that is receiving the mention */
  receiver: Scalars['ID'];
  /** ID of the user that is sending the mention */
  sender: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type MentionNode = Node & {
  __typename?: 'MentionNode';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  metadata: Scalars['JSONString'];
  /** User receiving the mention */
  receiver?: Maybe<User>;
  receiverGlobal?: Maybe<Scalars['String']>;
  /** User sending the mention */
  sender?: Maybe<User>;
  senderGlobal?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MentionNodeCountableConnection = {
  __typename?: 'MentionNodeCountableConnection';
  edges: Array<MentionNodeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MentionNodeCountableEdge = {
  __typename?: 'MentionNodeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MentionNode;
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type Menu = Node & {
  __typename?: 'Menu';
  /** The ID of the object. */
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<MenuItem>>>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** Deletes menus. */
export type MenuBulkDelete = {
  __typename?: 'MenuBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
};

export type MenuCountableConnection = {
  __typename?: 'MenuCountableConnection';
  edges: Array<MenuCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuCountableEdge = {
  __typename?: 'MenuCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Menu;
};

/** Creates a new Menu. */
export type MenuCreate = {
  __typename?: 'MenuCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MenuCreateInput = {
  /** List of menu items. */
  items?: InputMaybe<Array<InputMaybe<MenuItemInput>>>;
  /** Name of the menu. */
  name: Scalars['String'];
  /** Slug of the menu. Will be generated if not provided. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Deletes a menu. */
export type MenuDelete = {
  __typename?: 'MenuDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MenuError = {
  __typename?: 'MenuError';
  /** The error code. */
  code: MenuErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MenuErrorCode {
  CannotAssignNode = 'CANNOT_ASSIGN_NODE',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidMenuItem = 'INVALID_MENU_ITEM',
  NotFound = 'NOT_FOUND',
  NoMenuItemProvided = 'NO_MENU_ITEM_PROVIDED',
  Required = 'REQUIRED',
  TooManyMenuItems = 'TOO_MANY_MENU_ITEMS',
  Unique = 'UNIQUE'
}

export type MenuFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MenuInput = {
  /** Name of the menu. */
  name?: InputMaybe<Scalars['String']>;
  /** Slug of the menu. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItem = Node & {
  __typename?: 'MenuItem';
  category?: Maybe<Category>;
  children?: Maybe<Array<Maybe<MenuItem>>>;
  collection?: Maybe<Collection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  level: Scalars['Int'];
  menu: Menu;
  name: Scalars['String'];
  page?: Maybe<Page>;
  parent?: Maybe<MenuItem>;
  /** Returns translated menu item fields for the given language code. */
  translation?: Maybe<MenuItemTranslation>;
  /** URL to the menu item. */
  url?: Maybe<Scalars['String']>;
};


/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Deletes menu items. */
export type MenuItemBulkDelete = {
  __typename?: 'MenuItemBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
};

export type MenuItemCountableConnection = {
  __typename?: 'MenuItemCountableConnection';
  edges: Array<MenuItemCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuItemCountableEdge = {
  __typename?: 'MenuItemCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MenuItem;
};

/** Creates a new menu item. */
export type MenuItemCreate = {
  __typename?: 'MenuItemCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

export type MenuItemCreateInput = {
  /** Category to which item points. */
  category?: InputMaybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: InputMaybe<Scalars['ID']>;
  /** Menu to which item belongs. */
  menu: Scalars['ID'];
  /** Name of the menu item. */
  name: Scalars['String'];
  /** Page to which item points. */
  page?: InputMaybe<Scalars['ID']>;
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parent?: InputMaybe<Scalars['ID']>;
  /** URL of the pointed item. */
  url?: InputMaybe<Scalars['String']>;
};

/** Deletes a menu item. */
export type MenuItemDelete = {
  __typename?: 'MenuItemDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

export type MenuItemFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

export type MenuItemInput = {
  /** Category to which item points. */
  category?: InputMaybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: InputMaybe<Scalars['ID']>;
  /** Name of the menu item. */
  name?: InputMaybe<Scalars['String']>;
  /** Page to which item points. */
  page?: InputMaybe<Scalars['ID']>;
  /** URL of the pointed item. */
  url?: InputMaybe<Scalars['String']>;
};

/** Moves items of menus. */
export type MenuItemMove = {
  __typename?: 'MenuItemMove';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Assigned menu to move within. */
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MenuItemMoveInput = {
  /** The menu item ID to move. */
  itemId: Scalars['ID'];
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type MenuItemSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menu items by the selected field. */
  field: MenuItemsSortField;
};

export type MenuItemTranslatableContent = Node & {
  __typename?: 'MenuItemTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Represents a single item of the related menu. Can store categories, collection or pages. */
  menuItem?: Maybe<MenuItem>;
  name: Scalars['String'];
  /** Returns translated menu item fields for the given language code. */
  translation?: Maybe<MenuItemTranslation>;
};


export type MenuItemTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Menu Item. */
export type MenuItemTranslate = {
  __typename?: 'MenuItemTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuItem?: Maybe<MenuItem>;
  translationErrors: Array<TranslationError>;
};

export type MenuItemTranslation = Node & {
  __typename?: 'MenuItemTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

/** Updates a menu item. */
export type MenuItemUpdate = {
  __typename?: 'MenuItemUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

export enum MenuItemsSortField {
  /** Sort menu items by name. */
  Name = 'NAME'
}

export enum MenuSortField {
  /** Sort menus by items count. */
  ItemsCount = 'ITEMS_COUNT',
  /** Sort menus by name. */
  Name = 'NAME'
}

export type MenuSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menus by the selected field. */
  field: MenuSortField;
};

/** Updates a menu. */
export type MenuUpdate = {
  __typename?: 'MenuUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MetaClientStore = {
  __typename?: 'MetaClientStore';
  /** Metadata stored for a client. */
  metadata: Array<Maybe<MetaItem>>;
  /** Metadata client's name. */
  name: Scalars['String'];
};

export type MetaInput = {
  /** Metadata client's name. */
  clientName: Scalars['String'];
  /** Key for stored data. */
  key: Scalars['String'];
  /** Name of metadata client group. */
  namespace: Scalars['String'];
  /** Stored metadata value. */
  value: Scalars['String'];
};

export type MetaItem = {
  __typename?: 'MetaItem';
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

export type MetaPath = {
  /** Metadata client's name. */
  clientName: Scalars['String'];
  /** Key for stored data. */
  key: Scalars['String'];
  /** Name of metadata client group. */
  namespace: Scalars['String'];
};

export type MetaStore = {
  __typename?: 'MetaStore';
  /** List of clients that stored metadata in a group. */
  clients: Array<Maybe<MetaClientStore>>;
  /** Name of metadata client group. */
  namespace: Scalars['String'];
};

export type MetadataError = {
  __typename?: 'MetadataError';
  /** The error code. */
  code: MetadataErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MetadataErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

export type MetadataInput = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

export type MetadataItem = {
  __typename?: 'MetadataItem';
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

/** Represents a microsite of products. */
export type Microsite = Node & {
  __typename?: 'Microsite';
  affiliate?: Maybe<User>;
  bannerImage?: Maybe<Image>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  footerText?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Whether the microsite is published. */
  isPublished: Scalars['Boolean'];
  logoImage?: Maybe<Image>;
  name: Scalars['String'];
  /** List of products in this microsite. */
  products?: Maybe<ProductCountableConnection>;
  publicationDate?: Maybe<Scalars['Date']>;
  seller?: Maybe<Seller>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  /** Returns translated microsite fields for the given language code. */
  translation?: Maybe<MicrositeTranslation>;
};


/** Represents a microsite of products. */
export type MicrositeBannerImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents a microsite of products. */
export type MicrositeLogoImageArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents a microsite of products. */
export type MicrositeProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductOrder>;
};


/** Represents a microsite of products. */
export type MicrositeTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Adds products to a microsite. */
export type MicrositeAddProducts = {
  __typename?: 'MicrositeAddProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Microsite to which products will be added. */
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

/** Deletes microsites. */
export type MicrositeBulkDelete = {
  __typename?: 'MicrositeBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  micrositeErrors: Array<ProductError>;
};

/** Publish microsites. */
export type MicrositeBulkPublish = {
  __typename?: 'MicrositeBulkPublish';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  micrositeErrors: Array<ProductError>;
};

export type MicrositeCountableConnection = {
  __typename?: 'MicrositeCountableConnection';
  edges: Array<MicrositeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MicrositeCountableEdge = {
  __typename?: 'MicrositeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Microsite;
};

/** Creates a new microsite. */
export type MicrositeCreate = {
  __typename?: 'MicrositeCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

export type MicrositeCreateInput = {
  /** Banner image file. */
  bannerImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  bannerImageAlt?: InputMaybe<Scalars['String']>;
  /** Description of the microsite (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Description of the microsite (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Text to appear in footer of microsite. */
  footerText?: InputMaybe<Scalars['String']>;
  /** Informs whether a microsite is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Logo image file. */
  logoImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  logoImageAlt?: InputMaybe<Scalars['String']>;
  /** Name of the microsite. */
  name?: InputMaybe<Scalars['String']>;
  /** List of products to be added to the microsite. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the microsite. */
  slug?: InputMaybe<Scalars['String']>;
  /** Vendor that microsite belongs to */
  vendor: Scalars['ID'];
};

/** Deletes a microsite. */
export type MicrositeDelete = {
  __typename?: 'MicrositeDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

export type MicrositeFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published?: InputMaybe<MicrositePublished>;
  search?: InputMaybe<Scalars['String']>;
  vendorType?: InputMaybe<MicrositeVendorType>;
};

export type MicrositeInput = {
  /** Banner image file. */
  bannerImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  bannerImageAlt?: InputMaybe<Scalars['String']>;
  /** Description of the microsite (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Description of the microsite (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Text to appear in footer of microsite. */
  footerText?: InputMaybe<Scalars['String']>;
  /** Informs whether a microsite is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Logo image file. */
  logoImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  logoImageAlt?: InputMaybe<Scalars['String']>;
  /** Name of the microsite. */
  name?: InputMaybe<Scalars['String']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the microsite. */
  slug?: InputMaybe<Scalars['String']>;
};

export enum MicrositePublished {
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

/** Remove products from a microsite. */
export type MicrositeRemoveProducts = {
  __typename?: 'MicrositeRemoveProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Microsite from which products will be removed. */
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

/** Reorder the products of a microsite. */
export type MicrositeReorderProducts = {
  __typename?: 'MicrositeReorderProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Microsite from which products are reordered. */
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

export enum MicrositeSortField {
  /** Sort microsites by availability. */
  Availability = 'AVAILABILITY',
  /** Sort microsites by name. */
  Name = 'NAME',
  /** Sort microsites by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort microsites by publication date. */
  PublicationDate = 'PUBLICATION_DATE'
}

export type MicrositeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort microsites by the selected field. */
  field: MicrositeSortField;
};

export type MicrositeTranslatableContent = Node & {
  __typename?: 'MicrositeTranslatableContent';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Represents a Microsite of products. */
  microsite?: Maybe<Microsite>;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated microsite fields for the given language code. */
  translation?: Maybe<MicrositeTranslation>;
};


export type MicrositeTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for microsite. */
export type MicrositeTranslate = {
  __typename?: 'MicrositeTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  microsite?: Maybe<MicrositeTranslatableContent>;
  translationErrors: Array<TranslationError>;
};

export type MicrositeTranslation = Node & {
  __typename?: 'MicrositeTranslation';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/** Updates a microsite. */
export type MicrositeUpdate = {
  __typename?: 'MicrositeUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  microsite?: Maybe<Microsite>;
  micrositeErrors: Array<ProductError>;
};

export enum MicrositeVendorType {
  Affiliate = 'AFFILIATE',
  Seller = 'SELLER'
}

/** Represents amount of money in specific currency. */
export type Money = {
  __typename?: 'Money';
  /** Amount of money. */
  amount: Scalars['Float'];
  /** Currency code. */
  currency: Scalars['String'];
  /**
   * Money formatted according to the current locale.
   * @deprecated Price formatting according to the current locale should be handled by the frontend client. This field will be removed after 2020-07-31.
   */
  localized: Scalars['String'];
};

export type MoneyInput = {
  amount?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
};

/** Represents a range of amounts of money. */
export type MoneyRange = {
  __typename?: 'MoneyRange';
  /** Lower bound of a price range. */
  start?: Maybe<Money>;
  /** Upper bound of a price range. */
  stop?: Maybe<Money>;
};

export type MoveProductInput = {
  /** The ID of the product to move. */
  productId: Scalars['ID'];
  /** The relative sorting position of the product (from -inf to +inf) starting from the first given product's actual position.1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type MultiSellerShippingMethod = {
  __typename?: 'MultiSellerShippingMethod';
  seller?: Maybe<Scalars['Int']>;
  sellerName?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<ShippingMethod>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new address for the customer. */
  accountAddressCreate?: Maybe<AccountAddressCreate>;
  /** Delete an address of the logged-in user. */
  accountAddressDelete?: Maybe<AccountAddressDelete>;
  /** Updates an address of the logged-in user. */
  accountAddressUpdate?: Maybe<AccountAddressUpdate>;
  /** Remove user account. */
  accountDelete?: Maybe<AccountDelete>;
  /** Register a new user. */
  accountRegister?: Maybe<AccountRegister>;
  /** Sends an email with the account removal link for the logged-in user. */
  accountRequestDeletion?: Maybe<AccountRequestDeletion>;
  /** Sets a default address for the authenticated user. */
  accountSetDefaultAddress?: Maybe<AccountSetDefaultAddress>;
  /** Updates the account of the logged-in user. */
  accountUpdate?: Maybe<AccountUpdate>;
  /**
   * Updates metadata of the logged-in user.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  accountUpdateMeta?: Maybe<AccountUpdateMeta>;
  addProductReviewComment?: Maybe<AddProductReviewComment>;
  /** Creates user address. */
  addressCreate?: Maybe<AddressCreate>;
  /** Deletes an address. */
  addressDelete?: Maybe<AddressDelete>;
  /** Sets a default address for the given user. */
  addressSetDefault?: Maybe<AddressSetDefault>;
  /** Updates an address. */
  addressUpdate?: Maybe<AddressUpdate>;
  /** Create an affiliate avatar. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  affiliateAvatarUpdate?: Maybe<AffiliateAvatarUpdate>;
  /** Deletes affiliates. */
  affiliateBulkDelete?: Maybe<AffiliateBulkDelete>;
  /** Activate or deactivate affiliate codes. */
  affiliateCodeBulkSetActive?: Maybe<AffiliateCodeBulkSetActive>;
  /** Updates an affiliate code channel */
  affiliateCodeChannelUpdate?: Maybe<AffiliateCodeChannelUpdate>;
  /** Creates a new affiliate code */
  affiliateCodeCreate?: Maybe<AffiliateCodeCreate>;
  /** Sets whether code is active */
  affiliateCodeSetActive?: Maybe<AffiliateCodeSetActive>;
  /** Increments affiliate code uses */
  affiliateCodeUse?: Maybe<AffiliateCodeUse>;
  /** Creates a new affiliate. */
  affiliateCreate?: Maybe<AffiliateCreate>;
  /** Deletes a affiliate. */
  affiliateDelete?: Maybe<AffiliateDelete>;
  /** Updates an existing affiliate. */
  affiliateUpdate?: Maybe<AffiliateUpdate>;
  /** Deletes agreements. */
  agreementBulkDelete?: Maybe<AgreementBulkDelete>;
  /** Publish agreements. */
  agreementBulkPublish?: Maybe<AgreementBulkPublish>;
  /** Creates a new agreement. */
  agreementCreate?: Maybe<AgreementCreate>;
  /** Deletes a agreement. */
  agreementDelete?: Maybe<AgreementDelete>;
  /** Creates/Updates translations for Agreement. */
  agreementTranslate?: Maybe<AgreementTranslate>;
  /** Updates an existing agreement. */
  agreementUpdate?: Maybe<AgreementUpdate>;
  /** Activate the app. */
  appActivate?: Maybe<AppActivate>;
  /** Creates a new app. */
  appCreate?: Maybe<AppCreate>;
  /** Deactivate the app. */
  appDeactivate?: Maybe<AppDeactivate>;
  /** Deletes an app. */
  appDelete?: Maybe<AppDelete>;
  /** Delete failed installation. */
  appDeleteFailedInstallation?: Maybe<AppDeleteFailedInstallation>;
  /** Fetch and validate manifest. */
  appFetchManifest?: Maybe<AppFetchManifest>;
  /** Install new app by using app manifest. */
  appInstall?: Maybe<AppInstall>;
  /** Retry failed installation of new app. */
  appRetryInstall?: Maybe<AppRetryInstall>;
  /** Creates a new token. */
  appTokenCreate?: Maybe<AppTokenCreate>;
  /** Deletes an authentication token assigned to app. */
  appTokenDelete?: Maybe<AppTokenDelete>;
  /** Verify provided app token. */
  appTokenVerify?: Maybe<AppTokenVerify>;
  /** Updates an existing app. */
  appUpdate?: Maybe<AppUpdate>;
  /** Assigns storefront's navigation menus. */
  assignNavigation?: Maybe<AssignNavigation>;
  /** Assign attributes to a given product type. */
  attributeAssign?: Maybe<AttributeAssign>;
  /** Deletes attributes. */
  attributeBulkDelete?: Maybe<AttributeBulkDelete>;
  /**
   * Clears public metadata item for attribute.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeClearMetadata?: Maybe<AttributeClearMeta>;
  /**
   * Clears public metadata item for attribute.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeClearPrivateMetadata?: Maybe<AttributeClearPrivateMeta>;
  /** Creates an attribute. */
  attributeCreate?: Maybe<AttributeCreate>;
  /** Deletes an attribute. */
  attributeDelete?: Maybe<AttributeDelete>;
  /** Reorder the values of an attribute. */
  attributeReorderValues?: Maybe<AttributeReorderValues>;
  /** Creates/Updates translations for attribute. */
  attributeTranslate?: Maybe<AttributeTranslate>;
  /** Un-assign attributes from a given product type. */
  attributeUnassign?: Maybe<AttributeUnassign>;
  /** Updates attribute. */
  attributeUpdate?: Maybe<AttributeUpdate>;
  /**
   * Update public metadata for attribute.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeUpdateMetadata?: Maybe<AttributeUpdateMeta>;
  /**
   * Update public metadata for attribute.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeUpdatePrivateMetadata?: Maybe<AttributeUpdatePrivateMeta>;
  /** Creates attribute values for a given attribute. */
  attributeValueBulkCreate?: Maybe<AttributeValueBulkCreate>;
  /** Deletes values of attributes. */
  attributeValueBulkDelete?: Maybe<AttributeValueBulkDelete>;
  /** Creates a value for an attribute. */
  attributeValueCreate?: Maybe<AttributeValueCreate>;
  /** Deletes a value of an attribute. */
  attributeValueDelete?: Maybe<AttributeValueDelete>;
  /** Creates/Updates translations for attribute value. */
  attributeValueTranslate?: Maybe<AttributeValueTranslate>;
  /** Updates value of an attribute. */
  attributeValueUpdate?: Maybe<AttributeValueUpdate>;
  /** Adds an authorization key. */
  authorizationKeyAdd?: Maybe<AuthorizationKeyAdd>;
  /** Deletes an authorization key. */
  authorizationKeyDelete?: Maybe<AuthorizationKeyDelete>;
  /** Processes return requests by grabbing the return status and creating resulting Fulfillment and FulfillmentLine instances. */
  bulkFulfillmentReturn?: Maybe<BulkFulfillmentReturn>;
  /** Deletes categories. */
  categoryBulkDelete?: Maybe<CategoryBulkDelete>;
  /**
   * Clears public metadata for category.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryClearMetadata?: Maybe<CategoryClearMeta>;
  /**
   * Clears private metadata for category.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryClearPrivateMetadata?: Maybe<CategoryClearPrivateMeta>;
  /** Creates a new category. */
  categoryCreate?: Maybe<CategoryCreate>;
  /** Deletes a category. */
  categoryDelete?: Maybe<CategoryDelete>;
  /** Creates/Updates translations for Category. */
  categoryTranslate?: Maybe<CategoryTranslate>;
  /** Updates a category. */
  categoryUpdate?: Maybe<CategoryUpdate>;
  /**
   * Update public metadata for category.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryUpdateMetadata?: Maybe<CategoryUpdateMeta>;
  /**
   * Update private metadata for category.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryUpdatePrivateMetadata?: Maybe<CategoryUpdatePrivateMeta>;
  /** Creates a new channel */
  channelCreate?: Maybe<ChannelCreate>;
  /** Updates a channel. */
  channelUpdate?: Maybe<ChannelUpdate>;
  /** Adds a gift card or a voucher to a checkout. */
  checkoutAddPromoCode?: Maybe<CheckoutAddPromoCode>;
  /** Update billing address in the existing checkout. */
  checkoutBillingAddressUpdate?: Maybe<CheckoutBillingAddressUpdate>;
  /**
   * Clear metadata for checkout.
   * @deprecated Use the `deleteMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutClearMetadata?: Maybe<CheckoutClearMeta>;
  /**
   * Clear private metadata for checkout.
   * @deprecated Use the `deletePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutClearPrivateMetadata?: Maybe<CheckoutClearPrivateMeta>;
  /** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
  checkoutComplete?: Maybe<CheckoutComplete>;
  /** Create a new checkout. */
  checkoutCreate?: Maybe<CheckoutCreate>;
  /** Sets the customer as the owner of the checkout. */
  checkoutCustomerAttach?: Maybe<CheckoutCustomerAttach>;
  /** Removes the user assigned as the owner of the checkout. */
  checkoutCustomerDetach?: Maybe<CheckoutCustomerDetach>;
  /** Updates email address in the existing checkout object. */
  checkoutEmailUpdate?: Maybe<CheckoutEmailUpdate>;
  /** Deletes a CheckoutLine. */
  checkoutLineDelete?: Maybe<CheckoutLineDelete>;
  /** Adds a checkout line to the existing checkout. */
  checkoutLinesAdd?: Maybe<CheckoutLinesAdd>;
  /** Updates checkout line in the existing checkout. */
  checkoutLinesUpdate?: Maybe<CheckoutLinesUpdate>;
  /** Create a new payment for given checkout. */
  checkoutPaymentCreate?: Maybe<CheckoutPaymentCreate>;
  /** Remove a gift card or a voucher from a checkout. */
  checkoutRemovePromoCode?: Maybe<CheckoutRemovePromoCode>;
  /** Updates the seller shipping methods of the checkout. */
  checkoutSellerShippingMethodsUpdate?: Maybe<CheckoutSellerShippingMethodsUpdate>;
  /** Update shipping address in the existing checkout. */
  checkoutShippingAddressUpdate?: Maybe<CheckoutShippingAddressUpdate>;
  /** Updates the shipping address of the checkout. */
  checkoutShippingMethodUpdate?: Maybe<CheckoutShippingMethodUpdate>;
  /**
   * Updates metadata for checkout.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutUpdateMetadata?: Maybe<CheckoutUpdateMeta>;
  /**
   * Updates private metadata for checkout.
   * @deprecated Use the `updatePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutUpdatePrivateMetadata?: Maybe<CheckoutUpdatePrivateMeta>;
  /** Adds products to a collection. */
  collectionAddProducts?: Maybe<CollectionAddProducts>;
  /** Deletes collections. */
  collectionBulkDelete?: Maybe<CollectionBulkDelete>;
  /** Publish collections. */
  collectionBulkPublish?: Maybe<CollectionBulkPublish>;
  /**
   * Clears public metadata for collection.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionClearMetadata?: Maybe<CollectionClearMeta>;
  /**
   * Clears private metadata item for collection.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionClearPrivateMetadata?: Maybe<CollectionClearPrivateMeta>;
  /** Creates a new collection. */
  collectionCreate?: Maybe<CollectionCreate>;
  /** Deletes a collection. */
  collectionDelete?: Maybe<CollectionDelete>;
  /** Remove products from a collection. */
  collectionRemoveProducts?: Maybe<CollectionRemoveProducts>;
  /** Reorder the products of a collection. */
  collectionReorderProducts?: Maybe<CollectionReorderProducts>;
  /** Creates/Updates translations for collection. */
  collectionTranslate?: Maybe<CollectionTranslate>;
  /** Updates a collection. */
  collectionUpdate?: Maybe<CollectionUpdate>;
  /**
   * Update public metadata for collection.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionUpdateMetadata?: Maybe<CollectionUpdateMeta>;
  /**
   * Update private metadata for collection.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionUpdatePrivateMetadata?: Maybe<CollectionUpdatePrivateMeta>;
  /** Confirm user account with token sent by email during registration. */
  confirmAccount?: Maybe<ConfirmAccount>;
  /** Confirm the email change of the logged-in user. */
  confirmEmailChange?: Maybe<ConfirmEmailChange>;
  createCoreData?: Maybe<CreateCoreData>;
  createDesignerData?: Maybe<CreateDesignerData>;
  createHashtag?: Maybe<CreateHashtag>;
  createMention?: Maybe<CreateMention>;
  createProductReview?: Maybe<CreateProductReview>;
  createSellerData?: Maybe<CreateSellerData>;
  createSellerShell?: Maybe<CreateSellerShell>;
  createSellerUserMapping?: Maybe<CreateSellerUserMapping>;
  createVaultData?: Maybe<CreateVaultData>;
  /** Creates new warehouse. */
  createWarehouse?: Maybe<WarehouseCreate>;
  /** Deletes customers. */
  customerBulkDelete?: Maybe<CustomerBulkDelete>;
  /** Creates a new customer. */
  customerCreate?: Maybe<CustomerCreate>;
  /** Deletes a customer. */
  customerDelete?: Maybe<CustomerDelete>;
  /** Updates an existing customer. */
  customerUpdate?: Maybe<CustomerUpdate>;
  deleteBrandingImages?: Maybe<DeleteBrandingImages>;
  /** Delete metadata of an object. */
  deleteMetadata?: Maybe<DeleteMetadata>;
  /** Delete object's private metadata. */
  deletePrivateMetadata?: Maybe<DeletePrivateMetadata>;
  /** Deletes selected warehouse. */
  deleteWarehouse?: Maybe<WarehouseDelete>;
  /** Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  digitalContentCreate?: Maybe<DigitalContentCreate>;
  /** Remove digital content assigned to given variant. */
  digitalContentDelete?: Maybe<DigitalContentDelete>;
  /** Update digital content. */
  digitalContentUpdate?: Maybe<DigitalContentUpdate>;
  /** Generate new URL to digital content. */
  digitalContentUrlCreate?: Maybe<DigitalContentUrlCreate>;
  /** Creates a new directory. */
  directoryCreate?: Maybe<DirectoryCreate>;
  /** Deletes draft orders. */
  draftOrderBulkDelete?: Maybe<DraftOrderBulkDelete>;
  /** Completes creating an order. */
  draftOrderComplete?: Maybe<DraftOrderComplete>;
  /** Creates a new draft order. */
  draftOrderCreate?: Maybe<DraftOrderCreate>;
  /** Deletes a draft order. */
  draftOrderDelete?: Maybe<DraftOrderDelete>;
  /** Deletes an order line from a draft order. */
  draftOrderLineDelete?: Maybe<DraftOrderLineDelete>;
  /** Updates an order line of a draft order. */
  draftOrderLineUpdate?: Maybe<DraftOrderLineUpdate>;
  /** Deletes order lines. */
  draftOrderLinesBulkDelete?: Maybe<DraftOrderLinesBulkDelete>;
  /** Create order lines for a draft order. */
  draftOrderLinesCreate?: Maybe<DraftOrderLinesCreate>;
  /** Updates a draft order. */
  draftOrderUpdate?: Maybe<DraftOrderUpdate>;
  /** Register a new user. */
  enhancedAccountRegister?: Maybe<EnhancedAccountRegister>;
  /** Export catalog. */
  exportCatalog?: Maybe<ExportCatalog>;
  /** Export customer list. */
  exportCustomers?: Maybe<ExportCustomers>;
  /** Export products to csv file. */
  exportProducts?: Maybe<ExportProducts>;
  /** Activate a gift card. */
  giftCardActivate?: Maybe<GiftCardActivate>;
  /** Creates a new gift card. */
  giftCardCreate?: Maybe<GiftCardCreate>;
  /** Deactivate a gift card. */
  giftCardDeactivate?: Maybe<GiftCardDeactivate>;
  /** Update a gift card. */
  giftCardUpdate?: Maybe<GiftCardUpdate>;
  /** Adds products to a grouped product. */
  groupedProductAddProducts?: Maybe<GroupedProductAddProducts>;
  /** Remove products from a grouped product. */
  groupedProductRemoveProducts?: Maybe<GroupedProductRemoveProducts>;
  /** Updates homepage collection of the shop. */
  homepageCollectionUpdate?: Maybe<HomepageCollectionUpdate>;
  /** Import foreign catalog. */
  importCatalog?: Maybe<ImportCatalog>;
  /** Import products with csv file. */
  importProducts?: Maybe<ImportProducts>;
  /** Import vins with csv file. */
  importVinFile?: Maybe<ImportVinFile>;
  /** Creates a ready to send invoice. */
  invoiceCreate?: Maybe<InvoiceCreate>;
  /** Deletes an invoice. */
  invoiceDelete?: Maybe<InvoiceDelete>;
  /** Request an invoice for the order using plugin. */
  invoiceRequest?: Maybe<InvoiceRequest>;
  /** Requests deletion of an invoice. */
  invoiceRequestDelete?: Maybe<InvoiceRequestDelete>;
  /** Send an invoice by email. */
  invoiceSendEmail?: Maybe<InvoiceSendEmail>;
  /** Updates an invoice. */
  invoiceUpdate?: Maybe<InvoiceUpdate>;
  /** Geocode locations */
  locationGeocode?: Maybe<LocationGeocode>;
  /** Search locations */
  locationSearch?: Maybe<LocationSearch>;
  /** Map orders to a new nautical order. */
  mapOrdersToNauticalOrder?: Maybe<MapOrdersToNauticalOrder>;
  /** Updates marketplace configuration. */
  marketplaceConfigurationUpdate?: Maybe<MarketplaceConfigurationUpdate>;
  /** Updates marketplace notifications settings. */
  marketplaceNotificationsUpdate?: Maybe<MarketplaceNotificationsUpdate>;
  /** Deletes menus. */
  menuBulkDelete?: Maybe<MenuBulkDelete>;
  /** Creates a new Menu. */
  menuCreate?: Maybe<MenuCreate>;
  /** Deletes a menu. */
  menuDelete?: Maybe<MenuDelete>;
  /** Deletes menu items. */
  menuItemBulkDelete?: Maybe<MenuItemBulkDelete>;
  /** Creates a new menu item. */
  menuItemCreate?: Maybe<MenuItemCreate>;
  /** Deletes a menu item. */
  menuItemDelete?: Maybe<MenuItemDelete>;
  /** Moves items of menus. */
  menuItemMove?: Maybe<MenuItemMove>;
  /** Creates/Updates translations for Menu Item. */
  menuItemTranslate?: Maybe<MenuItemTranslate>;
  /** Updates a menu item. */
  menuItemUpdate?: Maybe<MenuItemUpdate>;
  /** Updates a menu. */
  menuUpdate?: Maybe<MenuUpdate>;
  /** Adds products to a microsite. */
  micrositeAddProducts?: Maybe<MicrositeAddProducts>;
  /** Deletes microsites. */
  micrositeBulkDelete?: Maybe<MicrositeBulkDelete>;
  /** Publish microsites. */
  micrositeBulkPublish?: Maybe<MicrositeBulkPublish>;
  /** Creates a new microsite. */
  micrositeCreate?: Maybe<MicrositeCreate>;
  /** Deletes a microsite. */
  micrositeDelete?: Maybe<MicrositeDelete>;
  /** Remove products from a microsite. */
  micrositeRemoveProducts?: Maybe<MicrositeRemoveProducts>;
  /** Reorder the products of a microsite. */
  micrositeReorderProducts?: Maybe<MicrositeReorderProducts>;
  /** Creates/Updates translations for microsite. */
  micrositeTranslate?: Maybe<MicrositeTranslate>;
  /** Updates a microsite. */
  micrositeUpdate?: Maybe<MicrositeUpdate>;
  /** Updates nautical configuration. */
  nauticalConfigurationUpdate?: Maybe<NauticalConfigurationUpdate>;
  /** Deletes draft orders. */
  nauticalDraftOrderBulkDelete?: Maybe<NauticalDraftOrderBulkDelete>;
  /** Completes creating an order. */
  nauticalDraftOrderComplete?: Maybe<NauticalDraftOrderComplete>;
  /** Creates a new Nautical draft order. */
  nauticalDraftOrderCreate?: Maybe<NauticalDraftOrderCreate>;
  /** Deletes a draft order. */
  nauticalDraftOrderDelete?: Maybe<NauticalDraftOrderDelete>;
  /** Deletes an order line from a draft order. */
  nauticalDraftOrderLineDelete?: Maybe<NauticalDraftOrderLineDelete>;
  /** Updates an order line of a draft order. */
  nauticalDraftOrderLineUpdate?: Maybe<NauticalDraftOrderLineUpdate>;
  /** Deletes order lines. */
  nauticalDraftOrderLinesBulkDelete?: Maybe<NauticalDraftOrderLinesBulkDelete>;
  /** Create order lines for a draft order. */
  nauticalDraftOrderLinesCreate?: Maybe<NauticalDraftOrderLinesCreate>;
  /** Updates a draft nautical order. */
  nauticalDraftOrderUpdate?: Maybe<NauticalDraftOrderUpdate>;
  /** Adds note to the order. */
  nauticalOrderAddNote?: Maybe<NauticalOrderAddNote>;
  /** Cancel an order. */
  nauticalOrderCancel?: Maybe<NauticalOrderCancel>;
  /** Capture a nautical order. */
  nauticalOrderCapture?: Maybe<NauticalOrderCapture>;
  /** Updates a marketplace order channel. */
  nauticalOrderChannelUpdate?: Maybe<NauticalOrderChannelUpdate>;
  /** Cancels nautical order lines, associated order lines, and removes allocations for that order line. */
  nauticalOrderLineBulkCancel?: Maybe<NauticalOrderLineBulkCancel>;
  /** Mark order as manually paid. */
  nauticalOrderMarkAsPaid?: Maybe<NauticalOrderMarkAsPaid>;
  /** Refund a nautical order. */
  nauticalOrderRefund?: Maybe<NauticalOrderRefund>;
  /** Replace a nautical order line. */
  nauticalOrderReplaceOrderLine?: Maybe<NauticalOrderReplaceOrderLine>;
  /** Adds return notification note to the order. */
  nauticalOrderReturnFromStorefrontNotification?: Maybe<NauticalOrderReturnFromStorefrontNotification>;
  /** Adds return notification note to the order. */
  nauticalOrderReturnNotification?: Maybe<NauticalOrderReturnNotification>;
  /** Updates an order. */
  nauticalOrderUpdate?: Maybe<NauticalOrderUpdate>;
  /** Updates a shipping method of the order. */
  nauticalOrderUpdateShipping?: Maybe<NauticalOrderUpdateShipping>;
  /** Void a nautical order. */
  nauticalOrderVoid?: Maybe<NauticalOrderVoid>;
  /** Adds note to the order. */
  orderAddNote?: Maybe<OrderAddNote>;
  /** Cancels orders. */
  orderBulkCancel?: Maybe<OrderBulkCancel>;
  /** Cancel an order. */
  orderCancel?: Maybe<OrderCancel>;
  /** Capture an order. */
  orderCapture?: Maybe<OrderCapture>;
  /** Updates an order channel */
  orderChannelUpdate?: Maybe<OrderChannelUpdate>;
  /**
   * Clears stored metadata value.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderClearMeta?: Maybe<OrderClearMeta>;
  /**
   * Clears stored private metadata value.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderClearPrivateMeta?: Maybe<OrderClearPrivateMeta>;
  /** Creates new fulfillments for an order. */
  orderFulfill?: Maybe<OrderFulfill>;
  /** Cancels existing fulfillment and optionally restocks items. */
  orderFulfillmentCancel?: Maybe<FulfillmentCancel>;
  /**
   * Clears metadata for fulfillment.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentClearMeta?: Maybe<FulfillmentClearMeta>;
  /**
   * Clears private metadata for fulfillment.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentClearPrivateMeta?: Maybe<FulfillmentClearPrivateMeta>;
  /** Returns selected quantity from fulfillment lines and restocks items. */
  orderFulfillmentReturn?: Maybe<FulfillmentReturn>;
  /**
   * Updates metadata for fulfillment.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentUpdateMeta?: Maybe<FulfillmentUpdateMeta>;
  /**
   * Updates metadata for fulfillment.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentUpdatePrivateMeta?: Maybe<FulfillmentUpdatePrivateMeta>;
  /** Updated return status of existing fulfillment and optionally restocks items. */
  orderFulfillmentUpdateReturnStatus?: Maybe<FulfillmentReturnStatusBulkUpdate>;
  /** Updates a fulfillment for an order. */
  orderFulfillmentUpdateTracking?: Maybe<FulfillmentUpdateTracking>;
  /** Mark order as manually paid. */
  orderMarkAsPaid?: Maybe<OrderMarkAsPaid>;
  /** Refund an order. */
  orderRefund?: Maybe<OrderRefund>;
  /** Adds return notification note to the order. */
  orderReturnNotification?: Maybe<OrderReturnNotification>;
  /** Updates an order. */
  orderUpdate?: Maybe<OrderUpdate>;
  /**
   * Updates meta for order.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderUpdateMeta?: Maybe<OrderUpdateMeta>;
  /**
   * Updates private meta for order.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderUpdatePrivateMeta?: Maybe<OrderUpdatePrivateMeta>;
  /** Updates a shipping method of the order. */
  orderUpdateShipping?: Maybe<OrderUpdateShipping>;
  /** Void an order. */
  orderVoid?: Maybe<OrderVoid>;
  /** Deletes pages. */
  pageBulkDelete?: Maybe<PageBulkDelete>;
  /** Publish pages. */
  pageBulkPublish?: Maybe<PageBulkPublish>;
  /** Creates a new page. */
  pageCreate?: Maybe<PageCreate>;
  /** Deletes a page. */
  pageDelete?: Maybe<PageDelete>;
  /** Creates/Updates translations for Page. */
  pageTranslate?: Maybe<PageTranslate>;
  /** Updates an existing page. */
  pageUpdate?: Maybe<PageUpdate>;
  /** Change the password of the logged in user. */
  passwordChange?: Maybe<PasswordChange>;
  /** Captures the authorized payment amount. */
  paymentCapture?: Maybe<PaymentCapture>;
  /** Refunds the captured payment amount. */
  paymentRefund?: Maybe<PaymentRefund>;
  /** Voids the authorized payment. */
  paymentVoid?: Maybe<PaymentVoid>;
  /** Archive payouts. */
  payoutBulkArchive?: Maybe<PayoutBulkArchive>;
  /** Creates a new payout. */
  payoutCreate?: Maybe<PayoutCreate>;
  /** Modifies the dates of a payout */
  payoutDatesUpdate?: Maybe<PayoutDatesUpdate>;
  /** Modifies the status of a payout */
  payoutStatusUpdate?: Maybe<PayoutStatusUpdate>;
  /** Update the vendor payouts connected to the given payout with adjustments and penalties */
  payoutUpdate?: Maybe<PayoutUpdate>;
  /** Create new permission group. */
  permissionGroupCreate?: Maybe<PermissionGroupCreate>;
  /** Delete permission group. */
  permissionGroupDelete?: Maybe<PermissionGroupDelete>;
  /** Update permission group. */
  permissionGroupUpdate?: Maybe<PermissionGroupUpdate>;
  /** Delete plugin flow. */
  pluginFlowDelete?: Maybe<PluginFlowDelete>;
  /** Update plugin flow. */
  pluginFlowUpdate?: Maybe<PluginFlowUpdate>;
  /** Update plugin sync configuration. */
  pluginSyncUpdate?: Maybe<PluginSyncUpdate>;
  /** Update plugin configuration. */
  pluginUpdate?: Maybe<PluginUpdate>;
  /** Update product category for multiple products */
  productBulkCategoryUpdate?: Maybe<ProductBulkCategoryUpdate>;
  /** Deletes products. */
  productBulkDelete?: Maybe<ProductBulkDelete>;
  /** Publish products. */
  productBulkPublish?: Maybe<ProductBulkPublish>;
  /**
   * Clears public metadata item for product.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productClearMetadata?: Maybe<ProductClearMeta>;
  /**
   * Clears private metadata item for product.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productClearPrivateMetadata?: Maybe<ProductClearPrivateMeta>;
  /** Creates a new product. */
  productCreate?: Maybe<ProductCreate>;
  /** Deletes a product. */
  productDelete?: Maybe<ProductDelete>;
  /** Toggle enabled value for product expiration django celery beat task */
  productExpirationCheckTaskUpdate?: Maybe<ProductExpirationCheckTaskUpdate>;
  /** Deletes product images. */
  productImageBulkDelete?: Maybe<ProductImageBulkDelete>;
  /** Create a product image. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  productImageCreate?: Maybe<ProductImageCreate>;
  /** Deletes a product image. */
  productImageDelete?: Maybe<ProductImageDelete>;
  /** Changes ordering of the product image. */
  productImageReorder?: Maybe<ProductImageReorder>;
  /** Updates a product image. */
  productImageUpdate?: Maybe<ProductImageUpdate>;
  /** Create a new location for the product. */
  productLocationCreate?: Maybe<ProductLocationCreate>;
  /** Delete a location for a product. */
  productLocationDelete?: Maybe<ProductLocationDelete>;
  /** Updates a location for a product. */
  productLocationUpdate?: Maybe<ProductLocationUpdate>;
  /** Set product availability for purchase date. */
  productSetAvailabilityForPurchase?: Maybe<ProductSetAvailabilityForPurchase>;
  /** Sets a location type. */
  productSetLocationType?: Maybe<ProductSetLocationType>;
  /** Creates/Updates translations for Product. */
  productTranslate?: Maybe<ProductTranslate>;
  /** Deletes product types. */
  productTypeBulkDelete?: Maybe<ProductTypeBulkDelete>;
  /**
   * Clears public metadata for product type.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeClearMetadata?: Maybe<ProductTypeClearMeta>;
  /**
   * Clears private metadata for product type.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeClearPrivateMetadata?: Maybe<ProductTypeClearPrivateMeta>;
  /** Creates a new product type. */
  productTypeCreate?: Maybe<ProductTypeCreate>;
  /** Deletes a product type. */
  productTypeDelete?: Maybe<ProductTypeDelete>;
  /** Reorder the attributes of a product type. */
  productTypeReorderAttributes?: Maybe<ProductTypeReorderAttributes>;
  /** Updates an existing product type. */
  productTypeUpdate?: Maybe<ProductTypeUpdate>;
  /**
   * Update public metadata for product type.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeUpdateMetadata?: Maybe<ProductTypeUpdateMeta>;
  /**
   * Update private metadata for product type.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeUpdatePrivateMetadata?: Maybe<ProductTypeUpdatePrivateMeta>;
  /** Updates an existing product. */
  productUpdate?: Maybe<ProductUpdate>;
  /**
   * Update public metadata for product.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productUpdateMetadata?: Maybe<ProductUpdateMeta>;
  /**
   * Update private metadata for product.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productUpdatePrivateMetadata?: Maybe<ProductUpdatePrivateMeta>;
  /** Creates product variants for a given product. */
  productVariantBulkCreate?: Maybe<ProductVariantBulkCreate>;
  /** Deletes product variants. */
  productVariantBulkDelete?: Maybe<ProductVariantBulkDelete>;
  /**
   * Clears public metadata for product variant.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantClearMetadata?: Maybe<ProductVariantClearMeta>;
  /**
   * Clears private metadata for product variant.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantClearPrivateMetadata?: Maybe<ProductVariantClearPrivateMeta>;
  /** Creates a new variant for a product. */
  productVariantCreate?: Maybe<ProductVariantCreate>;
  /** Deletes a product variant. */
  productVariantDelete?: Maybe<ProductVariantDelete>;
  /** Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook. */
  productVariantReorder?: Maybe<ProductVariantReorder>;
  /** Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook. */
  productVariantSetDefault?: Maybe<ProductVariantSetDefault>;
  /** Creates stocks for product variant. */
  productVariantStocksCreate?: Maybe<ProductVariantStocksCreate>;
  /** Delete stocks from product variant. */
  productVariantStocksDelete?: Maybe<ProductVariantStocksDelete>;
  /** Update stocks for product variant. */
  productVariantStocksUpdate?: Maybe<ProductVariantStocksUpdate>;
  /** Creates/Updates translations for Product Variant. */
  productVariantTranslate?: Maybe<ProductVariantTranslate>;
  /** Updates an existing variant for product. */
  productVariantUpdate?: Maybe<ProductVariantUpdate>;
  /**
   * Update public metadata for product variant.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantUpdateMetadata?: Maybe<ProductVariantUpdateMeta>;
  /**
   * Update private metadata for product variant.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantUpdatePrivateMetadata?: Maybe<ProductVariantUpdatePrivateMeta>;
  /** Request email change of the logged in user. */
  requestEmailChange?: Maybe<RequestEmailChange>;
  /** Sends an email with the account password modification link. */
  requestPasswordReset?: Maybe<RequestPasswordReset>;
  /** Deletes sales. */
  saleBulkDelete?: Maybe<SaleBulkDelete>;
  /** Adds products, categories, collections to a voucher. */
  saleCataloguesAdd?: Maybe<SaleAddCatalogues>;
  /** Removes products, categories, collections from a sale. */
  saleCataloguesRemove?: Maybe<SaleRemoveCatalogues>;
  /** Creates a new sale. */
  saleCreate?: Maybe<SaleCreate>;
  /** Deletes a sale. */
  saleDelete?: Maybe<SaleDelete>;
  /** Creates/updates translations for a sale. */
  saleTranslate?: Maybe<SaleTranslate>;
  /** Updates a sale. */
  saleUpdate?: Maybe<SaleUpdate>;
  sellerAddNote?: Maybe<CreateSellerNote>;
  /** Creates seller address. */
  sellerAddressCreate?: Maybe<SellerAddressCreate>;
  /** Deletes an address. */
  sellerAddressDelete?: Maybe<SellerAddressDelete>;
  /** Sets a default address for the given user. */
  sellerAddressSetDefault?: Maybe<SellerAddressSetDefault>;
  /** Updates an address. */
  sellerAddressUpdate?: Maybe<SellerAddressUpdate>;
  /** Create a seller logo. Only for MP Admin, MP Staff, or the seller. This mutation must be sent as a 'multipart' request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  sellerLogoUpdate?: Maybe<SellerLogoUpdate>;
  /**
   * Clear private metadata for a service account.
   * @deprecated Use the `deletePrivateMetadata` mutation with App instead.This field will be removed after 2020-07-31.
   */
  serviceAccountClearPrivateMetadata?: Maybe<ServiceAccountClearPrivateMeta>;
  /**
   * Creates a new service account.
   * @deprecated Use the `appCreate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountCreate?: Maybe<ServiceAccountCreate>;
  /**
   * Deletes a service account.
   * @deprecated Use the `appDelete` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountDelete?: Maybe<ServiceAccountDelete>;
  /**
   * Creates a new token.
   * @deprecated Use the `appTokenCreate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountTokenCreate?: Maybe<ServiceAccountTokenCreate>;
  /**
   * Deletes an authentication token assigned to service account.
   * @deprecated Use the `appTokenDelete` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountTokenDelete?: Maybe<ServiceAccountTokenDelete>;
  /**
   * Updates an existing service account.
   * @deprecated Use the `appUpdate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountUpdate?: Maybe<ServiceAccountUpdate>;
  /**
   * Updates private metadata for a service account.
   * @deprecated Use the `updatePrivateMetadata` mutation with App instead.This field will be removed after 2020-07-31.
   */
  serviceAccountUpdatePrivateMetadata?: Maybe<ServiceAccountUpdatePrivateMeta>;
  /** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
  setPassword?: Maybe<SetPassword>;
  /** Deletes shipping prices. */
  shippingPriceBulkDelete?: Maybe<ShippingPriceBulkDelete>;
  /** Creates a new shipping price. */
  shippingPriceCreate?: Maybe<ShippingPriceCreate>;
  /** Deletes a shipping price. */
  shippingPriceDelete?: Maybe<ShippingPriceDelete>;
  /** Creates/Updates translations for shipping method. */
  shippingPriceTranslate?: Maybe<ShippingPriceTranslate>;
  /** Updates a new shipping price. */
  shippingPriceUpdate?: Maybe<ShippingPriceUpdate>;
  /** Deletes shipping zones. */
  shippingZoneBulkDelete?: Maybe<ShippingZoneBulkDelete>;
  /** Creates a new shipping zone. */
  shippingZoneCreate?: Maybe<ShippingZoneCreate>;
  /** Deletes a shipping zone. */
  shippingZoneDelete?: Maybe<ShippingZoneDelete>;
  /** Updates a new shipping zone. */
  shippingZoneUpdate?: Maybe<ShippingZoneUpdate>;
  /** Update the shop's address. If the `null` value is passed, the currently selected address will be deleted. */
  shopAddressUpdate?: Maybe<ShopAddressUpdate>;
  /** Updates site domain of the shop. */
  shopDomainUpdate?: Maybe<ShopDomainUpdate>;
  /** Fetch tax rates. */
  shopFetchTaxRates?: Maybe<ShopFetchTaxRates>;
  /** Creates/Updates translations for Shop Settings. */
  shopSettingsTranslate?: Maybe<ShopSettingsTranslate>;
  /** Updates shop settings. */
  shopSettingsUpdate?: Maybe<ShopSettingsUpdate>;
  /** Deletes sites. */
  siteBulkDelete?: Maybe<SiteBulkDelete>;
  /** Creates a new site. */
  siteCreate?: Maybe<SiteCreate>;
  /** Updates a site. */
  siteUpdate?: Maybe<SiteUpdate>;
  /** Deletes staff users. */
  staffBulkDelete?: Maybe<StaffBulkDelete>;
  /** Creates a new staff user. */
  staffCreate?: Maybe<StaffCreate>;
  /** Deletes a staff user. */
  staffDelete?: Maybe<StaffDelete>;
  /** Creates a new staff notification recipient. */
  staffNotificationRecipientCreate?: Maybe<StaffNotificationRecipientCreate>;
  /** Delete staff notification recipient. */
  staffNotificationRecipientDelete?: Maybe<StaffNotificationRecipientDelete>;
  /** Updates a staff notification recipient. */
  staffNotificationRecipientUpdate?: Maybe<StaffNotificationRecipientUpdate>;
  /** Updates an existing staff user. */
  staffUpdate?: Maybe<StaffUpdate>;
  /** Submit a rating and review for a product. */
  submitRatingAndReview?: Maybe<SubmitRatingAndReview>;
  /** Create JWT token. */
  tokenCreate?: Maybe<CreateToken>;
  /** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
  tokenRefresh?: Maybe<RefreshToken>;
  /** Verify JWT token. */
  tokenVerify?: Maybe<VerifyToken>;
  /** Deactivate all JWT tokens of the currently authenticated user. */
  tokensDeactivateAll?: Maybe<DeactivateAllUserTokens>;
  updateBranding?: Maybe<UpdateBranding>;
  updateCoreData?: Maybe<UpdateCoreData>;
  updateDesignerData?: Maybe<UpdateDesignerData>;
  /** Updates metadata of an object. */
  updateMetadata?: Maybe<UpdateMetadata>;
  /** Update whether process_pending_webhook_transactions periodic django celery beat task is enabled */
  updatePeriodicTaskEnabled?: Maybe<PeriodicTaskEnabledUpdate>;
  /** Updates private metadata of an object. */
  updatePrivateMetadata?: Maybe<UpdatePrivateMetadata>;
  /** Updates a sellers status and override information */
  updateSellerData?: Maybe<UpdateSellerData>;
  /** Updates given warehouse. */
  updateWarehouse?: Maybe<WarehouseUpdate>;
  /** Deletes a user avatar. Only for staff members. */
  userAvatarDelete?: Maybe<UserAvatarDelete>;
  /** Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  userAvatarUpdate?: Maybe<UserAvatarUpdate>;
  /** Activate or deactivate users. */
  userBulkSetActive?: Maybe<UserBulkSetActive>;
  /**
   * Clear metadata for user.
   * @deprecated Use the `deleteMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userClearMetadata?: Maybe<UserClearMeta>;
  /**
   * Clear private metadata for user.
   * @deprecated Use the `deletePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userClearPrivateMetadata?: Maybe<UserClearPrivateMeta>;
  /** Add user document. */
  userDocumentAdd?: Maybe<AddUserDocument>;
  /**
   * Updates metadata for user.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userUpdateMetadata?: Maybe<UserUpdateMeta>;
  /**
   * Updates private metadata for user.
   * @deprecated Use the `updatePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userUpdatePrivateMetadata?: Maybe<UserUpdatePrivateMeta>;
  /** Assign an image to a product variant. */
  variantImageAssign?: Maybe<VariantImageAssign>;
  /** Unassign an image from a product variant. */
  variantImageUnassign?: Maybe<VariantImageUnassign>;
  /** Adds return notification note to the order. */
  vendorOrderReturnFromStorefrontNotification?: Maybe<VendorOrderReturnFromStorefrontNotification>;
  /** Modifies the status of a vendor payout */
  vendorPayoutStatusUpdate?: Maybe<VendorPayoutStatusUpdate>;
  /** Exclude vendor payouts. */
  vendorPayoutsBulkExclude?: Maybe<VendorPayoutsBulkExclude>;
  /** Include vendor payouts. */
  vendorPayoutsBulkInclude?: Maybe<VendorPayoutsBulkInclude>;
  /** Deletes vouchers. */
  voucherBulkDelete?: Maybe<VoucherBulkDelete>;
  /** Adds products, categories, collections to a voucher. */
  voucherCataloguesAdd?: Maybe<VoucherAddCatalogues>;
  /** Removes products, categories, collections from a voucher. */
  voucherCataloguesRemove?: Maybe<VoucherRemoveCatalogues>;
  /** Creates a new voucher. */
  voucherCreate?: Maybe<VoucherCreate>;
  /** Deletes a voucher. */
  voucherDelete?: Maybe<VoucherDelete>;
  /** Creates/Updates translations for Voucher. */
  voucherTranslate?: Maybe<VoucherTranslate>;
  /** Updates a voucher. */
  voucherUpdate?: Maybe<VoucherUpdate>;
  /** Creates a new webhook subscription. */
  webhookCreate?: Maybe<WebhookCreate>;
  /** Deletes a webhook subscription. */
  webhookDelete?: Maybe<WebhookDelete>;
  /** Updates a webhook subscription. */
  webhookUpdate?: Maybe<WebhookUpdate>;
  /** Add product to the current user's wishlist. */
  wishlistAddProduct?: Maybe<WishlistAddProductMutation>;
  /** Add product variant to the current user's wishlist. */
  wishlistAddVariant?: Maybe<WishlistAddProductVariantMutation>;
  /** Remove product from the current user's wishlist. */
  wishlistRemoveProduct?: Maybe<WishlistRemoveProductMutation>;
  /** Remove product variant from the current user's wishlist. */
  wishlistRemoveVariant?: Maybe<WishlistRemoveProductVariantMutation>;
  yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints?: Maybe<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints>;
  yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord?: Maybe<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord>;
};


export type MutationAccountAddressCreateArgs = {
  input: AddressInput;
  type?: InputMaybe<AddressTypeEnum>;
};


export type MutationAccountAddressDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAccountAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};


export type MutationAccountDeleteArgs = {
  token: Scalars['String'];
};


export type MutationAccountRegisterArgs = {
  input: AccountRegisterInput;
};


export type MutationAccountRequestDeletionArgs = {
  redirectUrl: Scalars['String'];
};


export type MutationAccountSetDefaultAddressArgs = {
  id: Scalars['ID'];
  type: AddressTypeEnum;
};


export type MutationAccountUpdateArgs = {
  input: AccountInput;
};


export type MutationAccountUpdateMetaArgs = {
  input: MetaInput;
};


export type MutationAddProductReviewCommentArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input: CommentInput;
};


export type MutationAddressCreateArgs = {
  input: AddressInput;
  userId: Scalars['ID'];
};


export type MutationAddressDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAddressSetDefaultArgs = {
  addressId: Scalars['ID'];
  type: AddressTypeEnum;
  userId: Scalars['ID'];
};


export type MutationAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};


export type MutationAffiliateAvatarUpdateArgs = {
  affiliate?: InputMaybe<Scalars['ID']>;
  image: Scalars['Upload'];
};


export type MutationAffiliateBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationAffiliateCodeBulkSetActiveArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isActive: Scalars['Boolean'];
};


export type MutationAffiliateCodeChannelUpdateArgs = {
  channel?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type MutationAffiliateCodeCreateArgs = {
  input?: InputMaybe<AffiliateCodeCreateInput>;
};


export type MutationAffiliateCodeSetActiveArgs = {
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAffiliateCodeUseArgs = {
  code?: InputMaybe<Scalars['String']>;
};


export type MutationAffiliateCreateArgs = {
  input: UserCreateInput;
};


export type MutationAffiliateDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAffiliateUpdateArgs = {
  id: Scalars['ID'];
  input: AffiliateInput;
};


export type MutationAgreementBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationAgreementBulkPublishArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationAgreementCreateArgs = {
  input: AgreementInput;
};


export type MutationAgreementDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAgreementTranslateArgs = {
  id: Scalars['ID'];
  input: AgreementTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationAgreementUpdateArgs = {
  id: Scalars['ID'];
  input: AgreementInput;
};


export type MutationAppActivateArgs = {
  id: Scalars['ID'];
};


export type MutationAppCreateArgs = {
  input: AppInput;
};


export type MutationAppDeactivateArgs = {
  id: Scalars['ID'];
};


export type MutationAppDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAppDeleteFailedInstallationArgs = {
  id: Scalars['ID'];
};


export type MutationAppFetchManifestArgs = {
  manifestUrl: Scalars['String'];
};


export type MutationAppInstallArgs = {
  input: AppInstallInput;
};


export type MutationAppRetryInstallArgs = {
  activateAfterInstallation?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type MutationAppTokenCreateArgs = {
  input: AppTokenInput;
};


export type MutationAppTokenDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAppTokenVerifyArgs = {
  token: Scalars['String'];
};


export type MutationAppUpdateArgs = {
  id: Scalars['ID'];
  input: AppInput;
};


export type MutationAssignNavigationArgs = {
  menu?: InputMaybe<Scalars['ID']>;
  navigationType: NavigationType;
};


export type MutationAttributeAssignArgs = {
  operations: Array<InputMaybe<AttributeAssignInput>>;
  productTypeId: Scalars['ID'];
};


export type MutationAttributeBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationAttributeClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationAttributeClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationAttributeCreateArgs = {
  input: AttributeCreateInput;
};


export type MutationAttributeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAttributeReorderValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<InputMaybe<ReorderInput>>;
};


export type MutationAttributeTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationAttributeUnassignArgs = {
  attributeIds: Array<InputMaybe<Scalars['ID']>>;
  productTypeId: Scalars['ID'];
};


export type MutationAttributeUpdateArgs = {
  id: Scalars['ID'];
  input: AttributeUpdateInput;
};


export type MutationAttributeUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationAttributeUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationAttributeValueBulkCreateArgs = {
  attribute: Scalars['ID'];
  values: Array<InputMaybe<Scalars['String']>>;
};


export type MutationAttributeValueBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationAttributeValueCreateArgs = {
  attribute: Scalars['ID'];
  input: AttributeValueCreateInput;
};


export type MutationAttributeValueDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAttributeValueTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationAttributeValueUpdateArgs = {
  id: Scalars['ID'];
  input: AttributeValueCreateInput;
};


export type MutationAuthorizationKeyAddArgs = {
  input: AuthorizationKeyInput;
  keyType: AuthorizationKeyType;
};


export type MutationAuthorizationKeyDeleteArgs = {
  keyType: AuthorizationKeyType;
};


export type MutationBulkFulfillmentReturnArgs = {
  input?: InputMaybe<Array<InputMaybe<BulkFulfillmentReturnInput>>>;
};


export type MutationCategoryBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCategoryClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCategoryClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCategoryCreateArgs = {
  input: CategoryInput;
  parent?: InputMaybe<Scalars['ID']>;
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCategoryTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationCategoryUpdateArgs = {
  id: Scalars['ID'];
  input: CategoryInput;
};


export type MutationCategoryUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCategoryUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationChannelCreateArgs = {
  input?: InputMaybe<ChannelInput>;
};


export type MutationChannelUpdateArgs = {
  id: Scalars['ID'];
  input: ChannelInput;
};


export type MutationCheckoutAddPromoCodeArgs = {
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
};


export type MutationCheckoutBillingAddressUpdateArgs = {
  billingAddress: AddressInput;
  checkoutId: Scalars['ID'];
};


export type MutationCheckoutClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCheckoutClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCheckoutCompleteArgs = {
  affiliate?: InputMaybe<Scalars['ID']>;
  checkoutId: Scalars['ID'];
  microsite?: InputMaybe<Scalars['ID']>;
  paymentData?: InputMaybe<Scalars['JSONString']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
  storeSource?: InputMaybe<Scalars['Boolean']>;
  userOverride?: InputMaybe<Scalars['ID']>;
  vehicles?: InputMaybe<Scalars['Boolean']>;
  volumeDiscount: Scalars['Float'];
  volumeDiscountsBySeller?: InputMaybe<Array<InputMaybe<SellerVolumeDiscountInput>>>;
};


export type MutationCheckoutCreateArgs = {
  input: CheckoutCreateInput;
};


export type MutationCheckoutCustomerAttachArgs = {
  checkoutId: Scalars['ID'];
  customerId?: InputMaybe<Scalars['ID']>;
};


export type MutationCheckoutCustomerDetachArgs = {
  checkoutId: Scalars['ID'];
};


export type MutationCheckoutEmailUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
};


export type MutationCheckoutLineDeleteArgs = {
  checkoutId: Scalars['ID'];
  lineId?: InputMaybe<Scalars['ID']>;
};


export type MutationCheckoutLinesAddArgs = {
  checkoutId: Scalars['ID'];
  lines: Array<InputMaybe<CheckoutLineInput>>;
};


export type MutationCheckoutLinesUpdateArgs = {
  checkoutId: Scalars['ID'];
  lines: Array<InputMaybe<CheckoutLineInput>>;
};


export type MutationCheckoutPaymentCreateArgs = {
  checkoutId: Scalars['ID'];
  input: PaymentInput;
};


export type MutationCheckoutRemovePromoCodeArgs = {
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
};


export type MutationCheckoutSellerShippingMethodsUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  seller?: InputMaybe<Scalars['ID']>;
  shippingMethodSelection?: InputMaybe<Scalars['ID']>;
};


export type MutationCheckoutShippingAddressUpdateArgs = {
  checkoutId: Scalars['ID'];
  shippingAddress: AddressInput;
};


export type MutationCheckoutShippingMethodUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  shippingMethodId: Scalars['ID'];
};


export type MutationCheckoutUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCheckoutUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCollectionAddProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCollectionBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCollectionBulkPublishArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationCollectionClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCollectionClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCollectionCreateArgs = {
  input: CollectionCreateInput;
};


export type MutationCollectionDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCollectionRemoveProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCollectionReorderProductsArgs = {
  collectionId: Scalars['ID'];
  moves: Array<InputMaybe<MoveProductInput>>;
};


export type MutationCollectionTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationCollectionUpdateArgs = {
  id: Scalars['ID'];
  input: CollectionInput;
};


export type MutationCollectionUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCollectionUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationConfirmAccountArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmEmailChangeArgs = {
  token: Scalars['String'];
};


export type MutationCreateCoreDataArgs = {
  input: CoreDataInput;
};


export type MutationCreateDesignerDataArgs = {
  input: DesignerDataInput;
};


export type MutationCreateHashtagArgs = {
  input: HashtagInput;
};


export type MutationCreateMentionArgs = {
  input: MentionInput;
};


export type MutationCreateProductReviewArgs = {
  input: ReviewInput;
};


export type MutationCreateSellerDataArgs = {
  input: SellerInput;
};


export type MutationCreateSellerShellArgs = {
  name: Scalars['String'];
};


export type MutationCreateSellerUserMappingArgs = {
  input: SellerUserInput;
};


export type MutationCreateVaultDataArgs = {
  input: VaultInput;
};


export type MutationCreateWarehouseArgs = {
  input: WarehouseCreateInput;
};


export type MutationCustomerBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCustomerCreateArgs = {
  input: UserCreateInput;
};


export type MutationCustomerDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCustomerUpdateArgs = {
  id: Scalars['ID'];
  input: CustomerInput;
};


export type MutationDeleteBrandingImagesArgs = {
  favicon?: InputMaybe<Scalars['Boolean']>;
  icon?: InputMaybe<Scalars['Boolean']>;
  logo?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};


export type MutationDeletePrivateMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ID'];
};


export type MutationDigitalContentCreateArgs = {
  input: DigitalContentUploadInput;
  variantId: Scalars['ID'];
};


export type MutationDigitalContentDeleteArgs = {
  variantId: Scalars['ID'];
};


export type MutationDigitalContentUpdateArgs = {
  input: DigitalContentInput;
  variantId: Scalars['ID'];
};


export type MutationDigitalContentUrlCreateArgs = {
  input: DigitalContentUrlCreateInput;
};


export type MutationDirectoryCreateArgs = {
  input: DirectoryInput;
  parent?: InputMaybe<Scalars['ID']>;
};


export type MutationDraftOrderBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDraftOrderCompleteArgs = {
  channel?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  seller: Scalars['ID'];
};


export type MutationDraftOrderCreateArgs = {
  input: DraftOrderCreateInput;
};


export type MutationDraftOrderDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationDraftOrderLineDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationDraftOrderLineUpdateArgs = {
  id: Scalars['ID'];
  input: OrderLineInput;
};


export type MutationDraftOrderLinesBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDraftOrderLinesCreateArgs = {
  id: Scalars['ID'];
  input: Array<InputMaybe<OrderLineCreateInput>>;
};


export type MutationDraftOrderUpdateArgs = {
  id: Scalars['ID'];
  input: DraftOrderInput;
};


export type MutationEnhancedAccountRegisterArgs = {
  input: EnhancedAccountRegisterInput;
};


export type MutationExportCatalogArgs = {
  id?: InputMaybe<Scalars['ID']>;
  sellerId?: InputMaybe<Scalars['ID']>;
};


export type MutationExportCustomersArgs = {
  id?: InputMaybe<Scalars['ID']>;
  sellerId?: InputMaybe<Scalars['ID']>;
};


export type MutationExportProductsArgs = {
  input: ExportProductsInput;
};


export type MutationGiftCardActivateArgs = {
  id: Scalars['ID'];
};


export type MutationGiftCardCreateArgs = {
  input: GiftCardCreateInput;
};


export type MutationGiftCardDeactivateArgs = {
  id: Scalars['ID'];
};


export type MutationGiftCardUpdateArgs = {
  id: Scalars['ID'];
  input: GiftCardUpdateInput;
};


export type MutationGroupedProductAddProductsArgs = {
  productId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationGroupedProductRemoveProductsArgs = {
  productId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationHomepageCollectionUpdateArgs = {
  collection?: InputMaybe<Scalars['ID']>;
};


export type MutationImportCatalogArgs = {
  id?: InputMaybe<Scalars['ID']>;
  sellerId?: InputMaybe<Scalars['ID']>;
};


export type MutationImportProductsArgs = {
  file: Scalars['Upload'];
};


export type MutationImportVinFileArgs = {
  file: Scalars['Upload'];
  seller?: InputMaybe<Scalars['ID']>;
};


export type MutationInvoiceCreateArgs = {
  input: InvoiceCreateInput;
  orderId: Scalars['ID'];
};


export type MutationInvoiceDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationInvoiceRequestArgs = {
  documentType?: InputMaybe<Scalars['Int']>;
  number?: InputMaybe<Scalars['String']>;
  orderId: Scalars['ID'];
};


export type MutationInvoiceRequestDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationInvoiceSendEmailArgs = {
  id: Scalars['ID'];
};


export type MutationInvoiceUpdateArgs = {
  id: Scalars['ID'];
  input: UpdateInvoiceInput;
};


export type MutationLocationGeocodeArgs = {
  locationData: Scalars['String'];
};


export type MutationLocationSearchArgs = {
  searchData: Scalars['String'];
};


export type MutationMapOrdersToNauticalOrderArgs = {
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationMarketplaceConfigurationUpdateArgs = {
  input: MarketplaceConfigurationInput;
};


export type MutationMarketplaceNotificationsUpdateArgs = {
  input: MarketplaceNotificationsInput;
};


export type MutationMenuBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationMenuCreateArgs = {
  input: MenuCreateInput;
};


export type MutationMenuDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMenuItemBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationMenuItemCreateArgs = {
  input: MenuItemCreateInput;
};


export type MutationMenuItemDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMenuItemMoveArgs = {
  menu: Scalars['ID'];
  moves: Array<InputMaybe<MenuItemMoveInput>>;
};


export type MutationMenuItemTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationMenuItemUpdateArgs = {
  id: Scalars['ID'];
  input: MenuItemInput;
};


export type MutationMenuUpdateArgs = {
  id: Scalars['ID'];
  input: MenuInput;
};


export type MutationMicrositeAddProductsArgs = {
  micrositeId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationMicrositeBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationMicrositeBulkPublishArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationMicrositeCreateArgs = {
  input: MicrositeCreateInput;
};


export type MutationMicrositeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMicrositeRemoveProductsArgs = {
  micrositeId: Scalars['ID'];
  products: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationMicrositeReorderProductsArgs = {
  micrositeId: Scalars['ID'];
  moves: Array<InputMaybe<MoveProductInput>>;
};


export type MutationMicrositeTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationMicrositeUpdateArgs = {
  id: Scalars['ID'];
  input: MicrositeInput;
};


export type MutationNauticalConfigurationUpdateArgs = {
  input?: InputMaybe<Array<InputMaybe<NauticalConfigurationInputItem>>>;
};


export type MutationNauticalDraftOrderBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationNauticalDraftOrderCompleteArgs = {
  channel?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type MutationNauticalDraftOrderCreateArgs = {
  input: DraftOrderCreateInput;
};


export type MutationNauticalDraftOrderDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationNauticalDraftOrderLineDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationNauticalDraftOrderLineUpdateArgs = {
  id: Scalars['ID'];
  input: OrderLineInput;
};


export type MutationNauticalDraftOrderLinesBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationNauticalDraftOrderLinesCreateArgs = {
  id: Scalars['ID'];
  input: Array<InputMaybe<OrderLineCreateInput>>;
};


export type MutationNauticalDraftOrderUpdateArgs = {
  id: Scalars['ID'];
  input: DraftOrderInput;
};


export type MutationNauticalOrderAddNoteArgs = {
  input: OrderAddNoteInput;
  order: Scalars['ID'];
};


export type MutationNauticalOrderCancelArgs = {
  id: Scalars['ID'];
};


export type MutationNauticalOrderCaptureArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationNauticalOrderChannelUpdateArgs = {
  channel?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type MutationNauticalOrderLineBulkCancelArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationNauticalOrderMarkAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationNauticalOrderRefundArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationNauticalOrderReplaceOrderLineArgs = {
  id: Scalars['ID'];
  replacementId: Scalars['ID'];
};


export type MutationNauticalOrderReturnFromStorefrontNotificationArgs = {
  input: OrderReturnNotificationInput;
  order: Scalars['ID'];
};


export type MutationNauticalOrderReturnNotificationArgs = {
  input: OrderReturnNotificationInput;
  order: Scalars['ID'];
};


export type MutationNauticalOrderUpdateArgs = {
  id: Scalars['ID'];
  input: OrderUpdateInput;
};


export type MutationNauticalOrderUpdateShippingArgs = {
  input?: InputMaybe<NauticalOrderUpdateShippingInput>;
  order: Scalars['ID'];
};


export type MutationNauticalOrderVoidArgs = {
  id: Scalars['ID'];
};


export type MutationOrderAddNoteArgs = {
  input: OrderAddNoteInput;
  order: Scalars['ID'];
};


export type MutationOrderBulkCancelArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationOrderCancelArgs = {
  id: Scalars['ID'];
};


export type MutationOrderCaptureArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationOrderChannelUpdateArgs = {
  channel?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type MutationOrderClearMetaArgs = {
  input: MetaPath;
  token: Scalars['NauticalUUID'];
};


export type MutationOrderClearPrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderFulfillArgs = {
  input: OrderFulfillInput;
  order?: InputMaybe<Scalars['ID']>;
};


export type MutationOrderFulfillmentCancelArgs = {
  id: Scalars['ID'];
  input: FulfillmentCancelInput;
};


export type MutationOrderFulfillmentClearMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderFulfillmentClearPrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderFulfillmentReturnArgs = {
  id: Scalars['ID'];
  input: FulfillmentReturnInput;
};


export type MutationOrderFulfillmentUpdateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderFulfillmentUpdatePrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderFulfillmentUpdateReturnStatusArgs = {
  id: Scalars['ID'];
  input: FulfillmentUpdateReturnStatusInput;
};


export type MutationOrderFulfillmentUpdateTrackingArgs = {
  id: Scalars['ID'];
  input: FulfillmentUpdateTrackingInput;
};


export type MutationOrderMarkAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationOrderRefundArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationOrderReturnNotificationArgs = {
  input: OrderReturnNotificationInput;
  order: Scalars['ID'];
};


export type MutationOrderUpdateArgs = {
  id: Scalars['ID'];
  input: OrderUpdateInput;
};


export type MutationOrderUpdateMetaArgs = {
  input: MetaInput;
  token: Scalars['NauticalUUID'];
};


export type MutationOrderUpdatePrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderUpdateShippingArgs = {
  input?: InputMaybe<OrderUpdateShippingInput>;
  order: Scalars['ID'];
};


export type MutationOrderVoidArgs = {
  id: Scalars['ID'];
};


export type MutationPageBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationPageBulkPublishArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationPageCreateArgs = {
  input: PageInput;
};


export type MutationPageDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPageTranslateArgs = {
  id: Scalars['ID'];
  input: PageTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationPageUpdateArgs = {
  id: Scalars['ID'];
  input: PageInput;
};


export type MutationPasswordChangeArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPaymentCaptureArgs = {
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};


export type MutationPaymentRefundArgs = {
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};


export type MutationPaymentVoidArgs = {
  paymentId: Scalars['ID'];
};


export type MutationPayoutBulkArchiveArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationPayoutCreateArgs = {
  input: PayoutCreateInput;
};


export type MutationPayoutDatesUpdateArgs = {
  id: Scalars['ID'];
  input: PayoutDatesInput;
};


export type MutationPayoutStatusUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<PayoutStatusInput>;
};


export type MutationPayoutUpdateArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<PayoutUpdateInput>;
};


export type MutationPermissionGroupCreateArgs = {
  input: PermissionGroupCreateInput;
};


export type MutationPermissionGroupDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPermissionGroupUpdateArgs = {
  id: Scalars['ID'];
  input: PermissionGroupUpdateInput;
};


export type MutationPluginFlowDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPluginFlowUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<PluginFlowInput>;
};


export type MutationPluginSyncUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<PluginSyncUpdateInput>;
};


export type MutationPluginUpdateArgs = {
  id: Scalars['ID'];
  input: PluginUpdateInput;
};


export type MutationProductBulkCategoryUpdateArgs = {
  category: Scalars['ID'];
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationProductBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationProductBulkPublishArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationProductClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};


export type MutationProductDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductExpirationCheckTaskUpdateArgs = {
  enabled?: InputMaybe<Scalars['Boolean']>;
};


export type MutationProductImageBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationProductImageCreateArgs = {
  input: ProductImageCreateInput;
};


export type MutationProductImageDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductImageReorderArgs = {
  imagesIds: Array<InputMaybe<Scalars['ID']>>;
  productId: Scalars['ID'];
};


export type MutationProductImageUpdateArgs = {
  id: Scalars['ID'];
  input: ProductImageUpdateInput;
};


export type MutationProductLocationCreateArgs = {
  input: LocationInput;
  productId?: InputMaybe<Scalars['ID']>;
};


export type MutationProductLocationDeleteArgs = {
  locationId?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['ID']>;
};


export type MutationProductLocationUpdateArgs = {
  input: LocationInput;
  locationId?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['ID']>;
};


export type MutationProductSetAvailabilityForPurchaseArgs = {
  isAvailable: Scalars['Boolean'];
  productId: Scalars['ID'];
  startDate?: InputMaybe<Scalars['Date']>;
};


export type MutationProductSetLocationTypeArgs = {
  locationId?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['ID']>;
  type: LocationTypeEnum;
};


export type MutationProductTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationProductTypeBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationProductTypeClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductTypeClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductTypeCreateArgs = {
  input: ProductTypeInput;
};


export type MutationProductTypeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductTypeReorderAttributesArgs = {
  moves: Array<InputMaybe<ReorderInput>>;
  productTypeId: Scalars['ID'];
  type: AttributeTypeEnum;
};


export type MutationProductTypeUpdateArgs = {
  id: Scalars['ID'];
  input: ProductTypeInput;
};


export type MutationProductTypeUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductTypeUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductUpdateArgs = {
  id: Scalars['ID'];
  input: ProductInput;
};


export type MutationProductUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductVariantBulkCreateArgs = {
  product: Scalars['ID'];
  variants: Array<InputMaybe<ProductVariantBulkCreateInput>>;
};


export type MutationProductVariantBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationProductVariantClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductVariantClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductVariantCreateArgs = {
  input: ProductVariantCreateInput;
};


export type MutationProductVariantDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductVariantReorderArgs = {
  moves: Array<InputMaybe<ReorderInput>>;
  productId: Scalars['ID'];
};


export type MutationProductVariantSetDefaultArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationProductVariantStocksCreateArgs = {
  stocks: Array<StockInput>;
  variantId: Scalars['ID'];
};


export type MutationProductVariantStocksDeleteArgs = {
  variantId: Scalars['ID'];
  warehouseIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationProductVariantStocksUpdateArgs = {
  stocks: Array<StockInput>;
  variantId: Scalars['ID'];
};


export type MutationProductVariantTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationProductVariantUpdateArgs = {
  id: Scalars['ID'];
  input: ProductVariantInput;
};


export type MutationProductVariantUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductVariantUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationRequestEmailChangeArgs = {
  newEmail: Scalars['String'];
  password: Scalars['String'];
  redirectUrl: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
  redirectUrl: Scalars['String'];
};


export type MutationSaleBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationSaleCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationSaleCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationSaleCreateArgs = {
  input: SaleInput;
};


export type MutationSaleDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationSaleTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationSaleUpdateArgs = {
  id: Scalars['ID'];
  input: SaleInput;
};


export type MutationSellerAddNoteArgs = {
  input: SellerNoteInput;
};


export type MutationSellerAddressCreateArgs = {
  input: AddressInput;
  sellerId: Scalars['ID'];
};


export type MutationSellerAddressDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationSellerAddressSetDefaultArgs = {
  addressId: Scalars['ID'];
  sellerId: Scalars['ID'];
  type: AddressTypeEnum;
};


export type MutationSellerAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};


export type MutationSellerLogoUpdateArgs = {
  image: Scalars['Upload'];
  seller?: InputMaybe<Scalars['ID']>;
};


export type MutationServiceAccountClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationServiceAccountCreateArgs = {
  input: ServiceAccountInput;
};


export type MutationServiceAccountDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationServiceAccountTokenCreateArgs = {
  input: ServiceAccountTokenInput;
};


export type MutationServiceAccountTokenDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationServiceAccountUpdateArgs = {
  id: Scalars['ID'];
  input: ServiceAccountInput;
};


export type MutationServiceAccountUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationSetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationShippingPriceBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationShippingPriceCreateArgs = {
  input: ShippingPriceInput;
};


export type MutationShippingPriceDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationShippingPriceTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationShippingPriceUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingPriceInput;
};


export type MutationShippingZoneBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationShippingZoneCreateArgs = {
  input: ShippingZoneCreateInput;
};


export type MutationShippingZoneDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationShippingZoneUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingZoneUpdateInput;
};


export type MutationShopAddressUpdateArgs = {
  input?: InputMaybe<AddressInput>;
};


export type MutationShopDomainUpdateArgs = {
  input?: InputMaybe<SiteDomainInput>;
};


export type MutationShopSettingsTranslateArgs = {
  input: ShopSettingsTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationShopSettingsUpdateArgs = {
  input: ShopSettingsInput;
};


export type MutationSiteBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationSiteCreateArgs = {
  input: SiteCreateInput;
};


export type MutationSiteUpdateArgs = {
  id: Scalars['ID'];
  input: SiteInput;
};


export type MutationStaffBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationStaffCreateArgs = {
  input: StaffCreateInput;
};


export type MutationStaffDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationStaffNotificationRecipientCreateArgs = {
  input: StaffNotificationRecipientInput;
};


export type MutationStaffNotificationRecipientDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationStaffNotificationRecipientUpdateArgs = {
  id: Scalars['ID'];
  input: StaffNotificationRecipientInput;
};


export type MutationStaffUpdateArgs = {
  id: Scalars['ID'];
  input: StaffUpdateInput;
};


export type MutationSubmitRatingAndReviewArgs = {
  emailAddress?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  publicName?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['String']>;
  review?: InputMaybe<Scalars['String']>;
};


export type MutationTokenCreateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationTokenRefreshArgs = {
  csrfToken?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationTokenVerifyArgs = {
  token: Scalars['String'];
};


export type MutationUpdateBrandingArgs = {
  input?: InputMaybe<BrandingInput>;
};


export type MutationUpdateCoreDataArgs = {
  input: CoreDataInput;
  name: Scalars['String'];
};


export type MutationUpdateDesignerDataArgs = {
  input?: InputMaybe<DesignerDataInput>;
  name: Scalars['String'];
};


export type MutationUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};


export type MutationUpdatePeriodicTaskEnabledArgs = {
  enabled?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};


export type MutationUpdateSellerDataArgs = {
  id: Scalars['ID'];
  input: SellerUpdateInput;
};


export type MutationUpdateWarehouseArgs = {
  id: Scalars['ID'];
  input: WarehouseUpdateInput;
};


export type MutationUserAvatarDeleteArgs = {
  user: Scalars['ID'];
};


export type MutationUserAvatarUpdateArgs = {
  image: Scalars['Upload'];
  user: Scalars['ID'];
};


export type MutationUserBulkSetActiveArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
  isActive: Scalars['Boolean'];
};


export type MutationUserClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationUserClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationUserDocumentAddArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
};


export type MutationUserUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationUserUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationVariantImageAssignArgs = {
  imageId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationVariantImageUnassignArgs = {
  imageId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationVendorOrderReturnFromStorefrontNotificationArgs = {
  input: OrderReturnNotificationInput;
  order: Scalars['ID'];
};


export type MutationVendorPayoutStatusUpdateArgs = {
  id: Scalars['ID'];
  input: VendorPayoutStatusInput;
};


export type MutationVendorPayoutsBulkExcludeArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationVendorPayoutsBulkIncludeArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationVoucherBulkDeleteArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationVoucherCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationVoucherCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationVoucherCreateArgs = {
  input: VoucherInput;
};


export type MutationVoucherDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationVoucherTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationVoucherUpdateArgs = {
  id: Scalars['ID'];
  input: VoucherInput;
};


export type MutationWebhookCreateArgs = {
  input: WebhookCreateInput;
};


export type MutationWebhookDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationWebhookUpdateArgs = {
  id: Scalars['ID'];
  input: WebhookUpdateInput;
};


export type MutationWishlistAddProductArgs = {
  productId: Scalars['ID'];
};


export type MutationWishlistAddVariantArgs = {
  variantId: Scalars['ID'];
};


export type MutationWishlistRemoveProductArgs = {
  productId: Scalars['ID'];
};


export type MutationWishlistRemoveVariantArgs = {
  variantId: Scalars['ID'];
};


export type MutationYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsArgs = {
  input: UserPointsInput;
};


export type MutationYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordArgs = {
  user: UserInput;
};

export type NameTranslationInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type NauticalAppsFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AppTypeEnum>;
};

export type NauticalAppsType = Node & {
  __typename?: 'NauticalAppsType';
  cardText: Scalars['String'];
  category: Scalars['String'];
  certified: Scalars['Boolean'];
  company: Scalars['String'];
  content: Scalars['JSONString'];
  createdAt: Scalars['DateTime'];
  externalLink: Scalars['String'];
  helpLink: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  subcategory: Scalars['String'];
};

export type NauticalAppsTypeCountableConnection = {
  __typename?: 'NauticalAppsTypeCountableConnection';
  edges: Array<NauticalAppsTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type NauticalAppsTypeCountableEdge = {
  __typename?: 'NauticalAppsTypeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: NauticalAppsType;
};

/** Represents a nautical configuration resource. */
export type NauticalConfiguration = {
  __typename?: 'NauticalConfiguration';
  /** Primary key name of the configuration item */
  configurationName?: Maybe<Scalars['String']>;
  /** Whether the configuration item is active or not */
  configurationValue?: Maybe<Scalars['Boolean']>;
};

export type NauticalConfigurationError = {
  __typename?: 'NauticalConfigurationError';
  /** The error code. */
  code: NauticalConfigurationErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum NauticalConfigurationErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID'
}

export type NauticalConfigurationInputItem = {
  configurationName?: InputMaybe<Scalars['String']>;
  configurationValue?: InputMaybe<Scalars['Boolean']>;
};

/** Updates nautical configuration. */
export type NauticalConfigurationUpdate = {
  __typename?: 'NauticalConfigurationUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalConfigurationErrors: Array<NauticalConfigurationError>;
  nauticalConfigurationList?: Maybe<Array<Maybe<NauticalConfiguration>>>;
};

/** Deletes draft orders. */
export type NauticalDraftOrderBulkDelete = {
  __typename?: 'NauticalDraftOrderBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
};

/** Completes creating an order. */
export type NauticalDraftOrderComplete = {
  __typename?: 'NauticalDraftOrderComplete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Completed nautical order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
  /** List of seller orders. */
  sellerOrders?: Maybe<Array<Maybe<Order>>>;
};

/** Creates a new Nautical draft order. */
export type NauticalDraftOrderCreate = {
  __typename?: 'NauticalDraftOrderCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalOrder?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Deletes a draft order. */
export type NauticalDraftOrderDelete = {
  __typename?: 'NauticalDraftOrderDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalOrder?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Deletes an order line from a draft order. */
export type NauticalDraftOrderLineDelete = {
  __typename?: 'NauticalDraftOrderLineDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
  /** An order line that was deleted. */
  orderLine?: Maybe<NauticalOrderLine>;
};

/** Updates an order line of a draft order. */
export type NauticalDraftOrderLineUpdate = {
  __typename?: 'NauticalDraftOrderLineUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalOrderLine?: Maybe<NauticalOrderLine>;
  /** A related draft order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Deletes order lines. */
export type NauticalDraftOrderLinesBulkDelete = {
  __typename?: 'NauticalDraftOrderLinesBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
};

/** Create order lines for a draft order. */
export type NauticalDraftOrderLinesCreate = {
  __typename?: 'NauticalDraftOrderLinesCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
  /** List of newly added order lines. */
  orderLines?: Maybe<Array<NauticalOrderLine>>;
};

/** Updates a draft nautical order. */
export type NauticalDraftOrderUpdate = {
  __typename?: 'NauticalDraftOrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalOrder?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Represents order fulfillment. */
export type NauticalFulfillment = Node & ObjectWithMetadata & {
  __typename?: 'NauticalFulfillment';
  created: Scalars['DateTime'];
  fulfillmentOrder: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of lines for the fulfillment. */
  lines?: Maybe<Array<Maybe<NauticalFulfillmentLine>>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  status: NauticalFulfillmentStatus;
  /** User-friendly fulfillment status. */
  statusDisplay?: Maybe<Scalars['String']>;
  trackingNumber: Scalars['String'];
  /** Warehouse from fulfillment was fulfilled. */
  warehouse?: Maybe<Warehouse>;
};

/** Represents line of the fulfillment. */
export type NauticalFulfillmentLine = Node & {
  __typename?: 'NauticalFulfillmentLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  orderLine?: Maybe<NauticalOrderLine>;
  quantity: Scalars['Int'];
};

/** An enumeration. */
export enum NauticalFulfillmentStatus {
  /** Canceled */
  Canceled = 'CANCELED',
  /** Declined */
  Declined = 'DECLINED',
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Returned */
  Returned = 'RETURNED',
  /** Return authorized */
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  /** Return cancelled */
  ReturnCancelled = 'RETURN_CANCELLED',
  /** Return complete */
  ReturnComplete = 'RETURN_COMPLETE',
  /** Return declined */
  ReturnDeclined = 'RETURN_DECLINED',
  /** Return received */
  ReturnReceived = 'RETURN_RECEIVED',
  /** Return requested */
  ReturnRequested = 'RETURN_REQUESTED'
}

/** Represents a nautical order in the shop. */
export type NauticalOrder = Node & ObjectWithMetadata & {
  __typename?: 'NauticalOrder';
  /** List of actions that can be performed in the current state of an order. */
  actions: Array<Maybe<OrderAction>>;
  affiliate?: Maybe<User>;
  affiliateCode?: Maybe<AffiliateCodes>;
  /** Shipping methods that can be used with this order. */
  availableShippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  availableShippingMethodsBySeller?: Maybe<Array<Maybe<MultiSellerShippingMethod>>>;
  billingAddress?: Maybe<Address>;
  /** Informs whether a draft order can be finalized(turned into a regular order). */
  canFinalize: Scalars['Boolean'];
  /** Channel the marketplace order is associated with */
  channel?: Maybe<Channel>;
  created: Scalars['DateTime'];
  customerNote: Scalars['String'];
  discount?: Maybe<Money>;
  discountName?: Maybe<Scalars['String']>;
  displayGrossPrices: Scalars['Boolean'];
  /** List of events associated with the order. */
  events?: Maybe<Array<Maybe<NauticalOrderEvent>>>;
  /** List of shipments for the order. */
  fulfillments: Array<Maybe<NauticalFulfillment>>;
  /** List of user gift cards. */
  giftCards?: Maybe<Array<Maybe<GiftCard>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of order invoices. */
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  /** Informs if an order is fully paid. */
  isPaid?: Maybe<Scalars['Boolean']>;
  /** Returns True, if order requires shipping. */
  isShippingRequired: Scalars['Boolean'];
  languageCode: Scalars['String'];
  /** List of nautical order lines. */
  lines: Array<Maybe<NauticalOrderLine>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** User-friendly number of an order. */
  number?: Maybe<Scalars['String']>;
  /** Internal payment status. */
  paymentStatus?: Maybe<PaymentChargeStatusEnum>;
  /** User-friendly payment status. */
  paymentStatusDisplay?: Maybe<Scalars['String']>;
  /** List of payments for the order. */
  payments?: Maybe<Array<Maybe<Payment>>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of seller shipments for the order. */
  sellerFulfillments: Array<Maybe<Fulfillment>>;
  sellerShippingMethods?: Maybe<Scalars['GenericScalar']>;
  /** List */
  sellerUnfulfilled: Array<Maybe<OrderLine>>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodName?: Maybe<Scalars['String']>;
  /** Total price of shipping. */
  shippingPrice?: Maybe<TaxedMoney>;
  status: NauticalOrderStatus;
  /** User-friendly order status. */
  statusDisplay?: Maybe<Scalars['String']>;
  /** The sum of line prices not including shipping. */
  subtotal?: Maybe<TaxedMoney>;
  token: Scalars['String'];
  /** Total amount of the order. */
  total?: Maybe<TaxedMoney>;
  /** Amount authorized for the order. */
  totalAuthorized?: Maybe<Money>;
  /** The difference between the paid and the order total amount. */
  totalBalance: Money;
  /** Amount captured by payment. */
  totalCaptured?: Maybe<Money>;
  trackingClientId: Scalars['String'];
  translatedDiscountName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Validation status for the order */
  validationStatus?: Maybe<Array<Maybe<ValidationStatus>>>;
  /** Volume discount for the nautical order */
  volumeDiscount?: Maybe<TaxedMoney>;
  voucher?: Maybe<Voucher>;
  weight?: Maybe<Weight>;
};

/** Adds note to the order. */
export type NauticalOrderAddNote = {
  __typename?: 'NauticalOrderAddNote';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order note created. */
  event?: Maybe<NauticalOrderEvent>;
  /** Order with the note added. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Cancel an order. */
export type NauticalOrderCancel = {
  __typename?: 'NauticalOrderCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Canceled order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Capture a nautical order. */
export type NauticalOrderCapture = {
  __typename?: 'NauticalOrderCapture';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Captured Nautical Order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Updates a marketplace order channel. */
export type NauticalOrderChannelUpdate = {
  __typename?: 'NauticalOrderChannelUpdate';
  channelErrors: Array<ChannelError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated marketplace order instance */
  order?: Maybe<NauticalOrder>;
};

export type NauticalOrderCountableConnection = {
  __typename?: 'NauticalOrderCountableConnection';
  edges: Array<NauticalOrderCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type NauticalOrderCountableEdge = {
  __typename?: 'NauticalOrderCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: NauticalOrder;
};

/** History log of the order. */
export type NauticalOrderEvent = Node & {
  __typename?: 'NauticalOrderEvent';
  /** Amount of money. */
  amount?: Maybe<Scalars['Float']>;
  /** Composed ID of the Fulfillment. */
  composedId?: Maybe<Scalars['String']>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** Email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** Type of an email sent to the customer. */
  emailType?: Maybe<OrderEventsEmailsEnum>;
  /** The lines fulfilled. */
  fulfilledItems?: Maybe<Array<Maybe<NauticalFulfillmentLine>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Number of an invoice related to the order. */
  invoiceNumber?: Maybe<Scalars['String']>;
  /** The concerned lines. */
  lines?: Maybe<Array<Maybe<NauticalOrderEventOrderLineObject>>>;
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** User-friendly number of an order. */
  orderNumber?: Maybe<Scalars['String']>;
  /** List of oversold lines names. */
  oversoldItems?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The payment gateway of the payment. */
  paymentGateway?: Maybe<Scalars['String']>;
  /** The payment ID from the payment gateway. */
  paymentId?: Maybe<Scalars['String']>;
  /** Number of items. */
  quantity?: Maybe<Scalars['Int']>;
  /** Order event type. */
  type?: Maybe<OrderEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** The warehouse were items were restocked. */
  warehouse?: Maybe<Warehouse>;
};

export type NauticalOrderEventCountableConnection = {
  __typename?: 'NauticalOrderEventCountableConnection';
  edges: Array<NauticalOrderEventCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type NauticalOrderEventCountableEdge = {
  __typename?: 'NauticalOrderEventCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: NauticalOrderEvent;
};

export type NauticalOrderEventOrderLineObject = {
  __typename?: 'NauticalOrderEventOrderLineObject';
  /** The variant name. */
  itemName?: Maybe<Scalars['String']>;
  /** The order line. */
  orderLine?: Maybe<NauticalOrderLine>;
  /** The variant quantity. */
  quantity?: Maybe<Scalars['Int']>;
};

/** Represents order line of particular order. */
export type NauticalOrderLine = Node & {
  __typename?: 'NauticalOrderLine';
  digitalContentUrl?: Maybe<DigitalContentUrl>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isShippingRequired: Scalars['Boolean'];
  productName: Scalars['String'];
  productSku: Scalars['String'];
  quantity: Scalars['Int'];
  quantityFulfilled: Scalars['Int'];
  taxRate: Scalars['Float'];
  /** The main thumbnail for the ordered product. */
  thumbnail?: Maybe<Image>;
  /** Price of the order line. */
  totalPrice?: Maybe<TaxedMoney>;
  /** Product name in the customer's language */
  translatedProductName: Scalars['String'];
  /** Variant name in the customer's language */
  translatedVariantName: Scalars['String'];
  /** Price of the single item in the order line. */
  unitPrice?: Maybe<TaxedMoney>;
  /** A purchased product variant. Note: this field may be null if the variant has been removed from stock at all. */
  variant?: Maybe<ProductVariant>;
  variantName: Scalars['String'];
};


/** Represents order line of particular order. */
export type NauticalOrderLineThumbnailArgs = {
  size?: InputMaybe<Scalars['Int']>;
};

/** Cancels nautical order lines, associated order lines, and removes allocations for that order line. */
export type NauticalOrderLineBulkCancel = {
  __typename?: 'NauticalOrderLineBulkCancel';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The nautical order that had a line cancelled. */
  order?: Maybe<NauticalOrder>;
};

/** Mark order as manually paid. */
export type NauticalOrderMarkAsPaid = {
  __typename?: 'NauticalOrderMarkAsPaid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order marked as paid. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Refund a nautical order. */
export type NauticalOrderRefund = {
  __typename?: 'NauticalOrderRefund';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A refunded order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Replace a nautical order line. */
export type NauticalOrderReplaceOrderLine = {
  __typename?: 'NauticalOrderReplaceOrderLine';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A nautical order with replaced order lines. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Adds return notification note to the order. */
export type NauticalOrderReturnFromStorefrontNotification = {
  __typename?: 'NauticalOrderReturnFromStorefrontNotification';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order return notification created. */
  event?: Maybe<NauticalOrderEvent>;
  /** Order with return notification note added. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Adds return notification note to the order. */
export type NauticalOrderReturnNotification = {
  __typename?: 'NauticalOrderReturnNotification';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order return notification created. */
  event?: Maybe<NauticalOrderEvent>;
  /** Order with return notification note added. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** An enumeration. */
export enum NauticalOrderStatus {
  /** Canceled */
  Canceled = 'CANCELED',
  /** Draft */
  Draft = 'DRAFT',
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Partially fulfilled */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Return authorized */
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  /** Return cancelled */
  ReturnCancelled = 'RETURN_CANCELLED',
  /** Return complete */
  ReturnComplete = 'RETURN_COMPLETE',
  /** Return declined */
  ReturnDeclined = 'RETURN_DECLINED',
  /** Return requested */
  ReturnRequested = 'RETURN_REQUESTED',
  /** Unfulfilled */
  Unfulfilled = 'UNFULFILLED'
}

/** Updates an order. */
export type NauticalOrderUpdate = {
  __typename?: 'NauticalOrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  nauticalOrder?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

/** Updates a shipping method of the order. */
export type NauticalOrderUpdateShipping = {
  __typename?: 'NauticalOrderUpdateShipping';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Nautical Order with updated shipping method. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

export type NauticalOrderUpdateShippingInput = {
  /** PK of seller to update shipping for on nautical order. */
  seller?: InputMaybe<Scalars['ID']>;
  /** ID of the selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
};

/** Void a nautical order. */
export type NauticalOrderVoid = {
  __typename?: 'NauticalOrderVoid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A voided order. */
  order?: Maybe<NauticalOrder>;
  orderErrors: Array<OrderError>;
};

export type NauticalSite = Node & {
  __typename?: 'NauticalSite';
  allSellers: Scalars['Boolean'];
  autoAddSellers: Scalars['Boolean'];
  builderKey?: Maybe<Scalars['String']>;
  bundledSellers?: Maybe<Array<Maybe<Seller>>>;
  checkouts: CheckoutCountableConnection;
  designer?: Maybe<DesignerDataType>;
  domain: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isPrimary: Scalars['Boolean'];
  overrideBuilderKey: Scalars['Boolean'];
  primarySeller?: Maybe<Seller>;
  tenant: NauticalTenant;
};


export type NauticalSiteCheckoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type NauticalSiteCountableConnection = {
  __typename?: 'NauticalSiteCountableConnection';
  edges: Array<NauticalSiteCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type NauticalSiteCountableEdge = {
  __typename?: 'NauticalSiteCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: NauticalSite;
};

/** Represents a nautical suborder mapping in the shop. */
export type NauticalSubOrder = Node & ObjectWithMetadata & {
  __typename?: 'NauticalSubOrder';
  /** The ID of the object. */
  id: Scalars['ID'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Nautical order that is parent of sub order */
  nauticalOrder?: Maybe<NauticalOrder>;
  /** Sub order of mapped nautical order */
  order?: Maybe<Order>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
};

export type NauticalTenant = Node & {
  __typename?: 'NauticalTenant';
  domains: NauticalSiteCountableConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  schemaName: Scalars['String'];
};


export type NauticalTenantDomainsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents shop's navigation menus. */
export type Navigation = {
  __typename?: 'Navigation';
  /** Main navigation bar. */
  main?: Maybe<Menu>;
  /** Secondary navigation bar. */
  secondary?: Maybe<Menu>;
};

export enum NavigationType {
  /** Main storefront navigation. */
  Main = 'MAIN',
  /** Secondary storefront navigation. */
  Secondary = 'SECONDARY'
}

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ObjectWithMetadata = {
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
};

export type OptimizedAffiliate = {
  __typename?: 'OptimizedAffiliate';
  affiliate?: Maybe<User>;
  agreement?: Maybe<Agreement>;
  channels?: Maybe<Array<Maybe<OptimizedAffiliateChannels>>>;
  topCodes?: Maybe<Array<Maybe<AffiliateCodes>>>;
};

export type OptimizedAffiliateChannels = {
  __typename?: 'OptimizedAffiliateChannels';
  channelName?: Maybe<Scalars['String']>;
  totalReferrals?: Maybe<Scalars['Int']>;
};

export type OptimizedHome = {
  __typename?: 'OptimizedHome';
  marketplaceActivities?: Maybe<Array<Maybe<NauticalOrderEvent>>>;
  orders?: Maybe<Scalars['Int']>;
  outOfStock?: Maybe<Scalars['Int']>;
  sales?: Maybe<TaxedMoney>;
  sellerActivities?: Maybe<Array<Maybe<OrderEvent>>>;
  toCapture?: Maybe<Scalars['Int']>;
  toFulfill?: Maybe<Scalars['Int']>;
  topProducts?: Maybe<Array<Maybe<ProductVariant>>>;
};

/** Represents an order in the shop. */
export type Order = Node & ObjectWithMetadata & {
  __typename?: 'Order';
  /** List of actions that can be performed in the current state of an order. */
  actions: Array<Maybe<OrderAction>>;
  affiliate?: Maybe<User>;
  affiliateCode?: Maybe<AffiliateCodes>;
  /** Affiliate commission for the order */
  affiliateCommission?: Maybe<Money>;
  /** Shipping methods that can be used with this order. */
  availableShippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  billingAddress?: Maybe<Address>;
  /** Informs whether a draft order can be finalized(turned into a regular order). */
  canFinalize: Scalars['Boolean'];
  /** Channel the order is associated with */
  channel?: Maybe<Channel>;
  created: Scalars['DateTime'];
  customerNote: Scalars['String'];
  discount?: Maybe<Money>;
  discountName?: Maybe<Scalars['String']>;
  displayGrossPrices: Scalars['Boolean'];
  /** List of events associated with the order. */
  events?: Maybe<Array<Maybe<OrderEvent>>>;
  /** List of shipments for the order. */
  fulfillments: Array<Maybe<Fulfillment>>;
  /** List of user gift cards. */
  giftCards?: Maybe<Array<Maybe<GiftCard>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of order invoices. */
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  /** Informs if an order is fully paid. */
  isPaid?: Maybe<Scalars['Boolean']>;
  /** Returns True, if order requires shipping. */
  isShippingRequired: Scalars['Boolean'];
  languageCode: Scalars['String'];
  /** List of order lines. */
  lines: Array<Maybe<OrderLine>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Month the order was created */
  monthCreated?: Maybe<Scalars['Date']>;
  /** User-friendly number of an order. */
  number?: Maybe<Scalars['String']>;
  /** Internal payment status. */
  paymentStatus?: Maybe<PaymentChargeStatusEnum>;
  /** User-friendly payment status. */
  paymentStatusDisplay?: Maybe<Scalars['String']>;
  /** List of payments for the order. */
  payments?: Maybe<Array<Maybe<Payment>>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Seller this order belongs to */
  seller?: Maybe<Seller>;
  /** Seller commission for the order */
  sellerCommission?: Maybe<Money>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodName?: Maybe<Scalars['String']>;
  /** Total price of shipping. */
  shippingPrice?: Maybe<TaxedMoney>;
  status: OrderStatus;
  /** User-friendly order status. */
  statusDisplay?: Maybe<Scalars['String']>;
  /** The sum of line prices not including shipping. */
  subtotal?: Maybe<TaxedMoney>;
  token: Scalars['String'];
  /** Total amount of the order. */
  total?: Maybe<TaxedMoney>;
  /** Amount authorized for the order. */
  totalAuthorized?: Maybe<Money>;
  /** The difference between the paid and the order total amount. */
  totalBalance: Money;
  /** Amount captured by payment. */
  totalCaptured?: Maybe<Money>;
  trackingClientId: Scalars['String'];
  translatedDiscountName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Validation status for the order */
  validationStatus?: Maybe<Array<Maybe<ValidationStatus>>>;
  /** Volume discount for the order */
  volumeDiscount?: Maybe<TaxedMoney>;
  voucher?: Maybe<Voucher>;
  weight?: Maybe<Weight>;
};

export enum OrderAction {
  /** Represents the capture action. */
  Capture = 'CAPTURE',
  /** Represents a mark-as-paid action. */
  MarkAsPaid = 'MARK_AS_PAID',
  /** Represents a refund action. */
  Refund = 'REFUND',
  /** Represents a void action. */
  Void = 'VOID'
}

/** Adds note to the order. */
export type OrderAddNote = {
  __typename?: 'OrderAddNote';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order note created. */
  event?: Maybe<OrderEvent>;
  /** Order with the note added. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderAddNoteInput = {
  /** Note message. */
  message: Scalars['String'];
};

export type OrderAffiliateReportType = {
  __typename?: 'OrderAffiliateReportType';
  affiliate?: Maybe<User>;
  affiliateCommission?: Maybe<Scalars['Float']>;
  affiliateId?: Maybe<Scalars['Int']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type OrderAffiliateSummaryType = {
  __typename?: 'OrderAffiliateSummaryType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  affiliates?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

/** Cancels orders. */
export type OrderBulkCancel = {
  __typename?: 'OrderBulkCancel';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
};

/** Cancel an order. */
export type OrderCancel = {
  __typename?: 'OrderCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Canceled order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Capture an order. */
export type OrderCapture = {
  __typename?: 'OrderCapture';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Captured order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Updates an order channel */
export type OrderChannelUpdate = {
  __typename?: 'OrderChannelUpdate';
  channelErrors: Array<ChannelError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated order instance */
  order?: Maybe<Order>;
};

/** Clears stored metadata value. */
export type OrderClearMeta = {
  __typename?: 'OrderClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Clears stored private metadata value. */
export type OrderClearPrivateMeta = {
  __typename?: 'OrderClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

export type OrderCountableConnection = {
  __typename?: 'OrderCountableConnection';
  edges: Array<OrderCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderCountableEdge = {
  __typename?: 'OrderCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Order;
};

export type OrderCustomerReportType = {
  __typename?: 'OrderCustomerReportType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  Asc = 'ASC',
  /** Specifies a descending sort order. */
  Desc = 'DESC'
}

export type OrderDraftFilterInput = {
  channel?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type OrderError = {
  __typename?: 'OrderError';
  /** The error code. */
  code: OrderErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** Order line ID which causes the error. */
  orderLine?: Maybe<Scalars['ID']>;
  /** Warehouse ID which causes the error. */
  warehouse?: Maybe<Scalars['ID']>;
};

/** An enumeration. */
export enum OrderErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  CannotCancelFulfillment = 'CANNOT_CANCEL_FULFILLMENT',
  CannotCancelOrder = 'CANNOT_CANCEL_ORDER',
  CannotDelete = 'CANNOT_DELETE',
  CannotRefund = 'CANNOT_REFUND',
  CannotReturnFulfillment = 'CANNOT_RETURN_FULFILLMENT',
  CaptureInactivePayment = 'CAPTURE_INACTIVE_PAYMENT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  FulfillOrderLine = 'FULFILL_ORDER_LINE',
  GraphqlError = 'GRAPHQL_ERROR',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Invalid = 'INVALID',
  NotEditable = 'NOT_EDITABLE',
  NotFound = 'NOT_FOUND',
  OrderNoShippingAddress = 'ORDER_NO_SHIPPING_ADDRESS',
  PaymentError = 'PAYMENT_ERROR',
  PaymentMissing = 'PAYMENT_MISSING',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  Required = 'REQUIRED',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodRequired = 'SHIPPING_METHOD_REQUIRED',
  TaxError = 'TAX_ERROR',
  Unique = 'UNIQUE',
  VoidInactivePayment = 'VOID_INACTIVE_PAYMENT',
  ZeroQuantity = 'ZERO_QUANTITY'
}

/** History log of the order. */
export type OrderEvent = Node & {
  __typename?: 'OrderEvent';
  /** Amount of money. */
  amount?: Maybe<Scalars['Float']>;
  /** Composed ID of the Fulfillment. */
  composedId?: Maybe<Scalars['String']>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** Email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** Type of an email sent to the customer. */
  emailType?: Maybe<OrderEventsEmailsEnum>;
  /** The lines fulfilled. */
  fulfilledItems?: Maybe<Array<Maybe<FulfillmentLine>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Number of an invoice related to the order. */
  invoiceNumber?: Maybe<Scalars['String']>;
  /** The concerned lines. */
  lines?: Maybe<Array<Maybe<OrderEventOrderLineObject>>>;
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** User-friendly number of an order. */
  orderNumber?: Maybe<Scalars['String']>;
  /** List of oversold lines names. */
  oversoldItems?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The payment gateway of the payment. */
  paymentGateway?: Maybe<Scalars['String']>;
  /** The payment ID from the payment gateway. */
  paymentId?: Maybe<Scalars['String']>;
  /** Number of items. */
  quantity?: Maybe<Scalars['Int']>;
  /** Order event type. */
  type?: Maybe<OrderEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** The warehouse were items were restocked. */
  warehouse?: Maybe<Warehouse>;
};

export type OrderEventCountableConnection = {
  __typename?: 'OrderEventCountableConnection';
  edges: Array<OrderEventCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderEventCountableEdge = {
  __typename?: 'OrderEventCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: OrderEvent;
};

export type OrderEventOrderLineObject = {
  __typename?: 'OrderEventOrderLineObject';
  /** The variant name. */
  itemName?: Maybe<Scalars['String']>;
  /** The order line. */
  orderLine?: Maybe<OrderLine>;
  /** The variant quantity. */
  quantity?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum OrderEventsEmailsEnum {
  DigitalLinks = 'DIGITAL_LINKS',
  FulfillmentConfirmation = 'FULFILLMENT_CONFIRMATION',
  MpoOrderNotification = 'MPO_ORDER_NOTIFICATION',
  OrderCancel = 'ORDER_CANCEL',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  OrderRefund = 'ORDER_REFUND',
  PartialOrderCancel = 'PARTIAL_ORDER_CANCEL',
  PaymentConfirmation = 'PAYMENT_CONFIRMATION',
  ShippingConfirmation = 'SHIPPING_CONFIRMATION',
  TrackingUpdated = 'TRACKING_UPDATED'
}

/** An enumeration. */
export enum OrderEventsEnum {
  Canceled = 'CANCELED',
  DraftAddedProducts = 'DRAFT_ADDED_PRODUCTS',
  DraftCreated = 'DRAFT_CREATED',
  DraftRemovedProducts = 'DRAFT_REMOVED_PRODUCTS',
  EmailSent = 'EMAIL_SENT',
  ExternalServiceNotification = 'EXTERNAL_SERVICE_NOTIFICATION',
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  FulfillmentFulfilledItems = 'FULFILLMENT_FULFILLED_ITEMS',
  FulfillmentRestockedItems = 'FULFILLMENT_RESTOCKED_ITEMS',
  InvoiceGenerated = 'INVOICE_GENERATED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceSent = 'INVOICE_SENT',
  InvoiceUpdated = 'INVOICE_UPDATED',
  NoteAdded = 'NOTE_ADDED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderMarkedAsPaid = 'ORDER_MARKED_AS_PAID',
  Other = 'OTHER',
  OversoldItems = 'OVERSOLD_ITEMS',
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  PaymentCaptured = 'PAYMENT_CAPTURED',
  PaymentFailed = 'PAYMENT_FAILED',
  PaymentRefunded = 'PAYMENT_REFUNDED',
  PaymentVoided = 'PAYMENT_VOIDED',
  Placed = 'PLACED',
  PlacedFromDraft = 'PLACED_FROM_DRAFT',
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  ReturnCancelled = 'RETURN_CANCELLED',
  ReturnComplete = 'RETURN_COMPLETE',
  ReturnDeclined = 'RETURN_DECLINED',
  ReturnReceived = 'RETURN_RECEIVED',
  ReturnRequested = 'RETURN_REQUESTED',
  TrackingUpdated = 'TRACKING_UPDATED',
  UpdatedAddress = 'UPDATED_ADDRESS'
}

export type OrderFilterInput = {
  channel?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  paymentStatus?: InputMaybe<Array<InputMaybe<PaymentChargeStatusEnum>>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<OrderStatusFilter>>>;
};

/** Creates new fulfillments for an order. */
export type OrderFulfill = {
  __typename?: 'OrderFulfill';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** List of created fulfillments. */
  fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
  /** Fulfilled order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderFulfillInput = {
  /** List of items informing how to fulfill the order. */
  lines: Array<OrderFulfillLineInput>;
  /** If true, send an email notification to the customer. */
  notifyCustomer?: InputMaybe<Scalars['Boolean']>;
};

export type OrderFulfillLineInput = {
  /** The ID of the order line. */
  orderLineId?: InputMaybe<Scalars['ID']>;
  /** List of stock items to create. */
  stocks: Array<OrderFulfillStockInput>;
};

export type OrderFulfillStockInput = {
  /** The number of line items to be fulfilled from given warehouse. */
  quantity: Scalars['Int'];
  /** ID of the warehouse from which the item will be fulfilled. */
  warehouse: Scalars['ID'];
};

/** Represents order line of particular order. */
export type OrderLine = Node & {
  __typename?: 'OrderLine';
  /** List of allocations across warehouses. */
  allocations?: Maybe<Array<Allocation>>;
  digitalContentUrl?: Maybe<DigitalContentUrl>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isShippingRequired: Scalars['Boolean'];
  productName: Scalars['String'];
  productSku: Scalars['String'];
  quantity: Scalars['Int'];
  quantityFulfilled: Scalars['Int'];
  taxRate: Scalars['Float'];
  /** The main thumbnail for the ordered product. */
  thumbnail?: Maybe<Image>;
  /** Price of the order line. */
  totalPrice?: Maybe<TaxedMoney>;
  /** Product name in the customer's language */
  translatedProductName: Scalars['String'];
  /** Variant name in the customer's language */
  translatedVariantName: Scalars['String'];
  /** Price of the single item in the order line. */
  unitPrice?: Maybe<TaxedMoney>;
  /** A purchased product variant. Note: this field may be null if the variant has been removed from stock at all. */
  variant?: Maybe<ProductVariant>;
  variantName: Scalars['String'];
};


/** Represents order line of particular order. */
export type OrderLineThumbnailArgs = {
  size?: InputMaybe<Scalars['Int']>;
};

export type OrderLineCreateInput = {
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
  /** Product variant ID. */
  variantId: Scalars['ID'];
};

export type OrderLineInput = {
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
};

/** Mark order as manually paid. */
export type OrderMarkAsPaid = {
  __typename?: 'OrderMarkAsPaid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order marked as paid. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderMarketplaceReportType = {
  __typename?: 'OrderMarketplaceReportType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  dimension?: Maybe<Scalars['Date']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

/** Refund an order. */
export type OrderRefund = {
  __typename?: 'OrderRefund';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A refunded order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Adds return notification note to the order. */
export type OrderReturnNotification = {
  __typename?: 'OrderReturnNotification';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order return notification created. */
  event?: Maybe<OrderEvent>;
  /** Order with return notification note added. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderReturnNotificationInput = {
  /** Status of the return. */
  productNames?: InputMaybe<Scalars['String']>;
  /** Status of the return. */
  returnStatus: Scalars['String'];
};

export type OrderSellerReportType = {
  __typename?: 'OrderSellerReportType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  seller?: Maybe<Seller>;
  sellerId?: Maybe<Scalars['Int']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type OrderSellerSummaryType = {
  __typename?: 'OrderSellerSummaryType';
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  revenue?: Maybe<Scalars['Float']>;
  sellers?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export enum OrderSortField {
  /** Sort orders by channel. */
  Channel = 'CHANNEL',
  /** Sort orders by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort orders by customer. */
  Customer = 'CUSTOMER',
  /** Sort orders by fulfillment status. */
  FulfillmentStatus = 'FULFILLMENT_STATUS',
  /** Sort orders by number. */
  Number = 'NUMBER',
  /** Sort orders by payment. */
  Payment = 'PAYMENT',
  /** Sort orders by total. */
  Total = 'TOTAL'
}

export type OrderSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort orders by the selected field. */
  field: OrderSortField;
};

/** An enumeration. */
export enum OrderStatus {
  /** Canceled */
  Canceled = 'CANCELED',
  /** Draft */
  Draft = 'DRAFT',
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Partially fulfilled */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Return authorized */
  ReturnAuthorized = 'RETURN_AUTHORIZED',
  /** Return cancelled */
  ReturnCancelled = 'RETURN_CANCELLED',
  /** Return complete */
  ReturnComplete = 'RETURN_COMPLETE',
  /** Return declined */
  ReturnDeclined = 'RETURN_DECLINED',
  /** Return requested */
  ReturnRequested = 'RETURN_REQUESTED',
  /** Unfulfilled */
  Unfulfilled = 'UNFULFILLED'
}

export enum OrderStatusFilter {
  Canceled = 'CANCELED',
  Fulfilled = 'FULFILLED',
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  ReadyToCapture = 'READY_TO_CAPTURE',
  ReadyToFulfill = 'READY_TO_FULFILL',
  Unfulfilled = 'UNFULFILLED'
}

export type OrderSummaryDeltaDataType = {
  __typename?: 'OrderSummaryDeltaDataType';
  percent?: Maybe<AbstractPercentReportType>;
  values?: Maybe<AbstractOrderSellerReportType>;
};

/** Updates an order. */
export type OrderUpdate = {
  __typename?: 'OrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderUpdateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
};

/** Updates meta for order. */
export type OrderUpdateMeta = {
  __typename?: 'OrderUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Updates private meta for order. */
export type OrderUpdatePrivateMeta = {
  __typename?: 'OrderUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Updates a shipping method of the order. */
export type OrderUpdateShipping = {
  __typename?: 'OrderUpdateShipping';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order with updated shipping method. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderUpdateShippingInput = {
  /** ID of the selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
};

export type OrderVendorReportType = {
  __typename?: 'OrderVendorReportType';
  adjustments?: Maybe<Scalars['Decimal']>;
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  penalties?: Maybe<Scalars['Decimal']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  vendor?: Maybe<Vendor>;
  vendorId?: Maybe<Scalars['Int']>;
  vendorPayout?: Maybe<VendorPayout>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type OrderVendorSummaryType = {
  __typename?: 'OrderVendorSummaryType';
  adjustments?: Maybe<Scalars['Decimal']>;
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  penalties?: Maybe<Scalars['Decimal']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  vendors?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

/** Void an order. */
export type OrderVoid = {
  __typename?: 'OrderVoid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A voided order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type Page = Node & ObjectWithMetadata & {
  __typename?: 'Page';
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  created: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Whether the page is published. */
  isPublished: Scalars['Boolean'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  publicationDate?: Maybe<Scalars['Date']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  /** Returns translated page fields for the given language code. */
  translation?: Maybe<PageTranslation>;
};


/** A static page that can be manually added by a shop operator through the dashboard. */
export type PageTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Deletes pages. */
export type PageBulkDelete = {
  __typename?: 'PageBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pageErrors: Array<PageError>;
};

/** Publish pages. */
export type PageBulkPublish = {
  __typename?: 'PageBulkPublish';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pageErrors: Array<PageError>;
};

export type PageCountableConnection = {
  __typename?: 'PageCountableConnection';
  edges: Array<PageCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageCountableEdge = {
  __typename?: 'PageCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Page;
};

/** Creates a new page. */
export type PageCreate = {
  __typename?: 'PageCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  page?: Maybe<Page>;
  pageErrors: Array<PageError>;
};

/** Deletes a page. */
export type PageDelete = {
  __typename?: 'PageDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  page?: Maybe<Page>;
  pageErrors: Array<PageError>;
};

export type PageError = {
  __typename?: 'PageError';
  /** The error code. */
  code: PageErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PageErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PageFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PageInput = {
  /** Page content. May consist of ordinary text, HTML and images. */
  content?: InputMaybe<Scalars['String']>;
  /** Page content in JSON format. */
  contentJson?: InputMaybe<Scalars['JSONString']>;
  /** Determines if page is visible in the storefront. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Page internal name. */
  slug?: InputMaybe<Scalars['String']>;
  /** Page title. */
  title?: InputMaybe<Scalars['String']>;
};

export enum PageSortField {
  /** Sort pages by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort pages by publication date. */
  PublicationDate = 'PUBLICATION_DATE',
  /** Sort pages by slug. */
  Slug = 'SLUG',
  /** Sort pages by title. */
  Title = 'TITLE',
  /** Sort pages by visibility. */
  Visibility = 'VISIBILITY'
}

export type PageSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort pages by the selected field. */
  field: PageSortField;
};

export type PageTranslatableContent = Node & {
  __typename?: 'PageTranslatableContent';
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** ('A static page that can be manually added by a shop operator ', 'through the dashboard.') */
  page?: Maybe<Page>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Returns translated page fields for the given language code. */
  translation?: Maybe<PageTranslation>;
};


export type PageTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Page. */
export type PageTranslate = {
  __typename?: 'PageTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  page?: Maybe<PageTranslatableContent>;
  translationErrors: Array<TranslationError>;
};

export type PageTranslation = Node & {
  __typename?: 'PageTranslation';
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PageTranslationInput = {
  content?: InputMaybe<Scalars['String']>;
  contentJson?: InputMaybe<Scalars['JSONString']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Updates an existing page. */
export type PageUpdate = {
  __typename?: 'PageUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  page?: Maybe<Page>;
  pageErrors: Array<PageError>;
};

/** Change the password of the logged in user. */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance with a new password. */
  user?: Maybe<User>;
};

/** Represents a payment of a given type. */
export type Payment = Node & {
  __typename?: 'Payment';
  /** List of actions that can be performed in the current state of a payment. */
  actions: Array<Maybe<OrderAction>>;
  /** Maximum amount of money that can be captured. */
  availableCaptureAmount?: Maybe<Money>;
  /** Maximum amount of money that can be refunded. */
  availableRefundAmount?: Maybe<Money>;
  /** Total amount captured for this payment. */
  capturedAmount?: Maybe<Money>;
  /** Internal payment status. */
  chargeStatus: PaymentChargeStatusEnum;
  checkout?: Maybe<Checkout>;
  created: Scalars['DateTime'];
  /** The details of the card used for this payment. */
  creditCard?: Maybe<CreditCard>;
  customerIpAddress?: Maybe<Scalars['String']>;
  gateway: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  modified: Scalars['DateTime'];
  order?: Maybe<Order>;
  token: Scalars['String'];
  /** Total amount of the payment. */
  total?: Maybe<Money>;
  /** List of all transactions within this payment. */
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

/** Captures the authorized payment amount. */
export type PaymentCapture = {
  __typename?: 'PaymentCapture';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

/** An enumeration. */
export enum PaymentChargeStatusEnum {
  Cancelled = 'CANCELLED',
  FullyCharged = 'FULLY_CHARGED',
  FullyRefunded = 'FULLY_REFUNDED',
  NotCharged = 'NOT_CHARGED',
  PartiallyCharged = 'PARTIALLY_CHARGED',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refused = 'REFUSED',
  Voided = 'VOIDED'
}

export type PaymentCountableConnection = {
  __typename?: 'PaymentCountableConnection';
  edges: Array<PaymentCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentCountableEdge = {
  __typename?: 'PaymentCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Payment;
};

export type PaymentError = {
  __typename?: 'PaymentError';
  /** The error code. */
  code: PaymentErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PaymentErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  NotFound = 'NOT_FOUND',
  NotSupportedGateway = 'NOT_SUPPORTED_GATEWAY',
  PartialPaymentNotAllowed = 'PARTIAL_PAYMENT_NOT_ALLOWED',
  PaymentError = 'PAYMENT_ERROR',
  Required = 'REQUIRED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  Unique = 'UNIQUE'
}

/** Available payment gateway backend with configuration necessary to setup client. */
export type PaymentGateway = {
  __typename?: 'PaymentGateway';
  /** Payment gateway client configuration. */
  config: Array<GatewayConfigLine>;
  /** Payment gateway supported currencies. */
  currencies: Array<Maybe<Scalars['String']>>;
  /** Payment gateway ID. */
  id: Scalars['ID'];
  /** Payment gateway name. */
  name: Scalars['String'];
};

export type PaymentInput = {
  /** Total amount of the transaction, including all taxes and discounts. If no amount is provided, the checkout total will be used. */
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  /** [Deprecated] Billing address. If empty, the billing address associated with the checkout instance will be used. Use `checkoutCreate` or `checkoutBillingAddressUpdate` mutations to set it. This field will be removed after 2020-07-31. */
  billingAddress?: InputMaybe<AddressInput>;
  /** A gateway to use with that payment. */
  gateway: Scalars['String'];
  /** URL of a storefront view where user should be redirected after requiring additional actions. Payment with additional actions will not be finished if this field is not provided. */
  returnUrl?: InputMaybe<Scalars['String']>;
  /** Client-side generated payment token, representing customer's billing data in a secure manner. */
  token?: InputMaybe<Scalars['String']>;
  /** Volume discount applicable to the checkout */
  volumeDiscount?: InputMaybe<Scalars['PositiveDecimal']>;
};

/** Refunds the captured payment amount. */
export type PaymentRefund = {
  __typename?: 'PaymentRefund';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

/** Represents a payment source stored for user in payment gateway, such as credit card. */
export type PaymentSource = {
  __typename?: 'PaymentSource';
  /** Stored credit card details if available. */
  creditCardInfo?: Maybe<CreditCard>;
  /** Payment gateway name. */
  gateway: Scalars['String'];
};

/** Voids the authorized payment. */
export type PaymentVoid = {
  __typename?: 'PaymentVoid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

export type PaymentsDayReportType = {
  __typename?: 'PaymentsDayReportType';
  average?: Maybe<Scalars['Float']>;
  captured?: Maybe<Scalars['Float']>;
  chargeStatus?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Date']>;
  payments?: Maybe<Scalars['Int']>;
  totalAuthorized?: Maybe<Scalars['Float']>;
};

export type Payout = Node & {
  __typename?: 'Payout';
  adjustments?: Maybe<Money>;
  adjustmentsAmount: Scalars['Float'];
  created?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  dateRange?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  netSales?: Maybe<Money>;
  netSalesAmount: Scalars['Float'];
  payout?: Maybe<Money>;
  payoutAmount: Scalars['Float'];
  penalties?: Maybe<Money>;
  penaltiesAmount: Scalars['Float'];
  processor: PayoutProcessor;
  startDate?: Maybe<Scalars['String']>;
  status: PayoutStatus;
  updated: Scalars['DateTime'];
  vendorPayouts: VendorPayoutCountableConnection;
  vendorType: PayoutVendorType;
  vendors?: Maybe<Scalars['Int']>;
};


export type PayoutVendorPayoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Archive payouts. */
export type PayoutBulkArchive = {
  __typename?: 'PayoutBulkArchive';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payoutErrors: Array<PayoutError>;
};

export type PayoutCountableConnection = {
  __typename?: 'PayoutCountableConnection';
  edges: Array<PayoutCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PayoutCountableEdge = {
  __typename?: 'PayoutCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Payout;
};

/** Creates a new payout. */
export type PayoutCreate = {
  __typename?: 'PayoutCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payout?: Maybe<Payout>;
  payoutErrors: Array<PayoutError>;
};

export type PayoutCreateInput = {
  /** Payout end date. ISO 8601 standard. */
  endDate: Scalars['Date'];
  /** Processor for the payout */
  processor: Scalars['String'];
  /** Payout start date. ISO 8601 standard. */
  startDate: Scalars['Date'];
  /** Vendor type for the payout */
  vendorType: Scalars['String'];
};

export type PayoutDatesInput = {
  /** Payout end date. ISO 8601 standard. */
  endDate: Scalars['Date'];
  /** Payout start date. ISO 8601 standard. */
  startDate: Scalars['Date'];
};

/** Modifies the dates of a payout */
export type PayoutDatesUpdate = {
  __typename?: 'PayoutDatesUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payout?: Maybe<Payout>;
  payoutErrors: Array<PayoutError>;
};

export type PayoutError = {
  __typename?: 'PayoutError';
  /** The error code. */
  code: PayoutErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PayoutErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PayoutFilterInput = {
  created?: InputMaybe<DateRangeInput>;
  netSales?: InputMaybe<PriceRangeInput>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<PayoutStatusFilter>>>;
};

/** An enumeration. */
export enum PayoutProcessor {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** Manual */
  Manual = 'MANUAL'
}

export enum PayoutSortField {
  /** Sort payouts by created. */
  Created = 'CREATED',
  /** Sort payouts by range. */
  Range = 'RANGE',
  /** Sort payouts by report. */
  Report = 'REPORT',
  /** Sort payouts by status. */
  Status = 'STATUS'
}

export type PayoutSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort payouts by the selected field. */
  field: PayoutSortField;
};

/** An enumeration. */
export enum PayoutStatus {
  /** Archived */
  Archived = 'ARCHIVED',
  /** Draft */
  Draft = 'DRAFT',
  /** Locked */
  Locked = 'LOCKED',
  /** Paid */
  Paid = 'PAID'
}

export enum PayoutStatusFilter {
  Archived = 'archived',
  Draft = 'draft',
  Locked = 'locked',
  Paid = 'paid'
}

export type PayoutStatusInput = {
  status: Scalars['String'];
  vendorPayouts?: InputMaybe<Array<InputMaybe<VendorPayoutDetails>>>;
};

/** Modifies the status of a payout */
export type PayoutStatusUpdate = {
  __typename?: 'PayoutStatusUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Payout that was updated. */
  payout?: Maybe<Payout>;
  payoutErrors: Array<PayoutError>;
};

/** Update the vendor payouts connected to the given payout with adjustments and penalties */
export type PayoutUpdate = {
  __typename?: 'PayoutUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated payout instance. */
  payout?: Maybe<Payout>;
  payoutErrors: Array<PayoutError>;
};

export type PayoutUpdateInput = {
  /** List of vendor payouts informing how to update the payout. */
  vendorPayouts: Array<VendorPayoutUpdateInput>;
};

/** An enumeration. */
export enum PayoutVendorType {
  /** Affiliates */
  Affiliates = 'AFFILIATES',
  /** Sellers */
  Sellers = 'SELLERS'
}

/** Update whether process_pending_webhook_transactions periodic django celery beat task is enabled */
export type PeriodicTaskEnabledUpdate = {
  __typename?: 'PeriodicTaskEnabledUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated periodic task instance */
  task?: Maybe<WebhookPeriodicTask>;
};

/** Represents a permission object in a friendly form. */
export type Permission = {
  __typename?: 'Permission';
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum PermissionEnum {
  ManageAgreements = 'MANAGE_AGREEMENTS',
  ManageApps = 'MANAGE_APPS',
  ManageChannels = 'MANAGE_CHANNELS',
  ManageCheckouts = 'MANAGE_CHECKOUTS',
  ManageDiscounts = 'MANAGE_DISCOUNTS',
  ManageGiftCard = 'MANAGE_GIFT_CARD',
  ManageMarketplace = 'MANAGE_MARKETPLACE',
  ManageMarketplaceConfiguration = 'MANAGE_MARKETPLACE_CONFIGURATION',
  ManageMenus = 'MANAGE_MENUS',
  ManageMicrosites = 'MANAGE_MICROSITES',
  ManageOrders = 'MANAGE_ORDERS',
  ManagePages = 'MANAGE_PAGES',
  ManagePayouts = 'MANAGE_PAYOUTS',
  ManagePlugins = 'MANAGE_PLUGINS',
  ManageProducts = 'MANAGE_PRODUCTS',
  ManageProductTypesAndAttributes = 'MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES',
  ManageServiceAccounts = 'MANAGE_SERVICE_ACCOUNTS',
  ManageSettings = 'MANAGE_SETTINGS',
  ManageShipping = 'MANAGE_SHIPPING',
  ManageStaff = 'MANAGE_STAFF',
  ManageTranslations = 'MANAGE_TRANSLATIONS',
  ManageUsers = 'MANAGE_USERS'
}

/** Create new permission group. */
export type PermissionGroupCreate = {
  __typename?: 'PermissionGroupCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  group?: Maybe<Group>;
  permissionGroupErrors: Array<PermissionGroupError>;
};

export type PermissionGroupCreateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name: Scalars['String'];
};

/** Delete permission group. */
export type PermissionGroupDelete = {
  __typename?: 'PermissionGroupDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  group?: Maybe<Group>;
  permissionGroupErrors: Array<PermissionGroupError>;
};

export type PermissionGroupError = {
  __typename?: 'PermissionGroupError';
  /** The error code. */
  code: PermissionGroupErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum PermissionGroupErrorCode {
  AssignNonStaffMember = 'ASSIGN_NON_STAFF_MEMBER',
  CannotRemoveFromLastGroup = 'CANNOT_REMOVE_FROM_LAST_GROUP',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PermissionGroupFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

export enum PermissionGroupSortField {
  /** Sort permission group accounts by name. */
  Name = 'NAME'
}

export type PermissionGroupSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort permission group by the selected field. */
  field: PermissionGroupSortField;
};

/** Update permission group. */
export type PermissionGroupUpdate = {
  __typename?: 'PermissionGroupUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  group?: Maybe<Group>;
  permissionGroupErrors: Array<PermissionGroupError>;
};

export type PermissionGroupUpdateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to unassign from this group. */
  removePermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to unassign from this group. */
  removeUsers?: InputMaybe<Array<Scalars['ID']>>;
};

/** Plugin. */
export type Plugin = Node & {
  __typename?: 'Plugin';
  active: Scalars['Boolean'];
  allowSellers?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  configuration?: Maybe<Array<Maybe<ConfigurationItem>>>;
  created: Scalars['DateTime'];
  defaultConfiguration?: Maybe<Array<Maybe<ConfigurationItem>>>;
  description: Scalars['String'];
  descriptionShort: Scalars['String'];
  externalUrl?: Maybe<Scalars['String']>;
  fullConfiguration?: Maybe<Array<Maybe<ConfigurationItem>>>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  isFeature: Scalars['Boolean'];
  logoUrl?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSONString']>;
  name: Scalars['String'];
  paymentType: PluginConfigurationPaymentType;
  privateMetadata?: Maybe<Scalars['JSONString']>;
  rating: PluginConfigurationRating;
  subcategory?: Maybe<Scalars['String']>;
  supportUrl?: Maybe<Scalars['String']>;
  sync?: Maybe<SyncConfiguration>;
};

/** An enumeration. */
export enum PluginConfigurationPaymentType {
  /** This is a free app */
  Free = 'FREE',
  /** This is a paid app */
  Paid = 'PAID',
  /** This app has recurring payments */
  Recurring = 'RECURRING'
}

/** An enumeration. */
export enum PluginConfigurationRating {
  /** one */
  A_1 = 'A_1',
  /** two */
  A_2 = 'A_2',
  /** three */
  A_3 = 'A_3',
  /** four */
  A_4 = 'A_4',
  /** five */
  A_5 = 'A_5'
}

export type PluginCountableConnection = {
  __typename?: 'PluginCountableConnection';
  edges: Array<PluginCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PluginCountableEdge = {
  __typename?: 'PluginCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Plugin;
};

export type PluginError = {
  __typename?: 'PluginError';
  /** The error code. */
  code: PluginErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PluginErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  PluginMisconfigured = 'PLUGIN_MISCONFIGURED',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PluginFilterInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  isFeature?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['ID']>;
};

/** Delete plugin flow. */
export type PluginFlowDelete = {
  __typename?: 'PluginFlowDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pluginsErrors: Array<PluginError>;
};

export type PluginFlowInput = {
  /** Form ID from typeform */
  formId: Scalars['String'];
  /** Indicates the mapping for the given process and plugin. */
  mapping: Scalars['JSONString'];
  /** Indicates the process that this flow maps for. */
  process: Scalars['String'];
  /** Indicates the seller that is making the update, null if marketplace. */
  seller?: InputMaybe<Scalars['ID']>;
};

/** Update plugin flow. */
export type PluginFlowUpdate = {
  __typename?: 'PluginFlowUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  flow?: Maybe<Flow>;
  pluginsErrors: Array<PluginError>;
};

export enum PluginSortField {
  IsActive = 'IS_ACTIVE',
  Name = 'NAME'
}

export type PluginSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort plugins by the selected field. */
  field: PluginSortField;
};

/** Update plugin sync configuration. */
export type PluginSyncUpdate = {
  __typename?: 'PluginSyncUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pluginsErrors: Array<PluginError>;
  syncSettings?: Maybe<SyncConfiguration>;
};

export type PluginSyncUpdateInput = {
  /** Indicates the sync direction for the plugin. */
  direction: Scalars['String'];
  /** Indicates the seller that is making the update, null if marketplace. */
  seller?: InputMaybe<Scalars['ID']>;
};

/** Update plugin configuration. */
export type PluginUpdate = {
  __typename?: 'PluginUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  plugin?: Maybe<Plugin>;
  pluginsErrors: Array<PluginError>;
};

export type PluginUpdateInput = {
  /** Indicates whether the plugin should be enabled. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Indicates whether the plugin should be configurable by sellers. */
  allowSellers?: InputMaybe<Scalars['Boolean']>;
  /** Configuration of the plugin. */
  configuration?: InputMaybe<Array<InputMaybe<ConfigurationItemInput>>>;
  /** Indicates the seller that is making the update, null if marketplace. */
  seller?: InputMaybe<Scalars['ID']>;
};

export type PriceRangeInput = {
  /** Price greater than or equal to. */
  gte?: InputMaybe<Scalars['Float']>;
  /** Price less than or equal to. */
  lte?: InputMaybe<Scalars['Float']>;
};

/** Represents an individual item for sale in the storefront. */
export type Product = Node & ObjectWithMetadata & {
  __typename?: 'Product';
  /** List of attributes assigned to this product. */
  attributes: Array<SelectedAttribute>;
  availableForPurchase?: Maybe<Scalars['Date']>;
  /** Brand of the product */
  brand?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  chargeTaxes: Scalars['Boolean'];
  /** List of collections for the product. */
  collections?: Maybe<Array<Maybe<Collection>>>;
  /** Countable edges of images for the product */
  countableImages?: Maybe<ProductImageCountableConnection>;
  /** Cumulative price of all products in grouped product. */
  cumulativePrice?: Maybe<Money>;
  /** Available stock for grouped product. */
  cumulativeStock?: Maybe<Scalars['Int']>;
  defaultVariant?: Maybe<ProductVariant>;
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Products destination location. */
  destinationLocation?: Maybe<Location>;
  externalId?: Maybe<Scalars['String']>;
  externalSource?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<FeatureItems>>>;
  /** List of all grouped products. */
  groupedProducts?: Maybe<Array<Maybe<Product>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Get a single product image by ID. */
  imageById?: Maybe<ProductImage>;
  /** List of images for the product. */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /** Whether the product is in stock and visible or not. */
  isAvailable?: Maybe<Scalars['Boolean']>;
  /** Whether the product is available for purchase. */
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  /** Whether the product is published. */
  isPublished: Scalars['Boolean'];
  /** List of all product's locations. */
  locations?: Maybe<Array<Maybe<Location>>>;
  /** Manufacturer of the product */
  manufacturer?: Maybe<Scalars['String']>;
  margin?: Maybe<Margin>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** The price of the cheapest variant (including discounts). */
  minimalVariantPrice?: Maybe<Money>;
  /** Product model code */
  model?: Maybe<Scalars['String']>;
  /** Manufacturer Product Number */
  mpn?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** Products origin location. */
  originLocation?: Maybe<Location>;
  overridePrice: Scalars['Boolean'];
  /** Lists the storefront product's pricing, the current price and discounts, only meant for displaying. */
  pricing?: Maybe<ProductPricingInfo>;
  /** Products primary location. */
  primaryLocation?: Maybe<Location>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Product configuration indicator. */
  productConfiguration?: Maybe<Scalars['Int']>;
  productType: ProductType;
  publicationDate?: Maybe<Scalars['Date']>;
  purchaseCost?: Maybe<MoneyRange>;
  seller?: Maybe<Seller>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  /** A type of tax. Assigned by enabled tax gateway */
  taxType?: Maybe<TaxType>;
  /** The main thumbnail for a product. */
  thumbnail?: Maybe<Image>;
  /** Returns translated product fields for the given language code. */
  translation?: Maybe<ProductTranslation>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The storefront URL for the product.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url: Scalars['String'];
  /** List of variants for the product. */
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
  visibleInListings: Scalars['Boolean'];
  weight?: Maybe<Weight>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductCountableImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductImageByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductThumbnailArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Update product category for multiple products */
export type ProductBulkCategoryUpdate = {
  __typename?: 'ProductBulkCategoryUpdate';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Deletes products. */
export type ProductBulkDelete = {
  __typename?: 'ProductBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Publish products. */
export type ProductBulkPublish = {
  __typename?: 'ProductBulkPublish';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type ProductCategoryReportType = {
  __typename?: 'ProductCategoryReportType';
  avgPrice?: Maybe<Scalars['Float']>;
  avgPriceGrossAmount?: Maybe<Scalars['Float']>;
  category?: Maybe<Category>;
  grossRevenue?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  maxPriceGrossAmount?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  minPriceGrossAmount?: Maybe<Scalars['Float']>;
  product_CategoryId?: Maybe<Scalars['Int']>;
  quantityOrdered?: Maybe<Scalars['Int']>;
  revenue?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
};

/** Clears public metadata item for product. */
export type ProductClearMeta = {
  __typename?: 'ProductClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Clears private metadata item for product. */
export type ProductClearPrivateMeta = {
  __typename?: 'ProductClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductCountableConnection = {
  __typename?: 'ProductCountableConnection';
  edges: Array<ProductCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductCountableEdge = {
  __typename?: 'ProductCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

/** Creates a new product. */
export type ProductCreate = {
  __typename?: 'ProductCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductCreateInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** Default price for product variant. Note: this field is only used if a product doesn't use variants. */
  basePrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Product brand */
  brand?: InputMaybe<Scalars['String']>;
  /** ID of the product's category. */
  category?: InputMaybe<Scalars['ID']>;
  /** Determine if taxes are being charged for the product. */
  chargeTaxes?: InputMaybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Product configuration choice identifier */
  configuration?: InputMaybe<Scalars['Int']>;
  /** Default cost price for product variant. Note: this field is only used if a product doesn't use variants. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Product description (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Product description (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Product features (JSON). */
  features?: InputMaybe<Scalars['JSONString']>;
  /** Determines if product is visible to customers. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Manufacturer of the product */
  manufacturer?: InputMaybe<Scalars['String']>;
  /** Product model code */
  model?: InputMaybe<Scalars['String']>;
  /** Manufacturer product number */
  mpn?: InputMaybe<Scalars['String']>;
  /** Product name. */
  name?: InputMaybe<Scalars['String']>;
  /** Override price for grouped products */
  overridePrice?: InputMaybe<Scalars['Boolean']>;
  /** ID of the type that product belongs to. */
  productType: Scalars['ID'];
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  seller?: InputMaybe<Scalars['ID']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Stock keeping unit of a product. Note: this field is only used if a product doesn't use variants. */
  sku?: InputMaybe<Scalars['String']>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** Stocks of a product available for sale. Note: this field is only used if a product doesn't use variants. */
  stocks?: InputMaybe<Array<StockInput>>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Determines if the inventory of this product should be tracked. If false, the quantity won't change when customers buy this item. Note: this field is only used if a product doesn't use variants. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Determines if product is visible in product listings (doesn't apply to product collections). */
  visibleInListings?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Deletes a product. */
export type ProductDelete = {
  __typename?: 'ProductDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductError = {
  __typename?: 'ProductError';
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ProductErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  AttributeAlreadyAssigned = 'ATTRIBUTE_ALREADY_ASSIGNED',
  AttributeCannotBeAssigned = 'ATTRIBUTE_CANNOT_BE_ASSIGNED',
  AttributeVariantsDisabled = 'ATTRIBUTE_VARIANTS_DISABLED',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  NotProductsImage = 'NOT_PRODUCTS_IMAGE',
  NotProductsVariant = 'NOT_PRODUCTS_VARIANT',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  VariantNoDigitalContent = 'VARIANT_NO_DIGITAL_CONTENT'
}

/** Toggle enabled value for product expiration django celery beat task */
export type ProductExpirationCheckTaskUpdate = {
  __typename?: 'ProductExpirationCheckTaskUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated periodic task instance */
  task?: Maybe<WebhookPeriodicTask>;
};

export enum ProductFieldEnum {
  AvailableForPurchase = 'AVAILABLE_FOR_PURCHASE',
  Category = 'CATEGORY',
  ChargeTaxes = 'CHARGE_TAXES',
  Collections = 'COLLECTIONS',
  CostPrice = 'COST_PRICE',
  Description = 'DESCRIPTION',
  Name = 'NAME',
  ProductImages = 'PRODUCT_IMAGES',
  ProductType = 'PRODUCT_TYPE',
  ProductWeight = 'PRODUCT_WEIGHT',
  Searchable = 'SEARCHABLE',
  VariantImages = 'VARIANT_IMAGES',
  VariantPrice = 'VARIANT_PRICE',
  VariantSku = 'VARIANT_SKU',
  VariantWeight = 'VARIANT_WEIGHT',
  Visible = 'VISIBLE'
}

export type ProductFilterInput = {
  attributes?: InputMaybe<Array<InputMaybe<AttributeInput>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  configuration?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  dates?: InputMaybe<CustomDateRangeInput>;
  hasCategory?: InputMaybe<Scalars['Boolean']>;
  hideProductsInGroup?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  inCircle?: InputMaybe<Array<InputMaybe<RadiusSearchInput>>>;
  isGroup?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  isSimple?: InputMaybe<Scalars['Boolean']>;
  minimalPrice?: InputMaybe<PriceRangeInput>;
  price?: InputMaybe<PriceRangeInput>;
  productType?: InputMaybe<Scalars['ID']>;
  productTypes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  search?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['ID']>;
  sellers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  stockAvailability?: InputMaybe<StockAvailability>;
  stocks?: InputMaybe<ProductStockFilterInput>;
};

/** Represents a product image. */
export type ProductImage = Node & {
  __typename?: 'ProductImage';
  alt: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  sortOrder?: Maybe<Scalars['Int']>;
  /** The URL of the image. */
  url: Scalars['String'];
};


/** Represents a product image. */
export type ProductImageUrlArgs = {
  size?: InputMaybe<Scalars['Int']>;
};

/** Deletes product images. */
export type ProductImageBulkDelete = {
  __typename?: 'ProductImageBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

export type ProductImageCountableConnection = {
  __typename?: 'ProductImageCountableConnection';
  edges: Array<ProductImageCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductImageCountableEdge = {
  __typename?: 'ProductImageCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductImage;
};

/** Create a product image. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type ProductImageCreate = {
  __typename?: 'ProductImageCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  image?: Maybe<ProductImage>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductImageCreateInput = {
  /** Alt text for an image. */
  alt?: InputMaybe<Scalars['String']>;
  /** Represents an image file in a multipart request. */
  image: Scalars['Upload'];
  /** ID of an product. */
  product: Scalars['ID'];
};

/** Deletes a product image. */
export type ProductImageDelete = {
  __typename?: 'ProductImageDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  image?: Maybe<ProductImage>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Changes ordering of the product image. */
export type ProductImageReorder = {
  __typename?: 'ProductImageReorder';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  images?: Maybe<Array<Maybe<ProductImage>>>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Updates a product image. */
export type ProductImageUpdate = {
  __typename?: 'ProductImageUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  image?: Maybe<ProductImage>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductImageUpdateInput = {
  /** Alt text for an image. */
  alt?: InputMaybe<Scalars['String']>;
};

export type ProductInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** Default price for product variant. Note: this field is only used if a product doesn't use variants. */
  basePrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Product brand */
  brand?: InputMaybe<Scalars['String']>;
  /** ID of the product's category. */
  category?: InputMaybe<Scalars['ID']>;
  /** Determine if taxes are being charged for the product. */
  chargeTaxes?: InputMaybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Default cost price for product variant. Note: this field is only used if a product doesn't use variants. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Product description (HTML/text). */
  description?: InputMaybe<Scalars['String']>;
  /** Product description (JSON). */
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  /** Product features (JSON). */
  features?: InputMaybe<Scalars['JSONString']>;
  /** Determines if product is visible to customers. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** Manufacturer of the product */
  manufacturer?: InputMaybe<Scalars['String']>;
  /** Product model code */
  model?: InputMaybe<Scalars['String']>;
  /** Manufacturer product number */
  mpn?: InputMaybe<Scalars['String']>;
  /** Product name. */
  name?: InputMaybe<Scalars['String']>;
  /** Override price for grouped products */
  overridePrice?: InputMaybe<Scalars['Boolean']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: InputMaybe<Scalars['Date']>;
  seller?: InputMaybe<Scalars['ID']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Stock keeping unit of a product. Note: this field is only used if a product doesn't use variants. */
  sku?: InputMaybe<Scalars['String']>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Determines if the inventory of this product should be tracked. If false, the quantity won't change when customers buy this item. Note: this field is only used if a product doesn't use variants. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Determines if product is visible in product listings (doesn't apply to product collections). */
  visibleInListings?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Create a new location for the product. */
export type ProductLocationCreate = {
  __typename?: 'ProductLocationCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A location instance which was created */
  location?: Maybe<Location>;
  /** A product instance for which the location was created. */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Delete a location for a product. */
export type ProductLocationDelete = {
  __typename?: 'ProductLocationDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A product instance for which a location was deleted */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Updates a location for a product. */
export type ProductLocationUpdate = {
  __typename?: 'ProductLocationUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A location instance which was updated */
  location?: Maybe<Location>;
  /** A product instance for which the location was updated. */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductOrder = {
  /**
   * Sort product by the selected attribute's values.
   * Note: this doesn't take translations into account yet.
   */
  attributeId?: InputMaybe<Scalars['ID']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort products by the selected field. */
  field?: InputMaybe<ProductOrderField>;
};

export enum ProductOrderField {
  /** Sort products by category. */
  Category = 'CATEGORY',
  /** Sort products by update date. */
  Date = 'DATE',
  /** Sort products by a minimal price of a product's variant. */
  MinimalPrice = 'MINIMAL_PRICE',
  /** Sort products by name. */
  Name = 'NAME',
  /** Sort products by price. */
  Price = 'PRICE',
  /** Sort products by publication date. */
  PublicationDate = 'PUBLICATION_DATE',
  /** Sort products by publication status. */
  Published = 'PUBLISHED',
  /** Sort products by seller. */
  Seller = 'SELLER',
  /** Sort products by sku. */
  Sku = 'SKU',
  /** Sort products by type. */
  Type = 'TYPE'
}

/** Represents availability of a product in the storefront. */
export type ProductPricingInfo = {
  __typename?: 'ProductPricingInfo';
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The discounted price range of the product variants. */
  priceRange?: Maybe<TaxedMoneyRange>;
  /** The discounted price range of the product variants in the local currency. */
  priceRangeLocalCurrency?: Maybe<TaxedMoneyRange>;
  /** The undiscounted price range of the product variants. */
  priceRangeUndiscounted?: Maybe<TaxedMoneyRange>;
};

/** Represents ratings and reviews for a product. */
export type ProductRatingsAndReviews = {
  __typename?: 'ProductRatingsAndReviews';
  /** Summary of all ratings and reviews */
  bottomline?: Maybe<BottomLine>;
  /** List of reviews. */
  reviews?: Maybe<Array<Maybe<Review>>>;
};

export type ProductReviewAverageType = {
  __typename?: 'ProductReviewAverageType';
  average?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Int']>;
};

export type ProductReviewComment = {
  __typename?: 'ProductReviewComment';
  comment?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type ProductReviewType = Node & {
  __typename?: 'ProductReviewType';
  comments?: Maybe<Array<Maybe<ProductReviewComment>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  product: Product;
  rating?: Maybe<Scalars['Int']>;
  user: User;
};

/** Set product availability for purchase date. */
export type ProductSetAvailabilityForPurchase = {
  __typename?: 'ProductSetAvailabilityForPurchase';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Sets a location type. */
export type ProductSetLocationType = {
  __typename?: 'ProductSetLocationType';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated location instance. */
  location?: Maybe<Location>;
  /** An updated product instance. */
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductStockFilterInput = {
  quantity?: InputMaybe<IntRangeInput>;
  warehouseIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type ProductTranslatableContent = Node & {
  __typename?: 'ProductTranslatableContent';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Represents an individual item for sale in the storefront. */
  product?: Maybe<Product>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated product fields for the given language code. */
  translation?: Maybe<ProductTranslation>;
};


export type ProductTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Product. */
export type ProductTranslate = {
  __typename?: 'ProductTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  translationErrors: Array<TranslationError>;
};

export type ProductTranslation = Node & {
  __typename?: 'ProductTranslation';
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductType = Node & ObjectWithMetadata & {
  __typename?: 'ProductType';
  availableAttributes?: Maybe<AttributeCountableConnection>;
  createdBy?: Maybe<Seller>;
  /** External source from which the product type is imported. */
  externalSource?: Maybe<Scalars['String']>;
  hasVariants: Scalars['Boolean'];
  /** The ID of the object. */
  id: Scalars['ID'];
  isDigital: Scalars['Boolean'];
  isShippingRequired: Scalars['Boolean'];
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Brand of the product */
  model?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Product attributes of that product type. */
  productAttributes?: Maybe<Array<Maybe<Attribute>>>;
  /** List of products of this type. */
  products?: Maybe<ProductCountableConnection>;
  slug: Scalars['String'];
  /** A type of tax rate. */
  taxRate?: Maybe<TaxRateType>;
  /** A type of tax. Assigned by enabled tax gateway */
  taxType?: Maybe<TaxType>;
  /** Variant attributes of that product type. */
  variantAttributes?: Maybe<Array<Maybe<Attribute>>>;
  weight?: Maybe<Weight>;
};


/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeAvailableAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Deletes product types. */
export type ProductTypeBulkDelete = {
  __typename?: 'ProductTypeBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata for product type. */
export type ProductTypeClearMeta = {
  __typename?: 'ProductTypeClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Clears private metadata for product type. */
export type ProductTypeClearPrivateMeta = {
  __typename?: 'ProductTypeClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

export enum ProductTypeConfigurable {
  Configurable = 'CONFIGURABLE',
  Simple = 'SIMPLE'
}

export type ProductTypeCountableConnection = {
  __typename?: 'ProductTypeCountableConnection';
  edges: Array<ProductTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductTypeCountableEdge = {
  __typename?: 'ProductTypeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductType;
};

/** Creates a new product type. */
export type ProductTypeCreate = {
  __typename?: 'ProductTypeCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Deletes a product type. */
export type ProductTypeDelete = {
  __typename?: 'ProductTypeDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

export enum ProductTypeEnum {
  Digital = 'DIGITAL',
  Shippable = 'SHIPPABLE'
}

export type ProductTypeFilterInput = {
  configurable?: InputMaybe<ProductTypeConfigurable>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  productType?: InputMaybe<ProductTypeEnum>;
  search?: InputMaybe<Scalars['String']>;
  showExternal?: InputMaybe<Scalars['Boolean']>;
};

export type ProductTypeInput = {
  /** ID of the Seller that created the Product Type, or null if Marketplace Operator */
  createdBy?: InputMaybe<Scalars['String']>;
  /** Determines if product of this type has multiple variants. This option mainly simplifies product management in the dashboard. There is always at least one variant created under the hood. */
  hasVariants?: InputMaybe<Scalars['Boolean']>;
  /** Determines if products are digital. */
  isDigital?: InputMaybe<Scalars['Boolean']>;
  /** Determines if shipping is required for products of this variant. */
  isShippingRequired?: InputMaybe<Scalars['Boolean']>;
  /** Name of the product type. */
  name?: InputMaybe<Scalars['String']>;
  /** List of attributes shared among all product variants. */
  productAttributes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Product type slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: InputMaybe<Scalars['String']>;
  /** List of attributes used to distinguish between different variants of a product. */
  variantAttributes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Weight of the ProductType items. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Reorder the attributes of a product type. */
export type ProductTypeReorderAttributes = {
  __typename?: 'ProductTypeReorderAttributes';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  /** Product type from which attributes are reordered. */
  productType?: Maybe<ProductType>;
};

export enum ProductTypeSortField {
  /** Sort products by type. */
  Digital = 'DIGITAL',
  /** Sort products by Sort attributes by external source. */
  ExternalSource = 'EXTERNAL_SOURCE',
  /** Sort products by name. */
  Name = 'NAME',
  /** Sort products by shipping. */
  ShippingRequired = 'SHIPPING_REQUIRED'
}

export type ProductTypeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort product types by the selected field. */
  field: ProductTypeSortField;
};

/** Updates an existing product type. */
export type ProductTypeUpdate = {
  __typename?: 'ProductTypeUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Update public metadata for product type. */
export type ProductTypeUpdateMeta = {
  __typename?: 'ProductTypeUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Update private metadata for product type. */
export type ProductTypeUpdatePrivateMeta = {
  __typename?: 'ProductTypeUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Updates an existing product. */
export type ProductUpdate = {
  __typename?: 'ProductUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Update public metadata for product. */
export type ProductUpdateMeta = {
  __typename?: 'ProductUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Update private metadata for product. */
export type ProductUpdatePrivateMeta = {
  __typename?: 'ProductUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariant = Node & ObjectWithMetadata & {
  __typename?: 'ProductVariant';
  /** List of attributes assigned to this variant. */
  attributes: Array<SelectedAttribute>;
  /** Cost price of the variant. */
  costPrice?: Maybe<Money>;
  /** Digital content for the product variant. */
  digitalContent?: Maybe<DigitalContent>;
  grossRevenue?: Maybe<Scalars['Float']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of images for the product variant. */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /**
   * Whether the variant is in stock and visible or not.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  isAvailable?: Maybe<Scalars['Boolean']>;
  /** Gross margin percentage value. */
  margin?: Maybe<Scalars['Int']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  name: Scalars['String'];
  netRevenue?: Maybe<Scalars['Float']>;
  /** Base price of a product variant. This field is restricted for admins. Use the pricing field to get the public price for customers. */
  price?: Maybe<Money>;
  /** Lists the storefront variant's pricing, the current price and discounts, only meant for displaying. */
  pricing?: Maybe<VariantPricingInfo>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  product: Product;
  /**
   * Quantity of a product available for sale.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  quantity: Scalars['Int'];
  /**
   * Quantity allocated for orders.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  quantityAllocated?: Maybe<Scalars['Int']>;
  /** Quantity of a product available for sale in one checkout. */
  quantityAvailable: Scalars['Int'];
  /** Total quantity ordered. */
  quantityOrdered?: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  /**
   * Quantity of a product available for sale.
   * @deprecated Use the quantityAvailable field instead. This field will be removed after 2020-07-31.
   */
  stockQuantity: Scalars['Int'];
  /** Stocks for the product variant. */
  stocks?: Maybe<Array<Maybe<Stock>>>;
  trackInventory: Scalars['Boolean'];
  /** Returns translated product variant fields for the given language code. */
  translation?: Maybe<ProductVariantTranslation>;
  weight?: Maybe<Weight>;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantQuantityAvailableArgs = {
  countryCode?: InputMaybe<CountryCode>;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantStocksArgs = {
  countryCode?: InputMaybe<CountryCode>;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates product variants for a given product. */
export type ProductVariantBulkCreate = {
  __typename?: 'ProductVariantBulkCreate';
  bulkProductErrors: Array<BulkProductError>;
  /** Returns how many objects were created. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** List of the created variants. */
  productVariants: Array<ProductVariant>;
};

export type ProductVariantBulkCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<InputMaybe<AttributeValueInput>>;
  /** Cost price of the variant. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Stock keeping unit. */
  sku: Scalars['String'];
  /** Stocks of a product available for sale. */
  stocks?: InputMaybe<Array<StockInput>>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Deletes product variants. */
export type ProductVariantBulkDelete = {
  __typename?: 'ProductVariantBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
};

/** Clears public metadata for product variant. */
export type ProductVariantClearMeta = {
  __typename?: 'ProductVariantClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Clears private metadata for product variant. */
export type ProductVariantClearPrivateMeta = {
  __typename?: 'ProductVariantClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantCountableConnection = {
  __typename?: 'ProductVariantCountableConnection';
  edges: Array<ProductVariantCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductVariantCountableEdge = {
  __typename?: 'ProductVariantCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductVariant;
};

/** Creates a new variant for a product. */
export type ProductVariantCreate = {
  __typename?: 'ProductVariantCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<InputMaybe<AttributeValueInput>>;
  /** Cost price of the variant. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Product ID of which type is the variant. */
  product: Scalars['ID'];
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /** Stocks of a product available for sale. */
  stocks?: InputMaybe<Array<StockInput>>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Deletes a product variant. */
export type ProductVariantDelete = {
  __typename?: 'ProductVariantDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductVariantInput = {
  /** List of attributes specific to this variant. */
  attributes?: InputMaybe<Array<InputMaybe<AttributeValueInput>>>;
  /** Cost price of the variant. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook. */
export type ProductVariantReorder = {
  __typename?: 'ProductVariantReorder';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

export type ProductVariantReportType = {
  __typename?: 'ProductVariantReportType';
  avgPrice?: Maybe<Scalars['Float']>;
  avgPriceGrossAmount?: Maybe<Scalars['Float']>;
  grossRevenue?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  maxPrice?: Maybe<Scalars['Float']>;
  maxPriceGrossAmount?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  minPriceGrossAmount?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['Int']>;
  quantityOrdered?: Maybe<Scalars['Int']>;
  revenue?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
};

/** Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook. */
export type ProductVariantSetDefault = {
  __typename?: 'ProductVariantSetDefault';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Creates stocks for product variant. */
export type ProductVariantStocksCreate = {
  __typename?: 'ProductVariantStocksCreate';
  bulkStockErrors: Array<BulkStockError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
};

/** Delete stocks from product variant. */
export type ProductVariantStocksDelete = {
  __typename?: 'ProductVariantStocksDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
  stockErrors: Array<StockError>;
};

/** Update stocks for product variant. */
export type ProductVariantStocksUpdate = {
  __typename?: 'ProductVariantStocksUpdate';
  bulkStockErrors: Array<BulkStockError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantTranslatableContent = Node & {
  __typename?: 'ProductVariantTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Represents a version of a product such as different size or color. */
  productVariant?: Maybe<ProductVariant>;
  /** Returns translated product variant fields for the given language code. */
  translation?: Maybe<ProductVariantTranslation>;
};


export type ProductVariantTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Product Variant. */
export type ProductVariantTranslate = {
  __typename?: 'ProductVariantTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productVariant?: Maybe<ProductVariant>;
  translationErrors: Array<TranslationError>;
};

export type ProductVariantTranslation = Node & {
  __typename?: 'ProductVariantTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

/** Updates an existing variant for product. */
export type ProductVariantUpdate = {
  __typename?: 'ProductVariantUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Update public metadata for product variant. */
export type ProductVariantUpdateMeta = {
  __typename?: 'ProductVariantUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Update private metadata for product variant. */
export type ProductVariantUpdatePrivateMeta = {
  __typename?: 'ProductVariantUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type Query = {
  __typename?: 'Query';
  _entities?: Maybe<Array<Maybe<_Entity>>>;
  _service?: Maybe<_Service>;
  accessVault?: Maybe<VaultType>;
  /** Look up an address by ID. */
  address?: Maybe<Address>;
  /** Returns address validation rules. */
  addressValidationRules?: Maybe<AddressValidationData>;
  affiliate?: Maybe<OptimizedAffiliate>;
  /** List of affiliates' codes */
  affiliateCodes?: Maybe<AffiliateCodesCountableConnection>;
  /** List of the shop's affiliates */
  affiliates?: Maybe<UserCountableConnection>;
  /** Look up a marketplace agreement by ID or slug. */
  agreement?: Maybe<Agreement>;
  /** List of the marketplace agreements. */
  agreements?: Maybe<AgreementCountableConnection>;
  /** Unfiltered and unpaginated list of the shop's categories. */
  allCategories?: Maybe<Array<Maybe<Category>>>;
  allowedOwners?: Maybe<UserCountableConnection>;
  analytics?: Maybe<Scalars['GoogleAnalyticsObjectField']>;
  /** Look up a app by ID. */
  app?: Maybe<App>;
  /** List of the apps. */
  apps?: Maybe<AppCountableConnection>;
  /** List of all apps installations */
  appsInstallations: Array<AppInstallation>;
  /** Look up an attribute by ID. */
  attribute?: Maybe<Attribute>;
  /** List of the shop's attributes. */
  attributes?: Maybe<AttributeCountableConnection>;
  /** List of plugins that are available as product import sources */
  availableImportSources?: Maybe<Array<Maybe<Plugin>>>;
  availablePlans?: Maybe<AgreementCountableConnection>;
  barcodeLookup?: Maybe<Scalars['BarcodeObjectField']>;
  branding?: Maybe<BrandingType>;
  /** List of the shop's categories. */
  categories?: Maybe<CategoryCountableConnection>;
  /** Look up a category by ID or slug. */
  category?: Maybe<Category>;
  /** List of webhook jobs */
  channels?: Maybe<ChannelCountableConnection>;
  /** Look up a checkout by token. */
  checkout?: Maybe<Checkout>;
  /** Look up a checkout line by ID. */
  checkoutLine?: Maybe<CheckoutLine>;
  /** List of checkout lines. */
  checkoutLines?: Maybe<CheckoutLineCountableConnection>;
  /** List of checkouts. */
  checkouts?: Maybe<CheckoutCountableConnection>;
  /** Look up a collection by ID. */
  collection?: Maybe<Collection>;
  /** List of the shop's collections. */
  collections?: Maybe<CollectionCountableConnection>;
  coredata?: Maybe<CoreDataType>;
  coredatalist?: Maybe<Array<Maybe<CoreDataType>>>;
  /** Get customer records from Yotpo Loyalty & Referrals. */
  customerLoyaltyAndReferralsDetails?: Maybe<YotpoCustomer>;
  /** List of the shop's customers. */
  customers?: Maybe<UserCountableConnection>;
  dashboardGraph?: Maybe<DashboardGraphType>;
  dashboardOrdersSummary?: Maybe<DasbhoardOrdersSummaryType>;
  dashboardTopSellerPerformance?: Maybe<DasbhoardTopSellerPerformanceType>;
  designerdata?: Maybe<DesignerDataType>;
  designerdatalist?: Maybe<Array<Maybe<DesignerDataType>>>;
  /** Look up digital content by ID. */
  digitalContent?: Maybe<DigitalContent>;
  /** List of digital content. */
  digitalContents?: Maybe<DigitalContentCountableConnection>;
  /** List of the shop's directories. */
  directories?: Maybe<DirectoryCountableConnection>;
  /** Look up a directory by ID or slug. */
  directory?: Maybe<Directory>;
  /** List of draft orders. */
  draftOrders?: Maybe<OrderCountableConnection>;
  drugLookup?: Maybe<Scalars['BarcodeObjectField']>;
  /** Look up a export file by ID. */
  exportFile?: Maybe<ExportFile>;
  /** List of export files. */
  exportFiles?: Maybe<ExportFileCountableConnection>;
  /** Get client secret if necessary for frontend configuration. */
  getClientSecret?: Maybe<Scalars['GenericScalar']>;
  /** Look up a gift card by ID. */
  giftCard?: Maybe<GiftCard>;
  /** List of gift cards. */
  giftCards?: Maybe<GiftCardCountableConnection>;
  hashtagsByCreator?: Maybe<HashtagTypeCountableConnection>;
  /** List of activity events to display on homepage (at the moment it only contains order-events). */
  homepageEvents?: Maybe<OrderEventCountableConnection>;
  /** Get third party product in form we can use for import */
  importThirdPartyProduct?: Maybe<Scalars['GenericScalar']>;
  insightsMarketplaceAffiliatePayoutsSummary?: Maybe<InReportMarketplaceAffiliatePayoutsSummaryType>;
  insightsMarketplacePaymentsSummary?: Maybe<InReportMaretplacePaymentsSummaryType>;
  insightsMarketplacePayoutsSummary?: Maybe<InReportMarketplacePayoutsSummaryType>;
  insightsMarketplaceTaxSummary?: Maybe<InReportMaretplaceTaxSummaryType>;
  insightsMarketplaceTaxesByCountry?: Maybe<InReportMaretplaceTaxesByCountryType>;
  insightsMarketplaceTaxesByCountryArea?: Maybe<InReportMaretplaceTaxesByCountryType>;
  insightsOrdersCustomerSummary?: Maybe<InReportOrderCustomerSummaryType>;
  insightsOrdersMarketplaceSummary?: Maybe<InReportOrderMarketplaceSummaryType>;
  insightsOrdersSellerSummary?: Maybe<InReportOrderSellerSummaryType>;
  insightsTopPerformingCategories?: Maybe<InReportTopPerformingCategoriesType>;
  insightsTopPerformingProducts?: Maybe<InReportTopPerformingProductsType>;
  layout?: Maybe<LayoutType>;
  layouts?: Maybe<Array<Maybe<LayoutType>>>;
  /** Look up a listing by ID. */
  listing?: Maybe<Listing>;
  /** List of the shop's listings. */
  listings?: Maybe<ListingCountableConnection>;
  /** Get Loyalty & Referrals configuration information. */
  loyaltyAndReferralsInfo?: Maybe<LoyaltyAndReferrals>;
  /** Return configuration for the marketplace. */
  marketplaceConfiguration: MarketplaceConfiguration;
  /** List of activity events to display on homepage (at the moment it only contains nautical-order-events). */
  marketplaceHomepageEvents?: Maybe<NauticalOrderEventCountableConnection>;
  /** Return notifications for the marketplace. */
  marketplaceNotifications: Array<Maybe<MarketplaceNotificationsConfiguration>>;
  /** Return the currently authenticated user. */
  me?: Maybe<User>;
  mention?: Maybe<MentionNode>;
  mentionCount?: Maybe<Scalars['Int']>;
  /** The ID of the object */
  mentionNode?: Maybe<MentionNode>;
  mentionsByReceiver?: Maybe<MentionNodeCountableConnection>;
  mentionsBySender?: Maybe<MentionNodeCountableConnection>;
  /** Look up a navigation menu by ID or name. */
  menu?: Maybe<Menu>;
  /** Look up a menu item by ID. */
  menuItem?: Maybe<MenuItem>;
  /** List of the storefronts's menu items. */
  menuItems?: Maybe<MenuItemCountableConnection>;
  /** List of the storefront's menus. */
  menus?: Maybe<MenuCountableConnection>;
  /** Look up a microsite by ID or slug */
  microsite?: Maybe<Microsite>;
  /** List of microsites */
  microsites?: Maybe<MicrositeCountableConnection>;
  nauticalApp?: Maybe<NauticalAppsType>;
  nauticalApps?: Maybe<NauticalAppsTypeCountableConnection>;
  /** Return requested nautical configuration item */
  nauticalConfiguration?: Maybe<NauticalConfiguration>;
  /** Return all nautical configuration items */
  nauticalConfigurationList?: Maybe<Array<Maybe<NauticalConfiguration>>>;
  /** List of draft orders. */
  nauticalDraftOrders?: Maybe<NauticalOrderCountableConnection>;
  /** Look up nautical order by ID. */
  nauticalOrder?: Maybe<NauticalOrder>;
  /** Look up a nautical order by token */
  nauticalOrderByToken?: Maybe<NauticalOrder>;
  /** List of Nautical orders. */
  nauticalOrders?: Maybe<NauticalOrderCountableConnection>;
  /** Return the total sales amount from a specific period. */
  nauticalOrdersTotal?: Maybe<TaxedMoney>;
  nauticalSuborders?: Maybe<Array<Maybe<NauticalSubOrder>>>;
  /** Number of new sellers created in given period. */
  newSellers?: Maybe<Scalars['Int']>;
  openVault?: Maybe<Array<Maybe<VaultType>>>;
  optimizedHome?: Maybe<OptimizedHome>;
  /** Look up an order by ID. */
  order?: Maybe<Order>;
  /** Look up an order by token. */
  orderByToken?: Maybe<Order>;
  /** List of orders. */
  orders?: Maybe<OrderCountableConnection>;
  /** Return the total sales amount from a specific period. */
  ordersTotal?: Maybe<TaxedMoney>;
  /** Look up a page by ID or slug. */
  page?: Maybe<Page>;
  /** List of the shop's pages. */
  pages?: Maybe<PageCountableConnection>;
  /** Look up a payment by ID. */
  payment?: Maybe<Payment>;
  /** List of payments. */
  payments?: Maybe<PaymentCountableConnection>;
  /** Look up a payout by ID. */
  payout?: Maybe<Payout>;
  /** List of payouts. */
  payouts?: Maybe<PayoutCountableConnection>;
  periodicTask?: Maybe<WebhookPeriodicTask>;
  /** Look up permission group by ID. */
  permissionGroup?: Maybe<Group>;
  /** List of permission groups. */
  permissionGroups?: Maybe<GroupCountableConnection>;
  /** Look up a plugin by ID. */
  plugin?: Maybe<Plugin>;
  /** Get the flows associated with a particular plugin and seller */
  pluginFlows?: Maybe<Array<Maybe<Flow>>>;
  /** Look up a plugin's sync settings by ID and seller ID. */
  pluginSyncSettings?: Maybe<SyncConfiguration>;
  /** List of plugins. */
  plugins?: Maybe<PluginCountableConnection>;
  /** Look up a product by ID. */
  product?: Maybe<Product>;
  productRatingsAndReviews?: Maybe<ProductRatingsAndReviews>;
  productReview?: Maybe<ProductReviewType>;
  productReviewAverage?: Maybe<ProductReviewAverageType>;
  productReviews?: Maybe<Array<Maybe<ProductReviewType>>>;
  /** Look up a product type by ID. */
  productType?: Maybe<ProductType>;
  /** List of the shop's product types. */
  productTypes?: Maybe<ProductTypeCountableConnection>;
  /** Look up a product variant by ID or SKU. */
  productVariant?: Maybe<ProductVariant>;
  /** List of product variants. */
  productVariants?: Maybe<ProductVariantCountableConnection>;
  /** List of the shop's products. */
  products?: Maybe<ProductCountableConnection>;
  /** List of top selling products. */
  reportProductSales?: Maybe<ProductVariantCountableConnection>;
  /** List of fulfillments. */
  returns?: Maybe<FulfillmentCountableConnection>;
  /** Look up a sale by ID. */
  sale?: Maybe<Sale>;
  /** List of the shop's sales. */
  sales?: Maybe<SaleCountableConnection>;
  /** Look up seller by global ID */
  seller?: Maybe<Seller>;
  /** Look up what agreement a seller is attached to */
  sellerAgreement?: Maybe<AgreementSellers>;
  /** Return the total commissions earned across all sellers for the given period. */
  sellerCommissions?: Maybe<Money>;
  sellerDetailCards?: Maybe<SellerDetailCards>;
  sellerEvents?: Maybe<SellerEventTypeCountableConnection>;
  sellerListCards?: Maybe<SellerCards>;
  sellerName?: Maybe<Seller>;
  /** Number of orders placed by sellers in given period. */
  sellerOrders?: Maybe<Scalars['Int']>;
  sellerUser?: Maybe<SellerUserType>;
  sellerUsers?: Maybe<SellerUserTypeCountableConnection>;
  sellerVaults?: Maybe<Array<Maybe<VaultType>>>;
  /** List of sellers */
  sellers?: Maybe<SellerCountableConnection>;
  /**
   * Look up a service account by ID.
   * @deprecated Use the `app` query instead. This field will be removed after 2020-07-31.
   */
  serviceAccount?: Maybe<ServiceAccount>;
  /**
   * List of the service accounts.
   * @deprecated Use the `apps` query instead. This field will be removed after 2020-07-31.
   */
  serviceAccounts?: Maybe<ServiceAccountCountableConnection>;
  /** Look up a shipping zone by ID. */
  shippingZone?: Maybe<ShippingZone>;
  /** List of the shop's shipping zones. */
  shippingZones?: Maybe<ShippingZoneCountableConnection>;
  /** Return information about the shop. */
  shop: Shop;
  /** List of sites. */
  sites?: Maybe<NauticalSiteCountableConnection>;
  /** List of the shop's staff users. */
  staffUsers?: Maybe<UserCountableConnection>;
  /** Look up a stock by ID */
  stock?: Maybe<Stock>;
  /** List of stocks. */
  stocks?: Maybe<StockCountableConnection>;
  /** List of all tax rates available from tax gateway. */
  taxTypes?: Maybe<Array<Maybe<TaxType>>>;
  /** List of third party products */
  thirdPartyProducts?: Maybe<Scalars['GenericScalar']>;
  translation?: Maybe<TranslatableItem>;
  /** Returns a list of all translatable items of a given kind. */
  translations?: Maybe<TranslatableItemConnection>;
  /** Form details for specified form_id */
  typeformForm?: Maybe<TypeformForm>;
  /** All forms available on Typeform */
  typeformForms?: Maybe<TypeformForms>;
  upcItemDb?: Maybe<Scalars['BarcodeObjectField']>;
  /** Look up a user by ID. */
  user?: Maybe<User>;
  /** Look up user by email. */
  userByEmail?: Maybe<User>;
  /** Get user documents by user ID. */
  userDocuments?: Maybe<Array<Maybe<UserDocument>>>;
  userSellers?: Maybe<Array<Maybe<SellerUserType>>>;
  /** Look up microsite by vendor ID */
  vendorMicrosite?: Maybe<Microsite>;
  vendorPayoutList?: Maybe<SingleVendorPayoutReport>;
  vendorPayouts?: Maybe<VendorPayoutReport>;
  /** Look up a voucher by ID. */
  voucher?: Maybe<Voucher>;
  /** List of the shop's vouchers. */
  vouchers?: Maybe<VoucherCountableConnection>;
  /** Look up a warehouse by ID. */
  warehouse?: Maybe<Warehouse>;
  /** List of warehouses. */
  warehouses?: Maybe<WarehouseCountableConnection>;
  /** Look up a webhook by ID. */
  webhook?: Maybe<Webhook>;
  /** List of all available webhook events. */
  webhookEvents?: Maybe<Array<Maybe<WebhookEvent>>>;
  /** List of webhook jobs */
  webhookJobs?: Maybe<WebhookJobCountableConnection>;
  /** Retrieve a sample payload for a given webhook event based on real data. It can be useful for some integrations where sample payload is required. */
  webhookSamplePayload?: Maybe<Scalars['JSONString']>;
  /**
   * List of webhooks.
   * @deprecated Use webhooks field on app(s) query instead. This field will be removed after 2020-07-31.
   */
  webhooks?: Maybe<WebhookCountableConnection>;
  xeroAuth?: Maybe<Scalars['NauticalObjectField']>;
  xeroCallback?: Maybe<Scalars['NauticalObjectField']>;
};


export type Query_EntitiesArgs = {
  representations?: InputMaybe<Array<InputMaybe<Scalars['_Any']>>>;
};


export type QueryAccessVaultArgs = {
  id?: InputMaybe<Scalars['ID']>;
  vaultType?: InputMaybe<Scalars['String']>;
};


export type QueryAddressArgs = {
  id: Scalars['ID'];
};


export type QueryAddressValidationRulesArgs = {
  city?: InputMaybe<Scalars['String']>;
  cityArea?: InputMaybe<Scalars['String']>;
  countryArea?: InputMaybe<Scalars['String']>;
  countryCode: CountryCode;
};


export type QueryAffiliateArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAffiliateCodesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AffiliateCodeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AffiliateCodeSortingInput>;
};


export type QueryAffiliatesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AffiliateFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<UserSortingInput>;
};


export type QueryAgreementArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryAgreementsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AgreementFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AgreementOrder>;
};


export type QueryAllowedOwnersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryAnalyticsArgs = {
  publicKey?: InputMaybe<Scalars['String']>;
};


export type QueryAppArgs = {
  id: Scalars['ID'];
};


export type QueryAppsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AppFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AppSortingInput>;
};


export type QueryAttributeArgs = {
  id: Scalars['ID'];
};


export type QueryAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AttributeSortingInput>;
};


export type QueryAvailablePlansArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryBarcodeLookupArgs = {
  barcode?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CategoryFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CategorySortingInput>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryChannelsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ChannelFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ChannelSortingInput>;
};


export type QueryCheckoutArgs = {
  token?: InputMaybe<Scalars['NauticalUUID']>;
};


export type QueryCheckoutLineArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCheckoutLinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCheckoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CollectionFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CollectionSortingInput>;
};


export type QueryCoredataArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerLoyaltyAndReferralsDetailsArgs = {
  email: Scalars['String'];
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CustomerFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<UserSortingInput>;
};


export type QueryDashboardGraphArgs = {
  dimension?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  identifier?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryDashboardOrdersSummaryArgs = {
  dimension?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  identifier?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryDashboardTopSellerPerformanceArgs = {
  dimension?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryDesignerdataArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryDigitalContentArgs = {
  id: Scalars['ID'];
};


export type QueryDigitalContentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryDirectoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<DirectoryFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<DirectorySortingInput>;
};


export type QueryDirectoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<ReportingPeriod>;
  filter?: InputMaybe<OrderDraftFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
};


export type QueryDrugLookupArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryExportFileArgs = {
  id: Scalars['ID'];
};


export type QueryExportFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ExportFileFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ExportFileSortingInput>;
};


export type QueryGetClientSecretArgs = {
  gateway: Scalars['ID'];
  paymentInformation: StripeClientPaymentData;
};


export type QueryGiftCardArgs = {
  id: Scalars['ID'];
};


export type QueryGiftCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryHashtagsByCreatorArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryHomepageEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryImportThirdPartyProductArgs = {
  id: Scalars['ID'];
  source: Scalars['String'];
};


export type QueryInsightsMarketplaceAffiliatePayoutsSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsMarketplacePaymentsSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  limit?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsMarketplacePayoutsSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsMarketplaceTaxSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsMarketplaceTaxesByCountryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsMarketplaceTaxesByCountryAreaArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsOrdersCustomerSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsOrdersMarketplaceSummaryArgs = {
  dimension?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsOrdersSellerSummaryArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsTopPerformingCategoriesArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  identifier?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  perspective: Scalars['String'];
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryInsightsTopPerformingProductsArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  identifier?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  perspective: Scalars['String'];
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryLayoutArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryListingArgs = {
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ListingFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ListingOrder>;
};


export type QueryMarketplaceHomepageEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMentionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMentionCountArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMentionNodeArgs = {
  id: Scalars['ID'];
};


export type QueryMentionsByReceiverArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMentionsBySenderArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryMenuArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryMenuItemArgs = {
  id: Scalars['ID'];
};


export type QueryMenuItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MenuItemFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<MenuItemSortingInput>;
};


export type QueryMenusArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MenuFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<MenuSortingInput>;
};


export type QueryMicrositeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryMicrositesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MicrositeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<MicrositeSortingInput>;
};


export type QueryNauticalAppArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryNauticalAppsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NauticalAppsFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryNauticalConfigurationArgs = {
  configurationName?: InputMaybe<Scalars['String']>;
};


export type QueryNauticalDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<ReportingPeriod>;
  filter?: InputMaybe<OrderDraftFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
};


export type QueryNauticalOrderArgs = {
  id: Scalars['ID'];
};


export type QueryNauticalOrderByTokenArgs = {
  token: Scalars['NauticalUUID'];
};


export type QueryNauticalOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<ReportingPeriod>;
  filter?: InputMaybe<OrderFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
  status?: InputMaybe<OrderStatusFilter>;
};


export type QueryNauticalOrdersTotalArgs = {
  period?: InputMaybe<ReportingPeriod>;
};


export type QueryNauticalSubordersArgs = {
  id?: InputMaybe<Scalars['ID']>;
  isNautical?: InputMaybe<Scalars['Boolean']>;
};


export type QueryNewSellersArgs = {
  period: ReportingPeriod;
};


export type QueryOptimizedHomeArgs = {
  endDate: Scalars['Date'];
  identifier?: InputMaybe<Scalars['ID']>;
  isMarketplace: Scalars['Boolean'];
  startDate: Scalars['Date'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrderByTokenArgs = {
  token: Scalars['NauticalUUID'];
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<ReportingPeriod>;
  filter?: InputMaybe<OrderFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
  status?: InputMaybe<OrderStatusFilter>;
};


export type QueryOrdersTotalArgs = {
  identifier?: InputMaybe<Scalars['ID']>;
  period?: InputMaybe<ReportingPeriod>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PageFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PageSortingInput>;
};


export type QueryPaymentArgs = {
  id: Scalars['ID'];
};


export type QueryPaymentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPayoutArgs = {
  id: Scalars['ID'];
};


export type QueryPayoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PayoutFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PayoutSortingInput>;
};


export type QueryPeriodicTaskArgs = {
  name: Scalars['String'];
};


export type QueryPermissionGroupArgs = {
  id: Scalars['ID'];
};


export type QueryPermissionGroupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PermissionGroupFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PermissionGroupSortingInput>;
};


export type QueryPluginArgs = {
  id: Scalars['ID'];
  seller?: InputMaybe<Scalars['ID']>;
};


export type QueryPluginFlowsArgs = {
  id: Scalars['ID'];
  seller?: InputMaybe<Scalars['ID']>;
};


export type QueryPluginSyncSettingsArgs = {
  id: Scalars['ID'];
  seller?: InputMaybe<Scalars['ID']>;
};


export type QueryPluginsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PluginFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PluginSortingInput>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProductRatingsAndReviewsArgs = {
  productId: Scalars['String'];
};


export type QueryProductReviewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryProductReviewAverageArgs = {
  product?: InputMaybe<Scalars['ID']>;
};


export type QueryProductReviewsArgs = {
  product?: InputMaybe<Scalars['ID']>;
};


export type QueryProductTypeArgs = {
  id: Scalars['ID'];
};


export type QueryProductTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductTypeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductTypeSortingInput>;
};


export type QueryProductVariantArgs = {
  id?: InputMaybe<Scalars['ID']>;
  sku?: InputMaybe<Scalars['String']>;
};


export type QueryProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductVariantFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  microsite?: InputMaybe<Scalars['ID']>;
  sortBy?: InputMaybe<ProductOrder>;
  stockAvailability?: InputMaybe<StockAvailability>;
};


export type QueryReportProductSalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  period: ReportingPeriod;
};


export type QueryReturnsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ReturnFulfillmentFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ReturnFulfillmentSortingInput>;
};


export type QuerySaleArgs = {
  id: Scalars['ID'];
};


export type QuerySalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SaleFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<SaleSortingInput>;
};


export type QuerySellerArgs = {
  id?: InputMaybe<Scalars['ID']>;
  number?: InputMaybe<Scalars['ID']>;
  taxId?: InputMaybe<Scalars['String']>;
};


export type QuerySellerAgreementArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySellerCommissionsArgs = {
  identifier?: InputMaybe<Scalars['ID']>;
  period: ReportingPeriod;
};


export type QuerySellerDetailCardsArgs = {
  identifier: Scalars['ID'];
  period: ReportingPeriod;
};


export type QuerySellerEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  seller?: InputMaybe<Scalars['ID']>;
};


export type QuerySellerListCardsArgs = {
  identifier?: InputMaybe<Scalars['ID']>;
  period: ReportingPeriod;
};


export type QuerySellerNameArgs = {
  id: Scalars['ID'];
};


export type QuerySellerOrdersArgs = {
  identifier?: InputMaybe<Scalars['ID']>;
  period: ReportingPeriod;
};


export type QuerySellerUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySellerUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySellerVaultsArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySellersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SellerFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SellerSortingInput>;
};


export type QueryServiceAccountArgs = {
  id: Scalars['ID'];
};


export type QueryServiceAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ServiceAccountFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ServiceAccountSortingInput>;
};


export type QueryShippingZoneArgs = {
  id: Scalars['ID'];
};


export type QueryShippingZonesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ShippingZoneFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySitesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SiteFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SiteSortingInput>;
};


export type QueryStaffUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<StaffUserInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  seller?: InputMaybe<Scalars['ID']>;
  sortBy?: InputMaybe<UserSortingInput>;
};


export type QueryStockArgs = {
  id: Scalars['ID'];
};


export type QueryStocksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<StockFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryThirdPartyProductsArgs = {
  source: Scalars['String'];
};


export type QueryTranslationArgs = {
  id: Scalars['ID'];
  kind: TranslatableKinds;
};


export type QueryTranslationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  kind: TranslatableKinds;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTypeformFormArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUpcItemDbArgs = {
  barcode?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserDocumentsArgs = {
  id: Scalars['ID'];
};


export type QueryUserSellersArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryVendorMicrositeArgs = {
  id: Scalars['ID'];
};


export type QueryVendorPayoutListArgs = {
  vendorId?: InputMaybe<Scalars['ID']>;
  vendorType?: InputMaybe<Scalars['String']>;
};


export type QueryVendorPayoutsArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  payoutId?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Date']>;
  vendorType?: InputMaybe<Scalars['String']>;
};


export type QueryVoucherArgs = {
  id: Scalars['ID'];
};


export type QueryVouchersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<VoucherFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  productId?: InputMaybe<Scalars['ID']>;
  query?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<VoucherSortingInput>;
};


export type QueryWarehouseArgs = {
  id: Scalars['ID'];
};


export type QueryWarehousesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<WarehouseFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<WarehouseSortingInput>;
};


export type QueryWebhookArgs = {
  id: Scalars['ID'];
};


export type QueryWebhookJobsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<WebhookJobFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  identifier?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<WebhookJobSortingInput>;
};


export type QueryWebhookSamplePayloadArgs = {
  eventType: WebhookSampleEventTypeEnum;
};


export type QueryWebhooksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<WebhookFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<WebhookSortingInput>;
};


export type QueryXeroAuthArgs = {
  callbackURI?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  clientSecret?: InputMaybe<Scalars['String']>;
};


export type QueryXeroCallbackArgs = {
  authUrl?: InputMaybe<Scalars['String']>;
  credParam?: InputMaybe<Scalars['JSONString']>;
};

export type RadiusSearchInput = {
  /** Latitude of the center point */
  lat?: InputMaybe<Scalars['Float']>;
  /** Location type to filter by */
  locationType: LocationTypeEnum;
  /** Longitude of the center point */
  lon?: InputMaybe<Scalars['Float']>;
  /** Radius to search within */
  radius: Scalars['Int'];
  /** Distance unit for radius (KM or MI) */
  unit: DistanceUnit;
};

/** Represents a reduced VAT rate for a particular type of goods. */
export type ReducedRate = {
  __typename?: 'ReducedRate';
  /** Reduced VAT rate in percent. */
  rate: Scalars['Float'];
  /** A type of goods. */
  rateType: TaxRateType;
};

/** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type ReorderInput = {
  /** The ID of the item to move. */
  id: Scalars['ID'];
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export enum ReportingPeriod {
  ThisMonth = 'THIS_MONTH',
  Today = 'TODAY'
}

/** Request email change of the logged in user. */
export type RequestEmailChange = {
  __typename?: 'RequestEmailChange';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance. */
  user?: Maybe<User>;
};

/** Sends an email with the account password modification link. */
export type RequestPasswordReset = {
  __typename?: 'RequestPasswordReset';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type ReturnFulfillmentFilterInput = {
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<FulfillmentStatusFilter>>>;
};

export enum ReturnFulfillmentSortField {
  /** Sort return fulfillments by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort return fulfillments by customer. */
  Customer = 'CUSTOMER',
  /** Sort return fulfillments by items. */
  Items = 'ITEMS',
  /** Sort return fulfillments by number. */
  Number = 'NUMBER',
  /** Sort return fulfillments by price. */
  Price = 'PRICE',
  /** Sort return fulfillments by return status. */
  ReturnStatus = 'RETURN_STATUS',
  /** Sort return fulfillments by tracking number. */
  TrackingNumber = 'TRACKING_NUMBER'
}

export type ReturnFulfillmentSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort fulfillments by the selected field. */
  field: ReturnFulfillmentSortField;
};

export type Review = {
  __typename?: 'Review';
  /** Review content. */
  content?: Maybe<Scalars['String']>;
  /** Date and time review was created. */
  createdAt?: Maybe<Scalars['String']>;
  /** Product rating out of 5 stars. */
  score?: Maybe<Scalars['Int']>;
  /** Title of the review. */
  title?: Maybe<Scalars['String']>;
  /** User who created the rating and review. */
  user?: Maybe<Reviewer>;
};

export type ReviewInput = {
  /** Customer comment on review */
  comment?: InputMaybe<Scalars['String']>;
  /** (Optional) Customer location */
  location?: InputMaybe<Scalars['String']>;
  /** Product subject to the review */
  product?: InputMaybe<Scalars['ID']>;
  /** Customer rating (e.g. 1 to 5 stars) */
  rating?: InputMaybe<Scalars['Int']>;
  /** Customer providing the review */
  user?: InputMaybe<Scalars['ID']>;
};

export type Reviewer = {
  __typename?: 'Reviewer';
  /** Reviewer username */
  displayName?: Maybe<Scalars['String']>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type Sale = Node & {
  __typename?: 'Sale';
  /** List of categories this sale applies to. */
  categories?: Maybe<CategoryCountableConnection>;
  /** List of collections this sale applies to. */
  collections?: Maybe<CollectionCountableConnection>;
  endDate?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** List of products this sale applies to. */
  products?: Maybe<ProductCountableConnection>;
  startDate: Scalars['DateTime'];
  /** Returns translated sale fields for the given language code. */
  translation?: Maybe<SaleTranslation>;
  type: SaleType;
  value: Scalars['Float'];
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Adds products, categories, collections to a voucher. */
export type SaleAddCatalogues = {
  __typename?: 'SaleAddCatalogues';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
};

/** Deletes sales. */
export type SaleBulkDelete = {
  __typename?: 'SaleBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type SaleCountableConnection = {
  __typename?: 'SaleCountableConnection';
  edges: Array<SaleCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SaleCountableEdge = {
  __typename?: 'SaleCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Sale;
};

/** Creates a new sale. */
export type SaleCreate = {
  __typename?: 'SaleCreate';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  sale?: Maybe<Sale>;
};

/** Deletes a sale. */
export type SaleDelete = {
  __typename?: 'SaleDelete';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  sale?: Maybe<Sale>;
};

export type SaleFilterInput = {
  saleType?: InputMaybe<DiscountValueTypeEnum>;
  search?: InputMaybe<Scalars['String']>;
  started?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<Array<InputMaybe<DiscountStatusEnum>>>;
};

export type SaleInput = {
  /** Categories related to the discount. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Collections related to the discount. */
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** Voucher name. */
  name?: InputMaybe<Scalars['String']>;
  /** Products related to the discount. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Fixed or percentage. */
  type?: InputMaybe<DiscountValueTypeEnum>;
  /** Value of the voucher. */
  value?: InputMaybe<Scalars['PositiveDecimal']>;
};

/** Removes products, categories, collections from a sale. */
export type SaleRemoveCatalogues = {
  __typename?: 'SaleRemoveCatalogues';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
};

export enum SaleSortField {
  /** Sort sales by end date. */
  EndDate = 'END_DATE',
  /** Sort sales by name. */
  Name = 'NAME',
  /** Sort sales by start date. */
  StartDate = 'START_DATE',
  /** Sort sales by type. */
  Type = 'TYPE',
  /** Sort sales by value. */
  Value = 'VALUE'
}

export type SaleSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sales by the selected field. */
  field: SaleSortField;
};

export type SaleTranslatableContent = Node & {
  __typename?: 'SaleTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
  sale?: Maybe<Sale>;
  /** Returns translated sale fields for the given language code. */
  translation?: Maybe<SaleTranslation>;
};


export type SaleTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/updates translations for a sale. */
export type SaleTranslate = {
  __typename?: 'SaleTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  sale?: Maybe<Sale>;
  translationErrors: Array<TranslationError>;
};

export type SaleTranslation = Node & {
  __typename?: 'SaleTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum SaleType {
  /** EUR */
  Fixed = 'FIXED',
  /** % */
  Percentage = 'PERCENTAGE'
}

/** Updates a sale. */
export type SaleUpdate = {
  __typename?: 'SaleUpdate';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  sale?: Maybe<Sale>;
};

/** Represents a custom attribute. */
export type SelectedAttribute = {
  __typename?: 'SelectedAttribute';
  /** Name of an attribute displayed in the interface. */
  attribute: Attribute;
  /** Values of an attribute. */
  values: Array<Maybe<AttributeValue>>;
};

export type Seller = Node & ObjectWithMetadata & {
  __typename?: 'Seller';
  /** List of all addresses for this seller. */
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** Agreement for the seller. */
  agreement?: Maybe<Agreement>;
  attributeSet: AttributeCountableConnection;
  canUseInStorefront?: Maybe<Scalars['Boolean']>;
  companyName: Scalars['String'];
  created?: Maybe<Scalars['DateTime']>;
  defaultBillingAddress?: Maybe<Address>;
  defaultShippingAddress?: Maybe<Address>;
  domainSet: NauticalSiteCountableConnection;
  events: SellerEventTypeCountableConnection;
  flows: FlowCountableConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  identification?: Maybe<Array<Scalars['String']>>;
  listings: ListingCountableConnection;
  logo?: Maybe<Image>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Microsite of the seller. */
  microsite?: Maybe<Microsite>;
  orders: OrderCountableConnection;
  owner?: Maybe<User>;
  payouts: VendorPayoutCountableConnection;
  pk?: Maybe<Scalars['Int']>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  products: ProductCountableConnection;
  producttypeSet: ProductTypeCountableConnection;
  sellerAgreements: AgreementSellersCountableConnection;
  sellerClients: NauticalSiteCountableConnection;
  sellerMicrosite: MicrositeCountableConnection;
  sellerusers: SellerUserTypeCountableConnection;
  shippingZones: ShippingZoneCountableConnection;
  status: SellerStatus;
  syncConfiguration: SyncConfigurationCountableConnection;
  updated?: Maybe<Scalars['DateTime']>;
  warehouses: WarehouseCountableConnection;
  webhookTransactions: WebhookJobCountableConnection;
};


export type SellerAttributeSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerDomainSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerFlowsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerLogoArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


export type SellerOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerPayoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerProducttypeSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerSellerAgreementsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerSellerClientsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerSellerMicrositeArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerSellerusersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerShippingZonesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerSyncConfigurationArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerWarehousesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SellerWebhookTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Creates seller address. */
export type SellerAddressCreate = {
  __typename?: 'SellerAddressCreate';
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A seller instance for which the address was created. */
  seller?: Maybe<Seller>;
  sellerErrors: Array<SellerError>;
};

/** Deletes an address. */
export type SellerAddressDelete = {
  __typename?: 'SellerAddressDelete';
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was deleted. */
  seller?: Maybe<Seller>;
  sellerErrors: Array<SellerError>;
};

/** Sets a default address for the given user. */
export type SellerAddressSetDefault = {
  __typename?: 'SellerAddressSetDefault';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  seller?: Maybe<Seller>;
  sellerErrors: Array<SellerError>;
};

/** Updates an address. */
export type SellerAddressUpdate = {
  __typename?: 'SellerAddressUpdate';
  address?: Maybe<Address>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user object for which the address was edited. */
  seller?: Maybe<Seller>;
  sellerErrors: Array<SellerError>;
};

export type SellerCards = {
  __typename?: 'SellerCards';
  newSellers?: Maybe<Scalars['Int']>;
  sellerCommissions?: Maybe<Money>;
  sellerOrders?: Maybe<Scalars['Int']>;
};

export type SellerCountableConnection = {
  __typename?: 'SellerCountableConnection';
  edges: Array<SellerCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SellerCountableEdge = {
  __typename?: 'SellerCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Seller;
};

export type SellerDetailCards = {
  __typename?: 'SellerDetailCards';
  sellerCommissions?: Maybe<Money>;
  sellerOrders?: Maybe<Scalars['Int']>;
  sellerSales?: Maybe<TaxedMoney>;
};

export type SellerError = {
  __typename?: 'SellerError';
  /** The error code. */
  code: SellerErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum SellerErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  JwtDecodeError = 'JWT_DECODE_ERROR',
  JwtInvalidCsrfToken = 'JWT_INVALID_CSRF_TOKEN',
  JwtInvalidToken = 'JWT_INVALID_TOKEN',
  JwtMissingToken = 'JWT_MISSING_TOKEN',
  JwtSignatureExpired = 'JWT_SIGNATURE_EXPIRED',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** History log of the seller. */
export type SellerEventType = Node & {
  __typename?: 'SellerEventType';
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  parameters?: Maybe<Scalars['JSONString']>;
  /** Seller who events relate to. */
  seller?: Maybe<Seller>;
  status?: Maybe<Scalars['String']>;
  /** Seller event type. */
  type?: Maybe<SellerEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
};

export type SellerEventTypeCountableConnection = {
  __typename?: 'SellerEventTypeCountableConnection';
  edges: Array<SellerEventTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SellerEventTypeCountableEdge = {
  __typename?: 'SellerEventTypeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SellerEventType;
};

/** An enumeration. */
export enum SellerEventsEnum {
  SellerCreated = 'SELLER_CREATED',
  SellerDeleted = 'SELLER_DELETED',
  SellerNoteAdded = 'SELLER_NOTE_ADDED',
  SellerStatusChanged = 'SELLER_STATUS_CHANGED'
}

export type SellerFilterInput = {
  created?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<SellerStatusFilter>>>;
  storefront?: InputMaybe<Scalars['Boolean']>;
};

export type SellerInput = {
  identifiers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['ID']>;
  plan?: InputMaybe<Scalars['ID']>;
};

/** Create a seller logo. Only for MP Admin, MP Staff, or the seller. This mutation must be sent as a 'multipart' request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type SellerLogoUpdate = {
  __typename?: 'SellerLogoUpdate';
  accountErrors: Array<SellerError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated seller instance */
  seller?: Maybe<Seller>;
};

export type SellerNoteInput = {
  message?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export enum SellerSortField {
  CompanyName = 'COMPANY_NAME',
  Owner = 'OWNER',
  ReferralFee = 'REFERRAL_FEE',
  Status = 'STATUS'
}

export type SellerSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sellers by the selected field. */
  field: SellerSortField;
};

/** An enumeration. */
export enum SellerStatus {
  /** Approved */
  Approved = 'APPROVED',
  /** Banned */
  Banned = 'BANNED',
  /** Deactivated */
  Deactivated = 'DEACTIVATED',
  /** Declined */
  Declined = 'DECLINED',
  /** Paused */
  Paused = 'PAUSED',
  /** Pending */
  Pending = 'PENDING',
  /** Suspended */
  Suspended = 'SUSPENDED'
}

export enum SellerStatusFilter {
  Approved = 'APPROVED',
  Banned = 'BANNED',
  Deactivated = 'DEACTIVATED',
  Declined = 'DECLINED',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type SellerUpdateInput = {
  plan?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type SellerUserInput = {
  seller?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type SellerUserType = Node & {
  __typename?: 'SellerUserType';
  /** The ID of the object. */
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  seller: Seller;
  user: User;
};

export type SellerUserTypeCountableConnection = {
  __typename?: 'SellerUserTypeCountableConnection';
  edges: Array<SellerUserTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SellerUserTypeCountableEdge = {
  __typename?: 'SellerUserTypeCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SellerUserType;
};

export type SellerVolumeDiscount = {
  __typename?: 'SellerVolumeDiscount';
  seller?: Maybe<Scalars['Int']>;
  volumeDiscount?: Maybe<Money>;
};

export type SellerVolumeDiscountInput = {
  seller?: InputMaybe<Scalars['Int']>;
  volumeDiscount?: InputMaybe<MoneyInput>;
};

export type SeoInput = {
  /** SEO description. */
  description?: InputMaybe<Scalars['String']>;
  /** SEO title. */
  title?: InputMaybe<Scalars['String']>;
};

/** Represents service account data. */
export type ServiceAccount = Node & ObjectWithMetadata & {
  __typename?: 'ServiceAccount';
  /** The date and time when the service account was created. */
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Determine if service account will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Name of the service account. */
  name?: Maybe<Scalars['String']>;
  /** List of the service's permissions. */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** Last 4 characters of the tokens. */
  tokens?: Maybe<Array<Maybe<ServiceAccountToken>>>;
};

/** Clear private metadata for a service account. */
export type ServiceAccountClearPrivateMeta = {
  __typename?: 'ServiceAccountClearPrivateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccount?: Maybe<ServiceAccount>;
};

export type ServiceAccountCountableConnection = {
  __typename?: 'ServiceAccountCountableConnection';
  edges: Array<ServiceAccountCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ServiceAccountCountableEdge = {
  __typename?: 'ServiceAccountCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ServiceAccount;
};

/** Creates a new service account. */
export type ServiceAccountCreate = {
  __typename?: 'ServiceAccountCreate';
  accountErrors: Array<AccountError>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Deletes a service account. */
export type ServiceAccountDelete = {
  __typename?: 'ServiceAccountDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccount?: Maybe<ServiceAccount>;
};

export type ServiceAccountFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

export type ServiceAccountInput = {
  /** Determine if this service account should be enabled. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Name of the service account. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this service account. */
  permissions?: InputMaybe<Array<InputMaybe<PermissionEnum>>>;
};

export enum ServiceAccountSortField {
  /** Sort service accounts by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort service accounts by name. */
  Name = 'NAME'
}

export type ServiceAccountSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort service accounts by the selected field. */
  field: ServiceAccountSortField;
};

/** Represents token data. */
export type ServiceAccountToken = Node & {
  __typename?: 'ServiceAccountToken';
  /** Last 4 characters of the token. */
  authToken?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of the authenticated token. */
  name?: Maybe<Scalars['String']>;
};

/** Creates a new token. */
export type ServiceAccountTokenCreate = {
  __typename?: 'ServiceAccountTokenCreate';
  accountErrors: Array<AccountError>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccountToken?: Maybe<ServiceAccountToken>;
};

/** Deletes an authentication token assigned to service account. */
export type ServiceAccountTokenDelete = {
  __typename?: 'ServiceAccountTokenDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccountToken?: Maybe<ServiceAccountToken>;
};

export type ServiceAccountTokenInput = {
  /** Name of the token. */
  name?: InputMaybe<Scalars['String']>;
  /** ID of service account. */
  serviceAccount: Scalars['ID'];
};

/** Updates an existing service account. */
export type ServiceAccountUpdate = {
  __typename?: 'ServiceAccountUpdate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Updates private metadata for a service account. */
export type ServiceAccountUpdatePrivateMeta = {
  __typename?: 'ServiceAccountUpdatePrivateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
export type SetPassword = {
  __typename?: 'SetPassword';
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type ShippingError = {
  __typename?: 'ShippingError';
  /** The error code. */
  code: ShippingErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ShippingErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  MaxLessThanMin = 'MAX_LESS_THAN_MIN',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  /** The ID of the object. */
  id: Scalars['ID'];
  maximumOrderPrice?: Maybe<Money>;
  maximumOrderWeight?: Maybe<Weight>;
  minimumOrderPrice?: Maybe<Money>;
  minimumOrderWeight?: Maybe<Weight>;
  name: Scalars['String'];
  price?: Maybe<Money>;
  /** Returns translated shipping method fields for the given language code. */
  translation?: Maybe<ShippingMethodTranslation>;
  /** Type of the shipping method. */
  type?: Maybe<ShippingMethodTypeEnum>;
};


/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ShippingMethodTranslatableContent = Node & {
  __typename?: 'ShippingMethodTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers. */
  shippingMethod?: Maybe<ShippingMethod>;
  /** Returns translated shipping method fields for the given language code. */
  translation?: Maybe<ShippingMethodTranslation>;
};


export type ShippingMethodTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ShippingMethodTranslation = Node & {
  __typename?: 'ShippingMethodTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ShippingMethodTypeEnum {
  Price = 'PRICE',
  Weight = 'WEIGHT'
}

/** Deletes shipping prices. */
export type ShippingPriceBulkDelete = {
  __typename?: 'ShippingPriceBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
};

/** Creates a new shipping price. */
export type ShippingPriceCreate = {
  __typename?: 'ShippingPriceCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethod>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

/** Deletes a shipping price. */
export type ShippingPriceDelete = {
  __typename?: 'ShippingPriceDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  /** A shipping method to delete. */
  shippingMethod?: Maybe<ShippingMethod>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingPriceInput = {
  /** Maximum order price to use this shipping method. */
  maximumOrderPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Maximum order weight to use this shipping method. */
  maximumOrderWeight?: InputMaybe<Scalars['WeightScalar']>;
  /** Minimum order price to use this shipping method. */
  minimumOrderPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Minimum order weight to use this shipping method. */
  minimumOrderWeight?: InputMaybe<Scalars['WeightScalar']>;
  /** Name of the shipping method. */
  name?: InputMaybe<Scalars['String']>;
  /** Shipping price of the shipping method. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Shipping zone this method belongs to. */
  shippingZone?: InputMaybe<Scalars['ID']>;
  /** Shipping type: price or weight based. */
  type?: InputMaybe<ShippingMethodTypeEnum>;
};

/** Creates/Updates translations for shipping method. */
export type ShippingPriceTranslate = {
  __typename?: 'ShippingPriceTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingMethod?: Maybe<ShippingMethod>;
  translationErrors: Array<TranslationError>;
};

/** Updates a new shipping price. */
export type ShippingPriceUpdate = {
  __typename?: 'ShippingPriceUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethod>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZone = Node & {
  __typename?: 'ShippingZone';
  /** List of countries available for the method. */
  countries?: Maybe<Array<Maybe<CountryDisplay>>>;
  default: Scalars['Boolean'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Lowest and highest prices for the shipping. */
  priceRange?: Maybe<MoneyRange>;
  seller?: Maybe<Seller>;
  /** List of shipping methods available for orders shipped to countries within this shipping zone. */
  shippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  /** List of warehouses for shipping zone. */
  warehouses?: Maybe<Array<Maybe<Warehouse>>>;
};

/** Deletes shipping zones. */
export type ShippingZoneBulkDelete = {
  __typename?: 'ShippingZoneBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
};

export type ShippingZoneCountableConnection = {
  __typename?: 'ShippingZoneCountableConnection';
  edges: Array<ShippingZoneCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ShippingZoneCountableEdge = {
  __typename?: 'ShippingZoneCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ShippingZone;
};

/** Creates a new shipping zone. */
export type ShippingZoneCreate = {
  __typename?: 'ShippingZoneCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneCreateInput = {
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** List of countries in this shipping zone. */
  countries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: InputMaybe<Scalars['Boolean']>;
  /** Shipping zone's name. Visible only to the staff. */
  name?: InputMaybe<Scalars['String']>;
  /** Seller ID */
  seller?: InputMaybe<Scalars['ID']>;
};

/** Deletes a shipping zone. */
export type ShippingZoneDelete = {
  __typename?: 'ShippingZoneDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

/** Updates a new shipping zone. */
export type ShippingZoneUpdate = {
  __typename?: 'ShippingZoneUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneUpdateInput = {
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** List of countries in this shipping zone. */
  countries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: InputMaybe<Scalars['Boolean']>;
  /** Shipping zone's name. Visible only to the staff. */
  name?: InputMaybe<Scalars['String']>;
  /** List of warehouses to unassign from a shipping zone */
  removeWarehouses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Seller ID */
  seller?: InputMaybe<Scalars['ID']>;
};

/** Represents a shop resource containing general shop data and configuration. */
export type Shop = {
  __typename?: 'Shop';
  /** Gets active plugins. */
  activePlugins?: Maybe<Array<Maybe<Plugin>>>;
  /** List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google). */
  authorizationKeys: Array<Maybe<AuthorizationKey>>;
  /** Enable automatic fulfillment for all digital products. */
  automaticFulfillmentDigitalProducts?: Maybe<Scalars['Boolean']>;
  /** List of available payment gateways. */
  availablePaymentGateways: Array<PaymentGateway>;
  /** None if shop does not use Builder, otherwise this contains Builder public api key. */
  builderKey?: Maybe<Scalars['String']>;
  /** Charge taxes on shipping. */
  chargeTaxesOnShipping: Scalars['Boolean'];
  /** Company address. */
  companyAddress?: Maybe<Address>;
  /** List of countries available in the shop. */
  countries: Array<CountryDisplay>;
  /** None if shop does not use Crisp, otherwise this contains Crisp Website ID. */
  crispWebsiteId?: Maybe<Scalars['String']>;
  /**
   * List of available currencies.
   * @deprecated This field will be removed in Nautical 3.0
   */
  currencies: Array<Maybe<Scalars['String']>>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: Maybe<Scalars['String']>;
  /** Shop's default country. */
  defaultCountry?: Maybe<CountryDisplay>;
  /**
   * Shop's default currency.
   * @deprecated This field will be removed in Nautical 3.0
   */
  defaultCurrency: Scalars['String'];
  /** Default number of max downloads per digital content URL. */
  defaultDigitalMaxDownloads?: Maybe<Scalars['Int']>;
  /** Default number of days which digital content URL will be valid. */
  defaultDigitalUrlValidDays?: Maybe<Scalars['Int']>;
  /** Default shop's email sender's address. */
  defaultMailSenderAddress?: Maybe<Scalars['String']>;
  /** Default shop's email sender's name. */
  defaultMailSenderName?: Maybe<Scalars['String']>;
  /** Default shop's email support's address. */
  defaultMailSupportAddress?: Maybe<Scalars['String']>;
  /** Default weight unit. */
  defaultWeightUnit?: Maybe<WeightUnitsEnum>;
  /** Shop's description. */
  description?: Maybe<Scalars['String']>;
  /** Display prices with tax in store. */
  displayGrossPrices: Scalars['Boolean'];
  /** Shop's domain data. */
  domain: Domain;
  /** None if shop does not have Google Analytics enabled, otherwise this contains Google Analytics Measurement ID. */
  gaMeasurementId?: Maybe<Scalars['String']>;
  /** Customer's geolocalization data. */
  geolocalization?: Maybe<Geolocalization>;
  geolocationEnabled?: Maybe<Scalars['Boolean']>;
  /** Header text. */
  headerText?: Maybe<Scalars['String']>;
  /**
   * Collection displayed on homepage.
   * @deprecated Use the `collection` query with the `slug` parameter. This field will be removed in Nautical 3.0
   */
  homepageCollection?: Maybe<Collection>;
  /** Include taxes in prices. */
  includeTaxesInPrices: Scalars['Boolean'];
  /** List of the shops's supported languages. */
  languages: Array<Maybe<LanguageDisplay>>;
  loginForPrice?: Maybe<Scalars['Boolean']>;
  loginForProducts?: Maybe<Scalars['Boolean']>;
  /** Shop's name. */
  name: Scalars['String'];
  /**
   * Shop's navigation.
   * @deprecated Fetch menus using the `menu` query with `slug` parameter.
   */
  navigation?: Maybe<Navigation>;
  /** List of available permissions. */
  permissions: Array<Maybe<Permission>>;
  /** List of possible phone prefixes. */
  phonePrefixes: Array<Maybe<Scalars['String']>>;
  /** List of staff notification recipients. */
  staffNotificationRecipients?: Maybe<Array<Maybe<StaffNotificationRecipient>>>;
  /** Enable inventory tracking. */
  trackInventoryByDefault?: Maybe<Scalars['Boolean']>;
  /** Returns translated shop fields for the given language code. */
  translation?: Maybe<ShopTranslation>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopAvailablePaymentGatewaysArgs = {
  currency?: InputMaybe<Scalars['String']>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopCountriesArgs = {
  languageCode?: InputMaybe<LanguageCodeEnum>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Update the shop's address. If the `null` value is passed, the currently selected address will be deleted. */
export type ShopAddressUpdate = {
  __typename?: 'ShopAddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Updates site domain of the shop. */
export type ShopDomainUpdate = {
  __typename?: 'ShopDomainUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type ShopError = {
  __typename?: 'ShopError';
  /** The error code. */
  code: ShopErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ShopErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  CannotFetchTaxRates = 'CANNOT_FETCH_TAX_RATES',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Fetch tax rates. */
export type ShopFetchTaxRates = {
  __typename?: 'ShopFetchTaxRates';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type ShopSettingsInput = {
  /** Enable automatic fulfillment for all digital products. */
  automaticFulfillmentDigitalProducts?: InputMaybe<Scalars['Boolean']>;
  /** Charge taxes on shipping. */
  chargeTaxesOnShipping?: InputMaybe<Scalars['Boolean']>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: InputMaybe<Scalars['String']>;
  /** Default number of max downloads per digital content URL. */
  defaultDigitalMaxDownloads?: InputMaybe<Scalars['Int']>;
  /** Default number of days which digital content URL will be valid. */
  defaultDigitalUrlValidDays?: InputMaybe<Scalars['Int']>;
  /** Default email sender's address. */
  defaultMailSenderAddress?: InputMaybe<Scalars['String']>;
  /** Default email sender's name. */
  defaultMailSenderName?: InputMaybe<Scalars['String']>;
  /** Default email support address. */
  defaultMailSupportAddress?: InputMaybe<Scalars['String']>;
  /** Default weight unit. */
  defaultWeightUnit?: InputMaybe<WeightUnitsEnum>;
  /** SEO description. */
  description?: InputMaybe<Scalars['String']>;
  /** Display prices with tax in store. */
  displayGrossPrices?: InputMaybe<Scalars['Boolean']>;
  /** Header text. */
  headerText?: InputMaybe<Scalars['String']>;
  /** Include taxes in prices. */
  includeTaxesInPrices?: InputMaybe<Scalars['Boolean']>;
  /** Enable inventory tracking. */
  trackInventoryByDefault?: InputMaybe<Scalars['Boolean']>;
};

/** Creates/Updates translations for Shop Settings. */
export type ShopSettingsTranslate = {
  __typename?: 'ShopSettingsTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  translationErrors: Array<TranslationError>;
};

export type ShopSettingsTranslationInput = {
  description?: InputMaybe<Scalars['String']>;
  headerText?: InputMaybe<Scalars['String']>;
};

/** Updates shop settings. */
export type ShopSettingsUpdate = {
  __typename?: 'ShopSettingsUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type ShopTranslation = Node & {
  __typename?: 'ShopTranslation';
  description: Scalars['String'];
  headerText: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type SingleVendorPayoutReport = {
  __typename?: 'SingleVendorPayoutReport';
  payouts?: Maybe<Array<Maybe<SingleVendorReportType>>>;
  summary?: Maybe<SingleVendorSummaryType>;
};

export type SingleVendorReportType = {
  __typename?: 'SingleVendorReportType';
  adjustments?: Maybe<Scalars['Decimal']>;
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  endDate?: Maybe<Scalars['String']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  payoutEndDate?: Maybe<Scalars['String']>;
  payoutStartDate?: Maybe<Scalars['String']>;
  penalties?: Maybe<Scalars['Decimal']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  vendorPayout?: Maybe<VendorPayout>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

export type SingleVendorSummaryType = {
  __typename?: 'SingleVendorSummaryType';
  adjustments?: Maybe<Scalars['Decimal']>;
  affiliateCommission?: Maybe<Scalars['Float']>;
  average?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  discounts?: Maybe<Scalars['Float']>;
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  orders?: Maybe<Scalars['Int']>;
  payout?: Maybe<Scalars['Float']>;
  penalties?: Maybe<Scalars['Decimal']>;
  revenue?: Maybe<Scalars['Float']>;
  shipping?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totals?: Maybe<Scalars['Int']>;
  volumeDiscounts?: Maybe<Scalars['Float']>;
};

/** Deletes sites. */
export type SiteBulkDelete = {
  __typename?: 'SiteBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  siteErrors: Array<SiteError>;
};

/** Creates a new site. */
export type SiteCreate = {
  __typename?: 'SiteCreate';
  domain?: Maybe<NauticalSite>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  siteErrors: Array<SiteError>;
};

export type SiteCreateInput = {
  allSellers?: InputMaybe<Scalars['Boolean']>;
  autoAddSellers?: InputMaybe<Scalars['Boolean']>;
  builderKey?: InputMaybe<Scalars['String']>;
  bundledSellers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  domain?: InputMaybe<Scalars['String']>;
  overrideBuilderKey?: InputMaybe<Scalars['Boolean']>;
  primarySeller?: InputMaybe<Scalars['ID']>;
  tenant?: InputMaybe<Scalars['ID']>;
};

export type SiteDomainInput = {
  /** Domain name for shop. */
  domain?: InputMaybe<Scalars['String']>;
  /** Shop site name. */
  name?: InputMaybe<Scalars['String']>;
};

export type SiteError = {
  __typename?: 'SiteError';
  /** The error code. */
  code: SiteErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum SiteErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type SiteFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published?: InputMaybe<SitePublished>;
  search?: InputMaybe<Scalars['String']>;
};

export type SiteInput = {
  allSellers?: InputMaybe<Scalars['Boolean']>;
  autoAddSellers?: InputMaybe<Scalars['Boolean']>;
  builderKey?: InputMaybe<Scalars['String']>;
  bundledSellers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  domain?: InputMaybe<Scalars['String']>;
  overrideBuilderKey?: InputMaybe<Scalars['Boolean']>;
  primarySeller?: InputMaybe<Scalars['ID']>;
};

export enum SitePublished {
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

export enum SiteSortField {
  /** Sort sites by domain. */
  Domain = 'DOMAIN'
}

export type SiteSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sites by the selected field. */
  field: SiteSortField;
};

/** Updates a site. */
export type SiteUpdate = {
  __typename?: 'SiteUpdate';
  domain?: Maybe<NauticalSite>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  siteErrors: Array<SiteError>;
};

/** Deletes staff users. */
export type StaffBulkDelete = {
  __typename?: 'StaffBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
};

/** Creates a new staff user. */
export type StaffCreate = {
  __typename?: 'StaffCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffCreateInput = {
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** Only filled out if the account is a business account. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User account is affiliate. */
  isAffiliate?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** Password url */
  passwordUrl?: InputMaybe<Scalars['String']>;
  /** Personal phone number. */
  personalPhone?: InputMaybe<Scalars['String']>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/** Deletes a staff user. */
export type StaffDelete = {
  __typename?: 'StaffDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffError = {
  __typename?: 'StaffError';
  /** The error code. */
  code: AccountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** List of permission group IDs which cause the error. */
  groups?: Maybe<Array<Scalars['ID']>>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

export enum StaffMemberStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED'
}

/** Represents a recipient of email notifications send by Nautical, such as notifications about new orders. Notifications can be assigned to staff users or arbitrary email addresses. */
export type StaffNotificationRecipient = Node & {
  __typename?: 'StaffNotificationRecipient';
  /** Determines if a notification active. */
  active?: Maybe<Scalars['Boolean']>;
  /** Returns email address of a user subscribed to email notifications. */
  email?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Returns a user subscribed to email notifications. */
  user?: Maybe<User>;
};

/** Creates a new staff notification recipient. */
export type StaffNotificationRecipientCreate = {
  __typename?: 'StaffNotificationRecipientCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/** Delete staff notification recipient. */
export type StaffNotificationRecipientDelete = {
  __typename?: 'StaffNotificationRecipientDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

export type StaffNotificationRecipientInput = {
  /** Determines if a notification active. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Email address of a user subscribed to email notifications. */
  email?: InputMaybe<Scalars['String']>;
  /** The ID of the user subscribed to email notifications.. */
  user?: InputMaybe<Scalars['ID']>;
};

/** Updates a staff notification recipient. */
export type StaffNotificationRecipientUpdate = {
  __typename?: 'StaffNotificationRecipientUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/** Updates an existing staff user. */
export type StaffUpdate = {
  __typename?: 'StaffUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffUpdateInput = {
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** Only filled out if the account is a business account. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User account is affiliate. */
  isAffiliate?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** Password url */
  passwordUrl?: InputMaybe<Scalars['String']>;
  /** Personal phone number. */
  personalPhone?: InputMaybe<Scalars['String']>;
  /** List of permission group IDs from which user should be unassigned. */
  removeGroups?: InputMaybe<Array<Scalars['ID']>>;
};

export type StaffUserInput = {
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StaffMemberStatus>;
};

/** Represents stock. */
export type Stock = Node & {
  __typename?: 'Stock';
  /** The ID of the object. */
  id: Scalars['ID'];
  productVariant: ProductVariant;
  /** Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment. */
  quantity: Scalars['Int'];
  /** Quantity allocated for orders */
  quantityAllocated: Scalars['Int'];
  warehouse: Warehouse;
};

export enum StockAvailability {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

export type StockCountableConnection = {
  __typename?: 'StockCountableConnection';
  edges: Array<StockCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type StockCountableEdge = {
  __typename?: 'StockCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Stock;
};

export type StockError = {
  __typename?: 'StockError';
  /** The error code. */
  code: StockErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum StockErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type StockFilterInput = {
  quantity?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
};

export type StockInput = {
  /** Quantity of items available for sell. */
  quantity?: InputMaybe<Scalars['Int']>;
  /** Warehouse in which stock is located. */
  warehouse: Scalars['ID'];
};

export type StripeClientPaymentData = {
  amount?: InputMaybe<Scalars['Float']>;
  billing?: InputMaybe<AddressInput>;
  currency?: InputMaybe<Scalars['String']>;
  customerEmail?: InputMaybe<Scalars['String']>;
  customerId?: InputMaybe<Scalars['String']>;
  customerIpAddress?: InputMaybe<Scalars['String']>;
  graphqlPaymentId?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['Int']>;
  paymentId?: InputMaybe<Scalars['Int']>;
  reuseSource?: InputMaybe<Scalars['Boolean']>;
  shipping?: InputMaybe<AddressInput>;
  token?: InputMaybe<Scalars['String']>;
};

/** Submit a rating and review for a product. */
export type SubmitRatingAndReview = {
  __typename?: 'SubmitRatingAndReview';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  submissionSuccessful?: Maybe<Scalars['Boolean']>;
};

/** Plugin sync configuration. */
export type SyncConfiguration = Node & {
  __typename?: 'SyncConfiguration';
  direction: SyncConfigurationDirection;
  /** The ID of the object. */
  id: Scalars['ID'];
  identifier: Scalars['String'];
  seller?: Maybe<Seller>;
};

export type SyncConfigurationCountableConnection = {
  __typename?: 'SyncConfigurationCountableConnection';
  edges: Array<SyncConfigurationCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SyncConfigurationCountableEdge = {
  __typename?: 'SyncConfigurationCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SyncConfiguration;
};

/** An enumeration. */
export enum SyncConfigurationDirection {
  /** Bidirectional */
  Both = 'BOTH',
  /** Incoming */
  Inc = 'INC',
  /** None */
  None = 'NONE',
  /** Outgoing */
  Out = 'OUT'
}

/** An enumeration. */
export enum TaxRateType {
  Accommodation = 'ACCOMMODATION',
  AdmissionToCulturalEvents = 'ADMISSION_TO_CULTURAL_EVENTS',
  AdmissionToEntertainmentEvents = 'ADMISSION_TO_ENTERTAINMENT_EVENTS',
  AdmissionToSportingEvents = 'ADMISSION_TO_SPORTING_EVENTS',
  Advertising = 'ADVERTISING',
  AgriculturalSupplies = 'AGRICULTURAL_SUPPLIES',
  BabyFoodstuffs = 'BABY_FOODSTUFFS',
  Bikes = 'BIKES',
  Books = 'BOOKS',
  ChildrensClothing = 'CHILDRENS_CLOTHING',
  DomesticFuel = 'DOMESTIC_FUEL',
  DomesticServices = 'DOMESTIC_SERVICES',
  EBooks = 'E_BOOKS',
  Foodstuffs = 'FOODSTUFFS',
  Hotels = 'HOTELS',
  Medical = 'MEDICAL',
  Newspapers = 'NEWSPAPERS',
  PassengerTransport = 'PASSENGER_TRANSPORT',
  Pharmaceuticals = 'PHARMACEUTICALS',
  PropertyRenovations = 'PROPERTY_RENOVATIONS',
  Restaurants = 'RESTAURANTS',
  SocialHousing = 'SOCIAL_HOUSING',
  Standard = 'STANDARD',
  Water = 'WATER',
  Wine = 'WINE'
}

/** Representation of tax types fetched from tax gateway. */
export type TaxType = {
  __typename?: 'TaxType';
  /** Description of the tax type. */
  description?: Maybe<Scalars['String']>;
  /** External tax code used to identify given tax group. */
  taxCode?: Maybe<Scalars['String']>;
};

/** Represents a monetary value with taxes. In cases where taxes were not applied, net and gross values will be equal. */
export type TaxedMoney = {
  __typename?: 'TaxedMoney';
  /** Currency code. */
  currency: Scalars['String'];
  /** Amount of money including taxes. */
  gross: Money;
  /** Amount of money without taxes. */
  net: Money;
  /** Amount of taxes. */
  tax: Money;
};

/** Represents a range of monetary values. */
export type TaxedMoneyRange = {
  __typename?: 'TaxedMoneyRange';
  /** Lower bound of a price range. */
  start?: Maybe<TaxedMoney>;
  /** Upper bound of a price range. */
  stop?: Maybe<TaxedMoney>;
};

/** An object representing a single payment. */
export type Transaction = Node & {
  __typename?: 'Transaction';
  /** Total amount of the transaction. */
  amount?: Maybe<Money>;
  created: Scalars['DateTime'];
  error?: Maybe<TransactionError>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isSuccess: Scalars['Boolean'];
  kind: TransactionKind;
  payment: Payment;
  token: Scalars['String'];
};

/** An enumeration. */
export enum TransactionError {
  /** declined */
  TransactionerrorDeclined = 'TRANSACTIONERROR_DECLINED',
  /** expired */
  TransactionerrorExpired = 'TRANSACTIONERROR_EXPIRED',
  /** incorrect_address */
  TransactionerrorIncorrectAddress = 'TRANSACTIONERROR_INCORRECT_ADDRESS',
  /** incorrect_cvv */
  TransactionerrorIncorrectCvv = 'TRANSACTIONERROR_INCORRECT_CVV',
  /** incorrect_number */
  TransactionerrorIncorrectNumber = 'TRANSACTIONERROR_INCORRECT_NUMBER',
  /** incorrect_zip */
  TransactionerrorIncorrectZip = 'TRANSACTIONERROR_INCORRECT_ZIP',
  /** invalid_cvv */
  TransactionerrorInvalidCvv = 'TRANSACTIONERROR_INVALID_CVV',
  /** invalid_expiry_date */
  TransactionerrorInvalidExpiryDate = 'TRANSACTIONERROR_INVALID_EXPIRY_DATE',
  /** invalid_number */
  TransactionerrorInvalidNumber = 'TRANSACTIONERROR_INVALID_NUMBER',
  /** processing_error */
  TransactionerrorProcessingError = 'TRANSACTIONERROR_PROCESSING_ERROR'
}

/** An enumeration. */
export enum TransactionKind {
  /** Action to confirm */
  ActionToConfirm = 'ACTION_TO_CONFIRM',
  /** Authorization */
  Auth = 'AUTH',
  /** Cancel */
  Cancel = 'CANCEL',
  /** Capture */
  Capture = 'CAPTURE',
  /** Confirm */
  Confirm = 'CONFIRM',
  /** Pending */
  Pending = 'PENDING',
  /** Refund */
  Refund = 'REFUND',
  /** Refund in progress */
  RefundOngoing = 'REFUND_ONGOING',
  /** Void */
  Void = 'VOID'
}

export type TranslatableItem = AgreementTranslatableContent | AttributeTranslatableContent | AttributeValueTranslatableContent | CategoryTranslatableContent | CollectionTranslatableContent | MenuItemTranslatableContent | PageTranslatableContent | ProductTranslatableContent | ProductVariantTranslatableContent | SaleTranslatableContent | ShippingMethodTranslatableContent | VoucherTranslatableContent;

export type TranslatableItemConnection = {
  __typename?: 'TranslatableItemConnection';
  edges: Array<TranslatableItemEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type TranslatableItemEdge = {
  __typename?: 'TranslatableItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TranslatableItem;
};

export enum TranslatableKinds {
  Agreement = 'AGREEMENT',
  Attribute = 'ATTRIBUTE',
  AttributeValue = 'ATTRIBUTE_VALUE',
  Category = 'CATEGORY',
  Collection = 'COLLECTION',
  MenuItem = 'MENU_ITEM',
  Page = 'PAGE',
  Product = 'PRODUCT',
  Sale = 'SALE',
  ShippingMethod = 'SHIPPING_METHOD',
  Variant = 'VARIANT',
  Voucher = 'VOUCHER'
}

export type TranslationError = {
  __typename?: 'TranslationError';
  /** The error code. */
  code: TranslationErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TranslationErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

export type TranslationInput = {
  description?: InputMaybe<Scalars['String']>;
  descriptionJson?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
};

export type TypeformForm = {
  __typename?: 'TypeformForm';
  fields?: Maybe<Array<Maybe<TypeformFormFields>>>;
  hidden?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TypeformFormAttachment = {
  __typename?: 'TypeformFormAttachment';
  href?: Maybe<Scalars['String']>;
  properties?: Maybe<TypeformFormProperties>;
  type?: Maybe<Scalars['String']>;
};

export type TypeformFormFields = {
  __typename?: 'TypeformFormFields';
  attachment?: Maybe<TypeformFormAttachment>;
  fieldType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  layout?: Maybe<TypeformFormLayout>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<TypeformFormOption>>>;
  properties?: Maybe<TypeformFormProperties>;
  ref?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TypeformFormLayout = {
  __typename?: 'TypeformFormLayout';
  attachment?: Maybe<TypeformFormAttachment>;
  placement?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TypeformFormOption = {
  __typename?: 'TypeformFormOption';
  label?: Maybe<Scalars['String']>;
};

export type TypeformFormProperties = {
  __typename?: 'TypeformFormProperties';
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<TypeformGroupProperties>>>;
};

/** Information about all forms from Typeform. */
export type TypeformForms = {
  __typename?: 'TypeformForms';
  /** Type of the field. */
  items?: Maybe<Array<Maybe<TypeformFormsItem>>>;
  /** Number of pages */
  pageCount?: Maybe<Scalars['Int']>;
  /** Total number of items. */
  totalItems?: Maybe<Scalars['Int']>;
};

export type TypeformFormsItem = {
  __typename?: 'TypeformFormsItem';
  Links?: Maybe<TypeformFormsItemLink>;
  id?: Maybe<Scalars['String']>;
  lastUpdatedAt?: Maybe<Scalars['String']>;
  self?: Maybe<TypeformFormsItemSelf>;
  theme?: Maybe<TypeformFormsItemSelf>;
  title?: Maybe<Scalars['String']>;
};

export type TypeformFormsItemLink = {
  __typename?: 'TypeformFormsItemLink';
  display?: Maybe<Scalars['String']>;
};

export type TypeformFormsItemSelf = {
  __typename?: 'TypeformFormsItemSelf';
  href?: Maybe<Scalars['String']>;
};

export type TypeformGroupProperties = {
  __typename?: 'TypeformGroupProperties';
  id?: Maybe<Scalars['String']>;
  ref?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateBranding = {
  __typename?: 'UpdateBranding';
  branding?: Maybe<BrandingType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateCoreData = {
  __typename?: 'UpdateCoreData';
  coredata?: Maybe<CoreDataType>;
  jsonContent?: Maybe<Scalars['JSONString']>;
  name?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateDesignerData = {
  __typename?: 'UpdateDesignerData';
  designerdata?: Maybe<DesignerDataType>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type UpdateInvoiceInput = {
  /** Invoice number */
  number?: InputMaybe<Scalars['String']>;
  /** URL of an invoice to download. */
  url?: InputMaybe<Scalars['String']>;
};

/** Updates metadata of an object. */
export type UpdateMetadata = {
  __typename?: 'UpdateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  item?: Maybe<ObjectWithMetadata>;
  metadataErrors: Array<MetadataError>;
};

/** Updates private metadata of an object. */
export type UpdatePrivateMetadata = {
  __typename?: 'UpdatePrivateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  item?: Maybe<ObjectWithMetadata>;
  metadataErrors: Array<MetadataError>;
};

/** Updates a sellers status and override information */
export type UpdateSellerData = {
  __typename?: 'UpdateSellerData';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  ok?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Seller>;
};

/** Represents user data. */
export type User = Node & ObjectWithMetadata & {
  __typename?: 'User';
  /** List of all user's addresses. */
  addresses?: Maybe<Array<Maybe<Address>>>;
  affiliateEarnings?: Maybe<Money>;
  affiliateOrders?: Maybe<Scalars['Int']>;
  affiliateReferrals?: Maybe<Scalars['Int']>;
  agreement?: Maybe<Agreement>;
  avatar?: Maybe<Image>;
  /** Returns the last open checkout of this user. */
  checkout?: Maybe<Checkout>;
  companyName: Scalars['String'];
  dateJoined: Scalars['DateTime'];
  defaultBillingAddress?: Maybe<Address>;
  defaultShippingAddress?: Maybe<Address>;
  /** List of user's permission groups which user can manage. */
  editableGroups?: Maybe<Array<Maybe<Group>>>;
  email: Scalars['String'];
  /** List of events associated with the user. */
  events?: Maybe<Array<Maybe<CustomerEvent>>>;
  firstName: Scalars['String'];
  /** List of the user gift cards. */
  giftCards?: Maybe<GiftCardCountableConnection>;
  hasMicrosite?: Maybe<Scalars['Boolean']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAffiliate?: Maybe<Scalars['Boolean']>;
  isAssignable?: Maybe<Scalars['Boolean']>;
  isMarketplaceAdmin?: Maybe<Scalars['Boolean']>;
  isStaff: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  /** Date of last affiliate confirmed order. */
  lastOrder?: Maybe<Scalars['DateTime']>;
  /** Date of last affiliate referral. */
  lastReferral?: Maybe<Scalars['DateTime']>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  micrositeId?: Maybe<Scalars['ID']>;
  /** List of user's nautical orders. */
  nauticalOrders?: Maybe<NauticalOrderCountableConnection>;
  /** A note about the customer. */
  note?: Maybe<Scalars['String']>;
  numOrders?: Maybe<Scalars['Int']>;
  /** List of user's orders. */
  orders?: Maybe<OrderCountableConnection>;
  /** List of user's permission groups. */
  permissionGroups?: Maybe<Array<Maybe<Group>>>;
  personalPhone?: Maybe<Scalars['String']>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  seller?: Maybe<Seller>;
  /** List of stored payment sources. */
  storedPaymentSources?: Maybe<Array<Maybe<PaymentSource>>>;
  /** List of user's permissions. */
  userPermissions?: Maybe<Array<Maybe<UserPermission>>>;
  /** Wishlist of the user */
  wishlist?: Maybe<WishlistItemCountableConnection>;
};


/** Represents user data. */
export type UserAvatarArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserGiftCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserNauticalOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserWishlistArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Deletes a user avatar. Only for staff members. */
export type UserAvatarDelete = {
  __typename?: 'UserAvatarDelete';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/** Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type UserAvatarUpdate = {
  __typename?: 'UserAvatarUpdate';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/** Activate or deactivate users. */
export type UserBulkSetActive = {
  __typename?: 'UserBulkSetActive';
  accountErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

/** Clear metadata for user. */
export type UserClearMeta = {
  __typename?: 'UserClearMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Clear private metadata for user. */
export type UserClearPrivateMeta = {
  __typename?: 'UserClearPrivateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type UserCountableConnection = {
  __typename?: 'UserCountableConnection';
  edges: Array<UserCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserCountableEdge = {
  __typename?: 'UserCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

export type UserCreateInput = {
  /** Only filled out if the account is a business account. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User account is affiliate. */
  isAffiliate?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** Password url */
  passwordUrl?: InputMaybe<Scalars['String']>;
  /** Personal phone number. */
  personalPhone?: InputMaybe<Scalars['String']>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/** User document */
export type UserDocument = {
  __typename?: 'UserDocument';
  document?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The URL of file to download. */
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserInput = {
  /** Email address. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
  /** List of user permission groups which contains this permission. */
  sourcePermissionGroups?: Maybe<Array<Group>>;
};


export type UserPermissionSourcePermissionGroupsArgs = {
  userId: Scalars['ID'];
};

export type UserPointsInput = {
  /** Whether adjustment amount should be added to total cumulative points earned over time. */
  applyAdjustmentToPointsEarned?: InputMaybe<Scalars['Boolean']>;
  /** Email address. */
  customerEmail?: InputMaybe<Scalars['String']>;
  /** Number of points to add or subtract */
  pointAdjustmentAmount?: InputMaybe<Scalars['Int']>;
};

export enum UserSortField {
  /** Sort users by company name. */
  CompanyName = 'COMPANY_NAME',
  /** Sort users by email. */
  Email = 'EMAIL',
  /** Sort users by first name. */
  FirstName = 'FIRST_NAME',
  /** Sort users by last name. */
  LastName = 'LAST_NAME',
  /** Sort users by order count. */
  OrderCount = 'ORDER_COUNT',
  /** Sort users by vendor. */
  Vendor = 'VENDOR'
}

export type UserSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort users by the selected field. */
  field: UserSortField;
};

/** Updates metadata for user. */
export type UserUpdateMeta = {
  __typename?: 'UserUpdateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Updates private metadata for user. */
export type UserUpdatePrivateMeta = {
  __typename?: 'UserUpdatePrivateMeta';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** Represents a VAT rate for a country. */
export type Vat = {
  __typename?: 'VAT';
  /** Country code. */
  countryCode: Scalars['String'];
  /** Country's VAT rate exceptions for specific types of goods. */
  reducedRates: Array<Maybe<ReducedRate>>;
  /** Standard VAT rate in percent. */
  standardRate?: Maybe<Scalars['Float']>;
};

export type ValidationStatus = {
  __typename?: 'ValidationStatus';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['ID']>;
};

/** Assign an image to a product variant. */
export type VariantImageAssign = {
  __typename?: 'VariantImageAssign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Unassign an image from a product variant. */
export type VariantImageUnassign = {
  __typename?: 'VariantImageUnassign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Represents availability of a variant in the storefront. */
export type VariantPricingInfo = {
  __typename?: 'VariantPricingInfo';
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The price, with any discount subtracted. */
  price?: Maybe<TaxedMoney>;
  /** The discounted price in the local currency. */
  priceLocalCurrency?: Maybe<TaxedMoney>;
  /** The price without any discount. */
  priceUndiscounted?: Maybe<TaxedMoney>;
};

export type VaultInput = {
  seller?: InputMaybe<Scalars['ID']>;
  vaultData?: InputMaybe<Scalars['JSONString']>;
  vaultMask?: InputMaybe<Scalars['JSONString']>;
  vaultType?: InputMaybe<Scalars['String']>;
};

export type VaultType = {
  __typename?: 'VaultType';
  id: Scalars['ID'];
  seller: Seller;
  vaultData: Scalars['JSONString'];
  vaultMask: Scalars['JSONString'];
  vaultType: Scalars['String'];
};

export type Vendor = Seller | User;

/** Adds return notification note to the order. */
export type VendorOrderReturnFromStorefrontNotification = {
  __typename?: 'VendorOrderReturnFromStorefrontNotification';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order return notification created. */
  event?: Maybe<Array<Maybe<OrderEvent>>>;
  /** Order with return notification note added. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type VendorPayout = Node & {
  __typename?: 'VendorPayout';
  adjustment?: Maybe<Money>;
  adjustmentAmount: Scalars['Float'];
  adjustmentDirection?: Maybe<Scalars['String']>;
  affiliate?: Maybe<User>;
  created?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  included?: Maybe<Scalars['Boolean']>;
  payout?: Maybe<Payout>;
  penalty?: Maybe<Money>;
  penaltyAmount: Scalars['Float'];
  seller?: Maybe<Seller>;
  status: VendorPayoutStatus;
  updated?: Maybe<Scalars['String']>;
};

export type VendorPayoutCountableConnection = {
  __typename?: 'VendorPayoutCountableConnection';
  edges: Array<VendorPayoutCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type VendorPayoutCountableEdge = {
  __typename?: 'VendorPayoutCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: VendorPayout;
};

export type VendorPayoutDetails = {
  payout?: InputMaybe<Scalars['String']>;
  vendor?: InputMaybe<Scalars['String']>;
};

export type VendorPayoutReport = {
  __typename?: 'VendorPayoutReport';
  excluded?: Maybe<VendorPayoutReportSubset>;
  included?: Maybe<VendorPayoutReportSubset>;
};

export type VendorPayoutReportSubset = {
  __typename?: 'VendorPayoutReportSubset';
  category?: Maybe<Scalars['String']>;
  columns?: Maybe<Array<Maybe<ColumnObjectType>>>;
  filters?: Maybe<Array<Maybe<FilterObjectType>>>;
  report?: Maybe<Array<Maybe<OrderVendorReportType>>>;
  summary?: Maybe<OrderVendorSummaryType>;
  title?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum VendorPayoutStatus {
  /** Paid */
  Paid = 'PAID',
  /** Unpaid */
  Unpaid = 'UNPAID'
}

export type VendorPayoutStatusInput = {
  payoutAmount: Scalars['String'];
  status: Scalars['String'];
};

/** Modifies the status of a vendor payout */
export type VendorPayoutStatusUpdate = {
  __typename?: 'VendorPayoutStatusUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payoutErrors: Array<PayoutError>;
  /** Vendor Payout that was updated. */
  vendorPayout?: Maybe<VendorPayout>;
};

export type VendorPayoutUpdateInput = {
  adjustmentDirection?: InputMaybe<Scalars['String']>;
  /** Adjustment amount for the vendor payout */
  adjustments?: InputMaybe<Scalars['Decimal']>;
  /** Penalty amount for the vendor payout */
  penalties?: InputMaybe<Scalars['Decimal']>;
  /** The ID of the order line. */
  vendorId?: InputMaybe<Scalars['ID']>;
};

/** Exclude vendor payouts. */
export type VendorPayoutsBulkExclude = {
  __typename?: 'VendorPayoutsBulkExclude';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payoutErrors: Array<PayoutError>;
};

/** Include vendor payouts. */
export type VendorPayoutsBulkInclude = {
  __typename?: 'VendorPayoutsBulkInclude';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  payoutErrors: Array<PayoutError>;
};

/** Verify JWT token. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  accountErrors: Array<AccountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Determine if token is valid or not. */
  isValid: Scalars['Boolean'];
  /** JWT payload. */
  payload?: Maybe<Scalars['GenericScalar']>;
  /** User assigned to token. */
  user?: Maybe<User>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type Voucher = Node & {
  __typename?: 'Voucher';
  applyOncePerCustomer: Scalars['Boolean'];
  applyOncePerOrder: Scalars['Boolean'];
  /** List of categories this voucher applies to. */
  categories?: Maybe<CategoryCountableConnection>;
  code: Scalars['String'];
  /** List of collections this voucher applies to. */
  collections?: Maybe<CollectionCountableConnection>;
  /** List of countries available for the shipping voucher. */
  countries?: Maybe<Array<Maybe<CountryDisplay>>>;
  discountValue: Scalars['Float'];
  /** Determines a type of discount for voucher - value or percentage */
  discountValueType: DiscountValueTypeEnum;
  endDate?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  minCheckoutItemsQuantity?: Maybe<Scalars['Int']>;
  minSpent?: Maybe<Money>;
  name?: Maybe<Scalars['String']>;
  /** List of products this voucher applies to. */
  products?: Maybe<ProductCountableConnection>;
  startDate: Scalars['DateTime'];
  /** Returns translated voucher fields for the given language code. */
  translation?: Maybe<VoucherTranslation>;
  /** Determines a type of voucher. */
  type: VoucherTypeEnum;
  usageLimit?: Maybe<Scalars['Int']>;
  used: Scalars['Int'];
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Adds products, categories, collections to a voucher. */
export type VoucherAddCatalogues = {
  __typename?: 'VoucherAddCatalogues';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
};

/** Deletes vouchers. */
export type VoucherBulkDelete = {
  __typename?: 'VoucherBulkDelete';
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
};

export type VoucherCountableConnection = {
  __typename?: 'VoucherCountableConnection';
  edges: Array<VoucherCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type VoucherCountableEdge = {
  __typename?: 'VoucherCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Voucher;
};

/** Creates a new voucher. */
export type VoucherCreate = {
  __typename?: 'VoucherCreate';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  voucher?: Maybe<Voucher>;
};

/** Deletes a voucher. */
export type VoucherDelete = {
  __typename?: 'VoucherDelete';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  voucher?: Maybe<Voucher>;
};

export enum VoucherDiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  Shipping = 'SHIPPING'
}

export type VoucherFilterInput = {
  discountType?: InputMaybe<Array<InputMaybe<VoucherDiscountType>>>;
  search?: InputMaybe<Scalars['String']>;
  started?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<Array<InputMaybe<DiscountStatusEnum>>>;
  timesUsed?: InputMaybe<IntRangeInput>;
};

export type VoucherInput = {
  /** Voucher should be applied once per customer. */
  applyOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** Voucher should be applied to the cheapest item or entire order. */
  applyOncePerOrder?: InputMaybe<Scalars['Boolean']>;
  /** Categories discounted by the voucher. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Code to use the voucher. */
  code?: InputMaybe<Scalars['String']>;
  /** Collections discounted by the voucher. */
  collections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Country codes that can be used with the shipping voucher. */
  countries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Value of the voucher. */
  discountValue?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Choices: fixed or percentage. */
  discountValueType?: InputMaybe<DiscountValueTypeEnum>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** Min purchase amount required to apply the voucher. */
  minAmountSpent?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Minimal quantity of checkout items required to apply the voucher. */
  minCheckoutItemsQuantity?: InputMaybe<Scalars['Int']>;
  /** Voucher name. */
  name?: InputMaybe<Scalars['String']>;
  /** Products discounted by the voucher. */
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Voucher type: PRODUCT, CATEGORY SHIPPING or ENTIRE_ORDER. */
  type?: InputMaybe<VoucherTypeEnum>;
  /** Limit number of times this voucher can be used in total. */
  usageLimit?: InputMaybe<Scalars['Int']>;
};

/** Removes products, categories, collections from a voucher. */
export type VoucherRemoveCatalogues = {
  __typename?: 'VoucherRemoveCatalogues';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
};

export enum VoucherSortField {
  /** Sort vouchers by code. */
  Code = 'CODE',
  /** Sort vouchers by end date. */
  EndDate = 'END_DATE',
  /** Sort vouchers by minimum spent amount. */
  MinimumSpentAmount = 'MINIMUM_SPENT_AMOUNT',
  /** Sort vouchers by start date. */
  StartDate = 'START_DATE',
  /** Sort vouchers by type. */
  Type = 'TYPE',
  /** Sort vouchers by usage limit. */
  UsageLimit = 'USAGE_LIMIT',
  /** Sort vouchers by value. */
  Value = 'VALUE'
}

export type VoucherSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort vouchers by the selected field. */
  field: VoucherSortField;
};

export type VoucherTranslatableContent = Node & {
  __typename?: 'VoucherTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Returns translated voucher fields for the given language code. */
  translation?: Maybe<VoucherTranslation>;
  /** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
  voucher?: Maybe<Voucher>;
};


export type VoucherTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Creates/Updates translations for Voucher. */
export type VoucherTranslate = {
  __typename?: 'VoucherTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  voucher?: Maybe<Voucher>;
};

export type VoucherTranslation = Node & {
  __typename?: 'VoucherTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

export enum VoucherTypeEnum {
  EntireOrder = 'ENTIRE_ORDER',
  Shipping = 'SHIPPING',
  SpecificProduct = 'SPECIFIC_PRODUCT'
}

/** Updates a voucher. */
export type VoucherUpdate = {
  __typename?: 'VoucherUpdate';
  discountErrors: Array<DiscountError>;
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  voucher?: Maybe<Voucher>;
};

/** Represents warehouse. */
export type Warehouse = Node & {
  __typename?: 'Warehouse';
  address: Address;
  companyName: Scalars['String'];
  email: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  seller?: Maybe<Seller>;
  shippingZones: ShippingZoneCountableConnection;
  slug: Scalars['String'];
};


/** Represents warehouse. */
export type WarehouseShippingZonesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type WarehouseAddressInput = {
  /** City. */
  city: Scalars['String'];
  /** District. */
  cityArea?: InputMaybe<Scalars['String']>;
  /** Country. */
  country: CountryCode;
  /** State or province. */
  countryArea?: InputMaybe<Scalars['String']>;
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress1: Scalars['String'];
  /** Address. */
  streetAddress2?: InputMaybe<Scalars['String']>;
};

export type WarehouseCountableConnection = {
  __typename?: 'WarehouseCountableConnection';
  edges: Array<WarehouseCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WarehouseCountableEdge = {
  __typename?: 'WarehouseCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Warehouse;
};

/** Creates new warehouse. */
export type WarehouseCreate = {
  __typename?: 'WarehouseCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouse?: Maybe<Warehouse>;
  warehouseErrors: Array<WarehouseError>;
};

export type WarehouseCreateInput = {
  /** Shipping zones to assign to the warehouse. */
  addShippingZones?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Address of the warehouse. */
  address: WarehouseAddressInput;
  /** Company name. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The email address of the warehouse. */
  email?: InputMaybe<Scalars['String']>;
  /** Warehouse name. */
  name: Scalars['String'];
  /** Seller ID */
  seller?: InputMaybe<Scalars['ID']>;
  /** Warehouse slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Deletes selected warehouse. */
export type WarehouseDelete = {
  __typename?: 'WarehouseDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouse?: Maybe<Warehouse>;
  warehouseErrors: Array<WarehouseError>;
};

export type WarehouseError = {
  __typename?: 'WarehouseError';
  /** The error code. */
  code: WarehouseErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WarehouseErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type WarehouseFilterInput = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  search?: InputMaybe<Scalars['String']>;
};

export enum WarehouseSortField {
  /** Sort warehouses by name. */
  Name = 'NAME'
}

export type WarehouseSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort warehouses by the selected field. */
  field: WarehouseSortField;
};

/** Updates given warehouse. */
export type WarehouseUpdate = {
  __typename?: 'WarehouseUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouse?: Maybe<Warehouse>;
  warehouseErrors: Array<WarehouseError>;
};

export type WarehouseUpdateInput = {
  /** Shipping zones to assign to the warehouse. */
  addShippingZones?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Address of the warehouse. */
  address?: InputMaybe<WarehouseAddressInput>;
  /** Company name. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The email address of the warehouse. */
  email?: InputMaybe<Scalars['String']>;
  /** Warehouse name. */
  name?: InputMaybe<Scalars['String']>;
  /** Shipping zones to unassign from the warehouse. */
  removeShippingZones?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Seller ID */
  seller?: InputMaybe<Scalars['ID']>;
  /** Warehouse slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Webhook. */
export type Webhook = Node & {
  __typename?: 'Webhook';
  app: App;
  connectionString?: Maybe<Scalars['String']>;
  /** List of webhook events. */
  events: Array<WebhookEvent>;
  /** The ID of the object. */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  queueName?: Maybe<Scalars['String']>;
  secretKey?: Maybe<Scalars['String']>;
  /** @deprecated Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount: ServiceAccount;
  targetUrl: Scalars['String'];
};

export type WebhookCountableConnection = {
  __typename?: 'WebhookCountableConnection';
  edges: Array<WebhookCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WebhookCountableEdge = {
  __typename?: 'WebhookCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Webhook;
};

/** Creates a new webhook subscription. */
export type WebhookCreate = {
  __typename?: 'WebhookCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhook?: Maybe<Webhook>;
  webhookErrors: Array<WebhookError>;
};

export type WebhookCreateInput = {
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** The connection string or service key json string for third party queue services. */
  connectionString?: InputMaybe<Scalars['String']>;
  /** The events that webhook wants to subscribe. The CHECKOUT_QUANTITY_CHANGED is depreacted. It will be removed in Nautical 3.0 */
  events?: InputMaybe<Array<InputMaybe<WebhookEventTypeEnum>>>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** The name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /** The queue name for Microsoft Azure ServiceBus connection */
  queueName?: InputMaybe<Scalars['String']>;
  /** The secret key used to create a hash signature with each payload. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** DEPRECATED: Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount?: InputMaybe<Scalars['ID']>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
};

/** Deletes a webhook subscription. */
export type WebhookDelete = {
  __typename?: 'WebhookDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhook?: Maybe<Webhook>;
  webhookErrors: Array<WebhookError>;
};

export type WebhookError = {
  __typename?: 'WebhookError';
  /** The error code. */
  code: WebhookErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WebhookErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Webhook event. */
export type WebhookEvent = {
  __typename?: 'WebhookEvent';
  /** Internal name of the event type. */
  eventType: WebhookEventTypeEnum;
  /** Display name of the event. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum WebhookEventTypeEnum {
  AnyEvents = 'ANY_EVENTS',
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  CustomerCreated = 'CUSTOMER_CREATED',
  FulfillmentCreated = 'FULFILLMENT_CREATED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceSent = 'INVOICE_SENT',
  OrderCancelled = 'ORDER_CANCELLED',
  OrderCreated = 'ORDER_CREATED',
  OrderFulfilled = 'ORDER_FULFILLED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderUpdated = 'ORDER_UPDATED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductUpdated = 'PRODUCT_UPDATED'
}

export type WebhookFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

/** Represents job data of incoming webhook. */
export type WebhookJob = Job & Node & {
  __typename?: 'WebhookJob';
  body?: Maybe<Scalars['JSONString']>;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  marketplaceEntityLink?: Maybe<Scalars['String']>;
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  requestMeta?: Maybe<Scalars['JSONString']>;
  seller?: Maybe<Seller>;
  source?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  type?: Maybe<GenericWebhookTransactionType>;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  vendorEntityLink?: Maybe<Scalars['String']>;
};

export type WebhookJobCountableConnection = {
  __typename?: 'WebhookJobCountableConnection';
  edges: Array<WebhookJobCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WebhookJobCountableEdge = {
  __typename?: 'WebhookJobCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: WebhookJob;
};

export type WebhookJobFilterInput = {
  created?: InputMaybe<DateRangeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  search?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Array<InputMaybe<WebhookJobSource>>>;
  status?: InputMaybe<Array<InputMaybe<WebhookJobStatus>>>;
  type?: InputMaybe<Array<InputMaybe<WebhookJobType>>>;
};

export enum WebhookJobSortField {
  CreatedAt = 'CREATED_AT',
  Source = 'SOURCE',
  Status = 'STATUS',
  Type = 'TYPE'
}

export type WebhookJobSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort webhook_jobs by the selected field. */
  field: WebhookJobSortField;
};

export enum WebhookJobSource {
  Default = 'DEFAULT',
  Shopify = 'SHOPIFY'
}

export enum WebhookJobStatus {
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export enum WebhookJobType {
  OrderCreate = 'ORDER_CREATE',
  OrderUpdate = 'ORDER_UPDATE'
}

/** Represents a periodic task run by django celery beat */
export type WebhookPeriodicTask = Node & {
  __typename?: 'WebhookPeriodicTask';
  /** JSON encoded positional arguments (Example: ["arg1", "arg2"]) */
  args: Scalars['String'];
  /** Datetime that this PeriodicTask was last modified */
  dateChanged: Scalars['DateTime'];
  /** Detailed description about the details of this Periodic Task */
  description: Scalars['String'];
  /** Set to False to disable the schedule */
  enabled: Scalars['Boolean'];
  /** Override Exchange for low-level AMQP routing */
  exchange?: Maybe<Scalars['String']>;
  /** Timedelta with seconds which the schedule will no longer trigger the task to run */
  expireSeconds?: Maybe<Scalars['Int']>;
  /** Datetime after which the schedule will no longer trigger the task to run */
  expires?: Maybe<Scalars['DateTime']>;
  /** JSON encoded message headers for the AMQP message. */
  headers: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** JSON encoded keyword arguments (Example: {"argument": "value"}) */
  kwargs: Scalars['String'];
  /** Datetime that the schedule last triggered the task to run. Reset to None if enabled is set to False. */
  lastRunAt?: Maybe<Scalars['DateTime']>;
  /** Short Description For This Task */
  name: Scalars['String'];
  /** If True, the schedule will only run the task a single time */
  oneOff: Scalars['Boolean'];
  /** Priority Number between 0 and 255. Supported by: RabbitMQ, Redis (priority reversed, 0 is highest). */
  priority?: Maybe<Scalars['Int']>;
  /** Queue defined in CELERY_TASK_QUEUES. Leave None for default queuing. */
  queue?: Maybe<Scalars['String']>;
  /** Override Routing Key for low-level AMQP routing */
  routingKey?: Maybe<Scalars['String']>;
  /** Datetime when the schedule should begin triggering the task to run */
  startTime?: Maybe<Scalars['DateTime']>;
  /** The Name of the Celery Task that Should be Run.  (Example: "proj.tasks.import_contacts") */
  task: Scalars['String'];
  /** Running count of how many times the schedule has triggered the task */
  totalRunCount: Scalars['Int'];
};

/** An enumeration. */
export enum WebhookSampleEventTypeEnum {
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  CustomerCreated = 'CUSTOMER_CREATED',
  FulfillmentCreated = 'FULFILLMENT_CREATED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceSent = 'INVOICE_SENT',
  OrderCancelled = 'ORDER_CANCELLED',
  OrderCreated = 'ORDER_CREATED',
  OrderFulfilled = 'ORDER_FULFILLED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderUpdated = 'ORDER_UPDATED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductUpdated = 'PRODUCT_UPDATED'
}

export enum WebhookSortField {
  /** Sort webhooks by service account. */
  App = 'APP',
  /** Sort webhooks by name. */
  Name = 'NAME',
  /** Sort webhooks by service account. */
  ServiceAccount = 'SERVICE_ACCOUNT',
  /** Sort webhooks by target url. */
  TargetUrl = 'TARGET_URL'
}

export type WebhookSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort webhooks by the selected field. */
  field: WebhookSortField;
};

/** Updates a webhook subscription. */
export type WebhookUpdate = {
  __typename?: 'WebhookUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhook?: Maybe<Webhook>;
  webhookErrors: Array<WebhookError>;
};

export type WebhookUpdateInput = {
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** The connection string or service key json string for third party queue services. */
  connectionString?: InputMaybe<Scalars['String']>;
  /** The events that webhook wants to subscribe. The CHECKOUT_QUANTITY_CHANGED is depreacted. It will be removed in Nautical 3.0 */
  events?: InputMaybe<Array<InputMaybe<WebhookEventTypeEnum>>>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** The new name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /** The queue name for Microsoft Azure ServiceBus connection */
  queueName?: InputMaybe<Scalars['String']>;
  /** Use to create a hash signature with each payload. */
  secretKey?: InputMaybe<Scalars['String']>;
  /** DEPRECATED: Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount?: InputMaybe<Scalars['ID']>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
};

/** Represents weight value in a specific weight unit. */
export type Weight = {
  __typename?: 'Weight';
  /** Weight unit. */
  unit: WeightUnitsEnum;
  /** Weight value. */
  value: Scalars['Float'];
};

/** An enumeration. */
export enum WeightUnitsEnum {
  G = 'G',
  Kg = 'KG',
  Lb = 'LB',
  Oz = 'OZ'
}

/** Wishlist item. */
export type Wishlist = Node & {
  __typename?: 'Wishlist';
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  items: WishlistItemCountableConnection;
};


/** Wishlist item. */
export type WishlistItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Add product to the current user's wishlist. */
export type WishlistAddProductMutation = {
  __typename?: 'WishlistAddProductMutation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The wishlist of the current user. */
  wishlist?: Maybe<Array<Maybe<WishlistItem>>>;
  wishlistErrors: Array<WishlistError>;
};

/** Add product variant to the current user's wishlist. */
export type WishlistAddProductVariantMutation = {
  __typename?: 'WishlistAddProductVariantMutation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The wishlist of the current user. */
  wishlist?: Maybe<Array<Maybe<WishlistItem>>>;
  wishlistErrors: Array<WishlistError>;
};

export type WishlistError = {
  __typename?: 'WishlistError';
  /** The error code. */
  code: WishlistErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WishlistErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Wishlist item. */
export type WishlistItem = Node & {
  __typename?: 'WishlistItem';
  /** The ID of the object. */
  id: Scalars['ID'];
  product: Product;
  variants: ProductVariantCountableConnection;
  wishlist: Wishlist;
};


/** Wishlist item. */
export type WishlistItemVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type WishlistItemCountableConnection = {
  __typename?: 'WishlistItemCountableConnection';
  edges: Array<WishlistItemCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WishlistItemCountableEdge = {
  __typename?: 'WishlistItemCountableEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: WishlistItem;
};

/** Remove product from the current user's wishlist. */
export type WishlistRemoveProductMutation = {
  __typename?: 'WishlistRemoveProductMutation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The wishlist of the current user. */
  wishlist?: Maybe<Array<Maybe<WishlistItem>>>;
  wishlistErrors: Array<WishlistError>;
};

/** Remove product variant from the current user's wishlist. */
export type WishlistRemoveProductVariantMutation = {
  __typename?: 'WishlistRemoveProductVariantMutation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The wishlist of the current user. */
  wishlist?: Maybe<Array<Maybe<WishlistItem>>>;
  wishlistErrors: Array<WishlistError>;
};

/** Gets customer Yotpo loyalty and referrals details. */
export type YotpoCustomer = {
  __typename?: 'YotpoCustomer';
  /** Customer's email address. */
  email?: Maybe<Scalars['String']>;
  /** Customer's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** Customer's last name. */
  lastName?: Maybe<Scalars['String']>;
  /** Customer's loyalty point balance. */
  pointsBalance?: Maybe<Scalars['Int']>;
  /** Customer's loyalty point earned. */
  pointsEarned?: Maybe<Scalars['Int']>;
};

export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints = {
  __typename?: 'YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints';
  ok?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Int']>;
};

export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord = {
  __typename?: 'YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord';
  ok?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Int']>;
};

export type _Entity = Address | App | Category | Collection | Directory | Group | Listing | Location | Microsite | Product | ProductImage | ProductType | ProductVariant | ServiceAccount | User;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type UserFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null };

export type BaseCategoryFragment = { __typename?: 'Category', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null };

export type CategoryDetailsFragment = { __typename?: 'Category', description: string, descriptionJson: any, id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null, backgroundImage?: { __typename?: 'Image', alt?: string | null, url: string } | null };

export type PriceFragment = { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } };

export type AddressFragment = { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } };

export type ProductVariantFragment = { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } };

export type ShippingMethodFragment = { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null };

export type CheckoutLineFragment = { __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } };

export type CheckoutFragment = { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> };

export type BaseCollectionFragment = { __typename?: 'Collection', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null };

export type CollectionDetailsFragment = { __typename?: 'Collection', description: string, descriptionJson: any, id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null, backgroundImage?: { __typename?: 'Image', alt?: string | null, url: string } | null };

export type CheckoutErrorFragment = { __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null };

export type PaymentErrorFragment = { __typename?: 'PaymentError', code: PaymentErrorCode, field?: string | null, message?: string | null };

export type AccountErrorFragment = { __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null };

export type AffiliateErrorFragment = { __typename?: 'AffiliateError', code: AffiliateErrorCode, field?: string | null, message?: string | null };

export type InvoiceFragmentFragment = { __typename?: 'Invoice', id: string, number?: string | null, createdAt: any, url?: string | null, status: JobStatusEnum };

export type OrderPriceFragment = { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } };

export type OrderDetailFragment = { __typename?: 'Order', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: OrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'OrderLine', productName: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null };

export type NauticalOrderDetailFragment = { __typename?: 'NauticalOrder', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: NauticalOrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'NauticalOrderLine', productName: string, productSku: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, volumeDiscount?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, sellerFulfillments: Array<{ __typename?: 'Fulfillment', id: string, status: FulfillmentStatus, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, orderLine?: { __typename?: 'OrderLine', id: string, productName: string, productSku: string, variantName: string, quantity: number, quantityFulfilled: number } | null } | null> | null } | null> };

export type PageInfoFragment = { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean };

export type PaymentFragment = { __typename?: 'Payment', id: string, gateway: string, token: string, creditCard?: { __typename?: 'CreditCard', brand: string, firstDigits?: string | null, lastDigits: string, expMonth?: number | null, expYear?: number | null } | null, total?: { __typename?: 'Money', amount: number, currency: string } | null };

export type PaymentGatewayFragment = { __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> };

export type BaseProductFragment = { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null };

export type SelectedAttributeFieldsFragment = { __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, slug?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> };

export type ProductVariantFieldsFragment = { __typename?: 'ProductVariant', id: string, sku: string, name: string, quantityAvailable: number, isAvailable?: boolean | null, images?: Array<{ __typename?: 'ProductImage', id: string, url: string, alt: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, slug?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }> };

export type ProductInfoFragment = { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null };

export type WishlistItemFragment = { __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } };

export type SetCustomerDefaultAddressMutationVariables = Exact<{
  id: Scalars['ID'];
  type: AddressTypeEnum;
}>;


export type SetCustomerDefaultAddressMutation = { __typename?: 'Mutation', accountSetDefaultAddress?: { __typename?: 'AccountSetDefaultAddress', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null } | null };

export type DeleteUserAddressMutationVariables = Exact<{
  addressId: Scalars['ID'];
}>;


export type DeleteUserAddressMutation = { __typename?: 'Mutation', accountAddressDelete?: { __typename?: 'AccountAddressDelete', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null } | null };

export type CreateUserAddressMutationVariables = Exact<{
  input: AddressInput;
}>;


export type CreateUserAddressMutation = { __typename?: 'Mutation', accountAddressCreate?: { __typename?: 'AccountAddressCreate', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null } | null };

export type UpdateUserAddressMutationVariables = Exact<{
  input: AddressInput;
  id: Scalars['ID'];
}>;


export type UpdateUserAddressMutation = { __typename?: 'Mutation', accountAddressUpdate?: { __typename?: 'AccountAddressUpdate', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null } | null };

export type AffiliateCodeUseMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type AffiliateCodeUseMutation = { __typename?: 'Mutation', affiliateCodeUse?: { __typename?: 'AffiliateCodeUse', affiliateCodes?: { __typename?: 'AffiliateCodes', id: string, uses?: number | null, code?: string | null, affiliate?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null, channel?: { __typename?: 'Channel', id: string, channel: string } | null } | null, errors: Array<{ __typename?: 'AffiliateError', code: AffiliateErrorCode, field?: string | null, message?: string | null }> } | null };

export type TokenAuthMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenCreate?: { __typename?: 'CreateToken', csrfToken?: string | null, refreshToken?: string | null, token?: string | null, errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string } | null } | null };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', tokenVerify?: { __typename?: 'VerifyToken', isValid: boolean, payload?: any | null, user?: { __typename?: 'User', id: string } | null, errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }> } | null };

export type RefreshTokenMutationVariables = Exact<{
  csrfToken?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', tokenRefresh?: { __typename?: 'RefreshToken', token?: string | null, user?: { __typename?: 'User', id: string } | null, errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }> } | null };

export type UpdateCheckoutLineMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  lines: Array<InputMaybe<CheckoutLineInput>> | InputMaybe<CheckoutLineInput>;
}>;


export type UpdateCheckoutLineMutation = { __typename?: 'Mutation', checkoutLinesUpdate?: { __typename?: 'CheckoutLinesUpdate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type CreateCheckoutMutationVariables = Exact<{
  checkoutInput: CheckoutCreateInput;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', checkoutCreate?: { __typename?: 'CheckoutCreate', errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }>, checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null } | null };

export type UpdateCheckoutBillingAddressWithEmailMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  billingAddress: AddressInput;
  email: Scalars['String'];
}>;


export type UpdateCheckoutBillingAddressWithEmailMutation = { __typename?: 'Mutation', checkoutBillingAddressUpdate?: { __typename?: 'CheckoutBillingAddressUpdate', errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }>, checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null } | null, checkoutEmailUpdate?: { __typename?: 'CheckoutEmailUpdate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type UpdateCheckoutBillingAddressMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  billingAddress: AddressInput;
}>;


export type UpdateCheckoutBillingAddressMutation = { __typename?: 'Mutation', checkoutBillingAddressUpdate?: { __typename?: 'CheckoutBillingAddressUpdate', errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }>, checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null } | null };

export type UpdateCheckoutShippingAddressMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  shippingAddress: AddressInput;
  email: Scalars['String'];
}>;


export type UpdateCheckoutShippingAddressMutation = { __typename?: 'Mutation', checkoutShippingAddressUpdate?: { __typename?: 'CheckoutShippingAddressUpdate', errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }>, checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null } | null, checkoutEmailUpdate?: { __typename?: 'CheckoutEmailUpdate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type UpdateCheckoutShippingMethodMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  shippingMethodId: Scalars['ID'];
}>;


export type UpdateCheckoutShippingMethodMutation = { __typename?: 'Mutation', checkoutShippingMethodUpdate?: { __typename?: 'CheckoutShippingMethodUpdate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type UpdateCheckoutSellerShippingMethodsMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  seller: Scalars['ID'];
  shippingMethodSelection: Scalars['ID'];
}>;


export type UpdateCheckoutSellerShippingMethodsMutation = { __typename?: 'Mutation', checkoutSellerShippingMethodsUpdate?: { __typename?: 'CheckoutSellerShippingMethodsUpdate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type AddCheckoutPromoCodeMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
}>;


export type AddCheckoutPromoCodeMutation = { __typename?: 'Mutation', checkoutAddPromoCode?: { __typename?: 'CheckoutAddPromoCode', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type RemoveCheckoutPromoCodeMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
}>;


export type RemoveCheckoutPromoCodeMutation = { __typename?: 'Mutation', checkoutRemovePromoCode?: { __typename?: 'CheckoutRemovePromoCode', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }> } | null };

export type CreateCheckoutPaymentMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  paymentInput: PaymentInput;
}>;


export type CreateCheckoutPaymentMutation = { __typename?: 'Mutation', checkoutPaymentCreate?: { __typename?: 'CheckoutPaymentCreate', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null, payment?: { __typename?: 'Payment', id: string, gateway: string, token: string, creditCard?: { __typename?: 'CreditCard', brand: string, firstDigits?: string | null, lastDigits: string, expMonth?: number | null, expYear?: number | null } | null, total?: { __typename?: 'Money', amount: number, currency: string } | null } | null, errors: Array<{ __typename?: 'PaymentError', code: PaymentErrorCode, field?: string | null, message?: string | null }> } | null };

export type CompleteCheckoutMutationVariables = Exact<{
  checkoutId: Scalars['ID'];
  paymentData?: InputMaybe<Scalars['JSONString']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
  storeSource?: InputMaybe<Scalars['Boolean']>;
  volumeDiscount: Scalars['Float'];
  volumeDiscountsBySeller: Array<InputMaybe<SellerVolumeDiscountInput>> | InputMaybe<SellerVolumeDiscountInput>;
  affiliate?: InputMaybe<Scalars['ID']>;
  microsite?: InputMaybe<Scalars['ID']>;
}>;


export type CompleteCheckoutMutation = { __typename?: 'Mutation', checkoutComplete?: { __typename?: 'CheckoutComplete', confirmationNeeded: boolean, confirmationData?: any | null, errors: Array<{ __typename?: 'CheckoutError', code: CheckoutErrorCode, field?: string | null, message?: string | null }>, order?: { __typename?: 'NauticalOrder', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: NauticalOrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'NauticalOrderLine', productName: string, productSku: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, volumeDiscount?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, sellerFulfillments: Array<{ __typename?: 'Fulfillment', id: string, status: FulfillmentStatus, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, orderLine?: { __typename?: 'OrderLine', id: string, productName: string, productSku: string, variantName: string, quantity: number, quantityFulfilled: number } | null } | null> | null } | null> } | null } | null };

export type OrderErrorFragmentFragment = { __typename?: 'OrderError', code: OrderErrorCode, field?: string | null, message?: string | null };

export type OrderLineFragmentFragment = { __typename?: 'OrderLine', id: string, isShippingRequired: boolean, productName: string, variantName: string, productSku: string, quantity: number, quantityFulfilled: number, variant?: { __typename?: 'ProductVariant', id: string, quantityAvailable: number, product: { __typename?: 'Product', id: string, isAvailableForPurchase?: boolean | null, isPublished: boolean, originLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, destinationLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string } | null> | null } } | null, unitPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, thumbnail?: { __typename?: 'Image', url: string } | null };

export type FulfillmentFragmentFragment = { __typename?: 'Fulfillment', id: string, fulfillmentOrder: number, status: FulfillmentStatus, trackingNumber?: string | null, trackingUrl?: string | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, returnReason?: string | null, orderLine?: { __typename?: 'OrderLine', id: string, isShippingRequired: boolean, productName: string, variantName: string, productSku: string, quantity: number, quantityFulfilled: number, variant?: { __typename?: 'ProductVariant', id: string, quantityAvailable: number, product: { __typename?: 'Product', id: string, isAvailableForPurchase?: boolean | null, isPublished: boolean, originLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, destinationLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string } | null> | null } } | null, unitPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, thumbnail?: { __typename?: 'Image', url: string } | null } | null } | null> | null, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, order: { __typename?: 'Order', id: string, seller?: { __typename?: 'Seller', id: string, companyName: string } | null }, warehouse?: { __typename?: 'Warehouse', id: string, name: string } | null };

export type BulkFulfillmentReturnMutationVariables = Exact<{
  input?: InputMaybe<Array<InputMaybe<BulkFulfillmentReturnInput>> | InputMaybe<BulkFulfillmentReturnInput>>;
}>;


export type BulkFulfillmentReturnMutation = { __typename?: 'Mutation', bulkFulfillmentReturn?: { __typename?: 'BulkFulfillmentReturn', errors: Array<{ __typename?: 'OrderError', code: OrderErrorCode, field?: string | null, message?: string | null }>, fulfillments?: Array<{ __typename?: 'Fulfillment', id: string, fulfillmentOrder: number, status: FulfillmentStatus, trackingNumber?: string | null, trackingUrl?: string | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, returnReason?: string | null, orderLine?: { __typename?: 'OrderLine', id: string, isShippingRequired: boolean, productName: string, variantName: string, productSku: string, quantity: number, quantityFulfilled: number, variant?: { __typename?: 'ProductVariant', id: string, quantityAvailable: number, product: { __typename?: 'Product', id: string, isAvailableForPurchase?: boolean | null, isPublished: boolean, originLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, destinationLocation?: { __typename?: 'Location', id: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, cityArea: string, postalCode: string, phone: string, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string } | null> | null } } | null, unitPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, thumbnail?: { __typename?: 'Image', url: string } | null } | null } | null> | null, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, order: { __typename?: 'Order', id: string, seller?: { __typename?: 'Seller', id: string, companyName: string } | null }, warehouse?: { __typename?: 'Warehouse', id: string, name: string } | null } | null> | null } | null };

export type NauticalOrderEventFragmentFragment = { __typename?: 'NauticalOrderEvent', id: string, amount?: number | null, date?: any | null, email?: string | null, emailType?: OrderEventsEmailsEnum | null, invoiceNumber?: string | null, message?: string | null, quantity?: number | null, type?: OrderEventsEnum | null, user?: { __typename?: 'User', id: string, email: string } | null };

export type NauticalOrderReturnFromStorefrontNotificationMutationVariables = Exact<{
  order: Scalars['ID'];
  input: OrderReturnNotificationInput;
}>;


export type NauticalOrderReturnFromStorefrontNotificationMutation = { __typename?: 'Mutation', nauticalOrderReturnFromStorefrontNotification?: { __typename?: 'NauticalOrderReturnFromStorefrontNotification', errors: Array<{ __typename?: 'OrderError', code: OrderErrorCode, field?: string | null, message?: string | null }>, order?: { __typename?: 'NauticalOrder', id: string, events?: Array<{ __typename?: 'NauticalOrderEvent', id: string, amount?: number | null, date?: any | null, email?: string | null, emailType?: OrderEventsEmailsEnum | null, invoiceNumber?: string | null, message?: string | null, quantity?: number | null, type?: OrderEventsEnum | null, user?: { __typename?: 'User', id: string, email: string } | null } | null> | null } | null } | null };

export type OrderEventFragmentFragment = { __typename?: 'OrderEvent', id: string, amount?: number | null, date?: any | null, email?: string | null, emailType?: OrderEventsEmailsEnum | null, invoiceNumber?: string | null, message?: string | null, quantity?: number | null, type?: OrderEventsEnum | null, user?: { __typename?: 'User', id: string, email: string } | null };

export type VendorOrderReturnFromStorefrontNotificationMutationVariables = Exact<{
  order: Scalars['ID'];
  input: OrderReturnNotificationInput;
}>;


export type VendorOrderReturnFromStorefrontNotificationMutation = { __typename?: 'Mutation', vendorOrderReturnFromStorefrontNotification?: { __typename?: 'VendorOrderReturnFromStorefrontNotification', errors: Array<{ __typename?: 'OrderError', code: OrderErrorCode, field?: string | null, message?: string | null }>, order?: { __typename?: 'Order', id: string, events?: Array<{ __typename?: 'OrderEvent', id: string, amount?: number | null, date?: any | null, email?: string | null, emailType?: OrderEventsEmailsEnum | null, invoiceNumber?: string | null, message?: string | null, quantity?: number | null, type?: OrderEventsEnum | null, user?: { __typename?: 'User', id: string, email: string } | null } | null> | null } | null } | null };

export type PasswordChangeMutationVariables = Exact<{
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}>;


export type PasswordChangeMutation = { __typename?: 'Mutation', passwordChange?: { __typename?: 'PasswordChange', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }> } | null };

export type AccountUpdateMutationVariables = Exact<{
  input: AccountInput;
}>;


export type AccountUpdateMutation = { __typename?: 'Mutation', accountUpdate?: { __typename?: 'AccountUpdate', errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null } | null };

export type SetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword?: { __typename?: 'SetPassword', token?: string | null, errors: Array<{ __typename?: 'AccountError', code: AccountErrorCode, field?: string | null, message?: string | null }>, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null, accountErrors: Array<{ __typename?: 'AccountError', field?: string | null, message?: string | null, code: AccountErrorCode }> } | null };

export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationVariables = Exact<{
  user: UserInput;
}>;


export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation = { __typename?: 'Mutation', yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord?: { __typename?: 'YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord', ok?: boolean | null, status?: number | null } | null };

export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationVariables = Exact<{
  input: UserPointsInput;
}>;


export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation = { __typename?: 'Mutation', yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints?: { __typename?: 'YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints', ok?: boolean | null, status?: number | null } | null };

export type AddWishlistProductMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type AddWishlistProductMutation = { __typename?: 'Mutation', wishlistAddProduct?: { __typename?: 'WishlistAddProductMutation', wishlist?: Array<{ __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } } | null> | null, errors: Array<{ __typename?: 'Error', field?: string | null, message?: string | null }>, wishlistErrors: Array<{ __typename?: 'WishlistError', field?: string | null, message?: string | null, code: WishlistErrorCode }> } | null };

export type RemoveWishlistProductMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type RemoveWishlistProductMutation = { __typename?: 'Mutation', wishlistRemoveProduct?: { __typename?: 'WishlistRemoveProductMutation', wishlist?: Array<{ __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } } | null> | null, errors: Array<{ __typename?: 'Error', field?: string | null, message?: string | null }>, wishlistErrors: Array<{ __typename?: 'WishlistError', field?: string | null, message?: string | null, code: WishlistErrorCode }> } | null };

export type AddWishlistProductVariantMutationVariables = Exact<{
  variantId: Scalars['ID'];
}>;


export type AddWishlistProductVariantMutation = { __typename?: 'Mutation', wishlistAddVariant?: { __typename?: 'WishlistAddProductVariantMutation', wishlist?: Array<{ __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } } | null> | null, errors: Array<{ __typename?: 'Error', field?: string | null, message?: string | null }>, wishlistErrors: Array<{ __typename?: 'WishlistError', field?: string | null, message?: string | null, code: WishlistErrorCode }> } | null };

export type RemoveWishlistProductVariantMutationVariables = Exact<{
  variantId: Scalars['ID'];
}>;


export type RemoveWishlistProductVariantMutation = { __typename?: 'Mutation', wishlistRemoveVariant?: { __typename?: 'WishlistRemoveProductVariantMutation', wishlist?: Array<{ __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } } | null> | null, errors: Array<{ __typename?: 'Error', field?: string | null, message?: string | null }>, wishlistErrors: Array<{ __typename?: 'WishlistError', field?: string | null, message?: string | null, code: WishlistErrorCode }> } | null };

export type AttributesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AttributesQuery = { __typename?: 'Query', attributes?: { __typename?: 'AttributeCountableConnection', edges: Array<{ __typename?: 'AttributeCountableEdge', node: { __typename?: 'Attribute', id: string, name?: string | null, slug?: string | null, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, slug?: string | null } | null> | null } }> } | null };

export type BrandingQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandingQuery = { __typename?: 'Query', branding?: { __typename?: 'BrandingType', id: string, jsonContent: any, footerText: string, logoHeight?: number | null, logoWidth?: number | null, logo?: { __typename?: 'Image', url: string } | null, icon?: { __typename?: 'Image', url: string } | null, favicon?: { __typename?: 'Image', url: string } | null } | null };

export type CategoryListQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type CategoryListQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoryCountableConnection', edges: Array<{ __typename?: 'CategoryCountableEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type CategoryChildrenListQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type CategoryChildrenListQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id: string, children?: { __typename?: 'CategoryCountableConnection', edges: Array<{ __typename?: 'CategoryCountableEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null } | null };

export type CategoryAncestorsListQueryVariables = Exact<{
  id: Scalars['ID'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type CategoryAncestorsListQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id: string, ancestors?: { __typename?: 'CategoryCountableConnection', edges: Array<{ __typename?: 'CategoryCountableEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null } | null };

export type CategoryDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryDetailsQuery = { __typename?: 'Query', category?: { __typename?: 'Category', seoDescription?: string | null, seoTitle?: string | null, id: string, name: string, backgroundImage?: { __typename?: 'Image', url: string } | null, ancestors?: { __typename?: 'CategoryCountableConnection', edges: Array<{ __typename?: 'CategoryCountableEdge', node: { __typename?: 'Category', id: string, name: string } }> } | null } | null };

export type CheckoutDetailsQueryVariables = Exact<{
  token: Scalars['NauticalUUID'];
}>;


export type CheckoutDetailsQuery = { __typename?: 'Query', checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null };

export type UserCheckoutDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCheckoutDetailsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, checkout?: { __typename?: 'Checkout', token: any, id: string, email: string, sellerShippingMethods: any, isShippingRequired: boolean, discountName?: string | null, translatedDiscountName?: string | null, voucherCode?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, subtotalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, billingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, availableShippingMethods: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null>, availableShippingMethodsBySeller?: Array<{ __typename?: 'MultiSellerShippingMethod', seller?: number | null, value?: Array<{ __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null } | null> | null, applicableVolumeDiscounts?: { __typename?: 'Money', amount: number, currency: string } | null, applicableVolumeDiscountsBySeller?: Array<{ __typename?: 'SellerVolumeDiscount', seller?: number | null, volumeDiscount?: { __typename?: 'Money', currency: string, amount: number } | null } | null> | null, shippingMethod?: { __typename?: 'ShippingMethod', id: string, name: string, price?: { __typename?: 'Money', currency: string, amount: number } | null } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines?: Array<{ __typename?: 'CheckoutLine', id: string, quantity: number, seller?: string | null, totalPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, variant: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } } | null> | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, availablePaymentGateways: Array<{ __typename?: 'PaymentGateway', id: string, name: string, currencies: Array<string | null>, config: Array<{ __typename?: 'GatewayConfigLine', field: string, value?: string | null }> }> } | null } | null };

export type CheckoutProductVariantsQueryVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type CheckoutProductVariantsQuery = { __typename?: 'Query', productVariants?: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } }> } | null };

export type CollectionListQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<CollectionSortingInput>;
  filter?: InputMaybe<CollectionFilterInput>;
}>;


export type CollectionListQuery = { __typename?: 'Query', collections?: { __typename?: 'CollectionCountableConnection', edges: Array<{ __typename?: 'CollectionCountableEdge', node: { __typename?: 'Collection', id: string, name: string, slug: string, seoDescription?: string | null, seoTitle?: string | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type GetClientSecretQueryVariables = Exact<{
  gateway: Scalars['ID'];
  paymentInformation: StripeClientPaymentData;
}>;


export type GetClientSecretQuery = { __typename?: 'Query', getClientSecret?: any | null };

export type MainMenuSubItemFragment = { __typename?: 'MenuItem', id: string, name: string, url?: string | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null };

export type MainMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type MainMenuQuery = { __typename?: 'Query', shop: { __typename?: 'Shop', navigation?: { __typename?: 'Navigation', main?: { __typename?: 'Menu', id: string, items?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, url?: string | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', slug: string } | null, parent?: { __typename?: 'MenuItem', id: string } | null } | null> | null } | null } | null }, designerdata?: { __typename?: 'DesignerDataType', jsonContent: any, name: string } | null };

export type OrdersByUserQueryVariables = Exact<{
  perPage: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type OrdersByUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, orders?: { __typename?: 'OrderCountableConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'OrderCountableEdge', node: { __typename?: 'Order', id: string, token: string, number?: string | null, statusDisplay?: string | null, created: any, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, lines: Array<{ __typename?: 'OrderLine', id: string, variant?: { __typename?: 'ProductVariant', id: string, product: { __typename?: 'Product', name: string, id: string } } | null, thumbnail?: { __typename?: 'Image', alt?: string | null, url: string } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null } | null> } }> } | null } | null };

export type OrderByTokenQueryVariables = Exact<{
  token: Scalars['NauticalUUID'];
}>;


export type OrderByTokenQuery = { __typename?: 'Query', orderByToken?: { __typename?: 'Order', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: OrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'OrderLine', productName: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null };

export type UserOrderByTokenQueryVariables = Exact<{
  token: Scalars['NauticalUUID'];
}>;


export type UserOrderByTokenQuery = { __typename?: 'Query', orderByToken?: { __typename?: 'Order', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: OrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, invoices?: Array<{ __typename?: 'Invoice', id: string, number?: string | null, createdAt: any, url?: string | null, status: JobStatusEnum } | null> | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'OrderLine', productName: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null };

export type NauticalOrdersByUserQueryVariables = Exact<{
  perPage: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type NauticalOrdersByUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, nauticalOrders?: { __typename?: 'NauticalOrderCountableConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'NauticalOrderCountableEdge', node: { __typename?: 'NauticalOrder', id: string, token: string, number?: string | null, statusDisplay?: string | null, created: any, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, sellerFulfillments: Array<{ __typename?: 'Fulfillment', id: string, status: FulfillmentStatus, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, orderLine?: { __typename?: 'OrderLine', id: string, productName: string, productSku: string, variantName: string, quantity: number, quantityFulfilled: number } | null } | null> | null } | null>, lines: Array<{ __typename?: 'NauticalOrderLine', id: string, productName: string, productSku: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, product: { __typename?: 'Product', name: string, id: string } } | null, thumbnail?: { __typename?: 'Image', alt?: string | null, url: string } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null } | null> } }> } | null } | null };

export type NauticalOrderByTokenQueryVariables = Exact<{
  token: Scalars['NauticalUUID'];
}>;


export type NauticalOrderByTokenQuery = { __typename?: 'Query', nauticalOrderByToken?: { __typename?: 'NauticalOrder', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: NauticalOrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'NauticalOrderLine', productName: string, productSku: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, volumeDiscount?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, sellerFulfillments: Array<{ __typename?: 'Fulfillment', id: string, status: FulfillmentStatus, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, orderLine?: { __typename?: 'OrderLine', id: string, productName: string, productSku: string, variantName: string, quantity: number, quantityFulfilled: number } | null } | null> | null } | null> } | null };

export type UserNauticalOrderByTokenQueryVariables = Exact<{
  token: Scalars['NauticalUUID'];
}>;


export type UserNauticalOrderByTokenQuery = { __typename?: 'Query', nauticalOrderByToken?: { __typename?: 'NauticalOrder', userEmail?: string | null, paymentStatus?: PaymentChargeStatusEnum | null, paymentStatusDisplay?: string | null, status: NauticalOrderStatus, statusDisplay?: string | null, id: string, token: string, number?: string | null, discountName?: string | null, invoices?: Array<{ __typename?: 'Invoice', id: string, number?: string | null, createdAt: any, url?: string | null, status: JobStatusEnum } | null> | null, shippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, discount?: { __typename?: 'Money', currency: string, amount: number } | null, lines: Array<{ __typename?: 'NauticalOrderLine', productName: string, productSku: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, name: string, sku: string, quantityAvailable: number, isAvailable?: boolean | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }>, product: { __typename?: 'Product', id: string, name: string, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, productType: { __typename?: 'ProductType', id: string, isShippingRequired: boolean } } } | null, unitPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, totalPrice?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null>, subtotal?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, total?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, shippingPrice?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, volumeDiscount?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, sellerFulfillments: Array<{ __typename?: 'Fulfillment', id: string, status: FulfillmentStatus, relatedTo?: { __typename?: 'Fulfillment', id: string } | null, lines?: Array<{ __typename?: 'FulfillmentLine', id: string, quantity: number, orderLine?: { __typename?: 'OrderLine', id: string, productName: string, productSku: string, variantName: string, quantity: number, quantityFulfilled: number } | null } | null> | null } | null> } | null };

export type GetLoyaltyAndReferralsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoyaltyAndReferralsInfoQuery = { __typename?: 'Query', loyaltyAndReferralsInfo?: { __typename?: 'LoyaltyAndReferrals', awardLoyaltyPointsEnabled?: boolean | null, pointsForMakingPurchaseEnabled?: boolean | null, pointsUsedPerDollarSaved?: number | null, pointsGainedPerDollarSpent?: number | null } | null };

export type ProductPricingFieldFragment = { __typename?: 'Product', pricing?: { __typename?: 'ProductPricingInfo', onSale?: boolean | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null };

export type ProductListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  sortBy?: InputMaybe<ProductOrder>;
  filter?: InputMaybe<ProductFilterInput>;
}>;


export type ProductListQuery = { __typename?: 'Query', products?: { __typename?: 'ProductCountableConnection', edges: Array<{ __typename?: 'ProductCountableEdge', node: { __typename?: 'Product', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string } | null, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, pricing?: { __typename?: 'ProductPricingInfo', onSale?: boolean | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type ProductDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  countryCode?: InputMaybe<CountryCode>;
}>;


export type ProductDetailsQuery = { __typename?: 'Query', product?: { __typename?: 'Product', descriptionJson: any, seoDescription?: string | null, seoTitle?: string | null, isAvailable?: boolean | null, id: string, name: string, category?: { __typename?: 'Category', id: string, name: string, products?: { __typename?: 'ProductCountableConnection', edges: Array<{ __typename?: 'ProductCountableEdge', node: { __typename?: 'Product', id: string, name: string, category?: { __typename?: 'Category', id: string, name: string } | null, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, pricing?: { __typename?: 'ProductPricingInfo', onSale?: boolean | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null } }> } | null } | null, images?: Array<{ __typename?: 'ProductImage', id: string, url: string } | null> | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, slug?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, variants?: Array<{ __typename?: 'ProductVariant', id: string, sku: string, name: string, quantityAvailable: number, isAvailable?: boolean | null, images?: Array<{ __typename?: 'ProductImage', id: string, url: string, alt: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', onSale?: boolean | null, priceUndiscounted?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, slug?: string | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null, value?: string | null } | null> }> } | null> | null, thumbnail?: { __typename?: 'Image', url: string, alt?: string | null } | null, thumbnail2x?: { __typename?: 'Image', url: string } | null, pricing?: { __typename?: 'ProductPricingInfo', onSale?: boolean | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null } | null };

export type VariantsProductsQueryVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type VariantsProductsQuery = { __typename?: 'Query', productVariants?: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, product: { __typename?: 'Product', id: string, productType: { __typename?: 'ProductType', isShippingRequired: boolean } } } }> } | null };

export type GetProductRatingsAndReviewsQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductRatingsAndReviewsQuery = { __typename?: 'Query', productRatingsAndReviews?: { __typename?: 'ProductRatingsAndReviews', bottomline?: { __typename?: 'BottomLine', averageScore?: number | null, totalReview?: number | null } | null, reviews?: Array<{ __typename?: 'Review', content?: string | null, createdAt?: string | null, score?: number | null, title?: string | null, user?: { __typename?: 'Reviewer', displayName?: string | null } | null } | null> | null } | null };

export type GetShopQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShopQuery = { __typename?: 'Query', shop: { __typename?: 'Shop', displayGrossPrices: boolean, loginForPrice?: boolean | null, loginForProducts?: boolean | null, builderKey?: string | null, crispWebsiteId?: string | null, gaMeasurementId?: string | null, activePlugins?: Array<{ __typename?: 'Plugin', identifier: string, name: string, description: string, active: boolean } | null> | null, defaultCountry?: { __typename?: 'CountryDisplay', code: string, country: string } | null, countries: Array<{ __typename?: 'CountryDisplay', country: string, code: string }>, geolocalization?: { __typename?: 'Geolocalization', country?: { __typename?: 'CountryDisplay', code: string, country: string } | null } | null } };

export type GetProductsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products?: { __typename?: 'ProductCountableConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'ProductCountableEdge', node: { __typename?: 'Product', id: string, name: string } }> } | null };

export type GetCategoriesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoryCountableConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'CategoryCountableEdge', node: { __typename?: 'Category', id: string, name: string } }> } | null };

export type GetCollectionsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  perPage?: InputMaybe<Scalars['Int']>;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', collections?: { __typename?: 'CollectionCountableConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'CollectionCountableEdge', node: { __typename?: 'Collection', id: string, name: string } }> } | null };

export type ThemeFontQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ThemeFontQuery = { __typename?: 'Query', designerdata?: { __typename?: 'DesignerDataType', name: string, jsonContent: any } | null };

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, companyName: string, isStaff: boolean, defaultShippingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, defaultBillingAddress?: { __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null, addresses?: Array<{ __typename?: 'Address', id: string, firstName: string, lastName: string, companyName: string, streetAddress1: string, streetAddress2: string, city: string, postalCode: string, countryArea: string, phone: string, isDefaultBillingAddress?: boolean | null, isDefaultShippingAddress?: boolean | null, country: { __typename?: 'CountryDisplay', code: string, country: string } } | null> | null } | null };

export type GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetYotpoLoyaltyAndReferralsCustomerDetailsQuery = { __typename?: 'Query', customerLoyaltyAndReferralsDetails?: { __typename?: 'YotpoCustomer', firstName?: string | null, lastName?: string | null, email?: string | null, pointsBalance?: number | null, pointsEarned?: number | null } | null };

export type WishlistQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type WishlistQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, wishlist?: { __typename?: 'WishlistItemCountableConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'WishlistItemCountableEdge', node: { __typename?: 'WishlistItem', id: string, product: { __typename?: 'Product', id: string, name: string, brand?: string | null, description: string, descriptionJson: any, isAvailable?: boolean | null, entityId: string, path: string, countableImages?: { __typename?: 'ProductImageCountableConnection', edges: Array<{ __typename?: 'ProductImageCountableEdge', node: { __typename?: 'ProductImage', id: string, altText: string, urlOriginal: string } }> } | null, seller?: { __typename?: 'Seller', id: string, companyName: string, microsite?: { __typename?: 'Microsite', id: string, name: string } | null, logo?: { __typename?: 'Image', url: string } | null } | null, price?: { __typename?: 'Money', currency: string, amount: number } | null, pricing?: { __typename?: 'ProductPricingInfo', priceRange?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, priceRangeUndiscounted?: { __typename?: 'TaxedMoneyRange', start?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, stop?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }>, thumbnail?: { __typename?: 'Image', url: string } | null, defaultVariant?: { __typename?: 'ProductVariant', id: string, name: string, quantityAvailable: number } | null, variants?: Array<{ __typename?: 'ProductVariant', id: string, name: string, sku: string, images?: Array<{ __typename?: 'ProductImage', url: string } | null> | null, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null, priceUndiscounted?: { __typename?: 'TaxedMoney', currency: string, gross: { __typename?: 'Money', currency: string, amount: number }, net: { __typename?: 'Money', currency: string, amount: number }, tax: { __typename?: 'Money', amount: number, currency: string } } | null } | null, attributes: Array<{ __typename?: 'SelectedAttribute', attribute: { __typename?: 'Attribute', id: string, name?: string | null, valueRequired: boolean, values?: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> | null }, values: Array<{ __typename?: 'AttributeValue', id: string, name?: string | null } | null> }> } | null> | null }, variants: { __typename?: 'ProductVariantCountableConnection', edges: Array<{ __typename?: 'ProductVariantCountableEdge', node: { __typename?: 'ProductVariant', id: string, name: string, sku: string, pricing?: { __typename?: 'VariantPricingInfo', price?: { __typename?: 'TaxedMoney', gross: { __typename?: 'Money', amount: number, currency: string }, net: { __typename?: 'Money', amount: number, currency: string } } | null } | null } }> } } }> } | null } | null };

export const AddressFragmentDoc = gql`
    fragment Address on Address {
  id
  firstName
  lastName
  companyName
  streetAddress1
  streetAddress2
  city
  postalCode
  country {
    code
    country
  }
  countryArea
  phone
  isDefaultBillingAddress
  isDefaultShippingAddress
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  companyName
  isStaff
  defaultShippingAddress {
    ...Address
  }
  defaultBillingAddress {
    ...Address
  }
  addresses {
    ...Address
  }
}
    ${AddressFragmentDoc}`;
export const BaseCategoryFragmentDoc = gql`
    fragment BaseCategory on Category {
  id
  name
  slug
  seoDescription
  seoTitle
}
    `;
export const CategoryDetailsFragmentDoc = gql`
    fragment CategoryDetails on Category {
  ...BaseCategory
  backgroundImage {
    alt
    url
  }
  description
  descriptionJson
}
    ${BaseCategoryFragmentDoc}`;
export const PriceFragmentDoc = gql`
    fragment Price on TaxedMoney {
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
}
    `;
export const ShippingMethodFragmentDoc = gql`
    fragment ShippingMethod on ShippingMethod {
  id
  name
  price {
    currency
    amount
  }
}
    `;
export const ProductVariantFragmentDoc = gql`
    fragment ProductVariant on ProductVariant {
  id
  name
  sku
  quantityAvailable
  isAvailable
  pricing {
    onSale
    priceUndiscounted {
      ...Price
    }
    price {
      ...Price
    }
  }
  attributes {
    attribute {
      id
      name
    }
    values {
      id
      name
      value: name
    }
  }
  product {
    id
    name
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
    productType {
      id
      isShippingRequired
    }
  }
}
    ${PriceFragmentDoc}`;
export const CheckoutLineFragmentDoc = gql`
    fragment CheckoutLine on CheckoutLine {
  id
  quantity
  totalPrice {
    ...Price
  }
  variant {
    ...ProductVariant
  }
  seller
}
    ${PriceFragmentDoc}
${ProductVariantFragmentDoc}`;
export const PaymentGatewayFragmentDoc = gql`
    fragment PaymentGateway on PaymentGateway {
  id
  name
  config {
    field
    value
  }
  currencies
}
    `;
export const CheckoutFragmentDoc = gql`
    fragment Checkout on Checkout {
  token
  id
  totalPrice {
    ...Price
  }
  subtotalPrice {
    ...Price
  }
  billingAddress {
    ...Address
  }
  shippingAddress {
    ...Address
  }
  email
  availableShippingMethods {
    ...ShippingMethod
  }
  availableShippingMethodsBySeller {
    seller
    value {
      id
      name
      price {
        currency
        amount
      }
    }
  }
  applicableVolumeDiscounts {
    amount
    currency
  }
  applicableVolumeDiscountsBySeller {
    seller
    volumeDiscount {
      currency
      amount
    }
  }
  shippingMethod {
    ...ShippingMethod
  }
  sellerShippingMethods
  shippingPrice {
    ...Price
  }
  lines {
    ...CheckoutLine
  }
  isShippingRequired
  discount {
    currency
    amount
  }
  discountName
  translatedDiscountName
  voucherCode
  availablePaymentGateways {
    ...PaymentGateway
  }
}
    ${PriceFragmentDoc}
${AddressFragmentDoc}
${ShippingMethodFragmentDoc}
${CheckoutLineFragmentDoc}
${PaymentGatewayFragmentDoc}`;
export const BaseCollectionFragmentDoc = gql`
    fragment BaseCollection on Collection {
  id
  name
  slug
  seoDescription
  seoTitle
}
    `;
export const CollectionDetailsFragmentDoc = gql`
    fragment CollectionDetails on Collection {
  ...BaseCollection
  backgroundImage {
    alt
    url
  }
  description
  descriptionJson
}
    ${BaseCollectionFragmentDoc}`;
export const CheckoutErrorFragmentDoc = gql`
    fragment CheckoutError on CheckoutError {
  code
  field
  message
}
    `;
export const PaymentErrorFragmentDoc = gql`
    fragment PaymentError on PaymentError {
  code
  field
  message
}
    `;
export const AccountErrorFragmentDoc = gql`
    fragment AccountError on AccountError {
  code
  field
  message
}
    `;
export const AffiliateErrorFragmentDoc = gql`
    fragment AffiliateError on AffiliateError {
  code
  field
  message
}
    `;
export const InvoiceFragmentFragmentDoc = gql`
    fragment InvoiceFragment on Invoice {
  id
  number
  createdAt
  url
  status
}
    `;
export const OrderPriceFragmentDoc = gql`
    fragment OrderPrice on TaxedMoney {
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
}
    `;
export const OrderDetailFragmentDoc = gql`
    fragment OrderDetail on Order {
  userEmail
  paymentStatus
  paymentStatusDisplay
  status
  statusDisplay
  id
  token
  number
  shippingAddress {
    ...Address
  }
  discount {
    currency
    amount
  }
  discountName
  lines {
    productName
    quantity
    variant {
      ...ProductVariant
    }
    unitPrice {
      currency
      ...OrderPrice
    }
    totalPrice {
      currency
      ...OrderPrice
    }
  }
  subtotal {
    ...OrderPrice
  }
  total {
    ...OrderPrice
  }
  shippingPrice {
    ...OrderPrice
  }
}
    ${AddressFragmentDoc}
${ProductVariantFragmentDoc}
${OrderPriceFragmentDoc}`;
export const NauticalOrderDetailFragmentDoc = gql`
    fragment NauticalOrderDetail on NauticalOrder {
  userEmail
  paymentStatus
  paymentStatusDisplay
  status
  statusDisplay
  id
  token
  number
  shippingAddress {
    ...Address
  }
  discount {
    currency
    amount
  }
  discountName
  lines {
    productName
    productSku
    quantity
    variant {
      ...ProductVariant
    }
    unitPrice {
      currency
      ...OrderPrice
    }
    totalPrice {
      currency
      ...OrderPrice
    }
  }
  subtotal {
    ...OrderPrice
  }
  total {
    ...OrderPrice
  }
  shippingPrice {
    ...OrderPrice
  }
  volumeDiscount {
    ...OrderPrice
  }
  sellerFulfillments {
    id
    status
    relatedTo {
      id
    }
    lines {
      id
      quantity
      orderLine {
        id
        productName
        productSku
        variantName
        quantity
        quantityFulfilled
      }
    }
  }
}
    ${AddressFragmentDoc}
${ProductVariantFragmentDoc}
${OrderPriceFragmentDoc}`;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
}
    `;
export const PaymentFragmentDoc = gql`
    fragment Payment on Payment {
  id
  gateway
  token
  creditCard {
    brand
    firstDigits
    lastDigits
    expMonth
    expYear
  }
  total {
    amount
    currency
  }
}
    `;
export const BaseProductFragmentDoc = gql`
    fragment BaseProduct on Product {
  id
  name
  thumbnail {
    url
    alt
  }
  thumbnail2x: thumbnail(size: 540) {
    url
  }
}
    `;
export const SelectedAttributeFieldsFragmentDoc = gql`
    fragment SelectedAttributeFields on SelectedAttribute {
  attribute {
    id
    name
    slug
  }
  values {
    id
    name
  }
}
    `;
export const ProductVariantFieldsFragmentDoc = gql`
    fragment ProductVariantFields on ProductVariant {
  id
  sku
  name
  quantityAvailable(countryCode: $countryCode)
  isAvailable
  images {
    id
    url
    alt
  }
  pricing {
    onSale
    priceUndiscounted {
      ...Price
    }
    price {
      ...Price
    }
  }
  attributes {
    attribute {
      id
      name
      slug
    }
    values {
      id
      name
      value: name
    }
  }
}
    ${PriceFragmentDoc}`;
export const ProductInfoFragmentDoc = gql`
    fragment productInfo on Product {
  id
  name
  brand
  description
  descriptionJson
  entityId: id
  isAvailable
  seller {
    id
    companyName
    microsite {
      id
      name
    }
    logo {
      url
    }
  }
  price: minimalVariantPrice {
    currency
    amount
  }
  pricing {
    priceRange {
      start {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
      stop {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
    }
    priceRangeUndiscounted {
      start {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
      stop {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
    }
  }
  attributes {
    attribute {
      id
      name
      valueRequired
      values {
        id
        name
      }
    }
    values {
      id
      name
    }
  }
  thumbnail {
    url
  }
  defaultVariant {
    id
    name
    quantityAvailable
  }
  variants {
    id
    name
    sku
    images {
      url
    }
    pricing {
      price {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
      priceUndiscounted {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
        tax {
          amount
          currency
        }
      }
    }
    attributes {
      attribute {
        id
        name
        valueRequired
        values {
          id
          name
        }
      }
      values {
        id
        name
      }
    }
  }
  path: slug
}
    `;
export const WishlistItemFragmentDoc = gql`
    fragment WishlistItem on WishlistItem {
  id
  product {
    ...productInfo
    countableImages(first: 100) {
      edges {
        node {
          id
          altText: alt
          urlOriginal: url
        }
      }
    }
  }
  variants(first: 100) {
    edges {
      node {
        id
        name
        sku
        pricing {
          price {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
        }
      }
    }
  }
}
    ${ProductInfoFragmentDoc}`;
export const OrderErrorFragmentFragmentDoc = gql`
    fragment OrderErrorFragment on OrderError {
  code
  field
  message
}
    `;
export const OrderLineFragmentFragmentDoc = gql`
    fragment OrderLineFragment on OrderLine {
  id
  isShippingRequired
  variant {
    id
    product {
      id
      isAvailableForPurchase
      isPublished
      originLocation {
        id
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
          country
        }
        phone
      }
      destinationLocation {
        id
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
          country
        }
        phone
      }
      variants {
        id
        name
      }
    }
    quantityAvailable
  }
  productName
  variantName
  productSku
  quantity
  quantityFulfilled
  unitPrice {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
  thumbnail {
    url
  }
}
    `;
export const FulfillmentFragmentFragmentDoc = gql`
    fragment FulfillmentFragment on Fulfillment {
  id
  lines {
    id
    quantity
    orderLine {
      ...OrderLineFragment
    }
    returnReason
  }
  fulfillmentOrder
  relatedTo {
    id
  }
  status
  order {
    id
    seller {
      id
      companyName
    }
  }
  trackingNumber
  trackingUrl
  warehouse {
    id
    name
  }
}
    ${OrderLineFragmentFragmentDoc}`;
export const NauticalOrderEventFragmentFragmentDoc = gql`
    fragment NauticalOrderEventFragment on NauticalOrderEvent {
  id
  amount
  date
  email
  emailType
  invoiceNumber
  message
  quantity
  type
  user {
    id
    email
  }
}
    `;
export const OrderEventFragmentFragmentDoc = gql`
    fragment OrderEventFragment on OrderEvent {
  id
  amount
  date
  email
  emailType
  invoiceNumber
  message
  quantity
  type
  user {
    id
    email
  }
}
    `;
export const MainMenuSubItemFragmentDoc = gql`
    fragment MainMenuSubItem on MenuItem {
  id
  name
  category {
    id
    name
  }
  url
  collection {
    id
    name
  }
  page {
    slug
  }
  parent {
    id
  }
}
    `;
export const ProductPricingFieldFragmentDoc = gql`
    fragment ProductPricingField on Product {
  pricing {
    onSale
    priceRangeUndiscounted {
      start {
        ...Price
      }
      stop {
        ...Price
      }
    }
    priceRange {
      start {
        ...Price
      }
      stop {
        ...Price
      }
    }
  }
}
    ${PriceFragmentDoc}`;
export const SetCustomerDefaultAddressDocument = gql`
    mutation SetCustomerDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
  accountSetDefaultAddress(id: $id, type: $type) {
    errors: accountErrors {
      ...AccountError
    }
    user {
      ...User
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type SetCustomerDefaultAddressMutationFn = Apollo.MutationFunction<SetCustomerDefaultAddressMutation, SetCustomerDefaultAddressMutationVariables>;

/**
 * __useSetCustomerDefaultAddressMutation__
 *
 * To run a mutation, you first call `useSetCustomerDefaultAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCustomerDefaultAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCustomerDefaultAddressMutation, { data, loading, error }] = useSetCustomerDefaultAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSetCustomerDefaultAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetCustomerDefaultAddressMutation, SetCustomerDefaultAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetCustomerDefaultAddressMutation, SetCustomerDefaultAddressMutationVariables>(SetCustomerDefaultAddressDocument, options);
      }
export type SetCustomerDefaultAddressMutationHookResult = ReturnType<typeof useSetCustomerDefaultAddressMutation>;
export type SetCustomerDefaultAddressMutationResult = Apollo.MutationResult<SetCustomerDefaultAddressMutation>;
export type SetCustomerDefaultAddressMutationOptions = Apollo.BaseMutationOptions<SetCustomerDefaultAddressMutation, SetCustomerDefaultAddressMutationVariables>;
export const DeleteUserAddressDocument = gql`
    mutation DeleteUserAddress($addressId: ID!) {
  accountAddressDelete(id: $addressId) {
    errors: accountErrors {
      ...AccountError
    }
    user {
      ...User
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type DeleteUserAddressMutationFn = Apollo.MutationFunction<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>;

/**
 * __useDeleteUserAddressMutation__
 *
 * To run a mutation, you first call `useDeleteUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAddressMutation, { data, loading, error }] = useDeleteUserAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useDeleteUserAddressMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>(DeleteUserAddressDocument, options);
      }
export type DeleteUserAddressMutationHookResult = ReturnType<typeof useDeleteUserAddressMutation>;
export type DeleteUserAddressMutationResult = Apollo.MutationResult<DeleteUserAddressMutation>;
export type DeleteUserAddressMutationOptions = Apollo.BaseMutationOptions<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>;
export const CreateUserAddressDocument = gql`
    mutation CreateUserAddress($input: AddressInput!) {
  accountAddressCreate(input: $input) {
    errors: accountErrors {
      ...AccountError
    }
    user {
      ...User
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type CreateUserAddressMutationFn = Apollo.MutationFunction<CreateUserAddressMutation, CreateUserAddressMutationVariables>;

/**
 * __useCreateUserAddressMutation__
 *
 * To run a mutation, you first call `useCreateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserAddressMutation, { data, loading, error }] = useCreateUserAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserAddressMutation, CreateUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserAddressMutation, CreateUserAddressMutationVariables>(CreateUserAddressDocument, options);
      }
export type CreateUserAddressMutationHookResult = ReturnType<typeof useCreateUserAddressMutation>;
export type CreateUserAddressMutationResult = Apollo.MutationResult<CreateUserAddressMutation>;
export type CreateUserAddressMutationOptions = Apollo.BaseMutationOptions<CreateUserAddressMutation, CreateUserAddressMutationVariables>;
export const UpdateUserAddressDocument = gql`
    mutation UpdateUserAddress($input: AddressInput!, $id: ID!) {
  accountAddressUpdate(input: $input, id: $id) {
    errors: accountErrors {
      ...AccountError
    }
    user {
      ...User
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>(UpdateUserAddressDocument, options);
      }
export type UpdateUserAddressMutationHookResult = ReturnType<typeof useUpdateUserAddressMutation>;
export type UpdateUserAddressMutationResult = Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;
export const AffiliateCodeUseDocument = gql`
    mutation AffiliateCodeUse($code: String!) {
  affiliateCodeUse(code: $code) {
    affiliateCodes {
      id
      uses
      affiliate {
        id
        email
        firstName
        lastName
      }
      code
      channel {
        id
        channel
      }
    }
    errors: affiliateErrors {
      ...AffiliateError
    }
  }
}
    ${AffiliateErrorFragmentDoc}`;
export type AffiliateCodeUseMutationFn = Apollo.MutationFunction<AffiliateCodeUseMutation, AffiliateCodeUseMutationVariables>;

/**
 * __useAffiliateCodeUseMutation__
 *
 * To run a mutation, you first call `useAffiliateCodeUseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAffiliateCodeUseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [affiliateCodeUseMutation, { data, loading, error }] = useAffiliateCodeUseMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAffiliateCodeUseMutation(baseOptions?: Apollo.MutationHookOptions<AffiliateCodeUseMutation, AffiliateCodeUseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AffiliateCodeUseMutation, AffiliateCodeUseMutationVariables>(AffiliateCodeUseDocument, options);
      }
export type AffiliateCodeUseMutationHookResult = ReturnType<typeof useAffiliateCodeUseMutation>;
export type AffiliateCodeUseMutationResult = Apollo.MutationResult<AffiliateCodeUseMutation>;
export type AffiliateCodeUseMutationOptions = Apollo.BaseMutationOptions<AffiliateCodeUseMutation, AffiliateCodeUseMutationVariables>;
export const TokenAuthDocument = gql`
    mutation TokenAuth($email: String!, $password: String!) {
  tokenCreate(email: $email, password: $password) {
    csrfToken
    refreshToken
    token
    errors: accountErrors {
      ...AccountError
    }
    user {
      id
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation VerifyToken($token: String!) {
  tokenVerify(token: $token) {
    isValid
    payload
    user {
      id
    }
    errors: accountErrors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, options);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($csrfToken: String, $refreshToken: String) {
  tokenRefresh(csrfToken: $csrfToken, refreshToken: $refreshToken) {
    token
    user {
      id
    }
    errors: accountErrors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      csrfToken: // value for 'csrfToken'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const UpdateCheckoutLineDocument = gql`
    mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
  checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutFragmentDoc}
${CheckoutErrorFragmentDoc}`;
export type UpdateCheckoutLineMutationFn = Apollo.MutationFunction<UpdateCheckoutLineMutation, UpdateCheckoutLineMutationVariables>;

/**
 * __useUpdateCheckoutLineMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutLineMutation, { data, loading, error }] = useUpdateCheckoutLineMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      lines: // value for 'lines'
 *   },
 * });
 */
export function useUpdateCheckoutLineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutLineMutation, UpdateCheckoutLineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutLineMutation, UpdateCheckoutLineMutationVariables>(UpdateCheckoutLineDocument, options);
      }
export type UpdateCheckoutLineMutationHookResult = ReturnType<typeof useUpdateCheckoutLineMutation>;
export type UpdateCheckoutLineMutationResult = Apollo.MutationResult<UpdateCheckoutLineMutation>;
export type UpdateCheckoutLineMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutLineMutation, UpdateCheckoutLineMutationVariables>;
export const CreateCheckoutDocument = gql`
    mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
  checkoutCreate(input: $checkoutInput) {
    errors: checkoutErrors {
      ...CheckoutError
    }
    checkout {
      ...Checkout
    }
  }
}
    ${CheckoutErrorFragmentDoc}
${CheckoutFragmentDoc}`;
export type CreateCheckoutMutationFn = Apollo.MutationFunction<CreateCheckoutMutation, CreateCheckoutMutationVariables>;

/**
 * __useCreateCheckoutMutation__
 *
 * To run a mutation, you first call `useCreateCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckoutMutation, { data, loading, error }] = useCreateCheckoutMutation({
 *   variables: {
 *      checkoutInput: // value for 'checkoutInput'
 *   },
 * });
 */
export function useCreateCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckoutMutation, CreateCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckoutMutation, CreateCheckoutMutationVariables>(CreateCheckoutDocument, options);
      }
export type CreateCheckoutMutationHookResult = ReturnType<typeof useCreateCheckoutMutation>;
export type CreateCheckoutMutationResult = Apollo.MutationResult<CreateCheckoutMutation>;
export type CreateCheckoutMutationOptions = Apollo.BaseMutationOptions<CreateCheckoutMutation, CreateCheckoutMutationVariables>;
export const UpdateCheckoutBillingAddressWithEmailDocument = gql`
    mutation UpdateCheckoutBillingAddressWithEmail($checkoutId: ID!, $billingAddress: AddressInput!, $email: String!) {
  checkoutBillingAddressUpdate(
    checkoutId: $checkoutId
    billingAddress: $billingAddress
  ) {
    errors: checkoutErrors {
      ...CheckoutError
    }
    checkout {
      ...Checkout
    }
  }
  checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      code
      field
      message
    }
  }
}
    ${CheckoutErrorFragmentDoc}
${CheckoutFragmentDoc}`;
export type UpdateCheckoutBillingAddressWithEmailMutationFn = Apollo.MutationFunction<UpdateCheckoutBillingAddressWithEmailMutation, UpdateCheckoutBillingAddressWithEmailMutationVariables>;

/**
 * __useUpdateCheckoutBillingAddressWithEmailMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutBillingAddressWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutBillingAddressWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutBillingAddressWithEmailMutation, { data, loading, error }] = useUpdateCheckoutBillingAddressWithEmailMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      billingAddress: // value for 'billingAddress'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateCheckoutBillingAddressWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutBillingAddressWithEmailMutation, UpdateCheckoutBillingAddressWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutBillingAddressWithEmailMutation, UpdateCheckoutBillingAddressWithEmailMutationVariables>(UpdateCheckoutBillingAddressWithEmailDocument, options);
      }
export type UpdateCheckoutBillingAddressWithEmailMutationHookResult = ReturnType<typeof useUpdateCheckoutBillingAddressWithEmailMutation>;
export type UpdateCheckoutBillingAddressWithEmailMutationResult = Apollo.MutationResult<UpdateCheckoutBillingAddressWithEmailMutation>;
export type UpdateCheckoutBillingAddressWithEmailMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutBillingAddressWithEmailMutation, UpdateCheckoutBillingAddressWithEmailMutationVariables>;
export const UpdateCheckoutBillingAddressDocument = gql`
    mutation UpdateCheckoutBillingAddress($checkoutId: ID!, $billingAddress: AddressInput!) {
  checkoutBillingAddressUpdate(
    checkoutId: $checkoutId
    billingAddress: $billingAddress
  ) {
    errors: checkoutErrors {
      ...CheckoutError
    }
    checkout {
      ...Checkout
    }
  }
}
    ${CheckoutErrorFragmentDoc}
${CheckoutFragmentDoc}`;
export type UpdateCheckoutBillingAddressMutationFn = Apollo.MutationFunction<UpdateCheckoutBillingAddressMutation, UpdateCheckoutBillingAddressMutationVariables>;

/**
 * __useUpdateCheckoutBillingAddressMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutBillingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutBillingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutBillingAddressMutation, { data, loading, error }] = useUpdateCheckoutBillingAddressMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      billingAddress: // value for 'billingAddress'
 *   },
 * });
 */
export function useUpdateCheckoutBillingAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutBillingAddressMutation, UpdateCheckoutBillingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutBillingAddressMutation, UpdateCheckoutBillingAddressMutationVariables>(UpdateCheckoutBillingAddressDocument, options);
      }
export type UpdateCheckoutBillingAddressMutationHookResult = ReturnType<typeof useUpdateCheckoutBillingAddressMutation>;
export type UpdateCheckoutBillingAddressMutationResult = Apollo.MutationResult<UpdateCheckoutBillingAddressMutation>;
export type UpdateCheckoutBillingAddressMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutBillingAddressMutation, UpdateCheckoutBillingAddressMutationVariables>;
export const UpdateCheckoutShippingAddressDocument = gql`
    mutation UpdateCheckoutShippingAddress($checkoutId: ID!, $shippingAddress: AddressInput!, $email: String!) {
  checkoutShippingAddressUpdate(
    checkoutId: $checkoutId
    shippingAddress: $shippingAddress
  ) {
    errors: checkoutErrors {
      ...CheckoutError
    }
    checkout {
      ...Checkout
    }
  }
  checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutErrorFragmentDoc}
${CheckoutFragmentDoc}`;
export type UpdateCheckoutShippingAddressMutationFn = Apollo.MutationFunction<UpdateCheckoutShippingAddressMutation, UpdateCheckoutShippingAddressMutationVariables>;

/**
 * __useUpdateCheckoutShippingAddressMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutShippingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutShippingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutShippingAddressMutation, { data, loading, error }] = useUpdateCheckoutShippingAddressMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      shippingAddress: // value for 'shippingAddress'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateCheckoutShippingAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutShippingAddressMutation, UpdateCheckoutShippingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutShippingAddressMutation, UpdateCheckoutShippingAddressMutationVariables>(UpdateCheckoutShippingAddressDocument, options);
      }
export type UpdateCheckoutShippingAddressMutationHookResult = ReturnType<typeof useUpdateCheckoutShippingAddressMutation>;
export type UpdateCheckoutShippingAddressMutationResult = Apollo.MutationResult<UpdateCheckoutShippingAddressMutation>;
export type UpdateCheckoutShippingAddressMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutShippingAddressMutation, UpdateCheckoutShippingAddressMutationVariables>;
export const UpdateCheckoutShippingMethodDocument = gql`
    mutation UpdateCheckoutShippingMethod($checkoutId: ID!, $shippingMethodId: ID!) {
  checkoutShippingMethodUpdate(
    checkoutId: $checkoutId
    shippingMethodId: $shippingMethodId
  ) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutFragmentDoc}
${CheckoutErrorFragmentDoc}`;
export type UpdateCheckoutShippingMethodMutationFn = Apollo.MutationFunction<UpdateCheckoutShippingMethodMutation, UpdateCheckoutShippingMethodMutationVariables>;

/**
 * __useUpdateCheckoutShippingMethodMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutShippingMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutShippingMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutShippingMethodMutation, { data, loading, error }] = useUpdateCheckoutShippingMethodMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      shippingMethodId: // value for 'shippingMethodId'
 *   },
 * });
 */
export function useUpdateCheckoutShippingMethodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutShippingMethodMutation, UpdateCheckoutShippingMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutShippingMethodMutation, UpdateCheckoutShippingMethodMutationVariables>(UpdateCheckoutShippingMethodDocument, options);
      }
export type UpdateCheckoutShippingMethodMutationHookResult = ReturnType<typeof useUpdateCheckoutShippingMethodMutation>;
export type UpdateCheckoutShippingMethodMutationResult = Apollo.MutationResult<UpdateCheckoutShippingMethodMutation>;
export type UpdateCheckoutShippingMethodMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutShippingMethodMutation, UpdateCheckoutShippingMethodMutationVariables>;
export const UpdateCheckoutSellerShippingMethodsDocument = gql`
    mutation UpdateCheckoutSellerShippingMethods($checkoutId: ID!, $seller: ID!, $shippingMethodSelection: ID!) {
  checkoutSellerShippingMethodsUpdate(
    checkoutId: $checkoutId
    seller: $seller
    shippingMethodSelection: $shippingMethodSelection
  ) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutFragmentDoc}
${CheckoutErrorFragmentDoc}`;
export type UpdateCheckoutSellerShippingMethodsMutationFn = Apollo.MutationFunction<UpdateCheckoutSellerShippingMethodsMutation, UpdateCheckoutSellerShippingMethodsMutationVariables>;

/**
 * __useUpdateCheckoutSellerShippingMethodsMutation__
 *
 * To run a mutation, you first call `useUpdateCheckoutSellerShippingMethodsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckoutSellerShippingMethodsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckoutSellerShippingMethodsMutation, { data, loading, error }] = useUpdateCheckoutSellerShippingMethodsMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      seller: // value for 'seller'
 *      shippingMethodSelection: // value for 'shippingMethodSelection'
 *   },
 * });
 */
export function useUpdateCheckoutSellerShippingMethodsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckoutSellerShippingMethodsMutation, UpdateCheckoutSellerShippingMethodsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckoutSellerShippingMethodsMutation, UpdateCheckoutSellerShippingMethodsMutationVariables>(UpdateCheckoutSellerShippingMethodsDocument, options);
      }
export type UpdateCheckoutSellerShippingMethodsMutationHookResult = ReturnType<typeof useUpdateCheckoutSellerShippingMethodsMutation>;
export type UpdateCheckoutSellerShippingMethodsMutationResult = Apollo.MutationResult<UpdateCheckoutSellerShippingMethodsMutation>;
export type UpdateCheckoutSellerShippingMethodsMutationOptions = Apollo.BaseMutationOptions<UpdateCheckoutSellerShippingMethodsMutation, UpdateCheckoutSellerShippingMethodsMutationVariables>;
export const AddCheckoutPromoCodeDocument = gql`
    mutation AddCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
  checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutFragmentDoc}
${CheckoutErrorFragmentDoc}`;
export type AddCheckoutPromoCodeMutationFn = Apollo.MutationFunction<AddCheckoutPromoCodeMutation, AddCheckoutPromoCodeMutationVariables>;

/**
 * __useAddCheckoutPromoCodeMutation__
 *
 * To run a mutation, you first call `useAddCheckoutPromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCheckoutPromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCheckoutPromoCodeMutation, { data, loading, error }] = useAddCheckoutPromoCodeMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      promoCode: // value for 'promoCode'
 *   },
 * });
 */
export function useAddCheckoutPromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<AddCheckoutPromoCodeMutation, AddCheckoutPromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCheckoutPromoCodeMutation, AddCheckoutPromoCodeMutationVariables>(AddCheckoutPromoCodeDocument, options);
      }
export type AddCheckoutPromoCodeMutationHookResult = ReturnType<typeof useAddCheckoutPromoCodeMutation>;
export type AddCheckoutPromoCodeMutationResult = Apollo.MutationResult<AddCheckoutPromoCodeMutation>;
export type AddCheckoutPromoCodeMutationOptions = Apollo.BaseMutationOptions<AddCheckoutPromoCodeMutation, AddCheckoutPromoCodeMutationVariables>;
export const RemoveCheckoutPromoCodeDocument = gql`
    mutation RemoveCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
  checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
    checkout {
      ...Checkout
    }
    errors: checkoutErrors {
      ...CheckoutError
    }
  }
}
    ${CheckoutFragmentDoc}
${CheckoutErrorFragmentDoc}`;
export type RemoveCheckoutPromoCodeMutationFn = Apollo.MutationFunction<RemoveCheckoutPromoCodeMutation, RemoveCheckoutPromoCodeMutationVariables>;

/**
 * __useRemoveCheckoutPromoCodeMutation__
 *
 * To run a mutation, you first call `useRemoveCheckoutPromoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCheckoutPromoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCheckoutPromoCodeMutation, { data, loading, error }] = useRemoveCheckoutPromoCodeMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      promoCode: // value for 'promoCode'
 *   },
 * });
 */
export function useRemoveCheckoutPromoCodeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCheckoutPromoCodeMutation, RemoveCheckoutPromoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCheckoutPromoCodeMutation, RemoveCheckoutPromoCodeMutationVariables>(RemoveCheckoutPromoCodeDocument, options);
      }
export type RemoveCheckoutPromoCodeMutationHookResult = ReturnType<typeof useRemoveCheckoutPromoCodeMutation>;
export type RemoveCheckoutPromoCodeMutationResult = Apollo.MutationResult<RemoveCheckoutPromoCodeMutation>;
export type RemoveCheckoutPromoCodeMutationOptions = Apollo.BaseMutationOptions<RemoveCheckoutPromoCodeMutation, RemoveCheckoutPromoCodeMutationVariables>;
export const CreateCheckoutPaymentDocument = gql`
    mutation CreateCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {
  checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {
    checkout {
      ...Checkout
    }
    payment {
      ...Payment
    }
    errors: paymentErrors {
      ...PaymentError
    }
  }
}
    ${CheckoutFragmentDoc}
${PaymentFragmentDoc}
${PaymentErrorFragmentDoc}`;
export type CreateCheckoutPaymentMutationFn = Apollo.MutationFunction<CreateCheckoutPaymentMutation, CreateCheckoutPaymentMutationVariables>;

/**
 * __useCreateCheckoutPaymentMutation__
 *
 * To run a mutation, you first call `useCreateCheckoutPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckoutPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckoutPaymentMutation, { data, loading, error }] = useCreateCheckoutPaymentMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      paymentInput: // value for 'paymentInput'
 *   },
 * });
 */
export function useCreateCheckoutPaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckoutPaymentMutation, CreateCheckoutPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckoutPaymentMutation, CreateCheckoutPaymentMutationVariables>(CreateCheckoutPaymentDocument, options);
      }
export type CreateCheckoutPaymentMutationHookResult = ReturnType<typeof useCreateCheckoutPaymentMutation>;
export type CreateCheckoutPaymentMutationResult = Apollo.MutationResult<CreateCheckoutPaymentMutation>;
export type CreateCheckoutPaymentMutationOptions = Apollo.BaseMutationOptions<CreateCheckoutPaymentMutation, CreateCheckoutPaymentMutationVariables>;
export const CompleteCheckoutDocument = gql`
    mutation CompleteCheckout($checkoutId: ID!, $paymentData: JSONString, $redirectUrl: String, $storeSource: Boolean, $volumeDiscount: Float!, $volumeDiscountsBySeller: [SellerVolumeDiscountInput]!, $affiliate: ID, $microsite: ID) {
  checkoutComplete(
    checkoutId: $checkoutId
    paymentData: $paymentData
    redirectUrl: $redirectUrl
    storeSource: $storeSource
    volumeDiscount: $volumeDiscount
    volumeDiscountsBySeller: $volumeDiscountsBySeller
    affiliate: $affiliate
    microsite: $microsite
  ) {
    errors: checkoutErrors {
      ...CheckoutError
    }
    order {
      ...NauticalOrderDetail
    }
    confirmationNeeded
    confirmationData
  }
}
    ${CheckoutErrorFragmentDoc}
${NauticalOrderDetailFragmentDoc}`;
export type CompleteCheckoutMutationFn = Apollo.MutationFunction<CompleteCheckoutMutation, CompleteCheckoutMutationVariables>;

/**
 * __useCompleteCheckoutMutation__
 *
 * To run a mutation, you first call `useCompleteCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeCheckoutMutation, { data, loading, error }] = useCompleteCheckoutMutation({
 *   variables: {
 *      checkoutId: // value for 'checkoutId'
 *      paymentData: // value for 'paymentData'
 *      redirectUrl: // value for 'redirectUrl'
 *      storeSource: // value for 'storeSource'
 *      volumeDiscount: // value for 'volumeDiscount'
 *      volumeDiscountsBySeller: // value for 'volumeDiscountsBySeller'
 *      affiliate: // value for 'affiliate'
 *      microsite: // value for 'microsite'
 *   },
 * });
 */
export function useCompleteCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CompleteCheckoutMutation, CompleteCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteCheckoutMutation, CompleteCheckoutMutationVariables>(CompleteCheckoutDocument, options);
      }
export type CompleteCheckoutMutationHookResult = ReturnType<typeof useCompleteCheckoutMutation>;
export type CompleteCheckoutMutationResult = Apollo.MutationResult<CompleteCheckoutMutation>;
export type CompleteCheckoutMutationOptions = Apollo.BaseMutationOptions<CompleteCheckoutMutation, CompleteCheckoutMutationVariables>;
export const BulkFulfillmentReturnDocument = gql`
    mutation BulkFulfillmentReturn($input: [BulkFulfillmentReturnInput]) {
  bulkFulfillmentReturn(input: $input) {
    errors: orderErrors {
      ...OrderErrorFragment
    }
    fulfillments {
      ...FulfillmentFragment
    }
  }
}
    ${OrderErrorFragmentFragmentDoc}
${FulfillmentFragmentFragmentDoc}`;
export type BulkFulfillmentReturnMutationFn = Apollo.MutationFunction<BulkFulfillmentReturnMutation, BulkFulfillmentReturnMutationVariables>;

/**
 * __useBulkFulfillmentReturnMutation__
 *
 * To run a mutation, you first call `useBulkFulfillmentReturnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkFulfillmentReturnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkFulfillmentReturnMutation, { data, loading, error }] = useBulkFulfillmentReturnMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkFulfillmentReturnMutation(baseOptions?: Apollo.MutationHookOptions<BulkFulfillmentReturnMutation, BulkFulfillmentReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkFulfillmentReturnMutation, BulkFulfillmentReturnMutationVariables>(BulkFulfillmentReturnDocument, options);
      }
export type BulkFulfillmentReturnMutationHookResult = ReturnType<typeof useBulkFulfillmentReturnMutation>;
export type BulkFulfillmentReturnMutationResult = Apollo.MutationResult<BulkFulfillmentReturnMutation>;
export type BulkFulfillmentReturnMutationOptions = Apollo.BaseMutationOptions<BulkFulfillmentReturnMutation, BulkFulfillmentReturnMutationVariables>;
export const NauticalOrderReturnFromStorefrontNotificationDocument = gql`
    mutation NauticalOrderReturnFromStorefrontNotification($order: ID!, $input: OrderReturnNotificationInput!) {
  nauticalOrderReturnFromStorefrontNotification(order: $order, input: $input) {
    errors: orderErrors {
      ...OrderErrorFragment
    }
    order {
      id
      events {
        ...NauticalOrderEventFragment
      }
    }
  }
}
    ${OrderErrorFragmentFragmentDoc}
${NauticalOrderEventFragmentFragmentDoc}`;
export type NauticalOrderReturnFromStorefrontNotificationMutationFn = Apollo.MutationFunction<NauticalOrderReturnFromStorefrontNotificationMutation, NauticalOrderReturnFromStorefrontNotificationMutationVariables>;

/**
 * __useNauticalOrderReturnFromStorefrontNotificationMutation__
 *
 * To run a mutation, you first call `useNauticalOrderReturnFromStorefrontNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNauticalOrderReturnFromStorefrontNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nauticalOrderReturnFromStorefrontNotificationMutation, { data, loading, error }] = useNauticalOrderReturnFromStorefrontNotificationMutation({
 *   variables: {
 *      order: // value for 'order'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNauticalOrderReturnFromStorefrontNotificationMutation(baseOptions?: Apollo.MutationHookOptions<NauticalOrderReturnFromStorefrontNotificationMutation, NauticalOrderReturnFromStorefrontNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NauticalOrderReturnFromStorefrontNotificationMutation, NauticalOrderReturnFromStorefrontNotificationMutationVariables>(NauticalOrderReturnFromStorefrontNotificationDocument, options);
      }
export type NauticalOrderReturnFromStorefrontNotificationMutationHookResult = ReturnType<typeof useNauticalOrderReturnFromStorefrontNotificationMutation>;
export type NauticalOrderReturnFromStorefrontNotificationMutationResult = Apollo.MutationResult<NauticalOrderReturnFromStorefrontNotificationMutation>;
export type NauticalOrderReturnFromStorefrontNotificationMutationOptions = Apollo.BaseMutationOptions<NauticalOrderReturnFromStorefrontNotificationMutation, NauticalOrderReturnFromStorefrontNotificationMutationVariables>;
export const VendorOrderReturnFromStorefrontNotificationDocument = gql`
    mutation VendorOrderReturnFromStorefrontNotification($order: ID!, $input: OrderReturnNotificationInput!) {
  vendorOrderReturnFromStorefrontNotification(order: $order, input: $input) {
    errors: orderErrors {
      ...OrderErrorFragment
    }
    order {
      id
      events {
        ...OrderEventFragment
      }
    }
  }
}
    ${OrderErrorFragmentFragmentDoc}
${OrderEventFragmentFragmentDoc}`;
export type VendorOrderReturnFromStorefrontNotificationMutationFn = Apollo.MutationFunction<VendorOrderReturnFromStorefrontNotificationMutation, VendorOrderReturnFromStorefrontNotificationMutationVariables>;

/**
 * __useVendorOrderReturnFromStorefrontNotificationMutation__
 *
 * To run a mutation, you first call `useVendorOrderReturnFromStorefrontNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVendorOrderReturnFromStorefrontNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vendorOrderReturnFromStorefrontNotificationMutation, { data, loading, error }] = useVendorOrderReturnFromStorefrontNotificationMutation({
 *   variables: {
 *      order: // value for 'order'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVendorOrderReturnFromStorefrontNotificationMutation(baseOptions?: Apollo.MutationHookOptions<VendorOrderReturnFromStorefrontNotificationMutation, VendorOrderReturnFromStorefrontNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VendorOrderReturnFromStorefrontNotificationMutation, VendorOrderReturnFromStorefrontNotificationMutationVariables>(VendorOrderReturnFromStorefrontNotificationDocument, options);
      }
export type VendorOrderReturnFromStorefrontNotificationMutationHookResult = ReturnType<typeof useVendorOrderReturnFromStorefrontNotificationMutation>;
export type VendorOrderReturnFromStorefrontNotificationMutationResult = Apollo.MutationResult<VendorOrderReturnFromStorefrontNotificationMutation>;
export type VendorOrderReturnFromStorefrontNotificationMutationOptions = Apollo.BaseMutationOptions<VendorOrderReturnFromStorefrontNotificationMutation, VendorOrderReturnFromStorefrontNotificationMutationVariables>;
export const PasswordChangeDocument = gql`
    mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
  passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
    errors: accountErrors {
      ...AccountError
    }
  }
}
    ${AccountErrorFragmentDoc}`;
export type PasswordChangeMutationFn = Apollo.MutationFunction<PasswordChangeMutation, PasswordChangeMutationVariables>;

/**
 * __usePasswordChangeMutation__
 *
 * To run a mutation, you first call `usePasswordChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordChangeMutation, { data, loading, error }] = usePasswordChangeMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function usePasswordChangeMutation(baseOptions?: Apollo.MutationHookOptions<PasswordChangeMutation, PasswordChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasswordChangeMutation, PasswordChangeMutationVariables>(PasswordChangeDocument, options);
      }
export type PasswordChangeMutationHookResult = ReturnType<typeof usePasswordChangeMutation>;
export type PasswordChangeMutationResult = Apollo.MutationResult<PasswordChangeMutation>;
export type PasswordChangeMutationOptions = Apollo.BaseMutationOptions<PasswordChangeMutation, PasswordChangeMutationVariables>;
export const AccountUpdateDocument = gql`
    mutation AccountUpdate($input: AccountInput!) {
  accountUpdate(input: $input) {
    errors: accountErrors {
      ...AccountError
    }
    user {
      ...User
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type AccountUpdateMutationFn = Apollo.MutationFunction<AccountUpdateMutation, AccountUpdateMutationVariables>;

/**
 * __useAccountUpdateMutation__
 *
 * To run a mutation, you first call `useAccountUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountUpdateMutation, { data, loading, error }] = useAccountUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AccountUpdateMutation, AccountUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountUpdateMutation, AccountUpdateMutationVariables>(AccountUpdateDocument, options);
      }
export type AccountUpdateMutationHookResult = ReturnType<typeof useAccountUpdateMutation>;
export type AccountUpdateMutationResult = Apollo.MutationResult<AccountUpdateMutation>;
export type AccountUpdateMutationOptions = Apollo.BaseMutationOptions<AccountUpdateMutation, AccountUpdateMutationVariables>;
export const SetPasswordDocument = gql`
    mutation SetPassword($token: String!, $email: String!, $password: String!) {
  setPassword(token: $token, email: $email, password: $password) {
    errors: accountErrors {
      ...AccountError
    }
    token
    user {
      ...User
    }
    accountErrors {
      field
      message
      code
    }
  }
}
    ${AccountErrorFragmentDoc}
${UserFragmentDoc}`;
export type SetPasswordMutationFn = Apollo.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
export const YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsDocument = gql`
    mutation YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecords($user: UserInput!) {
  yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord(user: $user) {
    ok
    status
  }
}
    `;
export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationFn = Apollo.MutationFunction<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation, YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationVariables>;

/**
 * __useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation__
 *
 * To run a mutation, you first call `useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation, { data, loading, error }] = useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation(baseOptions?: Apollo.MutationHookOptions<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation, YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation, YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationVariables>(YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsDocument, options);
      }
export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationHookResult = ReturnType<typeof useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation>;
export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationResult = Apollo.MutationResult<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation>;
export type YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationOptions = Apollo.BaseMutationOptions<YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutation, YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecordsMutationVariables>;
export const YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsDocument = gql`
    mutation YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints($input: UserPointsInput!) {
  yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints(input: $input) {
    ok
    status
  }
}
    `;
export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationFn = Apollo.MutationFunction<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation, YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationVariables>;

/**
 * __useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation__
 *
 * To run a mutation, you first call `useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation, { data, loading, error }] = useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation(baseOptions?: Apollo.MutationHookOptions<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation, YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation, YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationVariables>(YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsDocument, options);
      }
export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationHookResult = ReturnType<typeof useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation>;
export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationResult = Apollo.MutationResult<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation>;
export type YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationOptions = Apollo.BaseMutationOptions<YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutation, YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPointsMutationVariables>;
export const AddWishlistProductDocument = gql`
    mutation AddWishlistProduct($productId: ID!) {
  wishlistAddProduct(productId: $productId) {
    wishlist {
      ...WishlistItem
    }
    errors {
      field
      message
    }
    wishlistErrors {
      field
      message
      code
    }
  }
}
    ${WishlistItemFragmentDoc}`;
export type AddWishlistProductMutationFn = Apollo.MutationFunction<AddWishlistProductMutation, AddWishlistProductMutationVariables>;

/**
 * __useAddWishlistProductMutation__
 *
 * To run a mutation, you first call `useAddWishlistProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWishlistProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWishlistProductMutation, { data, loading, error }] = useAddWishlistProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddWishlistProductMutation(baseOptions?: Apollo.MutationHookOptions<AddWishlistProductMutation, AddWishlistProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWishlistProductMutation, AddWishlistProductMutationVariables>(AddWishlistProductDocument, options);
      }
export type AddWishlistProductMutationHookResult = ReturnType<typeof useAddWishlistProductMutation>;
export type AddWishlistProductMutationResult = Apollo.MutationResult<AddWishlistProductMutation>;
export type AddWishlistProductMutationOptions = Apollo.BaseMutationOptions<AddWishlistProductMutation, AddWishlistProductMutationVariables>;
export const RemoveWishlistProductDocument = gql`
    mutation RemoveWishlistProduct($productId: ID!) {
  wishlistRemoveProduct(productId: $productId) {
    wishlist {
      ...WishlistItem
    }
    errors {
      field
      message
    }
    wishlistErrors {
      field
      message
      code
    }
  }
}
    ${WishlistItemFragmentDoc}`;
export type RemoveWishlistProductMutationFn = Apollo.MutationFunction<RemoveWishlistProductMutation, RemoveWishlistProductMutationVariables>;

/**
 * __useRemoveWishlistProductMutation__
 *
 * To run a mutation, you first call `useRemoveWishlistProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWishlistProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWishlistProductMutation, { data, loading, error }] = useRemoveWishlistProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveWishlistProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveWishlistProductMutation, RemoveWishlistProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveWishlistProductMutation, RemoveWishlistProductMutationVariables>(RemoveWishlistProductDocument, options);
      }
export type RemoveWishlistProductMutationHookResult = ReturnType<typeof useRemoveWishlistProductMutation>;
export type RemoveWishlistProductMutationResult = Apollo.MutationResult<RemoveWishlistProductMutation>;
export type RemoveWishlistProductMutationOptions = Apollo.BaseMutationOptions<RemoveWishlistProductMutation, RemoveWishlistProductMutationVariables>;
export const AddWishlistProductVariantDocument = gql`
    mutation AddWishlistProductVariant($variantId: ID!) {
  wishlistAddVariant(variantId: $variantId) {
    wishlist {
      ...WishlistItem
    }
    errors {
      field
      message
    }
    wishlistErrors {
      field
      message
      code
    }
  }
}
    ${WishlistItemFragmentDoc}`;
export type AddWishlistProductVariantMutationFn = Apollo.MutationFunction<AddWishlistProductVariantMutation, AddWishlistProductVariantMutationVariables>;

/**
 * __useAddWishlistProductVariantMutation__
 *
 * To run a mutation, you first call `useAddWishlistProductVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWishlistProductVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWishlistProductVariantMutation, { data, loading, error }] = useAddWishlistProductVariantMutation({
 *   variables: {
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useAddWishlistProductVariantMutation(baseOptions?: Apollo.MutationHookOptions<AddWishlistProductVariantMutation, AddWishlistProductVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWishlistProductVariantMutation, AddWishlistProductVariantMutationVariables>(AddWishlistProductVariantDocument, options);
      }
export type AddWishlistProductVariantMutationHookResult = ReturnType<typeof useAddWishlistProductVariantMutation>;
export type AddWishlistProductVariantMutationResult = Apollo.MutationResult<AddWishlistProductVariantMutation>;
export type AddWishlistProductVariantMutationOptions = Apollo.BaseMutationOptions<AddWishlistProductVariantMutation, AddWishlistProductVariantMutationVariables>;
export const RemoveWishlistProductVariantDocument = gql`
    mutation RemoveWishlistProductVariant($variantId: ID!) {
  wishlistRemoveVariant(variantId: $variantId) {
    wishlist {
      ...WishlistItem
    }
    errors {
      field
      message
    }
    wishlistErrors {
      field
      message
      code
    }
  }
}
    ${WishlistItemFragmentDoc}`;
export type RemoveWishlistProductVariantMutationFn = Apollo.MutationFunction<RemoveWishlistProductVariantMutation, RemoveWishlistProductVariantMutationVariables>;

/**
 * __useRemoveWishlistProductVariantMutation__
 *
 * To run a mutation, you first call `useRemoveWishlistProductVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWishlistProductVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWishlistProductVariantMutation, { data, loading, error }] = useRemoveWishlistProductVariantMutation({
 *   variables: {
 *      variantId: // value for 'variantId'
 *   },
 * });
 */
export function useRemoveWishlistProductVariantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveWishlistProductVariantMutation, RemoveWishlistProductVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveWishlistProductVariantMutation, RemoveWishlistProductVariantMutationVariables>(RemoveWishlistProductVariantDocument, options);
      }
export type RemoveWishlistProductVariantMutationHookResult = ReturnType<typeof useRemoveWishlistProductVariantMutation>;
export type RemoveWishlistProductVariantMutationResult = Apollo.MutationResult<RemoveWishlistProductVariantMutation>;
export type RemoveWishlistProductVariantMutationOptions = Apollo.BaseMutationOptions<RemoveWishlistProductVariantMutation, RemoveWishlistProductVariantMutationVariables>;
export const AttributesDocument = gql`
    query Attributes($id: ID!) {
  attributes(filter: {inCategory: $id}, first: 100) {
    edges {
      node {
        id
        name
        slug
        values {
          id
          name
          slug
        }
      }
    }
  }
}
    `;

/**
 * __useAttributesQuery__
 *
 * To run a query within a React component, call `useAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttributesQuery(baseOptions: Apollo.QueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
      }
export function useAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttributesQuery, AttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttributesQuery, AttributesQueryVariables>(AttributesDocument, options);
        }
export type AttributesQueryHookResult = ReturnType<typeof useAttributesQuery>;
export type AttributesLazyQueryHookResult = ReturnType<typeof useAttributesLazyQuery>;
export type AttributesQueryResult = Apollo.QueryResult<AttributesQuery, AttributesQueryVariables>;
export const BrandingDocument = gql`
    query Branding {
  branding {
    id
    jsonContent
    logo {
      url
    }
    icon {
      url
    }
    favicon {
      url
    }
    footerText
    logoHeight
    logoWidth
  }
}
    `;

/**
 * __useBrandingQuery__
 *
 * To run a query within a React component, call `useBrandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandingQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandingQuery(baseOptions?: Apollo.QueryHookOptions<BrandingQuery, BrandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandingQuery, BrandingQueryVariables>(BrandingDocument, options);
      }
export function useBrandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandingQuery, BrandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandingQuery, BrandingQueryVariables>(BrandingDocument, options);
        }
export type BrandingQueryHookResult = ReturnType<typeof useBrandingQuery>;
export type BrandingLazyQueryHookResult = ReturnType<typeof useBrandingLazyQuery>;
export type BrandingQueryResult = Apollo.QueryResult<BrandingQuery, BrandingQueryVariables>;
export const CategoryListDocument = gql`
    query CategoryList($first: Int!, $after: String) {
  categories(first: $first, after: $after) {
    edges {
      node {
        ...BaseCategory
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${BaseCategoryFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCategoryListQuery__
 *
 * To run a query within a React component, call `useCategoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCategoryListQuery(baseOptions: Apollo.QueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
      }
export function useCategoryListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryListQuery, CategoryListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryListQuery, CategoryListQueryVariables>(CategoryListDocument, options);
        }
export type CategoryListQueryHookResult = ReturnType<typeof useCategoryListQuery>;
export type CategoryListLazyQueryHookResult = ReturnType<typeof useCategoryListLazyQuery>;
export type CategoryListQueryResult = Apollo.QueryResult<CategoryListQuery, CategoryListQueryVariables>;
export const CategoryChildrenListDocument = gql`
    query CategoryChildrenList($id: ID!, $first: Int!, $after: String) {
  category(id: $id) {
    id
    children(first: $first, after: $after) {
      edges {
        node {
          ...BaseCategory
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${BaseCategoryFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCategoryChildrenListQuery__
 *
 * To run a query within a React component, call `useCategoryChildrenListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryChildrenListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryChildrenListQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCategoryChildrenListQuery(baseOptions: Apollo.QueryHookOptions<CategoryChildrenListQuery, CategoryChildrenListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryChildrenListQuery, CategoryChildrenListQueryVariables>(CategoryChildrenListDocument, options);
      }
export function useCategoryChildrenListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryChildrenListQuery, CategoryChildrenListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryChildrenListQuery, CategoryChildrenListQueryVariables>(CategoryChildrenListDocument, options);
        }
export type CategoryChildrenListQueryHookResult = ReturnType<typeof useCategoryChildrenListQuery>;
export type CategoryChildrenListLazyQueryHookResult = ReturnType<typeof useCategoryChildrenListLazyQuery>;
export type CategoryChildrenListQueryResult = Apollo.QueryResult<CategoryChildrenListQuery, CategoryChildrenListQueryVariables>;
export const CategoryAncestorsListDocument = gql`
    query CategoryAncestorsList($id: ID!, $first: Int!, $after: String) {
  category(id: $id) {
    id
    ancestors(first: $first, after: $after) {
      edges {
        node {
          ...BaseCategory
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${BaseCategoryFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCategoryAncestorsListQuery__
 *
 * To run a query within a React component, call `useCategoryAncestorsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryAncestorsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryAncestorsListQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCategoryAncestorsListQuery(baseOptions: Apollo.QueryHookOptions<CategoryAncestorsListQuery, CategoryAncestorsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryAncestorsListQuery, CategoryAncestorsListQueryVariables>(CategoryAncestorsListDocument, options);
      }
export function useCategoryAncestorsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryAncestorsListQuery, CategoryAncestorsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryAncestorsListQuery, CategoryAncestorsListQueryVariables>(CategoryAncestorsListDocument, options);
        }
export type CategoryAncestorsListQueryHookResult = ReturnType<typeof useCategoryAncestorsListQuery>;
export type CategoryAncestorsListLazyQueryHookResult = ReturnType<typeof useCategoryAncestorsListLazyQuery>;
export type CategoryAncestorsListQueryResult = Apollo.QueryResult<CategoryAncestorsListQuery, CategoryAncestorsListQueryVariables>;
export const CategoryDetailsDocument = gql`
    query CategoryDetails($id: ID!) {
  category(id: $id) {
    seoDescription
    seoTitle
    id
    name
    backgroundImage {
      url
    }
    ancestors(last: 5) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useCategoryDetailsQuery__
 *
 * To run a query within a React component, call `useCategoryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryDetailsQuery(baseOptions: Apollo.QueryHookOptions<CategoryDetailsQuery, CategoryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryDetailsQuery, CategoryDetailsQueryVariables>(CategoryDetailsDocument, options);
      }
export function useCategoryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryDetailsQuery, CategoryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryDetailsQuery, CategoryDetailsQueryVariables>(CategoryDetailsDocument, options);
        }
export type CategoryDetailsQueryHookResult = ReturnType<typeof useCategoryDetailsQuery>;
export type CategoryDetailsLazyQueryHookResult = ReturnType<typeof useCategoryDetailsLazyQuery>;
export type CategoryDetailsQueryResult = Apollo.QueryResult<CategoryDetailsQuery, CategoryDetailsQueryVariables>;
export const CheckoutDetailsDocument = gql`
    query CheckoutDetails($token: NauticalUUID!) {
  checkout(token: $token) {
    ...Checkout
  }
}
    ${CheckoutFragmentDoc}`;

/**
 * __useCheckoutDetailsQuery__
 *
 * To run a query within a React component, call `useCheckoutDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutDetailsQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckoutDetailsQuery(baseOptions: Apollo.QueryHookOptions<CheckoutDetailsQuery, CheckoutDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutDetailsQuery, CheckoutDetailsQueryVariables>(CheckoutDetailsDocument, options);
      }
export function useCheckoutDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutDetailsQuery, CheckoutDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutDetailsQuery, CheckoutDetailsQueryVariables>(CheckoutDetailsDocument, options);
        }
export type CheckoutDetailsQueryHookResult = ReturnType<typeof useCheckoutDetailsQuery>;
export type CheckoutDetailsLazyQueryHookResult = ReturnType<typeof useCheckoutDetailsLazyQuery>;
export type CheckoutDetailsQueryResult = Apollo.QueryResult<CheckoutDetailsQuery, CheckoutDetailsQueryVariables>;
export const UserCheckoutDetailsDocument = gql`
    query UserCheckoutDetails {
  me {
    id
    checkout {
      ...Checkout
    }
  }
}
    ${CheckoutFragmentDoc}`;

/**
 * __useUserCheckoutDetailsQuery__
 *
 * To run a query within a React component, call `useUserCheckoutDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCheckoutDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCheckoutDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCheckoutDetailsQuery(baseOptions?: Apollo.QueryHookOptions<UserCheckoutDetailsQuery, UserCheckoutDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCheckoutDetailsQuery, UserCheckoutDetailsQueryVariables>(UserCheckoutDetailsDocument, options);
      }
export function useUserCheckoutDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCheckoutDetailsQuery, UserCheckoutDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCheckoutDetailsQuery, UserCheckoutDetailsQueryVariables>(UserCheckoutDetailsDocument, options);
        }
export type UserCheckoutDetailsQueryHookResult = ReturnType<typeof useUserCheckoutDetailsQuery>;
export type UserCheckoutDetailsLazyQueryHookResult = ReturnType<typeof useUserCheckoutDetailsLazyQuery>;
export type UserCheckoutDetailsQueryResult = Apollo.QueryResult<UserCheckoutDetailsQuery, UserCheckoutDetailsQueryVariables>;
export const CheckoutProductVariantsDocument = gql`
    query CheckoutProductVariants($ids: [ID]) {
  productVariants(ids: $ids, first: 100) {
    edges {
      node {
        ...ProductVariant
      }
    }
  }
}
    ${ProductVariantFragmentDoc}`;

/**
 * __useCheckoutProductVariantsQuery__
 *
 * To run a query within a React component, call `useCheckoutProductVariantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutProductVariantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutProductVariantsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useCheckoutProductVariantsQuery(baseOptions?: Apollo.QueryHookOptions<CheckoutProductVariantsQuery, CheckoutProductVariantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutProductVariantsQuery, CheckoutProductVariantsQueryVariables>(CheckoutProductVariantsDocument, options);
      }
export function useCheckoutProductVariantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutProductVariantsQuery, CheckoutProductVariantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutProductVariantsQuery, CheckoutProductVariantsQueryVariables>(CheckoutProductVariantsDocument, options);
        }
export type CheckoutProductVariantsQueryHookResult = ReturnType<typeof useCheckoutProductVariantsQuery>;
export type CheckoutProductVariantsLazyQueryHookResult = ReturnType<typeof useCheckoutProductVariantsLazyQuery>;
export type CheckoutProductVariantsQueryResult = Apollo.QueryResult<CheckoutProductVariantsQuery, CheckoutProductVariantsQueryVariables>;
export const CollectionListDocument = gql`
    query CollectionList($first: Int!, $after: String, $sortBy: CollectionSortingInput, $filter: CollectionFilterInput) {
  collections(first: $first, after: $after, sortBy: $sortBy, filter: $filter) {
    edges {
      node {
        ...BaseCollection
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${BaseCollectionFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCollectionListQuery__
 *
 * To run a query within a React component, call `useCollectionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionListQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      sortBy: // value for 'sortBy'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCollectionListQuery(baseOptions: Apollo.QueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
      }
export function useCollectionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
        }
export type CollectionListQueryHookResult = ReturnType<typeof useCollectionListQuery>;
export type CollectionListLazyQueryHookResult = ReturnType<typeof useCollectionListLazyQuery>;
export type CollectionListQueryResult = Apollo.QueryResult<CollectionListQuery, CollectionListQueryVariables>;
export const GetClientSecretDocument = gql`
    query GetClientSecret($gateway: ID!, $paymentInformation: StripeClientPaymentData!) {
  getClientSecret(gateway: $gateway, paymentInformation: $paymentInformation)
}
    `;

/**
 * __useGetClientSecretQuery__
 *
 * To run a query within a React component, call `useGetClientSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientSecretQuery({
 *   variables: {
 *      gateway: // value for 'gateway'
 *      paymentInformation: // value for 'paymentInformation'
 *   },
 * });
 */
export function useGetClientSecretQuery(baseOptions: Apollo.QueryHookOptions<GetClientSecretQuery, GetClientSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientSecretQuery, GetClientSecretQueryVariables>(GetClientSecretDocument, options);
      }
export function useGetClientSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientSecretQuery, GetClientSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientSecretQuery, GetClientSecretQueryVariables>(GetClientSecretDocument, options);
        }
export type GetClientSecretQueryHookResult = ReturnType<typeof useGetClientSecretQuery>;
export type GetClientSecretLazyQueryHookResult = ReturnType<typeof useGetClientSecretLazyQuery>;
export type GetClientSecretQueryResult = Apollo.QueryResult<GetClientSecretQuery, GetClientSecretQueryVariables>;
export const MainMenuDocument = gql`
    query MainMenu {
  shop {
    navigation {
      main {
        id
        items {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
              children {
                ...MainMenuSubItem
                children {
                  ...MainMenuSubItem
                  children {
                    ...MainMenuSubItem
                    children {
                      ...MainMenuSubItem
                      children {
                        ...MainMenuSubItem
                        children {
                          ...MainMenuSubItem
                          children {
                            ...MainMenuSubItem
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  designerdata(name: "NavBar") {
    jsonContent
    name
  }
}
    ${MainMenuSubItemFragmentDoc}`;

/**
 * __useMainMenuQuery__
 *
 * To run a query within a React component, call `useMainMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useMainMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMainMenuQuery({
 *   variables: {
 *   },
 * });
 */
export function useMainMenuQuery(baseOptions?: Apollo.QueryHookOptions<MainMenuQuery, MainMenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MainMenuQuery, MainMenuQueryVariables>(MainMenuDocument, options);
      }
export function useMainMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MainMenuQuery, MainMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MainMenuQuery, MainMenuQueryVariables>(MainMenuDocument, options);
        }
export type MainMenuQueryHookResult = ReturnType<typeof useMainMenuQuery>;
export type MainMenuLazyQueryHookResult = ReturnType<typeof useMainMenuLazyQuery>;
export type MainMenuQueryResult = Apollo.QueryResult<MainMenuQuery, MainMenuQueryVariables>;
export const OrdersByUserDocument = gql`
    query OrdersByUser($perPage: Int!, $after: String) {
  me {
    id
    orders(first: $perPage, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          token
          number
          statusDisplay
          created
          total {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
          lines {
            id
            variant {
              id
              product {
                name
                id
              }
            }
            thumbnail {
              alt
              url
            }
            thumbnail2x: thumbnail(size: 510) {
              url
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useOrdersByUserQuery__
 *
 * To run a query within a React component, call `useOrdersByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersByUserQuery({
 *   variables: {
 *      perPage: // value for 'perPage'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useOrdersByUserQuery(baseOptions: Apollo.QueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersByUserQuery, OrdersByUserQueryVariables>(OrdersByUserDocument, options);
      }
export function useOrdersByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersByUserQuery, OrdersByUserQueryVariables>(OrdersByUserDocument, options);
        }
export type OrdersByUserQueryHookResult = ReturnType<typeof useOrdersByUserQuery>;
export type OrdersByUserLazyQueryHookResult = ReturnType<typeof useOrdersByUserLazyQuery>;
export type OrdersByUserQueryResult = Apollo.QueryResult<OrdersByUserQuery, OrdersByUserQueryVariables>;
export const OrderByTokenDocument = gql`
    query OrderByToken($token: NauticalUUID!) {
  orderByToken(token: $token) {
    ...OrderDetail
  }
}
    ${OrderDetailFragmentDoc}`;

/**
 * __useOrderByTokenQuery__
 *
 * To run a query within a React component, call `useOrderByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useOrderByTokenQuery(baseOptions: Apollo.QueryHookOptions<OrderByTokenQuery, OrderByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderByTokenQuery, OrderByTokenQueryVariables>(OrderByTokenDocument, options);
      }
export function useOrderByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderByTokenQuery, OrderByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderByTokenQuery, OrderByTokenQueryVariables>(OrderByTokenDocument, options);
        }
export type OrderByTokenQueryHookResult = ReturnType<typeof useOrderByTokenQuery>;
export type OrderByTokenLazyQueryHookResult = ReturnType<typeof useOrderByTokenLazyQuery>;
export type OrderByTokenQueryResult = Apollo.QueryResult<OrderByTokenQuery, OrderByTokenQueryVariables>;
export const UserOrderByTokenDocument = gql`
    query UserOrderByToken($token: NauticalUUID!) {
  orderByToken(token: $token) {
    ...OrderDetail
    invoices {
      ...InvoiceFragment
    }
  }
}
    ${OrderDetailFragmentDoc}
${InvoiceFragmentFragmentDoc}`;

/**
 * __useUserOrderByTokenQuery__
 *
 * To run a query within a React component, call `useUserOrderByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrderByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrderByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUserOrderByTokenQuery(baseOptions: Apollo.QueryHookOptions<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>(UserOrderByTokenDocument, options);
      }
export function useUserOrderByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>(UserOrderByTokenDocument, options);
        }
export type UserOrderByTokenQueryHookResult = ReturnType<typeof useUserOrderByTokenQuery>;
export type UserOrderByTokenLazyQueryHookResult = ReturnType<typeof useUserOrderByTokenLazyQuery>;
export type UserOrderByTokenQueryResult = Apollo.QueryResult<UserOrderByTokenQuery, UserOrderByTokenQueryVariables>;
export const NauticalOrdersByUserDocument = gql`
    query NauticalOrdersByUser($perPage: Int!, $after: String) {
  me {
    id
    nauticalOrders(first: $perPage, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          token
          number
          statusDisplay
          created
          total {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
          sellerFulfillments {
            id
            status
            lines {
              id
              quantity
              orderLine {
                id
                productName
                productSku
                variantName
                quantity
                quantityFulfilled
              }
            }
          }
          lines {
            id
            productName
            productSku
            quantity
            variant {
              id
              product {
                name
                id
              }
            }
            thumbnail {
              alt
              url
            }
            thumbnail2x: thumbnail(size: 510) {
              url
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useNauticalOrdersByUserQuery__
 *
 * To run a query within a React component, call `useNauticalOrdersByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useNauticalOrdersByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNauticalOrdersByUserQuery({
 *   variables: {
 *      perPage: // value for 'perPage'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useNauticalOrdersByUserQuery(baseOptions: Apollo.QueryHookOptions<NauticalOrdersByUserQuery, NauticalOrdersByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NauticalOrdersByUserQuery, NauticalOrdersByUserQueryVariables>(NauticalOrdersByUserDocument, options);
      }
export function useNauticalOrdersByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NauticalOrdersByUserQuery, NauticalOrdersByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NauticalOrdersByUserQuery, NauticalOrdersByUserQueryVariables>(NauticalOrdersByUserDocument, options);
        }
export type NauticalOrdersByUserQueryHookResult = ReturnType<typeof useNauticalOrdersByUserQuery>;
export type NauticalOrdersByUserLazyQueryHookResult = ReturnType<typeof useNauticalOrdersByUserLazyQuery>;
export type NauticalOrdersByUserQueryResult = Apollo.QueryResult<NauticalOrdersByUserQuery, NauticalOrdersByUserQueryVariables>;
export const NauticalOrderByTokenDocument = gql`
    query NauticalOrderByToken($token: NauticalUUID!) {
  nauticalOrderByToken(token: $token) {
    ...NauticalOrderDetail
  }
}
    ${NauticalOrderDetailFragmentDoc}`;

/**
 * __useNauticalOrderByTokenQuery__
 *
 * To run a query within a React component, call `useNauticalOrderByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useNauticalOrderByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNauticalOrderByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useNauticalOrderByTokenQuery(baseOptions: Apollo.QueryHookOptions<NauticalOrderByTokenQuery, NauticalOrderByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NauticalOrderByTokenQuery, NauticalOrderByTokenQueryVariables>(NauticalOrderByTokenDocument, options);
      }
export function useNauticalOrderByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NauticalOrderByTokenQuery, NauticalOrderByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NauticalOrderByTokenQuery, NauticalOrderByTokenQueryVariables>(NauticalOrderByTokenDocument, options);
        }
export type NauticalOrderByTokenQueryHookResult = ReturnType<typeof useNauticalOrderByTokenQuery>;
export type NauticalOrderByTokenLazyQueryHookResult = ReturnType<typeof useNauticalOrderByTokenLazyQuery>;
export type NauticalOrderByTokenQueryResult = Apollo.QueryResult<NauticalOrderByTokenQuery, NauticalOrderByTokenQueryVariables>;
export const UserNauticalOrderByTokenDocument = gql`
    query UserNauticalOrderByToken($token: NauticalUUID!) {
  nauticalOrderByToken(token: $token) {
    ...NauticalOrderDetail
    invoices {
      ...InvoiceFragment
    }
  }
}
    ${NauticalOrderDetailFragmentDoc}
${InvoiceFragmentFragmentDoc}`;

/**
 * __useUserNauticalOrderByTokenQuery__
 *
 * To run a query within a React component, call `useUserNauticalOrderByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNauticalOrderByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNauticalOrderByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUserNauticalOrderByTokenQuery(baseOptions: Apollo.QueryHookOptions<UserNauticalOrderByTokenQuery, UserNauticalOrderByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNauticalOrderByTokenQuery, UserNauticalOrderByTokenQueryVariables>(UserNauticalOrderByTokenDocument, options);
      }
export function useUserNauticalOrderByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNauticalOrderByTokenQuery, UserNauticalOrderByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNauticalOrderByTokenQuery, UserNauticalOrderByTokenQueryVariables>(UserNauticalOrderByTokenDocument, options);
        }
export type UserNauticalOrderByTokenQueryHookResult = ReturnType<typeof useUserNauticalOrderByTokenQuery>;
export type UserNauticalOrderByTokenLazyQueryHookResult = ReturnType<typeof useUserNauticalOrderByTokenLazyQuery>;
export type UserNauticalOrderByTokenQueryResult = Apollo.QueryResult<UserNauticalOrderByTokenQuery, UserNauticalOrderByTokenQueryVariables>;
export const GetLoyaltyAndReferralsInfoDocument = gql`
    query GetLoyaltyAndReferralsInfo {
  loyaltyAndReferralsInfo {
    awardLoyaltyPointsEnabled
    pointsForMakingPurchaseEnabled
    pointsUsedPerDollarSaved
    pointsGainedPerDollarSpent
  }
}
    `;

/**
 * __useGetLoyaltyAndReferralsInfoQuery__
 *
 * To run a query within a React component, call `useGetLoyaltyAndReferralsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoyaltyAndReferralsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoyaltyAndReferralsInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoyaltyAndReferralsInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetLoyaltyAndReferralsInfoQuery, GetLoyaltyAndReferralsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoyaltyAndReferralsInfoQuery, GetLoyaltyAndReferralsInfoQueryVariables>(GetLoyaltyAndReferralsInfoDocument, options);
      }
export function useGetLoyaltyAndReferralsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoyaltyAndReferralsInfoQuery, GetLoyaltyAndReferralsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoyaltyAndReferralsInfoQuery, GetLoyaltyAndReferralsInfoQueryVariables>(GetLoyaltyAndReferralsInfoDocument, options);
        }
export type GetLoyaltyAndReferralsInfoQueryHookResult = ReturnType<typeof useGetLoyaltyAndReferralsInfoQuery>;
export type GetLoyaltyAndReferralsInfoLazyQueryHookResult = ReturnType<typeof useGetLoyaltyAndReferralsInfoLazyQuery>;
export type GetLoyaltyAndReferralsInfoQueryResult = Apollo.QueryResult<GetLoyaltyAndReferralsInfoQuery, GetLoyaltyAndReferralsInfoQueryVariables>;
export const ProductListDocument = gql`
    query ProductList($after: String, $first: Int!, $sortBy: ProductOrder, $filter: ProductFilterInput) {
  products(after: $after, first: $first, sortBy: $sortBy, filter: $filter) {
    edges {
      node {
        ...BaseProduct
        ...ProductPricingField
        category {
          id
          name
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${BaseProductFragmentDoc}
${ProductPricingFieldFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useProductListQuery__
 *
 * To run a query within a React component, call `useProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      sortBy: // value for 'sortBy'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProductListQuery(baseOptions: Apollo.QueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
      }
export function useProductListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<typeof useProductListLazyQuery>;
export type ProductListQueryResult = Apollo.QueryResult<ProductListQuery, ProductListQueryVariables>;
export const ProductDetailsDocument = gql`
    query ProductDetails($id: ID!, $countryCode: CountryCode) {
  product(id: $id) {
    ...BaseProduct
    ...ProductPricingField
    descriptionJson
    category {
      id
      name
      products(first: 3) {
        edges {
          node {
            ...BaseProduct
            ...ProductPricingField
            category {
              id
              name
            }
          }
        }
      }
    }
    images {
      id
      url
    }
    attributes {
      ...SelectedAttributeFields
    }
    variants {
      ...ProductVariantFields
    }
    seoDescription
    seoTitle
    isAvailable
  }
}
    ${BaseProductFragmentDoc}
${ProductPricingFieldFragmentDoc}
${SelectedAttributeFieldsFragmentDoc}
${ProductVariantFieldsFragmentDoc}`;

/**
 * __useProductDetailsQuery__
 *
 * To run a query within a React component, call `useProductDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      countryCode: // value for 'countryCode'
 *   },
 * });
 */
export function useProductDetailsQuery(baseOptions: Apollo.QueryHookOptions<ProductDetailsQuery, ProductDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDetailsQuery, ProductDetailsQueryVariables>(ProductDetailsDocument, options);
      }
export function useProductDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDetailsQuery, ProductDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDetailsQuery, ProductDetailsQueryVariables>(ProductDetailsDocument, options);
        }
export type ProductDetailsQueryHookResult = ReturnType<typeof useProductDetailsQuery>;
export type ProductDetailsLazyQueryHookResult = ReturnType<typeof useProductDetailsLazyQuery>;
export type ProductDetailsQueryResult = Apollo.QueryResult<ProductDetailsQuery, ProductDetailsQueryVariables>;
export const VariantsProductsDocument = gql`
    query VariantsProducts($ids: [ID]) {
  productVariants(ids: $ids, first: 100) {
    edges {
      node {
        id
        product {
          id
          productType {
            isShippingRequired
          }
        }
      }
    }
  }
}
    `;

/**
 * __useVariantsProductsQuery__
 *
 * To run a query within a React component, call `useVariantsProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVariantsProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVariantsProductsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useVariantsProductsQuery(baseOptions?: Apollo.QueryHookOptions<VariantsProductsQuery, VariantsProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VariantsProductsQuery, VariantsProductsQueryVariables>(VariantsProductsDocument, options);
      }
export function useVariantsProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VariantsProductsQuery, VariantsProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VariantsProductsQuery, VariantsProductsQueryVariables>(VariantsProductsDocument, options);
        }
export type VariantsProductsQueryHookResult = ReturnType<typeof useVariantsProductsQuery>;
export type VariantsProductsLazyQueryHookResult = ReturnType<typeof useVariantsProductsLazyQuery>;
export type VariantsProductsQueryResult = Apollo.QueryResult<VariantsProductsQuery, VariantsProductsQueryVariables>;
export const GetProductRatingsAndReviewsDocument = gql`
    query GetProductRatingsAndReviews($productId: String!) {
  productRatingsAndReviews(productId: $productId) {
    bottomline {
      averageScore
      totalReview
    }
    reviews {
      content
      createdAt
      score
      title
      user {
        displayName
      }
    }
  }
}
    `;

/**
 * __useGetProductRatingsAndReviewsQuery__
 *
 * To run a query within a React component, call `useGetProductRatingsAndReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductRatingsAndReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductRatingsAndReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductRatingsAndReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetProductRatingsAndReviewsQuery, GetProductRatingsAndReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductRatingsAndReviewsQuery, GetProductRatingsAndReviewsQueryVariables>(GetProductRatingsAndReviewsDocument, options);
      }
export function useGetProductRatingsAndReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductRatingsAndReviewsQuery, GetProductRatingsAndReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductRatingsAndReviewsQuery, GetProductRatingsAndReviewsQueryVariables>(GetProductRatingsAndReviewsDocument, options);
        }
export type GetProductRatingsAndReviewsQueryHookResult = ReturnType<typeof useGetProductRatingsAndReviewsQuery>;
export type GetProductRatingsAndReviewsLazyQueryHookResult = ReturnType<typeof useGetProductRatingsAndReviewsLazyQuery>;
export type GetProductRatingsAndReviewsQueryResult = Apollo.QueryResult<GetProductRatingsAndReviewsQuery, GetProductRatingsAndReviewsQueryVariables>;
export const GetShopDocument = gql`
    query GetShop {
  shop {
    displayGrossPrices
    loginForPrice
    loginForProducts
    builderKey
    activePlugins {
      identifier
      name
      description
      active
    }
    crispWebsiteId
    gaMeasurementId
    defaultCountry {
      code
      country
    }
    countries {
      country
      code
    }
    geolocalization {
      country {
        code
        country
      }
    }
  }
}
    `;

/**
 * __useGetShopQuery__
 *
 * To run a query within a React component, call `useGetShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShopQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShopQuery(baseOptions?: Apollo.QueryHookOptions<GetShopQuery, GetShopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShopQuery, GetShopQueryVariables>(GetShopDocument, options);
      }
export function useGetShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShopQuery, GetShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShopQuery, GetShopQueryVariables>(GetShopDocument, options);
        }
export type GetShopQueryHookResult = ReturnType<typeof useGetShopQuery>;
export type GetShopLazyQueryHookResult = ReturnType<typeof useGetShopLazyQuery>;
export type GetShopQueryResult = Apollo.QueryResult<GetShopQuery, GetShopQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($cursor: String, $perPage: Int) {
  products(after: $cursor, first: $perPage) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($cursor: String, $perPage: Int) {
  categories(after: $cursor, first: $perPage) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCollectionsDocument = gql`
    query GetCollections($cursor: String, $perPage: Int) {
  collections(after: $cursor, first: $perPage) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetCollectionsQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
      }
export function useGetCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
        }
export type GetCollectionsQueryHookResult = ReturnType<typeof useGetCollectionsQuery>;
export type GetCollectionsLazyQueryHookResult = ReturnType<typeof useGetCollectionsLazyQuery>;
export type GetCollectionsQueryResult = Apollo.QueryResult<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const ThemeFontDocument = gql`
    query ThemeFont($name: String!) {
  designerdata(name: $name) {
    name
    jsonContent
  }
}
    `;

/**
 * __useThemeFontQuery__
 *
 * To run a query within a React component, call `useThemeFontQuery` and pass it any options that fit your needs.
 * When your component renders, `useThemeFontQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThemeFontQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useThemeFontQuery(baseOptions: Apollo.QueryHookOptions<ThemeFontQuery, ThemeFontQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThemeFontQuery, ThemeFontQueryVariables>(ThemeFontDocument, options);
      }
export function useThemeFontLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThemeFontQuery, ThemeFontQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThemeFontQuery, ThemeFontQueryVariables>(ThemeFontDocument, options);
        }
export type ThemeFontQueryHookResult = ReturnType<typeof useThemeFontQuery>;
export type ThemeFontLazyQueryHookResult = ReturnType<typeof useThemeFontLazyQuery>;
export type ThemeFontQueryResult = Apollo.QueryResult<ThemeFontQuery, ThemeFontQueryVariables>;
export const UserDetailsDocument = gql`
    query UserDetails {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailsQuery(baseOptions?: Apollo.QueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, options);
      }
export function useUserDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, options);
        }
export type UserDetailsQueryHookResult = ReturnType<typeof useUserDetailsQuery>;
export type UserDetailsLazyQueryHookResult = ReturnType<typeof useUserDetailsLazyQuery>;
export type UserDetailsQueryResult = Apollo.QueryResult<UserDetailsQuery, UserDetailsQueryVariables>;
export const GetYotpoLoyaltyAndReferralsCustomerDetailsDocument = gql`
    query GetYotpoLoyaltyAndReferralsCustomerDetails($email: String!) {
  customerLoyaltyAndReferralsDetails(email: $email) {
    firstName
    lastName
    email
    pointsBalance
    pointsEarned
  }
}
    `;

/**
 * __useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery__
 *
 * To run a query within a React component, call `useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables>(GetYotpoLoyaltyAndReferralsCustomerDetailsDocument, options);
      }
export function useGetYotpoLoyaltyAndReferralsCustomerDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables>(GetYotpoLoyaltyAndReferralsCustomerDetailsDocument, options);
        }
export type GetYotpoLoyaltyAndReferralsCustomerDetailsQueryHookResult = ReturnType<typeof useGetYotpoLoyaltyAndReferralsCustomerDetailsQuery>;
export type GetYotpoLoyaltyAndReferralsCustomerDetailsLazyQueryHookResult = ReturnType<typeof useGetYotpoLoyaltyAndReferralsCustomerDetailsLazyQuery>;
export type GetYotpoLoyaltyAndReferralsCustomerDetailsQueryResult = Apollo.QueryResult<GetYotpoLoyaltyAndReferralsCustomerDetailsQuery, GetYotpoLoyaltyAndReferralsCustomerDetailsQueryVariables>;
export const WishlistDocument = gql`
    query Wishlist($after: String, $first: Int) {
  me {
    id
    wishlist(after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...WishlistItem
        }
      }
    }
  }
}
    ${WishlistItemFragmentDoc}`;

/**
 * __useWishlistQuery__
 *
 * To run a query within a React component, call `useWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useWishlistQuery(baseOptions?: Apollo.QueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
      }
export function useWishlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
        }
export type WishlistQueryHookResult = ReturnType<typeof useWishlistQuery>;
export type WishlistLazyQueryHookResult = ReturnType<typeof useWishlistLazyQuery>;
export type WishlistQueryResult = Apollo.QueryResult<WishlistQuery, WishlistQueryVariables>;