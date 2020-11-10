import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { fromEvent, Observable } from 'rxjs';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  constructor(private clubService: ClubService) {}

  private searches$ = fromEvent<Event & { target: HTMLInputElement }>(document, 'input');
  public filteredClubs: IGetClubsQuery['clubs'];

  ngOnInit() {}

  ionViewWillEnter() {
    this.clubService.getAllClubs().subscribe(({ clubs }) => {
      this.filteredClubs = clubs;
    });

    this.searches$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      requestAnimationFrame(() =>
        this.clubService.getAllClubs().subscribe(
          ({ clubs }) =>
            (this.filteredClubs = clubs!.filter((club) => {
              if (club && club.name) return club.name.toLowerCase().includes(searchTerm.target.value.toLowerCase());
            }))
        )
      );
    });
  }

  public findLocalClubs = () => {
    console.log(this.filteredClubs);
  };
}
