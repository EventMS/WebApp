import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component';
import { ClubManageSubcriptionsComponent } from './club-manage/club-manage-subcriptions/club-manage-subcriptions.component';
import { ClubManageEventsComponent } from './club-manage/club-manage-events/club-manage-events.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
      return new Intl.DateTimeFormat('ca', {
          hour: 'numeric',
          minute: 'numeric'
      }).format(date);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(date);
  }
}

@NgModule({
  declarations: [
    HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ClubManageSubcriptionsComponent,
    ClubManageEventsComponent,
    EventCalendarComponent
  ],
  exports: [
    HeaderBarComponent, 
    ProfileOptionsComponent, 
    ConfirmationButtonComponent, 
    ClubManageSubcriptionsComponent, 
    ClubManageEventsComponent, 
    EventCalendarComponent],
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule, 
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
  }, {
    dateFormatter: {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  })
  ],
})
export class ComponentsModule {}
