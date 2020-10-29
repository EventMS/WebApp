import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventPageInfoQueryService } from 'src/app/services/GRAPHQL/events/event-page-info-query.service';
import { EventPageQueryService } from 'src/app/services/GRAPHQL/events/event-page.service';
import {
  IEventPageInfoQuery,
  IEventPageInfoQuery_clubByID,
  IEventPageInfoQuery_clubByID_clubsubscription,
  IEventPageQuery,
} from 'src/graphql_interfaces';
import { EventPaymentModalPage } from '../../payment/event-payment-modal/event-payment-modal.page';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit {
  public event$: Observable<IEventPageQuery>;
  public clubInfo$: Observable<IEventPageInfoQuery>;
  public price: number | string | null;
  public color = 'black';
  public eventName: string;
  public disabled: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventPageInfoQueryService: EventPageInfoQueryService,
    private eventPageQueryService: EventPageQueryService,
    private modalController: ModalController
  ) {}

  public isMobile = isPlatform('mobile');

  public onSignup = async () => {
    const modal = await this.modalController.create({
      component: EventPaymentModalPage,
      componentProps: {
        price: this.price,
        description: this.eventName,
      },
    });
    return await modal.present();
  };

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
            this.clubInfo$.subscribe(({ clubByID, currentUser }) => {
              this.eventName = getEvent.name!;
              this.handlePriceForEvent(clubByID, currentUser, getEvent);
            });
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
        this.price = `Price: ${price} $`;
        this.color = 'green';
      } else if (getEvent.publicPrice) {
        this.price = `Price: ${getEvent.publicPrice} $`;
      } else {
        this.price = 'You a not subcribed to this club';
        this.disabled = true;
      }
    }
  };
}
