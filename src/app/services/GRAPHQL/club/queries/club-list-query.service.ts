import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IGetClubsQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClubListQueryService extends Query<IGetClubsQuery> {
  document = gql`
    query IGetClubsQuery {
      clubs {
        clubId
        accountNumber
        address
        adminId
        description
        name
        phoneNumber
        registrationNumber
      }
    }
  `;
}
