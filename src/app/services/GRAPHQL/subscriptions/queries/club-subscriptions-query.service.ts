import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ISubscriptionsForClubQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClubSubscriptionsQueryService extends Query<ISubscriptionsForClubQuery> {
  document = gql`
    query ISubscriptionsForClubQuery {
      subscriptionsForClub(clubId: "3720e232-5af8-484b-3fa9-08d86b6d8e06"){
        name
        price
      }
    }
  `;
}
