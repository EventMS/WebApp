import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ClubListQueryService } from 'src/app/services/GRAPHQL/club/club-list-query.service';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  constructor(private clubListQuery: ClubListQueryService) {}

  private clubs$: Observable<IGetClubsQuery['clubs']>;
  private searches$ = fromEvent<Event & { target: HTMLInputElement }>(document, 'input');

  public filteredClubs: IGetClubsQuery['clubs'];

  ngOnInit() {
    this.clubs$ = this.clubListQuery.watch().valueChanges.pipe(map((result) => result.data.clubs));

    this.clubs$.subscribe((clubs) => (this.filteredClubs = clubs));

    this.searches$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      requestAnimationFrame(() =>
        this.clubs$.subscribe(
          (clubs) =>
            (this.filteredClubs = clubs!.filter((club) => {
              if (club && club.name) return club.name.toLowerCase().includes(searchTerm.target.value.toLowerCase());
            }))
        )
      );
    });
  }
}
