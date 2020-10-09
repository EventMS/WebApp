import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Paths } from 'src/app/navigation/routes';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  async createClubClicked() {
    console.log('Clicked create');
    await this.popoverController.dismiss().then(() => this.router.navigate([Paths.club_create]));
  }

  profileClicked() {
    console.log('Profile clicked');
  }

  async logOutClicked() {
    console.log('Log out clicked');
    await this.popoverController.dismiss().then(() => this.authenticationService.logout());
  }
}
