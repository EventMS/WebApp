import { Component, OnInit } from '@angular/core';
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
export class ClubListPage implements OnInit {
  constructor(private clubService: ClubService, private loadingController: LoadingController) {}

  private searches$ = fromEvent<Event & { target: HTMLInputElement }>(document, 'input');
  public filteredClubs: IGetClubsQuery['clubs'];

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.clubService.getAllClubs().subscribe(async ({ clubs }) => {
      this.filteredClubs = clubs;
      await loading.dismiss();
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

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading clubs...' });
  };

  public findLocalClubs = () => {
    console.log(this.filteredClubs);
  };
}
