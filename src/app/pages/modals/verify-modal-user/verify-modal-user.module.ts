import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyModalUserPageRoutingModule } from './verify-modal-user-routing.module';

import { VerifyModalUserPage } from './verify-modal-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyModalUserPageRoutingModule
  ],
  declarations: [VerifyModalUserPage]
})
export class VerifyModalUserPageModule {}
