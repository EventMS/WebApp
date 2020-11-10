import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { IMyClubsQuery } from 'src/graphql_interfaces';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class MyClubsQueryService extends Query<IMyClubsQuery> {
  document = gql`
    query IMyClubsQuery {
      myAdminClubs {
        name
        clubId
      }
    }
  `;
}
