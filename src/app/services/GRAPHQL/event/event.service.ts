import { Injectable } from '@angular/core';
import { CreateEventRequestInput, ICreateEventClubQuery, IEventListQuery, IEventPageInfoQuery, IEventPageQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs'
import { CreateEventClubQueryService } from '../club/queries/create-event-club-query.service';
import { map } from 'rxjs/operators';
import { CreateEventMutationService } from './mutations/create-event-mutation.service';
import { EventListQueryService } from './queries/event-list-query.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { EventPageQueryService } from './queries/event-page.service';
import { EventPageInfoQueryService } from './queries/event-page-info-query.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private createEventClubQuery: CreateEventClubQueryService,
    private createEventMutation: CreateEventMutationService,
    private eventListQuery: EventListQueryService,
    private eventDetailsQuery: EventPageQueryService,
    private eventPageInfoQuery: EventPageInfoQueryService) { }

  // Mutations

  createEvent(request: CreateEventRequestInput) {
    return this.createEventMutation
    .mutate(
      {
        request: request
      }
    )
  }

  // Queries

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

  getAllEvents(): Observable<ApolloQueryResult<IEventListQuery>> {
    return this.eventListQuery.fetch({}, {fetchPolicy: 'network-only'})
  }

  getEventDetails(eventId: string): Observable<IEventPageQuery> {
    return this.eventDetailsQuery
    .watch(
      {
        eventId: eventId
      }
    )
    .valueChanges
    .pipe(map(({data}) => data))
  }

  getEventPageInfo(clubId: string): Observable<IEventPageInfoQuery> {
    return this.eventPageInfoQuery
    .watch(
      {
        clubByID: clubId
      }
    )
    .valueChanges
    .pipe(map(({data}) => data))
  }
}
