import { gql } from 'apollo-angular';

export const CREATE_USER_MUTATION = gql`
  mutation ICreateUser($request: CreateUserRequestInput) {
    createUser(request: $request) {
      token
      user {
        email

        id
      }
    }
  }
`;
