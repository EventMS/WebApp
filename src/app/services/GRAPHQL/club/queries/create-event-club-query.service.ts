import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ICreateEventClubQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class CreateEventClubQueryService extends Query<ICreateEventClubQuery> {

  document = gql`
  query ICreateEventClubQuery($clubId: Uuid!) {
    clubByID(clubId: $clubId){
      rooms{
        roomId
        name
      }
      instructors{
        id
        name
      }
      clubsubscription{
        clubSubscriptionId
        name
      }
    }
  }
`;
}
