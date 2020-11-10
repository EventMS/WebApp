import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { IVerifyCodeMutation, IVerifyCodeMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeMutationService extends Mutation<IVerifyCodeMutation, IVerifyCodeMutationVariables> {
  document = gql`
    mutation IVerifyCodeMutation($request: VerifyCodeRequestInput) {
      verifyCode(request: $request) {
        status
        userId
      }
    }
  `;
}
