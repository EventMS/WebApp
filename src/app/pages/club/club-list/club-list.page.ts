import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ClubListQueryService } from 'src/app/services/GRAPHQL/club/club-list-query.service';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  constructor(private clubListQuery: ClubListQueryService) {}

  clubs: Observable<IGetClubsQuery['clubs']>;

  ngOnInit() {
    this.clubs = this.clubListQuery.watch().valueChanges.pipe(map((result) => result.data.clubs));
  }
}
