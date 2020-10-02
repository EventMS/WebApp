import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateClubMutationService extends Mutation<any> {
  document = gql`
    mutation ICreateClubMutation($request: CreateClubRequestInput) {
      createClub(request: $request) {
        clubId
      }
    }
  `;
}
