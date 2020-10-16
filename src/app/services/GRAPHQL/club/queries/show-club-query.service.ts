import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IShowClubQuery, IShowClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShowClubQueryService extends Query<IShowClubQuery, IShowClubQueryVariables> {
  document = gql`
    query IShowClubQuery($name: String!) {
      club(name: $name) {
        name
        clubId
        accountNumber
        phoneNumber
        registrationNumber
        address
        description
      }
    }
  `;
}
