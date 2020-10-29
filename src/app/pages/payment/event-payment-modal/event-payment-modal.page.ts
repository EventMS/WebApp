import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-payment-modal',
  templateUrl: './event-payment-modal.page.html',
  styleUrls: ['./event-payment-modal.page.scss'],
})
export class EventPaymentModalPage implements OnInit {
  @Input() price: number;
  @Input() description: number;
  @Input() eventId: string;
  @Input() callback: (success: boolean) => void;

  constructor(private modalController: ModalController) {}

  public dismissModal = (success: boolean) => {
    this.callback(success);
    this.modalController.dismiss();
  };

  ngOnInit() {}
}
