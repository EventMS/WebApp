import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPagePageRoutingModule } from './event-page-routing.module';

import { EventPagePage } from './event-page.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { EventPaymentModalPageModule } from '../../payment/event-payment-modal/event-payment-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPagePageRoutingModule,
    ComponentsModule,
    EventPaymentModalPageModule,
  ],
  declarations: [EventPagePage],
})
export class EventPagePageModule {}
