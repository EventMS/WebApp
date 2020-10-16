import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { CreateClubMemberMutationService } from 'src/app/services/GRAPHQL/subscriptions/mutations/create-user-subscription.service';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ISubscriptionsForClubQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
  @Input() clubId: string;

  public clubSubscriptions$: Observable<ISubscriptionsForClubQuery['subscriptionsForClub']>;
  public clubsubscriptionId: string;

  constructor(
    private modalController: ModalController,
    private clubSubscriptionQueryService: ClubSubscriptionsQueryService,
    private createClubMemberMutationService: CreateClubMemberMutationService,
    private authService: AuthenticationService
  ) {}

  onSubscribe = () => {
    const { currentUserValue } = this.authService;
    if (currentUserValue?.user?.id)
      this.createClubMemberMutationService
        .mutate({
          request: { userId: currentUserValue.user.id, clubSubscriptionId: this.clubsubscriptionId },
        })
        .subscribe(
          () => {
            this.modalController.dismiss();
          },
          (error) => console.log(error)
        );
  };

  public dissmiss = () => {
    this.modalController.dismiss();
  };

  ngOnInit() {
    this.clubSubscriptions$ = this.clubSubscriptionQueryService
      .watch({ clubId: this.clubId })
      .valueChanges.pipe(map(({ data }) => data.subscriptionsForClub));
  }
}
