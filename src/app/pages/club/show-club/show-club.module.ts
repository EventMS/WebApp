import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowClubPageRoutingModule } from './show-club-routing.module';
import { ShowClubPage } from './show-club.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaymentModalPageModule } from '../../modals/payment-modal/payment-modal.module';

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
