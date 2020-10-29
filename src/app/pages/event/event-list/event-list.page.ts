import { Component, OnInit } from '@angular/core';
import { Paths } from 'src/app/navigation/routes';
import { EventListQueryService } from 'src/app/services/GRAPHQL/events/queries/event-list-query.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  public route = (eventId: string) => Paths.event_page.route(eventId);

  constructor(public eventListQueryService: EventListQueryService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.eventListQueryService.getEvents();
    console.log("will enter")
  }
}
