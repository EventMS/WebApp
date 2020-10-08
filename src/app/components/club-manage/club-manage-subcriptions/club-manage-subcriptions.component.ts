import { Component, OnInit } from '@angular/core';
import { ClubSubscriptionsQueryService } from 'src/app/services/GRAPHQL/subscriptions/queries/club-subscriptions-query.service';
import { ISubscriptionsForClubQuery_subscriptionsForClub } from 'src/graphql_interfaces';

@Component({
  selector: 'app-club-manage-subcriptions',
  templateUrl: './club-manage-subcriptions.component.html',
  styleUrls: ['./club-manage-subcriptions.component.scss'],
})
export class ClubManageSubcriptionsComponent implements OnInit {

  existingSubscriptions: ISubscriptionsForClubQuery_subscriptionsForClub[] = []
  upcomingEvents: string[] = ["et event", "et andet event"]

  constructor(private clubSubscriptionsService: ClubSubscriptionsQueryService) { }

  ngOnInit() {
/*     this.clubSubscriptionsService.fetch().subscribe(
      (data) => this.existingSubscriptions = data.data.subscriptionsForClub,
    ) */

    this.existingSubscriptions.push({name: "yes" , price: 120, __typename: "ClubSubscription"})
    this.existingSubscriptions.push({name: "Another one" , price: 150, __typename: "ClubSubscription"})
  }

  onSubmit() {

  }

  onEdit() {

  }
}
