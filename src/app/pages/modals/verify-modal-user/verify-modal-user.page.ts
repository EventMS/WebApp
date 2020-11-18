import { Component, Input, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GoogleNearbyService } from 'src/app/services/GoogleNearby/google-nearby.service';
import { VerificationService } from 'src/app/services/GRAPHQL/verification/verification.service';
import { IVerifyCodeQuery_getEvent } from 'src/graphql_interfaces';
import { App, AppState } from '@capacitor/core';
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

  private currentUserName: string;
  private subscription: Subscription | undefined;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private verificationService: VerificationService,
    private googleNearby: GoogleNearbyService,
    private toastController: ToastController
  ) {
    this.cordovaAvailable = this.platform.is('cordova');
  }

  ngOnInit() {
    App.addListener('appStateChange', this.nearbyListener);
    this.verificationService.getVerificationCodes({ eventId: this.eventId }).subscribe(({ currentUser, getEvent }) => {
      if (getEvent && currentUser) {
        this.participants = this.filteredParicipants = getEvent.participants;
        this.currentUserName = currentUser.name!;
        if (!this.isInstructor)
          this.code =
            currentUser.events?.find((data) => data?.eventId == this.eventId)?.code ??
            'code not generated yet, try again later';
        else {
          this.startNearbyRead();
        }
      }
    });
  }

  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
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

  public startNearbyRead = () => {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.googleNearby.read()?.subscribe(this.messageRecieved);
  };

  private messageRecieved = async (message: string) => {
    const messages = message.split(':');

    const toast = await this.toastController.create({
      message: 'Verifiyng code from ' + messages[1],
      duration: 3000,
    });
    await toast.present();
    this.verificationService.verifyCode({ request: { eventId: this.eventId, code: messages[0].trim() } }).subscribe();
  };

  public startNearbyBroadcast = async () => {
    this.googleNearby.broadcast(this.code + ':' + this.currentUserName);
    const toast = await this.toastController.create({ message: 'Verifiyng', duration: 5000 });
    await toast.present();
    await this.modalController.dismiss({
      dismissed: true,
    });
  };

  private nearbyListener = (state: AppState) => {
    if (state.isActive) {
      this.startNearbyRead();
    }
  };
}
