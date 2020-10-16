import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { IMyClubsQuery, IMyClubsQuery_myClubs } from 'src/graphql_interfaces';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {

  clubs$: Observable<IMyClubsQuery["myClubs"]>;
  clubs: IMyClubsQuery["myClubs"] = [];

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private clubQueryService: MyClubsQueryService,
    private authenticationService: AuthenticationService
  ) {
    
  }

  ngOnInit() {
    console.log('Init called');

    this.clubs$ = this.clubQueryService.watch().valueChanges.pipe(map(result => result.data.myClubs))
    this.clubs$.subscribe(
      (data) => {
      this.clubs = data;
      console.log("clubs updated")
    })
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
}
