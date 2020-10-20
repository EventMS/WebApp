import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
