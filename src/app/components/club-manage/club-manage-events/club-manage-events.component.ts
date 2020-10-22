import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CreateEventClubQueryService } from 'src/app/services/GRAPHQL/club/queries/create-event-club-query.service';
import { ICreateEventClubQuery, ICreateEventClubQuery_clubByID } from 'src/graphql_interfaces';
import { Observable } from 'rxjs';
import { EMSEvent } from 'src/app/pages/event/create-event/create-event.page';
import { DateClickedEvent } from '../../event-calendar/event-calendar.component';

@Component({
  selector: 'app-club-manage-events',
  templateUrl: './club-manage-events.component.html',
  styleUrls: ['./club-manage-events.component.scss'],
})
export class ClubManageEventsComponent implements OnInit {

  private clubId: string
  events: EMSEvent[] = []
  eventsForChosenDate: EMSEvent[] = []
  viewDate: Date = new Date()

  selectedEvent: EMSEvent = null

  club$: Observable<ICreateEventClubQuery["clubByID"]>

  constructor(private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clubQueryService: CreateEventClubQueryService) {

     }

  ngOnInit() {
    this.getRoute().then(() => {
      this.getEvents()
    })
  }

  dayClicked(events: EMSEvent[]): void {
    console.log(events)
    this.eventsForChosenDate = events
  }

  cardClicked(event: EMSEvent) {
    this.selectedEvent = event
  }

  private async getRoute() {
    this.activatedRoute.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  private getEvents() {
    this.club$ = this.clubQueryService.watch({clubId: this.clubId}, {fetchPolicy: "cache-and-network"})
    .valueChanges
    .pipe(map(result => result.data.clubByID))
    this.club$.subscribe(
      (data) => {
        this.events = this.createEvents(data)
        console.log(this.events)
      })
  }

  private createEvents(data: ICreateEventClubQuery_clubByID): EMSEvent[] {
    var events: EMSEvent[] = []

    data.events!.forEach(e => {
      var locations: string[] = []
      e!.locations!.forEach(e => {
        locations.push(e!.roomId)
      })

      events.push({
        start: new Date(e!.startTime),
        end: new Date(e!.endTime),
        locationIds: locations,
        title: e!.name ?? "",
        currentEvent: false
      })
    })

    return events
  }

  async onCreateClicked() {
    this.router.navigate(['event-create', this.clubId])
  }
}
