import { Injectable } from '@angular/core';
import { CreateEventRequestInput, ICreateEventClubQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs'
import { CreateEventClubQueryService } from '../club/queries/create-event-club-query.service';
import { map } from 'rxjs/operators';
import { CreateEventMutationService } from './mutations/create-event-mutation.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private createEventClubQuery: CreateEventClubQueryService,
    private createEventMutation: CreateEventMutationService) { }

  createEvent(request: CreateEventRequestInput) {
    return this.createEventMutation
    .mutate(
      {
        request: request
      }
    )
  }

  createEventClubInfo(clubId: string): Observable<ICreateEventClubQuery["clubByID"]> {
    return this.createEventClubQuery.
    watch(
      {
        clubId: clubId 
      },
      { fetchPolicy: "cache-and-network" }
    )
    .valueChanges
    .pipe(map(result => result.data.clubByID))
  }
}
