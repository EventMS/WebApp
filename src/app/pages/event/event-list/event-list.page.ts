import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from 'src/app/navigation/routes';
import { EventListQueryService } from 'src/app/services/GRAPHQL/events/event-list-query.service';
import { IEventListQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  evenListQuery$: Observable<IEventListQuery>;

  public route = (eventId: string) => Paths.event_page.route(eventId);

  constructor(private eventListQueryService: EventListQueryService) {}

  ngOnInit() {
    this.evenListQuery$ = this.eventListQueryService.EventListQuery$;
  }
}
