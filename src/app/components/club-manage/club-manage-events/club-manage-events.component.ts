import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventCreateComponent } from './event-create/event-create.component';

@Component({
  selector: 'app-club-manage-events',
  templateUrl: './club-manage-events.component.html',
  styleUrls: ['./club-manage-events.component.scss'],
})
export class ClubManageEventsComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async onCreateClicked() {
    const modal = await this.modalController.create({
      component: EventCreateComponent,
      cssClass: 'modal-popup'
    });

    return await modal.present();
  }
}
