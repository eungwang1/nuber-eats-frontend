import * as Types from '../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, role: Types.UserRole, verified: boolean } };


export const MeQueryDocument = gql`
    query meQuery {
  me {
    id
    email
    role
    verified
  }
}
    `;

export function useMeQueryQuery(options?: Omit<Urql.UseQueryArgs<MeQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQueryQuery, MeQueryQueryVariables>({ query: MeQueryDocument, ...options });
};