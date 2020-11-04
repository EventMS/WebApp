import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { IFreeSignUpMutation, IFreeSignUpMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class FreeSignUpMutationService extends Mutation<IFreeSignUpMutation, IFreeSignUpMutationVariables> {
  document = gql`
    mutation IFreeSignUpMutation($eventId: String!) {
      signUpForFreeEvent(eventId: $eventId) {
        eventId
      }
    }
  `;
}
