import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IVerifyCodeQuery, IVerifyCodeQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeQueryService extends Query<IVerifyCodeQuery, IVerifyCodeQueryVariables> {
  document = gql`
    query IVerifyCodeQuery($eventId: String!) {
      currentUser {
        id
        name
        events {
          code
          eventId
        }
      }
      getEvent(eventId: $eventId) {
        eventId
        participants {
          user {
            id
            name
          }
          status
        }
      }
    }
  `;
}
