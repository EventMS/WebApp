import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ICreateClubMemberMutation, ICreateClubMemberMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class CreateClubMemberMutationService extends Mutation<
  ICreateClubMemberMutation,
  ICreateClubMemberMutationVariables
> {
  document = gql`
    mutation ICreateClubMemberMutation($request: CreateClubMemberRequestInput) {
      createClubMember(request: $request) {
        clubId
        clubSubscriptionId
      }
    }
  `;
}
