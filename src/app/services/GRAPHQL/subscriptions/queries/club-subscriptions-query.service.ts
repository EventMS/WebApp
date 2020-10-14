import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ISubscriptionsForClubQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClubSubscriptionsQueryService extends Query<ISubscriptionsForClubQuery> {
  document = gql`
    query ISubscriptionsForClubQuery($clubId: Uuid!) {
      subscriptionsForClub(clubId: $clubId){
        name
        price
      }
    }
  `;
}
