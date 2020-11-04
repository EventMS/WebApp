import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Paths } from 'src/app/navigation/routes';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { IEventListQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  public events$: Observable<ApolloQueryResult<IEventListQuery>>
  public route = (eventId: string) => Paths.event_page.route(eventId);

  constructor(public eventService: EventService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.events$ = this.eventService.getAllEvents();
    console.log("will enter")
  }
}
