import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paths } from 'src/app/navigation/routes';
import { AuthenticationService } from 'src/app/services/GRAPHQL/user/authentication.service';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { IMyClubsQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  clubs$: Observable<IMyClubsQuery['myClubs']>;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private clubQueryService: MyClubsQueryService,
    private authenticationService: AuthenticationService
  ) {
    
  }

  ngOnInit() {
    this.getClubs();
  }

  async createClubClicked() {
    await this.popoverController.dismiss().then(() => this.router.navigate([Paths.club_create]));
  }

  async manageClubClicked(clubId: string) {
    await this.popoverController.dismiss().then(() => this.router.navigate(Paths.club_manage.route(clubId)));
  }

  profileClicked() {
    console.log('Profile clicked');
  }

  async logOutClicked() {
    await this.popoverController.dismiss().then(() => this.authenticationService.logout());
  }

  private getClubs() {
    this.clubs$ = this.clubQueryService
    .watch({})
    .valueChanges
    .pipe(map(({ data }) => data.myClubs));
  }
}
