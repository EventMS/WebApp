import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component';
import { ClubManageSubcriptionsComponent } from './club-manage/club-manage-subcriptions/club-manage-subcriptions.component';
import { StripeElementsComponent } from './stripe-elements/stripe-elements.component';
import { MobileSignupComponent } from './buttons/mobile-signup/mobile-signup.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ClubManageSubcriptionsComponent,
    StripeElementsComponent,
    MobileSignupComponent,
  ],
  exports: [
    HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ClubManageSubcriptionsComponent,
    StripeElementsComponent,
    MobileSignupComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class ComponentsModule {}
