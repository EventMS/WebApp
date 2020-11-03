import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { CreateSubscriptionMutationService } from './mutations/create-subscription-mutation.service';
import { ClubSubscriptionsQueryService } from './queries/club-subscriptions-query.service';
import { CreateClubSubscriptionRequestInput, ISubscriptionsForClubQuery, ISubscriptionsForClubQuery_subscriptionsForClub } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private subscriptionQuery: ClubSubscriptionsQueryService,
    private createSubscriptionMutation: CreateSubscriptionMutationService) {}


    getSubscriptions(clubId: string): Observable<ISubscriptionsForClubQuery["subscriptionsForClub"]> {
      return this.subscriptionQuery.watch({ clubId: clubId })
      .valueChanges
      .pipe(map((result) => result.data.subscriptionsForClub));
    }

    createSubscription(request: CreateClubSubscriptionRequestInput) {
      return this.createSubscriptionMutation.mutate(
        {
          request: request
        },
        {
          refetchQueries: [
            {
              query: this.subscriptionQuery.document,
              variables: { clubId: request.clubId }
            }
          ]
        }
      )
    }
}
