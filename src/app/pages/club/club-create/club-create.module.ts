import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubCreatePageRoutingModule } from './club-create-routing.module';
import { ClubCreatePage } from './club-create.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClubCreatePageRoutingModule, ComponentsModule, ReactiveFormsModule],
  declarations: [ClubCreatePage],
})
export class ClubCreatePageModule {}
