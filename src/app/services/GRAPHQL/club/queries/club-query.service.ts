import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IMyClubsQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClubQueryService extends Query<IMyClubsQuery> {

  document = gql`
  query IClub {
    clubs{
      accountNumber,
  		address,
  		adminId,
      clubId,
      description,
      instructorIds,
      name,
      phoneNumber,
      registrationNumber
    }
  }
`;
}
