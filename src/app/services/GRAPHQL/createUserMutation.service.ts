import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ICreateUserMutation, ICreateUserMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class CreateUserMutationService extends Mutation<ICreateUserMutation, ICreateUserMutationVariables> {
  document = gql`
    mutation ICreateUserMutation($request: CreateUserRequestInput) {
      createUser(request: $request) {
        token
        user {
          email
          id
          name
        }
      }
    }
  `;
}
