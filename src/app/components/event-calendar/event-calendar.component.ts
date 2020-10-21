import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EMSEvent } from 'src/app/pages/event/create-event/create-event.page';

export class DateRangeEvent {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
})
export class EventCalendarComponent implements OnInit {
  
  @Input() viewDate: Date
  @Input() events: EMSEvent[] = []
  @Output() eventChanged: EventEmitter<DateRangeEvent> = new EventEmitter()

  refresh: Subject<any> = new Subject();

  CalendarView = CalendarView

  view: CalendarView = CalendarView.Month

  ngOnInit() {}

  setView(view: CalendarView) {
    this.view = view
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.eventChanged.emit({ startDate: newStart, endDate: newEnd })
    this.refresh.next();
  }
}
