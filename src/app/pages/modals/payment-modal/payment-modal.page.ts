import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SubscriptionService } from 'src/app/services/GRAPHQL/subscriptions/subscription.service';
import { ISubscriptionsForClubQuery } from 'src/graphql_interfaces';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
  @Input() clubId: string;

  public clubSubscriptions: ISubscriptionsForClubQuery['subscriptionsForClub'];
  public clubsubscriptionId: string;
  clubSubscriptions$: Observable<ISubscriptionsForClubQuery['subscriptionsForClub']>;

  constructor(
    private modalController: ModalController,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.clubSubscriptions$ = this.subscriptionService.getSubscriptions(this.clubId)
    this.clubSubscriptions$.subscribe((data) => {
      this.clubSubscriptions = data
    })
  }

  getName = () => this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubsubscriptionId)?.name;

  getAmount = () => this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubsubscriptionId)?.price;

  public dissmiss = () => {
    this.modalController.dismiss();
  };
}
