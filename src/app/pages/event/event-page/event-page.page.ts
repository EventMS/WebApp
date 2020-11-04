import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
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
    private eventService: EventService,
    private modalController: ModalController
  ) {}

  public isMobile = isPlatform('mobile');

  public onSignup = async () => {
    if (this.price === 0) {
      this.eventService.signUpForFreeEvent(this.eventId).subscribe(() => (this.alreadySignedUp = true));
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
        this.event$ = this.eventService.getEventDetails(eventId);
        this.event$.subscribe(({ getEvent }) => {
          if (getEvent) {
            this.clubInfo$ = this.eventService.getEventPageInfo(getEvent.clubId);
            this.clubInfo$.subscribe(({ clubByID, currentUser }) => {
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
