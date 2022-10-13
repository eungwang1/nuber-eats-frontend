import * as Types from '../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RestaurantsPageQueryVariables = Types.Exact<{
  input: Types.RestaurantsInput;
}>;


export type RestaurantsPageQuery = { __typename?: 'Query', restaurants: { __typename?: 'RestaurantsOutput', error?: string | null, ok: boolean, totalPages?: number | null, totalResults?: number | null, results?: Array<{ __typename?: 'Restaurant', id: number, name: string, coverImg: string, address: string, isPromoted: boolean, category?: { __typename?: 'Category', name: string } | null }> | null }, allCategories: { __typename?: 'AllCategoriesOutput', error?: string | null, ok: boolean, categories?: Array<{ __typename?: 'Category', id: number, name: string, coverImg?: string | null, slug: string, restaurantCount: number }> | null } };


export const RestaurantsPageDocument = gql`
    query restaurantsPage($input: RestaurantsInput!) {
  restaurants(input: $input) {
    error
    ok
    totalPages
    totalResults
    results {
      id
      name
      coverImg
      address
      isPromoted
      category {
        name
      }
    }
  }
  allCategories {
    error
    ok
    categories {
      id
      name
      coverImg
      slug
      restaurantCount
    }
  }
}
    `;

export function useRestaurantsPageQuery(options: Omit<Urql.UseQueryArgs<RestaurantsPageQueryVariables>, 'query'>) {
  return Urql.useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>({ query: RestaurantsPageDocument, ...options });
};