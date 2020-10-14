import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component';
import { ClubManageSubcriptionsComponent } from './club-manage/club-manage-subcriptions/club-manage-subcriptions.component';
import { ClubManageEventsComponent } from './club-manage/club-manage-events/club-manage-events.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ClubManageSubcriptionsComponent,
    ClubManageEventsComponent
  ],
  exports: [HeaderBarComponent, ProfileOptionsComponent, ConfirmationButtonComponent, ClubManageSubcriptionsComponent, ClubManageEventsComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class ComponentsModule {}
