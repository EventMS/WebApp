import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ISubscriptionsForClubQuery, ISubscriptionsForClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClubSubscriptionsQueryService extends Query<
  ISubscriptionsForClubQuery,
  ISubscriptionsForClubQueryVariables
> {
  document = gql`
    query ISubscriptionsForClubQuery($clubId: String!) {
      subscriptionsForClub(clubId: $clubId) {
        name
        price
        clubSubscriptionId
      }
    }
  `;
}
