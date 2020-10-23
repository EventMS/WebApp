import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paths } from 'src/app/navigation/routes';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { IMyClubsQuery, IMyClubsQuery_myClubs } from 'src/graphql_interfaces';

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
    console.log('Init called');
    this.getClubs();
  }

  async createClubClicked() {
    console.log('Clicked create');
    await this.popoverController.dismiss().then(() => this.router.navigate([Paths.club_create]));
  }

  async manageClubClicked(clubId: string) {
    await this.popoverController.dismiss().then(() => this.router.navigate(Paths.club_manage.route(clubId)));
  }

  profileClicked() {
    console.log('Profile clicked');
  }

  async logOutClicked() {
    console.log('Log out clicked');
    await this.popoverController.dismiss().then(() => this.authenticationService.logout());
  }

  private getClubs() {
    this.clubs$ = this.clubQueryService.watch().valueChanges.pipe(map(({ data }) => data.myClubs));
  }
}
