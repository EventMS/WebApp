import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { fromEvent, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClubListQueryService } from 'src/app/services/GRAPHQL/club/queries/club-list-query.service';
@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  constructor(private clubListQuery: ClubListQueryService, private router: Router) {}

  public clubs$: Observable<IGetClubsQuery>;

  private searches$ = fromEvent<Event & { target: HTMLInputElement }>(document, 'input');

  public filteredClubs: IGetClubsQuery['clubs'];

  ngOnInit() {
    this.clubs$ = this.clubListQuery.IGetClubsQuery$;
    this.clubs$.subscribe(({ clubs }) => {
      this.filteredClubs = clubs;
    });
    this.searches$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      requestAnimationFrame(() =>
        this.clubs$.subscribe(
          ({ clubs }) =>
            (this.filteredClubs = clubs!.filter((club) => {
              if (club && club.name) return club.name.toLowerCase().includes(searchTerm.target.value.toLowerCase());
            }))
        )
      );
    });
  }
}
