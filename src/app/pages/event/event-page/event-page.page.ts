import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventPageInfoQueryService } from 'src/app/services/GRAPHQL/events/event-page-info-query.service';
import { EventPageQueryService } from 'src/app/services/GRAPHQL/events/event-page.service';
import {
  IEventPageInfoQuery,
  IEventPageInfoQuery_clubByID,
  IEventPageInfoQuery_clubByID_clubsubscription,
  IEventPageQuery,
} from 'src/graphql_interfaces';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit {
  public event$: Observable<IEventPageQuery>;
  public clubInfo$: Observable<IEventPageInfoQuery>;
  public price: number | null;
  public color = 'brown';

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventPageInfoQueryService: EventPageInfoQueryService,
    private eventPageQueryService: EventPageQueryService
  ) {}

  public isMobile = isPlatform('mobile');

  public showModal = () => {};

  public OnSignup = () => {};

  ngOnInit() {
    this.initData();
  }

  private initData = () => {
    this.activatedRoute.params.subscribe((params) => {
      const eventId = params['eventId'] as string;
      if (eventId) {
        this.event$ = this.eventPageQueryService.EventListQuery({ eventId });
        this.event$.subscribe(({ getEvent }) => {
          if (getEvent) {
            this.clubInfo$ = this.eventPageInfoQueryService.EventListInfoQuery({ clubByID: getEvent.clubId });
            this.clubInfo$.subscribe(({ clubByID, currentUser }) =>
              this.handlePriceForEvent(clubByID, currentUser, getEvent)
            );
          }
        });
      }
    });
  };

  private handlePriceForEvent = (
    clubByID: IEventPageInfoQuery['clubByID'],
    currentUser: IEventPageInfoQuery['currentUser'],
    getEvent: IEventPageQuery['getEvent']
  ) => {
    if (clubByID && currentUser && getEvent) {
      const subscriptionId = currentUser.permissions?.find((perm) => perm?.clubId == clubByID.clubId)
        ?.clubSubscriptionId;
      const currentSubscription = clubByID.clubsubscription?.find((sub) => sub?.clubSubscriptionId === subscriptionId);

      const price = getEvent.eventPrices?.find(
        (ePrice) => ePrice?.clubSubscriptionId == currentSubscription?.clubSubscriptionId
      )?.price;

      if (price) {
        this.price = price;
        this.color = 'green';
      } else {
        this.price = getEvent.publicPrice;
        this.color = 'black';
      }
    }
  };
}
