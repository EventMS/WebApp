import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { Observable } from 'rxjs';
import { IMyClubsListQuery, IMyEventsQuery } from 'src/graphql_interfaces';
import { NfcService } from 'src/app/services/NFC/nfc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private eventService: EventService, private nfc: NfcService) {}

  ngOnInit() {}

  read() {
    this.nfc.read();
  }
  write() {
    this.nfc.write();
  }
}
