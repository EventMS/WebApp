import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { CreateClubRequestInput, ICreateClubMutation, ICreateClubMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})

export class CreateClubMutationService extends Mutation<ICreateClubMutation, ICreateClubMutationVariables> {

  document = gql`
    mutation ICreateClubMutation($request: CreateClubRequestInput) {
      createClub(request: $request) {
        clubId
      }
    }
  `;
}
