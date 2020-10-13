import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
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

  public clubs$: Observable<IGetClubsQuery['clubs']>;
  public filteredClubs: IGetClubsQuery['clubs'];
  private searchTerm: string;

  public search = (event: EventData) => {
    const { value } = event.target;
    this.searchTerm = value;
  };

  public onSearchPressed = () => {
    requestAnimationFrame(() =>
      this.clubs$.subscribe(
        (clubs) =>
          (this.filteredClubs = clubs!.filter((club) => {
            if (club && club.name) return club.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          }))
      )
    );
  };

  ngOnInit() {
    this.clubs$ = this.clubListQuery.watch().valueChanges.pipe(map((result) => result.data.clubs));
    this.clubs$.subscribe((clubs) => (this.filteredClubs = clubs));
  }
}

type EventData = {
  target: {
    value: string;
  };
};
