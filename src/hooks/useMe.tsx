import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../routers/logged-in-router.generated";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
