import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {
  title: string = this.platform.is('mobile') ? 'EMS' : 'Event Management System';

  ngOnInit(){}

  constructor(private popoverController: PopoverController,
     public platform: Platform) {
  }

  async tappedProfile(ev: any) {
    console.log('Tapped profiled');
    const popover = await this.popoverController.create({
      component: ProfileOptionsComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  tappedFindClubs() {
    console.log('Tapped find clubs');
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
