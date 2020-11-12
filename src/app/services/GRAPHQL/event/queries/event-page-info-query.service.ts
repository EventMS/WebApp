import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IEventPageInfoQuery, IEventPageInfoQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventPageInfoQueryService extends Query<IEventPageInfoQuery, IEventPageInfoQueryVariables> {
  document = gql`
    query IEventPageInfoQuery($clubByID: String!) {
      currentUser {
        id
        events {
          eventId
          status
        }
      }
      clubByID(clubId: $clubByID) {
        clubId
        name
        address
        clubsubscription {
          name
          price
          clubSubscriptionId
          clubId
        }
      }
    }
  `;
}
