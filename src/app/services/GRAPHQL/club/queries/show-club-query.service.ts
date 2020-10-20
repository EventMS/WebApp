import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IShowClubQuery, IShowClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShowClubQueryService extends Query<IShowClubQuery, IShowClubQueryVariables> {
  document = gql`
    query IShowClubQuery($clubByNameName: String) {
      clubByName(name: $clubByNameName) {
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
        }
        description
        instructors {
          name
          email
          id
        }
        user {
          id
          email
        }
      }
    }
  `;
}
