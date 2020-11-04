import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IEventPageQuery, IEventPageQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventPageQueryService extends Query<IEventPageQuery, IEventPageQueryVariables> {
  document = gql`
    query IEventPageQuery($eventId: String!) {
      getEvent(eventId: $eventId) {
        eventId
        clubId
        name
        description
        startTime
        endTime
        publicPrice
        userPrice
        locations {
          event {
            eventId
            name
          }
          room {
            name
            roomId
          }
        }
        instructorForEvents {
          instructorId
          user {
            id
            name
          }
        }
      }
    }
  `;
}
