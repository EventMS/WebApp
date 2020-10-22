import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
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

  constructor(
    private modalController: ModalController,
    private clubSubscriptionQueryService: ClubSubscriptionsQueryService
  ) {}

  ngOnInit() {
    this.clubSubscriptionQueryService.watch({ clubId: this.clubId }).valueChanges.pipe(
      map(({ data }) => {
        this.clubSubscriptions = data.subscriptionsForClub;
        return data.subscriptionsForClub;
      })
    );
  }

  getName = () => this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubsubscriptionId)?.name;

  getAmount = () => this.clubSubscriptions?.find((sub) => sub!.clubSubscriptionId == this.clubsubscriptionId)?.price;

  public dissmiss = () => {
    this.modalController.dismiss();
  };
}
