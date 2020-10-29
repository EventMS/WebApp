import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IEventPageQuery, IEventPageQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventPageQueryService extends Query<IEventPageQuery, IEventPageQueryVariables> {
  document = gql`
    query IEventPageQuery($eventId: Uuid!) {
      getEvent(eventId: $eventId) {
        eventId
        clubId
        name
        description
        startTime
        endTime
        publicPrice
        locations {
          eventId
          event {
            name
          }
          roomId
        }
        instructorForEvents {
          instructorId
          user {
            id
            name
          }
        }
        eventPrices {
          price
          clubSubscriptionId
        }
      }
    }
  `;

  public EventListQuery = ({ eventId }: IEventPageQueryVariables) =>
    this.watch({ eventId }).valueChanges.pipe(map(({ data }) => data));
}
