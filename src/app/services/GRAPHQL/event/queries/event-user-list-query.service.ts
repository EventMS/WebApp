import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IEventUserListQuery, IEventUserListQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventUserListQueryService extends Query<IEventUserListQuery, IEventUserListQueryVariables> {
  document = gql`
    query IEventUserListQuery($eventId: String!) {
      getEvent(eventId: $eventId) {
        eventId
        participants {
          user {
            name
            id
          }
        }
      }
    }
  `;
}
