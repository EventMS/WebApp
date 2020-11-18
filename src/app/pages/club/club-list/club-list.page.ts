import { Component, OnInit } from '@angular/core';
import { IGetClubsQuery } from 'src/graphql_interfaces';
import { ClubService } from 'src/app/services/GRAPHQL/club/club.service';
import { LoadingController } from '@ionic/angular';
import { Paths } from 'src/app/navigation/routes';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  constructor(private clubService: ClubService, private loadingController: LoadingController) {}

  public clubs: IGetClubsQuery['clubs'] = [];
  public filteredClubs: IGetClubsQuery['clubs'] = [];

  public route = (clubId: string) => Paths.show_club.route(clubId);
  public searchQuery: string;

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.clubService.getAllClubs().subscribe(async ({ clubs }) => {
      this.clubs = this.filteredClubs = clubs;
      await loading.dismiss();
    });
  }

  public onSearch(query: string) {
    this.filteredClubs = this.clubs!.filter((club) => {
      return club!.name!.toLowerCase().includes(query.toLowerCase());
    });
  }

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading clubs...' });
  };
}
