import { Component, Input, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { GoogleNearbyService } from 'src/app/services/GoogleNearby/google-nearby.service';
import { VerificationService } from 'src/app/services/GRAPHQL/verification/verification.service';
import { IVerifyCodeQuery_getEvent } from 'src/graphql_interfaces';

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
  currentUserName: string;

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
    this.verificationService.getVerificationCodes({ eventId: this.eventId }).subscribe(({ currentUser, getEvent }) => {
      if (getEvent && currentUser) {
        this.participants = getEvent.participants;
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
    this.googleNearby.read().subscribe(async (message: string) => {
      const messages = message.split(':');

      const toast = await this.toastController.create({
        message: 'Verifiyng code from ' + messages[1],
        duration: 3000,
      });

      await toast.present();

      this.verificationService.verifyCode({ request: { eventId: this.eventId, code: messages[0].trim() } }).subscribe();
    });
  };

  public startNearbyBroadcast = async () => {
    this.googleNearby.broadcast(this.code + ':' + this.currentUserName);
    const toast = await this.toastController.create({ message: 'Verifiyng', duration: 5000 });
    await toast.present();
    await this.modalController.dismiss({
      dismissed: true,
    });
  };
}
