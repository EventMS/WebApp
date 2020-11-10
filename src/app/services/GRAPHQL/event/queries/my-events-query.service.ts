import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IMyEventsQuery } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyEventsQueryService extends Query<IMyEventsQuery> {
  document = gql`
    query IMyEventsQuery {
      myEventParticipations{
        eventParticipantId
        eventId
        event{
          name
          startTime
          endTime
        }
      }
      myInstructorEvents{
        eventId
        name
        startTime
        endTime
      }
    }
  `;
}
