import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {

  constructor(private router: Router,
    private popoverController: PopoverController) { }

  ngOnInit() {}

  async createClubClicked() {
    console.log("Clicked create")
    await this.popoverController.dismiss().then(() => this.router.navigate(['tabs/club-create'])
    );
  }

  profileClicked() {
    console.log("Profile clicked")
  }

  logOutClicked() {
    console.log("Log out clicked")
  }
}
