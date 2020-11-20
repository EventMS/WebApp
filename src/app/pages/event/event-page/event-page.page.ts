import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionType, Plugins } from '@capacitor/core';
import { IonRouterOutlet, isPlatform, ModalController } from '@ionic/angular';
import { Message } from 'capacitor-google-nearby-messages';
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

const { Permissions, GoogleNearbyMessages } = Plugins;

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
  public alreadySignedUp = false;
  public isMobile = isPlatform('mobile');
  public alreadyVerified: boolean;
  public isInstructorForEvent: boolean;
  public eventId: string;

  private clubId: string;
  private startTime: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private modalController: ModalController,
    private router: Router
  ) {
    GoogleNearbyMessages.initialize({ apiKey: 'AIzaSyBof-EFFsnyZnSLGYF0p1xbu5MfCVUoOUs' });
  }

  async ngOnInit() {
    this.initData();
  }

  public onButtonClick = async () => {
    if (this.price === '0 $') {
      this.eventService.signUpForFreeEvent(this.eventId).subscribe(() => (this.alreadySignedUp = true));
      return;
    } else if (this.price === buttonText.PRIVATE_EVENT) {
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
      const eventId = params.eventId as string;
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
    if (this.startTime < Date.now()) {
      return buttonText.PASSED;
    } else if (this.price === buttonText.PRIVATE_EVENT) {
      return buttonText.PRIVATE_EVENT;
    } else if (this.isInstructorForEvent) {
      return buttonText.INSTRUCTOR;
    } else if (this.alreadySignedUp) {
      return buttonText.SIGNED_UP;
    } else {
      return buttonText.CAN_SIGN_UP;
    }
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
    if (event?.status === PresenceStatusEnum.ATTEND) {
      this.alreadyVerified = true;
    }
  };

  private setEventValues = (getEvent: IEventPageQuery_getEvent) => {
    this.clubInfo$ = this.eventService.getEventPageInfo(getEvent.clubId);
    this.handlePriceForEvent(getEvent);
    this.eventName = getEvent.name!;
    this.eventId = getEvent.eventId!;
    this.clubId = getEvent.clubId!;
    this.startTime = getEvent.startTime;
    if (this.startTime < Date.now()) {
      this.disabled = true;
    }
  };

  private handlePriceForEvent = (getEvent: IEventPageQuery_getEvent) => {
    const { userPrice, publicPrice } = getEvent;

    if (userPrice !== publicPrice) {
      this.price = userPrice + ' $';
      this.color = 'green';
    } else if (publicPrice) {
      this.color = 'black';
      this.price = publicPrice + ' $';
    } else if (!userPrice && !publicPrice) {
      this.price = '0 $';
      this.color = 'green';
    } else {
      this.price = buttonText.PRIVATE_EVENT;
    }
  };
}

const buttonText = {
  PRIVATE_EVENT: 'Event is private',
  PASSED: 'Event has passed',
  INSTRUCTOR: ' Verify users',
  SIGNED_UP: 'Verify',
  CAN_SIGN_UP: 'Sign up',
};
