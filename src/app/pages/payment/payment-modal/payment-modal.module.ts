import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { StripeModule } from 'stripe-angular';
import { PaymentModalPageRoutingModule } from './payment-modal-routing.module';

import { PaymentModalPage } from './payment-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentModalPageRoutingModule, ComponentsModule],
  declarations: [PaymentModalPage],
})
export class PaymentModalPageModule {}
