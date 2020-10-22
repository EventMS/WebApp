import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import {
  ISignUpForSubscriptionMutation,
  ISignUpForSubscriptionMutationVariables,
  SignUpSubscriptionRequestInput,
} from 'src/graphql_interfaces';
@Injectable({
  providedIn: 'root',
})
export class SignupForSubscriptionMutationService extends Mutation<
  ISignUpForSubscriptionMutation,
  ISignUpForSubscriptionMutationVariables
> {
  document = gql`
    mutation ISignUpForSubscriptionMutation($signUpForSubscriptionRequest: SignUpSubscriptionRequestInput) {
      signUpForSubscription(request: $signUpForSubscriptionRequest) {
        clubSubscriptionId
      }
    }
  `;

  signUpForSupscription = ({ clubSubscriptionId, paymentMethodId }: NonNullable<SignUpSubscriptionRequestInput>) =>
    this.mutate({
      signUpForSubscriptionRequest: {
        clubSubscriptionId: clubSubscriptionId,
        paymentMethodId: paymentMethodId,
      },
    });
}
