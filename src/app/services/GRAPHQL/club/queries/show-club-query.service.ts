import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IShowClubQuery, IShowClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShowClubQueryService extends Query<IShowClubQuery, IShowClubQueryVariables> {
  document = gql`
    query IShowClubQuery($clubByID: Uuid!) {
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

  /*   public ShowClubQuery$ = ({ clubByNameName }: IShowClubQueryVariables) =>
    this.watch({ clubByNameName: clubByNameName }).valueChanges.pipe(
      map(({ data, error }) => {
        if (error) console.log(error);
        return data;
      })
    ); */

  public ShowClubQuery$ = ({ clubByID }: IShowClubQueryVariables) =>
    this.fetch({ clubByID: clubByID }).pipe(map((club) => club.data));
}
