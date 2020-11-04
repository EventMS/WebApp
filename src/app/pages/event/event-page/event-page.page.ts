import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FreeSignUpMutationService } from 'src/app/services/GRAPHQL/events/mutations/free-sign-up-mutation.service';
import { EventPageInfoQueryService } from 'src/app/services/GRAPHQL/events/queries/event-page-info-query.service';
import { EventPageQueryService } from 'src/app/services/GRAPHQL/events/queries/event-page.service';
import { IEventPageInfoQuery, IEventPageQuery, IEventPageQuery_getEvent } from 'src/graphql_interfaces';
import { EventPaymentModalPage } from '../../modals/event-payment-modal/event-payment-modal.page';
import { VerifyModalUserPage } from '../../modals/verify-modal-user/verify-modal-user.page';

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
    private modalController: ModalController,
    private freeSignUpMutationService: FreeSignUpMutationService
  ) {}

  public isMobile = isPlatform('mobile');

  public onSignup = async () => {
    if (this.price === 0) {
      this.freeSignUpMutationService
        .signUpForFreeEventMutation({ eventId: this.eventId })
        .subscribe(() => (this.alreadySignedUp = true));
      return;
    }

    const modal = await this.modalController.create({
      component: EventPaymentModalPage,
      componentProps: {
        price: this.price,
        description: this.eventName,
        eventId: this.eventId,
        callback: this.modalCallback,
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
            this.clubInfo$.subscribe(({ currentUser }) => {
              this.eventName = getEvent.name!;
              this.eventId = getEvent.eventId!;
              this.handleAlreadySignedUp(currentUser, getEvent);
              this.handlePriceForEvent(getEvent);
            });
          }
        });
      }
    });
  };

  public modalCallback = (succes: boolean) => {
    if (succes) {
      this.alreadySignedUp = true;
    }
  };

  public onVerifyClicked = async () => {
    const modal = await this.modalController.create({ component: VerifyModalUserPage });
    return await modal.present();
  };

  public handleAlreadySignedUp = (
    currentUser: IEventPageInfoQuery['currentUser'],
    getEvent: IEventPageQuery['getEvent']
  ) => {
    const event = currentUser!.events?.find((event) => event?.eventId === getEvent!.eventId);
    if (event) {
      this.alreadySignedUp = true;
    }
  };

  private handlePriceForEvent = (getEvent: IEventPageQuery_getEvent) => {
    const { userPrice: price } = getEvent;

    if (price !== getEvent?.publicPrice) {
      this.price = price;
      this.color = 'green';
    } else if (getEvent.publicPrice) {
      this.color = 'black';
      this.price = getEvent.publicPrice;
    }
  };
}
