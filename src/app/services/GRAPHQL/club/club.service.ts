import { Injectable } from '@angular/core';
import { CreateClubRequestInput, ICreateEventClubQuery, ICreateEventClubQuery_clubByID } from 'src/graphql_interfaces';
import { CreateClubMutationService } from './mutations/create-club-mutation.service';
import { MyClubsQueryService } from './queries/my-clubs-query.service';
import { ClubListQueryService } from './queries/club-list-query.service';
import { CreateEventClubQueryService } from './queries/create-event-club-query.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private createClubMutation: CreateClubMutationService,
    private myClubsQuery: MyClubsQueryService,
    private clubListQuery: ClubListQueryService,
    private createEventClubQuery: CreateEventClubQueryService) {}


  // Mutations

  createClub(request: CreateClubRequestInput) {
    return this.createClubMutation.mutate(
      {
        request: request
      }
    ,{refetchQueries: [{query: this.myClubsQuery.document}, {query: this.clubListQuery.document}]})
  }
}
