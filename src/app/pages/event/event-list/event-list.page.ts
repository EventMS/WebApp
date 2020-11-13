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
  public events$: Observable<ApolloQueryResult<IEventListQuery>>;
  public events: IEventListQuery["eventsConfirmed"]
  public filteredEvents: IEventListQuery["eventsConfirmed"]
  public route = (eventId: string) => Paths.event_page.route(eventId);

  public searchQuery: string;

  constructor(public eventService: EventService, private loadingController: LoadingController) {}

  ngOnInit() {}

  public didSearch(query: string) {
    this.filteredEvents = this.events!.filter((event) => {
      return event!.name!.toLowerCase().includes(query.toLowerCase());
    })
  } 

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.events$ = this.eventService.getAllEvents();

    this.events$.subscribe(async (next) => {
      await loading.dismiss();
      this.events = next.data.eventsConfirmed
      this.filteredEvents = next.data.eventsConfirmed
      return next.data.eventsConfirmed;
    });
  }

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading events...' });
  };
}
