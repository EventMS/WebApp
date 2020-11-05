import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IMyClubsListQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyClubsListQueryService extends Query<IMyClubsListQuery> {
  document = gql`
  query IMyClubsListQuery {
    myClubs {
      name
      clubId
      description
      address
      clubsubscription {
        clubSubscriptionId
        name
      }
    }
    currentUser{
      permissions{
        userRole
        clubId
        clubSubscription{
          name
          clubSubscriptionId
        }
      }
    }
  }
`;
}
