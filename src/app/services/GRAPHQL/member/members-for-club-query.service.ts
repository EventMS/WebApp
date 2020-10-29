import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IMembersForClubQuery, IMembersForClubQueryVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class MembersForClubQueryService extends Query<IMembersForClubQuery, IMembersForClubQueryVariables> {
  document = gql`
    query IMembersForClubQuery($clubId: String!) {
      membersForClub(clubId: $clubId){
        user{
          name
          id
          permissions{
            userRole
          }
        }
      }
    }
  `;
}
