import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { ICreateSubscriptionMutation, ICreateSubscriptionMutationVariables } from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class CreateSubscriptionMutationService extends Mutation<
  ICreateSubscriptionMutation,
  ICreateSubscriptionMutationVariables
> {
  document = gql`
    mutation ICreateSubscriptionMutation($request: CreateClubSubscriptionRequestInput) {
      createClubSubscription(request: $request) {
        price
        name
      }
    }
  `;
}
