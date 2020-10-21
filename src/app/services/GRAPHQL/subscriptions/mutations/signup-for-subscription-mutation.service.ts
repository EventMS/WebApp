import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import {
  CreateSubscriptionRequestInput,
  ISignupForSubscriptionMutation,
  ISignupForSubscriptionMutationVariables,
} from 'src/graphql_interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignupForSubscriptionMutationService extends Mutation<
  ISignupForSubscriptionMutation,
  ISignupForSubscriptionMutationVariables
> {
  document = gql`
    mutation ISignupForSubscriptionMutation($signUpForSubscriptionReq: CreateSubscriptionRequestInput) {
      signUpForSubscription(req: $signUpForSubscriptionReq) {
        clubSubscriptionId
      }
    }
  `;

  signUpForSupscription = ({ clubSubscriptonId, paymentMethodId }: NonNullable<CreateSubscriptionRequestInput>) =>
    this.mutate({
      signUpForSubscriptionReq: {
        clubSubscriptonId: clubSubscriptonId,
        paymentMethodId: paymentMethodId,
      },
    });
}
