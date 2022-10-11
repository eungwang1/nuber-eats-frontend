import * as Types from '../../types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditProfileMutationVariables = Types.Exact<{
  input: Types.EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileOutput', ok: boolean, error?: string | null } };


export const EditProfileDocument = gql`
    mutation editProfile($input: EditProfileInput!) {
  editProfile(input: $input) {
    ok
    error
  }
}
    `;

export function useEditProfileMutation() {
  return Urql.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument);
};