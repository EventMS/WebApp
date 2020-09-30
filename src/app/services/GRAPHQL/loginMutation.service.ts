import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ILoginUserMutation, ILoginUserMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginMutationService extends Mutation<ILoginUserMutation, ILoginUserMutationVariables> {
  document = gql`
    mutation ILoginUserMutation($request: LoginUserRequestInput) {
      loginUser(request: $request) {
        token
        user {
          email
          id
        }
      }
    }
  `;
}
