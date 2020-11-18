import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IEventListQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventListQueryService extends Query<IEventListQuery> {
  document = gql`
    query IEventListQuery {
      futureEvents {
        eventId
        name
        description
        startTime
        endTime
        eventPrices {
          price
          clubSubscriptionId
        }
        club {
          name
        }
      }
    }
  `;
}
