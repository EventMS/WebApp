import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ISubscriptionsForClubQuery_subscriptionsForClub } from 'src/graphql_interfaces';
import { CreateSubscriptionFormBuilder } from './subscription-formbuilder';

@Component({
  selector: 'app-club-manage-subcriptions',
  templateUrl: './club-manage-subcriptions.component.html',
  styleUrls: ['./club-manage-subcriptions.component.scss'],
})
export class ClubManageSubcriptionsComponent implements OnInit {
  private subscriptionForm: CreateSubscriptionFormBuilder;

  existingSubscriptions: ISubscriptionsForClubQuery_subscriptionsForClub[] = [];
  upcomingEvents: string[] = ['et event', 'et andet event'];

  constructor(private clubSubscriptionsService: ClubSubscriptionsQueryService, private formBuilder: FormBuilder) {
    this.subscriptionForm = new CreateSubscriptionFormBuilder(formBuilder);
  }

  ngOnInit() {
    /*     this.clubSubscriptionsService.fetch().subscribe(
      (data) => this.existingSubscriptions = data.data.subscriptionsForClub,
    ) */

    this.existingSubscriptions.push({ name: 'yes', price: 120, __typename: 'ClubSubscription' });
    this.existingSubscriptions.push({ name: 'Another one', price: 150, __typename: 'ClubSubscription' });
  }

  get form() {
    return this.subscriptionForm.form;
  }

  get name() {
    return this.subscriptionForm.name;
  }

  get price() {
    return this.subscriptionForm.price;
  }

  get subscriptionReference() {
    return this.subscriptionForm.subscriptionReference;
  }

  onSubmit() {}

  onEdit() {}
}
