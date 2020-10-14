import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowClubPageRoutingModule } from './show-club-routing.module';

import { ShowClubPage } from './show-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowClubPageRoutingModule
  ],
  declarations: [ShowClubPage]
})
export class ShowClubPageModule {}
