import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ICreateEventMutation, ICreateEventMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class CreateEventMutationService extends Mutation<ICreateEventMutation, ICreateEventMutationVariables> {
  document = gql`
    mutation ICreateEventMutation($request: CreateEventRequestInput) {
      createEvent(request: $request) {
        eventId
        name
      }
    }
  `;
}
