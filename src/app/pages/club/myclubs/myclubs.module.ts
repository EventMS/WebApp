import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyclubsPageRoutingModule } from './myclubs-routing.module';

import { MyclubsPage } from './myclubs.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyclubsPageRoutingModule],
  declarations: [MyclubsPage],
})
export class MyclubsPageModule {}
