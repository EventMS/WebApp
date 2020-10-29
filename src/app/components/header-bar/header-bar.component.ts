import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, PopoverController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Paths } from 'src/app/navigation/routes';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  title: string = this.platform.is('mobile') ? 'EMS' : 'Event Management System';

  constructor(public popoverController: PopoverController, public platform: Platform, private router: Router, public authService: AuthenticationService) {}

  ngOnInit(){}

  async tappedProfile(ev: Event) {
    console.log('Tapped profiled');
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
    console.log('Tapped find events');
  }

  tappedMyEvents() {
    console.log('Tapped my events');
  }

  tappedMyClubs() {
    console.log('Tapped my clubs');
  }
}
