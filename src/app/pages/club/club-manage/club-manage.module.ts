import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubManagePageRoutingModule } from './club-manage-routing.module';
import { ClubManagePage } from './club-manage.page';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubManagePageRoutingModule,
    ComponentsModule,
    MatSidenavModule
  ],
  declarations: [ClubManagePage]
})
export class ClubManagePageModule {}
