import { Component, Input, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { GoogleNearbyService } from 'src/app/services/GoogleNearby/google-nearby.service';
import { VerificationService } from 'src/app/services/GRAPHQL/verification/verification.service';
import { IVerifyCodeQuery_getEvent, PresenceStatusEnum } from 'src/graphql_interfaces';
import { Message, UUID } from 'capacitor-google-nearby-messages';
import { AuthenticationService } from 'src/app/services/GRAPHQL/user/authentication.service';
@Component({
  selector: 'app-verify-modal-user',
  templateUrl: './verify-modal-user.page.html',
  styleUrls: ['./verify-modal-user.page.scss'],
})
export class VerifyModalUserPage implements OnInit {
  @Input() eventId: string;
  @Input() isInstructor: boolean;
  public code: string;
  public participants: IVerifyCodeQuery_getEvent['participants'];
  public wrongCode: string;
  public cordovaAvailable: boolean;
  public searchQuery: string;
  public filteredParicipants: IVerifyCodeQuery_getEvent['participants'];
  private uuid: UUID | undefined;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private verificationService: VerificationService,
    private googleNearby: GoogleNearbyService,
    private toastController: ToastController,
    private authService: AuthenticationService
  ) {
    this.cordovaAvailable = this.platform.is('cordova');
  }

  async ngOnInit() {
    if (this.isInstructor) {
      await this.removeSubscriptions();
      await this.startNearbyRead();
    }

    this.verificationService
      .getVerificationCodes({ eventId: this.eventId })
      .subscribe(async ({ currentUser, getEvent }) => {
        if (getEvent && currentUser) {
          this.participants = this.filteredParicipants = getEvent.participants;
          if (!this.isInstructor) {
            this.code =
              currentUser.events?.find((data) => data?.eventId === this.eventId)?.code ??
              'code not generated yet, try again later';
          }
        }
      });
  }

  private removeSubscriptions = async () => {
    this.googleNearby.clean(this.uuid);
  };

  async ionViewWillLeave() {
    await this.removeSubscriptions();
  }

  public didSearch(query: string) {
    this.filteredParicipants = this.participants!.filter((data) => {
      return data!.user!.name!.toLowerCase().includes(query.toLowerCase());
    });
  }

  public onCodeSubmitted = () => {
    this.verificationService.verifyCode({ request: { eventId: this.eventId, code: this.code.trim() } }).subscribe(
      () => {
        this.wrongCode = '';
      },
      (error: ApolloError) => {
        this.wrongCode = error.message.includes('Invalid') ? 'Invalid code' : 'Code has already been used';
      }
    );
  };

  public startNearbyRead = async () => {
    await this.googleNearby.subscribe(this.messageRecieved);
  };

  private messageRecieved = async (data: { message: Message }) => {
    const { content, type } = data.message;

    if (type === 'INIT') {
      return;
    }

    if (content && type === 'DEFAULT') {
      const messages = atob(content).split(':');

      if (this.participants?.find((part) => part?.user?.name === messages[1])?.status === PresenceStatusEnum.ATTEND) {
        return;
      }

      const toast = await this.toastController.create({
        message: 'Verifiyng code from ' + messages[1],
        duration: 3000,
      });

      await toast.present();

      this.verificationService.verifyCode({ request: { eventId: this.eventId, code: messages[0].trim() } }).subscribe(
        () => {},
        async (e: ApolloError) => {}
      );
    }
  };

  public dismissModal = async () => {
    await this.modalController?.dismiss({
      dismissed: true,
    });
  };

  public startNearbyBroadcast = async () => {
    this.uuid = await this.googleNearby.publish(this.code + ':' + this.authService.currentUserValue?.user?.name);
    const toast = await this.toastController.create({ message: 'Verifiyng', duration: 5000 });
    await toast.present();
    await this.modalController.dismiss({
      dismissed: true,
    });
  };
}
