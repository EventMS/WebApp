import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IEventListQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventListQueryService extends Query<IEventListQuery> {
  document = gql`
    query IEventListQuery {
      eventsConfirmed {
        eventId
        name
        description
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
