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
  public route = (eventId: string) => Paths.event_page.route(eventId);

  constructor(public eventService: EventService, private loadingController: LoadingController) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const loading = await this.presentLoading();
    await loading.present();

    this.events$ = this.eventService.getAllEvents();

    this.events$.subscribe(async (next) => {
      await loading.dismiss();
      return next.data.eventsConfirmed;
    });
  }

  private presentLoading = async () => {
    return this.loadingController.create({ message: 'Loading events...' });
  };
}
