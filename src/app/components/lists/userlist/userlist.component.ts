import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { IEventUserListQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  @Input() eventId: string;
  public participants$: Observable<IEventUserListQuery>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.participants$ = this.eventService.getEventParticipants({ eventId: this.eventId });
  }
}
