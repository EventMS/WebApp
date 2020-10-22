import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ClubListQueryService } from 'src/app/services/GRAPHQL/club/queries/club-list-query.service';
@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit, OnDestroy {
  seatch: Subscription;
  constructor(private clubListQuery: ClubListQueryService) {}

  public clubs$: Observable<IGetClubsQuery>;

  private searches$ = fromEvent<Event & { target: HTMLInputElement }>(document, 'input');
  public filteredClubs: IGetClubsQuery['clubs'];

  ngOnInit() {
    this.clubs$ = this.clubListQuery.IGetClubsQuery$;
    this.clubs$.subscribe(({ clubs }) => {
      this.filteredClubs = clubs;
    });

    this.seatch = this.searches$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
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

  ngOnDestroy(): void {
    console.log(this.seatch.closed);
    this.seatch.unsubscribe();
  }

  public findLocalClubs = () => {
    console.log(this.filteredClubs);
  };
}
