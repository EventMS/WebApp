import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-payment-modal',
  templateUrl: './event-payment-modal.page.html',
  styleUrls: ['./event-payment-modal.page.scss'],
})
export class EventPaymentModalPage implements OnInit {
  @Input() price: number;

  constructor() {}

  ngOnInit() {}
}
