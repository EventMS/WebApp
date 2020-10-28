import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubManagePage } from './club-manage.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ClubManagePageRoutingModule } from './club-manage-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubManagePageRoutingModule,
    ComponentsModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  declarations: [ClubManagePage],
})
export class ClubManagePageModule {}
