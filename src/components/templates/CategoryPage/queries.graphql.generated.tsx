import * as Types from '../../../../graphql/generated';

import { gql } from '@apollo/client';
import { BrandingFragmentDoc } from '../../../queries/branding.graphql.generated';
import { ProductsPageAttributeFragmentDoc } from '../ProductsList/queries.graphql.generated';
import { MenuTreeFragmentDoc } from '../../organisms/ProductSideNavbar/queries.graphql.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BasicCategoryFragment = { __typename?: 'Category', seoDescription?: string | null, seoTitle?: string | null, description: string, descriptionJson: any, id: string, name: string, backgroundImage?: { __typename?: 'Image', url: string } | null, ancestorList?: { __typename?: 'CategoryCountableConnection', categories: Array<{ __typename?: 'CategoryCountableEdge', category: { __typename?: 'Category', id: string, name: string } }> } | null };

export type CategoryPageQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CategoryPageQuery = { __typename?: 'Query', branding: { __typename?: 'BrandingType', id: string, jsonContent: any, footerText: string, logoHeight?: number | null, logoWidth?: number | null, logo?: { __typename?: 'Image', url: string } | null, icon?: { __typename?: 'Image', url: string } | null, favicon?: { __typename?: 'Image', url: string } | null }, category?: { __typename?: 'Category', seoDescription?: string | null, seoTitle?: string | null, description: string, descriptionJson: any, id: string, name: string, backgroundImage?: { __typename?: 'Image', url: string } | null, ancestorList?: { __typename?: 'CategoryCountableConnection', categories: Array<{ __typename?: 'CategoryCountableEdge', category: { __typename?: 'Category', id: string, name: string } }> } | null } | null, attributes?: { __typename?: 'AttributeCountableConnection', attributes: Array<{ __typename?: 'AttributeCountableEdge', attribute: { __typename?: 'Attribute', id: string, name: string, slug: string, values?: Array<{ __typename?: 'AttributeValue', id: string, name: string, slug: string }> | null } }> } | null, menu?: { __typename?: 'Menu', id: string, name: string, items?: Array<{ __typename?: 'MenuItem', id: string, name: string, level: number, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, level: number, children?: Array<{ __typename?: 'MenuItem', id: string, name: string, level: number, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', id: string, title: string } | null, parent?: { __typename?: 'MenuItem', id: string, name: string } | null }> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', id: string, title: string } | null, parent?: { __typename?: 'MenuItem', id: string, name: string } | null }> | null, category?: { __typename?: 'Category', id: string, name: string } | null, collection?: { __typename?: 'Collection', id: string, name: string } | null, page?: { __typename?: 'Page', id: string, title: string } | null, parent?: { __typename?: 'MenuItem', id: string, name: string } | null }> | null } | null };

export const BasicCategoryFragmentDoc = gql`
    fragment BasicCategory on Category {
  seoDescription
  seoTitle
  description
  descriptionJson
  id
  name
  level
  children(first:30){
    edges{
      node{
        id
        slug
        name
        level
        backgroundImage{
          url
        }
      }
    }
  }

  backgroundImage {
    url
  }
  ancestorList: ancestors(last: 5) {
    categories: edges {
      category: node {
        id
        name
        
      }
    }
  }
}
    `;
export const CategoryPageDocument = gql`
    query CategoryPage($id: ID!) {
  branding {
    ...Branding
  }
  category(id: $id) {
    ...BasicCategory
  }
  attributes(filter: {inCategory: $id, filterableInStorefront: true}, first: 100) {
    attributes: edges {
      attribute: node {
        ...ProductsPageAttribute
      }
    }
  }
  menu(name: "sidenav") {
    ...MenuTree
  }
}
    ${BrandingFragmentDoc}
${BasicCategoryFragmentDoc}
${ProductsPageAttributeFragmentDoc}
${MenuTreeFragmentDoc}`;

/**
 * __useCategoryPageQuery__
 *
 * To run a query within a React component, call `useCategoryPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryPageQuery(baseOptions: Apollo.QueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, options);
      }
export function useCategoryPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, options);
        }
export type CategoryPageQueryHookResult = ReturnType<typeof useCategoryPageQuery>;
export type CategoryPageLazyQueryHookResult = ReturnType<typeof useCategoryPageLazyQuery>;
export type CategoryPageQueryResult = Apollo.QueryResult<CategoryPageQuery, CategoryPageQueryVariables>;