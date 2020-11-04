import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IShowClubQuery, IShowClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShowClubQueryService extends Query<IShowClubQuery, IShowClubQueryVariables> {
  document = gql`
    query IShowClubQuery($clubByID: String!) {
      clubByID(clubId: $clubByID) {
        address
        accountNumber
        adminId
        clubId
        name
        phoneNumber
        registrationNumber
        clubsubscription {
          name
          price
          clubSubscriptionId
          clubId
        }
        description
        user {
          id
          email
        }
      }
      eventsForClub(clubId: $clubByID) {
        description
        eventId
        name
        eventPrices {
          price
          clubSubscriptionId
        }
      }
      currentUser {
        id
        name
        permissions {
          clubSubscriptionId
          clubId
        }
      }
    }
  `;
}
