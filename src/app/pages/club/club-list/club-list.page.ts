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
export class ClubListPage implements OnInit {
  constructor(private clubService: ClubService, private loadingController: LoadingController) {}

  public clubs: IGetClubsQuery['clubs'] = [];
  public filteredClubs: IGetClubsQuery['clubs'] = [];

  public searchQuery: string

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.clubService.getAllClubs().subscribe(async ({ clubs }) => {
      this.clubs = clubs
      this.filteredClubs = clubs;
      await loading.dismiss();
    });
  }

  public onSearch(query: string) {
    this.filteredClubs = this.clubs!.filter((club) => {
      return club!.name!.toLowerCase().includes(query.toLowerCase());
    })
  } 

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading clubs...' });
  };

  public findLocalClubs = () => {
    console.log(this.filteredClubs);
  };
}
