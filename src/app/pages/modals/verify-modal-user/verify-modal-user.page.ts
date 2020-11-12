import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GoogleNearbyService } from 'src/app/services/GoogleNearby/google-nearby.service';
import { VerificationService } from 'src/app/services/GRAPHQL/verification/verification.service';
import { IVerifyCodeQuery_getEvent } from 'src/graphql_interfaces';

@Component({
  selector: 'app-verify-modal-user',
  templateUrl: './verify-modal-user.page.html',
  styleUrls: ['./verify-modal-user.page.scss'],
})
export class VerifyModalUserPage implements OnInit, OnDestroy {
  @Input() eventId: string;
  @Input() isInstructor: boolean;
  public code: string;
  public participants: IVerifyCodeQuery_getEvent['participants'];
  public wrongCode: string;
  private subscription: Subscription;
  public cordovaAvailable: boolean;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private verificationService: VerificationService,
    private googleNearby: GoogleNearbyService
  ) {
    this.cordovaAvailable = this.platform.is('cordova');
  }

  ngOnInit() {
    this.verificationService.getVerificationCodes({ eventId: this.eventId }).subscribe(({ currentUser, getEvent }) => {
      if (getEvent && currentUser) {
        this.participants = getEvent.participants;
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
    this.subscription = this.googleNearby.read().subscribe((code: string) => {
      this.verificationService.verifyCode({ request: { eventId: this.eventId, code: code.trim() } }).subscribe();
    });
  };

  public startNearbyBroadcast = () => {
    this.googleNearby.broadcast(this.code);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
