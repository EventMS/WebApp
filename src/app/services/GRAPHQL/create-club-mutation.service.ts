import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { CreateClubRequestInput, ICreateClubMutation, ICreateClubMutationVariables } from 'src/graphql_interfaces';

export interface ICreateClubMutationService {
  createClub(request: CreateClubRequestInput)
}

@Injectable({
  providedIn: 'root',
})

export class CreateClubMutationService extends Mutation<ICreateClubMutation, ICreateClubMutationVariables> implements ICreateClubMutationService {

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
        accountNumber: request.accountNumber.toString(),
        registrationNumber: request.registrationNumber.toString(),
        name: request.name,
        description: request.description,
        phoneNumber: request.phoneNumber.toString(),
        address: request.address,
      },
    });
  }
}
