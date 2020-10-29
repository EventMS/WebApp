import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowClubPageRoutingModule } from './show-club-routing.module';

import { ShowClubPage } from './show-club.page';
import { PaymentModalPageModule } from '../../payment/payment-modal/payment-modal.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowClubPageRoutingModule,
    PaymentModalPageModule,
    ComponentsModule,
  ],
  declarations: [ShowClubPage],
})
export class ShowClubPageModule {}
