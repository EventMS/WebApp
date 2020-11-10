import { Component, Input, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalController: ModalController, private verificationService: VerificationService) {}

  ngOnInit() {
    this.verificationService.getVerificationCodes({ eventId: this.eventId }).subscribe(({ currentUser, getEvent }) => {
      if (getEvent && currentUser) {
        this.participants = getEvent.participants;
        if (!this.isInstructor)
          this.code =
            currentUser.events?.find((data) => data?.eventId == this.eventId)?.code ??
            'code not generated yet, try again later';
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
}
