import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
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
          clubId
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
      currentUser {
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

  public ShowClubQuery$ = ({ clubByNameName }: IShowClubQueryVariables) =>
    this.fetch({ clubByNameName: clubByNameName }).pipe(map((club) => club.data));
}
