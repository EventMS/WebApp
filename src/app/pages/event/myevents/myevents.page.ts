import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { Observable } from 'rxjs'
import { IMyEventsQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.page.html',
  styleUrls: ['./myevents.page.scss'],
})
export class MyeventsPage implements OnInit {

  private today = new Date();

  events$: Observable<IMyEventsQuery>
  upcomingMemberEvents: IMyEventsQuery["myEventParticipations"]
  pastMemberEvents: IMyEventsQuery["myEventParticipations"]
  upcomingInstructorEvents: IMyEventsQuery["myInstructorEvents"]
  pastInstructorEvents: IMyEventsQuery["myInstructorEvents"]

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getData();
  }

  showUpcomingEvents(): boolean {
    return (this.upcomingMemberEvents.length > 0) || (this.upcomingInstructorEvents.length > 0)
  }

  showPastEvents(): boolean {
    return (this.pastMemberEvents.length > 0) || (this.pastInstructorEvents.length > 0)
  }

  private getData() {
    this.events$ = this.eventService.getMyEvents()
    this.events$.subscribe((events) => {
      this.upcomingMemberEvents = events.myEventParticipations.filter(ev => ev.event.startTime > this.today);
      this.pastMemberEvents = events.myEventParticipations.filter(ev => ev.event.endTime < this.today);
      this.upcomingInstructorEvents = events.myInstructorEvents.filter(ev => ev.startTime > this.today);
      this.pastInstructorEvents = events.myInstructorEvents.filter(ev => ev.endTime < this.today);
    })
  }
}
