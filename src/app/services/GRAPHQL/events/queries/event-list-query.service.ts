import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
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
      }
    }
  `;

  public Events: Observable<any>

  getEvents() {
    this.Events = this.fetch(null, {fetchPolicy: 'network-only'});
  }
}
