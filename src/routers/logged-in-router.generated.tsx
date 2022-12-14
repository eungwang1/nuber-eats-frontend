import * as Types from "../types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; id: number; email: string; role: Types.UserRole; verified: boolean };
};

export const MeDocument = gql`
  query Me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
