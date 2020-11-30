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
  public clubSubscriptionId: string;
  public clubSubscriptions$: Observable<ISubscriptionsForClubQuery['subscriptionsForClub']>;

  constructor(private modalController: ModalController, private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.clubSubscriptions$ = this.subscriptionService.getSubscriptions(this.clubId);
    this.clubSubscriptions$.subscribe((data) => {
      this.clubSubscriptions = data;
    });
  }

  public getName = () =>
    this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubSubscriptionId)?.name;

  public getAmount = () =>
    this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubSubscriptionId)?.price;

  public dissmiss = (success: boolean) => {
    this.modalController.dismiss({ success });
  };
}
