import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ISignUpForEventMutationService, ISignUpForEventMutationServiceVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignUpForEventMutationService extends Mutation<
  ISignUpForEventMutationService,
  ISignUpForEventMutationServiceVariables
> {
  document = gql`
    mutation ISignUpForEventMutationService($eventId: String!) {
      signUpForEvent(eventId: $eventId) {
        price
        clientSecret
      }
    }
  `;

  public signUpForEventMutation = (eventId: string) => this.mutate({ eventId });
}
