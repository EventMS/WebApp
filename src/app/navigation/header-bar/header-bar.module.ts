import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderBarPageRoutingModule } from './header-bar-routing.module';

import { HeaderBarPage } from './header-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderBarPageRoutingModule
  ],
  declarations: [HeaderBarPage]
})
export class HeaderBarPageModule {}
