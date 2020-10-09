import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component';
import { ClubManageSubcriptionsComponent } from './club-manage/club-manage-subcriptions/club-manage-subcriptions.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ClubManageSubcriptionsComponent,
  ],
  exports: [HeaderBarComponent, ProfileOptionsComponent, ConfirmationButtonComponent, ClubManageSubcriptionsComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class ComponentsModule {}
