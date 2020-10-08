import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MyClubsQueryService } from 'src/app/services/GRAPHQL/club/queries/my-clubs-query.service';
import { IMyClubsQuery_myClubs } from 'src/graphql_interfaces';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {

  clubs: IMyClubsQuery_myClubs[] = [];

  constructor(private router: Router,
    private popoverController: PopoverController,
    private clubQueryService: MyClubsQueryService) {
      
    }

  ngOnInit() {
    console.log("Init called")
    this.getClubs()
  }

  async createClubClicked() {
    console.log("Clicked create")
    await this.popoverController.dismiss().then(() => this.router.navigate(['tabs/club-create/']));
  }

  async manageClubClicked(clubName: string) {
    await this.popoverController.dismiss().then(() => this.router.navigate(['tabs/club-manage/', clubName]))
  }

  profileClicked() {
    console.log("Profile clicked")
  }

  logOutClicked() {
    console.log("Log out clicked")
    this.getClubs()
    console.log(this.clubs)
  }

  private getClubs() {
    this.clubQueryService.fetch().subscribe(
      (data) => this.clubs = data.data.myClubs,
    )
  }
}
