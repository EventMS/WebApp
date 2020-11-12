import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { fromEvent, Observable } from 'rxjs';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit, AfterViewInit {
  constructor(private clubService: ClubService, private loadingController: LoadingController) {}

  public filteredClubs: IGetClubsQuery['clubs'];
  private searches$: Observable<any>;

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.clubService.getAllClubs().subscribe(async ({ clubs }) => {
      this.filteredClubs = clubs;
      await loading.dismiss();
    });
  }

  ngAfterViewInit(): void {
    this.searches$ = fromEvent<any>(document.querySelector('ion-searchbar'), 'input');

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

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading clubs...' });
  };

  public findLocalClubs = () => {
    console.log(this.filteredClubs);
  };
}
