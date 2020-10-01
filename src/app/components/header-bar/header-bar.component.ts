import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent implements OnInit {

  ngOnInit() {}

  constructor(public popoverController: PopoverController,
              public platform: Platform) {

  }

  async tappedProfile(ev: any) {
    console.log("Tapped profiled")
    const popover = await this.popoverController.create({
      component: ProfileOptionsComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  tappedFindClubs() {
    console.log("Tapped find clubs")
  }

  tappedFindEvents() {
    console.log("Tapped find events")
  }

  tappedMyEvents() {
    console.log("Tapped my events")
  }

  tappedMyClubs() {
    console.log("Tapped my clubs")
  }
}
