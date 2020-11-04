import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPaymentModalPageRoutingModule } from './event-payment-modal-routing.module';

import { EventPaymentModalPage } from './event-payment-modal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EventPaymentModalPageRoutingModule, ComponentsModule],
  declarations: [EventPaymentModalPage],
})
export class EventPaymentModalPageModule {}
