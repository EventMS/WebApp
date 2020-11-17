import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, isPlatform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Paths } from 'src/app/navigation/routes';
import { EventService } from 'src/app/services/GRAPHQL/event/event.service';
import {
  IEventPageInfoQuery,
  IEventPageInfoQuery_currentUser_events,
  IEventPageQuery,
  IEventPageQuery_getEvent,
  PresenceStatusEnum,
} from 'src/graphql_interfaces';
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
  public disabled: boolean;
  public alreadySignedUp: boolean = false;
  public isMobile = isPlatform('mobile');
  public alreadyVerified: boolean;
  public isInstructorForEvent: boolean;

  private eventId: string;
  private clubId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router
  ) {}

  ngOnInit() {
    this.initData();
  }

  public onButtonClick = async () => {
    if (this.price === '0 $') {
      this.eventService.signUpForFreeEvent(this.eventId).subscribe(() => (this.alreadySignedUp = true));
      return;
    } else if (this.price === privateEvent) {
      this.router.navigate(Paths.show_club.route(this.clubId));
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

  private initData = () => {
    this.activatedRoute.params.subscribe((params) => {
      const eventId = params['eventId'] as string;
      if (eventId) {
        this.event$ = this.eventService.getEventDetails(eventId);
        this.event$.subscribe(({ getEvent }) => {
          if (getEvent) {
            this.setEventValues(getEvent);
            this.clubInfo$.subscribe(({ currentUser }) => {
              this.isInstructorForEvent = Boolean(
                getEvent.instructorForEvents?.find((ins) => ins?.user?.id === currentUser?.id)?.user?.id
              );
              const event = currentUser!.events?.find((event) => event?.eventId === getEvent!.eventId) ?? null;
              this.handleAlreadySignedUp(event);
            });
          }
        });
      }
    });
  };

  getButtonText = () => {
    console.log(this.price);

    if (this.price === privateEvent) return 'Go to club';
    else if (this.isInstructorForEvent) return 'Verify users';
    else if (this.alreadySignedUp) return 'Verify';
    else return 'Sign Up';
  };

  public modalCallback = (succes: boolean) => {
    if (succes) {
      this.alreadySignedUp = true;
    }
  };

  public onVerifyClicked = async () => {
    const modal = await this.modalController.create({
      component: VerifyModalUserPage,
      componentProps: { eventId: this.eventId, isInstructor: this.isInstructorForEvent },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.dismissed === true) {
      this.eventService.getEventPageInfo(this.clubId);
    }
  };

  public handleAlreadySignedUp = (event: IEventPageInfoQuery_currentUser_events | null) => {
    if (event || this.isInstructorForEvent) {
      this.alreadySignedUp = true;
    }
    if (event?.status === PresenceStatusEnum.ATTEND) this.alreadyVerified = true;
  };

  private setEventValues = (getEvent: IEventPageQuery_getEvent) => {
    this.clubInfo$ = this.eventService.getEventPageInfo(getEvent.clubId);
    this.handlePriceForEvent(getEvent);
    this.eventName = getEvent.name!;
    this.eventId = getEvent.eventId!;
    this.clubId = getEvent.clubId!;
  };

  private handlePriceForEvent = (getEvent: IEventPageQuery_getEvent) => {
    const { userPrice: price } = getEvent;

    if (price !== getEvent?.publicPrice) {
      this.price = price + ' $';
      this.color = 'green';
    } else if (getEvent.publicPrice) {
      this.color = 'black';
      this.price = getEvent.publicPrice + ' $';
    } else {
      this.price = privateEvent;
    }
  };
}

const privateEvent = 'Event is private';
