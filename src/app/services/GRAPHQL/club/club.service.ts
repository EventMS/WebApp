import { Injectable } from '@angular/core';
import { CreateClubRequestInput, IGetClubsQuery, IMyClubsListQuery, IShowClubQuery } from 'src/graphql_interfaces';
import { CreateClubMutationService } from './mutations/create-club-mutation.service';
import { MyClubsQueryService } from './queries/my-clubs-query.service';
import { ClubListQueryService } from './queries/club-list-query.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShowClubQueryService } from './queries/show-club-query.service';
import { MyClubsListQueryService } from './queries/my-clubs-list-query.service';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(
    private createClubMutation: CreateClubMutationService,
    private myClubsQuery: MyClubsQueryService,
    private clubListQuery: ClubListQueryService,
    private showClubQueryService: ShowClubQueryService,
    private myClubsListQuery: MyClubsListQueryService
  ) {}

  // Mutations

  createClub(request: CreateClubRequestInput) {
    return this.createClubMutation.mutate(
      {
        request: request,
      },
      {
        refetchQueries: [
          { query: this.myClubsQuery.document },
          { query: this.clubListQuery.document },
          { query: this.myClubsListQuery.document },
        ],
      }
    );
  }

  // Queries

  getAllClubs(): Observable<IGetClubsQuery> {
    return this.clubListQuery.watch().valueChanges.pipe(map((value) => value.data));
  }

  getClubDetails(clubId: string): Observable<IShowClubQuery> {
    return this.showClubQueryService
      .watch({
        clubByID: clubId,
      })
      .valueChanges.pipe(map((club) => club.data));
  }

  myClubsListDetails(): Observable<IMyClubsListQuery> {
    return this.myClubsListQuery.watch().valueChanges.pipe(map((value) => value.data));
  }
}
