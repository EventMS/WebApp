import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { IMyClubsQuery_myClubs } from 'src/graphql_interfaces';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  clubs: IMyClubsQuery_myClubs[] = [];

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private clubQueryService: MyClubsQueryService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    console.log('Init called');
    this.getClubs();
  }

  async createClubClicked() {
    console.log('Clicked create');
    await this.popoverController.dismiss().then(() => this.router.navigate(['club-create/']));
  }

  async manageClubClicked(clubId: string) {
    await this.popoverController.dismiss().then(() => this.router.navigate(['club-manage/', clubId]));
  }

  profileClicked() {
    console.log('Profile clicked');
  }

  async logOutClicked() {
    console.log('Log out clicked');
    await this.popoverController.dismiss().then(() => this.authenticationService.logout());
  }

  private getClubs() {
    this.clubQueryService.fetch().subscribe((data) => (this.clubs = data.data.myClubs));
  }
}
