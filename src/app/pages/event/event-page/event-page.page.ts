import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventPageInfoQueryService } from 'src/app/services/GRAPHQL/events/queries/event-page-info-query.service';
import { EventPageQueryService } from 'src/app/services/GRAPHQL/events/queries/event-page.service';
import {
  IEventPageInfoQuery,
  IEventPageInfoQuery_currentUser,
  IEventPageQuery,
  IEventPageQuery_getEvent,
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
  public eventId: string;
  public disabled: boolean;
  public alreadySignedUp: boolean = false;

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
        eventId: this.eventId,
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
              this.eventId = getEvent.eventId!;
              this.handleAlreadySignedUp(currentUser, getEvent);
              this.handlePriceForEvent(clubByID, currentUser, getEvent);
            });
          }
        });
      }
    });
  };

  handleAlreadySignedUp(currentUser: IEventPageInfoQuery['currentUser'], getEvent: IEventPageQuery['getEvent']) {
    const eventId = currentUser!.events?.find((event) => event?.eventId === getEvent!.eventId);
    if (eventId) {
      this.alreadySignedUp = true;
      this.disabled = true;
    }
  }

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

      if (price && price !== getEvent?.publicPrice) {
        this.price = price;
        this.color = 'green';
      } else if (getEvent.publicPrice) {
        this.price = getEvent.publicPrice;
      } else {
        this.disabled = true;
      }
    }
  };
}
