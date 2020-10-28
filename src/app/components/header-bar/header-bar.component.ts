import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, PopoverController } from '@ionic/angular';
import { Paths } from 'src/app/navigation/routes';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  title: string = this.platform.is('mobile') ? 'EMS' : 'Event Management System';

  ngOnInit(){}

  constructor(public popoverController: PopoverController, public platform: Platform, private router: Router) {}

  async tappedProfile(ev: Event) {
    const popover = await this.popoverController.create({
      component: ProfileOptionsComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  tappedFindClubs() {
    this.router.navigate([Paths.club_list]);
  }

  tappedFindEvents() {
    this.router.navigate([Paths.event_list]);
  }

  tappedMyEvents() {
    console.log('Tapped my events');
  }

  tappedMyClubs() {
    console.log('Tapped my clubs');
  }
}
