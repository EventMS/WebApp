import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { Observable } from 'rxjs'
import { IMyClubsListQuery, IMyEventsQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private eventService: EventService) {}

  ngOnInit() {
  }
}
