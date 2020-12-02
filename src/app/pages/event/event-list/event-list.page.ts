import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Paths } from 'src/app/navigation/routes';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import { IEventListQuery } from 'src/graphql_interfaces';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  constructor(public eventService: EventService, private loadingController: LoadingController) {}
  public events$: Observable<IEventListQuery>;
  public events: IEventListQuery['futureEvents'] = [];
  public filteredEvents: IEventListQuery['futureEvents'] = [];
  public searchQuery: string;
  public route = (eventId: string) => Paths.event_page.route(eventId);

  ngOnInit() {}

  public didSearch(query: string) {
    this.filteredEvents = this.events!.filter((event) => {
      return event!.name!.toLowerCase().includes(query.toLowerCase());
    });
  }

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.events$ = this.eventService.getAllEvents();

    this.events$.subscribe(async (next) => {
      await loading.dismiss();
      this.events = this.filteredEvents = next.futureEvents;
    });
  }

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading events...', duration: 10000, backdropDismiss: true });
  };
}
