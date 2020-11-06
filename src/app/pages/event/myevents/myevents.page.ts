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
  upcomingMemberEvents: IMyEventsQuery["myEventParticipations"] = []
  pastMemberEvents: IMyEventsQuery["myEventParticipations"] = []
  upcomingInstructorEvents: IMyEventsQuery["myInstructorEvents"] = []

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getData();
  }

  showUpcomingEvents(): boolean {
    if(!this.upcomingMemberEvents || !this.upcomingInstructorEvents) {return false}
    return (this.upcomingMemberEvents.length > 0) || (this.upcomingInstructorEvents.length > 0)
  }

  showPastEvents(): boolean {
    if(!this.pastMemberEvents){return false}
    return (this.pastMemberEvents.length > 0)
  }

  formatDate(date: string): string {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString() + ", " + dateObject.toLocaleTimeString();
  }

  private isPast(dateString: string): boolean {
    const date = new Date(dateString)
    return date < this.today
  }
  
  private getDate(dateString): Date {
    return new Date(dateString)
  }

  private getData() {
    this.events$ = this.eventService.getMyEvents()
    this.events$.subscribe((events) => {
      this.upcomingMemberEvents = events.myEventParticipations!.filter(ev => !this.isPast(ev!.event!.endTime))
      this.pastMemberEvents = events.myEventParticipations!.filter(ev => this.isPast(ev!.event!.endTime));
      this.upcomingInstructorEvents = events.myInstructorEvents!.filter(ev => !this.isPast(ev!.endTime));
      this.pastMemberEvents.sort((ev1,ev2)=>this.getDate(ev2.event.endTime).getDay()-this.getDate(ev1.event.endTime).getDay())
    })
  }
}
