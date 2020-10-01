import { Component, OnInit } from '@angular/core';
import { ConfirmationButtonComponentDelegate } from 'src/app/components/confirmation-button/confirmation-button.component';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.page.html',
  styleUrls: ['./club-create.page.scss'],
})
export class ClubCreatePage implements OnInit, ConfirmationButtonComponentDelegate {

  constructor() { }

  didPressButton() {
    console.log("Submit clicked")
  }

  ngOnInit() {
  }

}
