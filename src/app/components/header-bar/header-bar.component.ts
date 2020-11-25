import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, PopoverController } from '@ionic/angular';
import { Paths } from 'src/app/navigation/routes';
import { AuthenticationService } from 'src/app/services/GRAPHQL/user/authentication.service';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  title: string = this.platform.is('mobile') ? 'EMS' : 'Event Management System';

  constructor(
    public popoverController: PopoverController,
    public platform: Platform,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {}

  async tappedProfile(ev: Event) {
    const popover = await this.popoverController.create({
      component: ProfileOptionsComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  tappedTitle() {
    this.router.navigate([Paths.dashboard]);
  }

  tappedFindClubs() {
    this.router.navigate([Paths.club_list]);
  }

  tappedFindEvents() {
    this.router.navigate([Paths.event_list]);
  }

  tappedMyEvents() {
    this.router.navigate([Paths.my_events]);
  }

  tappedMyClubs() {
    this.router.navigate([Paths.my_clubs]);
  }
}
