import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubCreatePageRoutingModule } from './club-create-routing.module';

import { ClubCreatePage } from './club-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubCreatePageRoutingModule
  ],
  declarations: [ClubCreatePage]
})
export class ClubCreatePageModule {}
