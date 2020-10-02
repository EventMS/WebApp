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

  createClub(request: CreateClubRequestInput) {
    return this.mutate({
      request: {
        accountNumber: '12345678',
        registrationNumber: '1234',
        name: 'name',
        description: 'Something',
        phoneNumber: '12345678',
        address: 'Somewhere',
      },
    });
  }
}
