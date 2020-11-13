import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateEventClubQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs';
import { EMSEvent } from 'src/app/pages/event/create-event/create-event.page';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';

@Component({
  selector: 'app-club-manage-events',
  templateUrl: './club-manage-events.component.html',
  styleUrls: ['./club-manage-events.component.scss'],
})
export class ClubManageEventsComponent implements OnInit {
  private clubId: string;
  events: EMSEvent[] = [];
  eventsForChosenDate: EMSEvent[] = [];
  todaysDate: Date = new Date();

  selectedEvent: EMSEvent | null = null;
  selectedDate: Date | null = null;

  club$: Observable<ICreateEventClubQuery['clubByID']>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventService: EventService) {}

  ngOnInit() {
    this.getRoute().then(() => {
      this.getEvents();
    });
  }

  dayClicked(date: Date, events: EMSEvent[]): void {
    this.eventsForChosenDate = events;
    this.selectedDate = date;
    this.selectedEvent = null;
  }

  cardClicked(event: EMSEvent) {
    this.selectedEvent = event;
  }

  createTimeString(date: Date): string {
    return date.toDateString() + ', ' + date.getHours() + ':' + date.getMinutes();
  }

  getEvents() {
    this.club$ = this.eventService.createEventClubInfo(this.clubId);
    this.club$.subscribe((data) => {
      this.events = this.createEvents(data);
    });
  }

  private async getRoute() {
    this.activatedRoute.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  private createEvents(data: ICreateEventClubQuery['clubByID']): EMSEvent[] {
    if (data == null) {
      return [];
    }

    var events: EMSEvent[] = [];

    data.events!.forEach((e) => {
      if (!e) {
        return null;
      }

      var locations: string[] = [];

      e.locations!.forEach((e) => {
        if (!e) {
          return null;
        }
        locations.push(e.roomId);
      });

      events.push({
        start: new Date(e.startTime),
        end: new Date(e.endTime),
        locationIds: locations,
        title: e.name ?? '',
        isCurrentEvent: false,
        description: e.description ?? '',
      });
    });

    return events;
  }

  async onCreateClicked() {
    this.router.navigate(['event-create', this.clubId]);
    this.selectedDate = null;
    this.selectedEvent = null;
  }
}
