import { Injectable } from '@angular/core';
import { CreateClubRequestInput, ICreateClubMutation_createClub } from 'src/graphql_interfaces';
import { CreateClubMutationService } from './mutations/create-club-mutation.service';
import { MyClubsQueryService } from './queries/my-clubs-query.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private createClubMutation: CreateClubMutationService,
    private myClubsQuery: MyClubsQueryService) {}


  // Mutations

  createClub(request: CreateClubRequestInput): Observable<ICreateClubMutation_createClub["clubId"]> {
    return this.createClubMutation.mutate(
      {
        request: request
      },
      { refetchQueries: [{ query: this.myClubsQuery.document }] }
    )
  }
}
