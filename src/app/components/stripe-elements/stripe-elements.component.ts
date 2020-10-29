import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import { SignUpForEventMutationService } from 'src/app/services/GRAPHQL/events/mutations/single-payment-mutation.service';
import { SignupForSubscriptionMutationService } from 'src/app/services/GRAPHQL/subscriptions/mutations/signup-for-subscription-mutation.service';
declare var Stripe: stripe.StripeStatic;

@Component({
  selector: 'app-stripe-elements',
  templateUrl: './stripe-elements.component.html',
  styleUrls: ['./stripe-elements.component.scss'],
})
export class StripeElementsComponent implements AfterViewInit {
  constructor(
    public loadingController: LoadingController,
    private signUpforSubscriptionMutationService: SignupForSubscriptionMutationService,
    private signUpForEventMutationService: SignUpForEventMutationService,
    private authService: AuthenticationService
  ) {
    this.stripe = Stripe(
      'pk_test_51Hc6ZtETjZBFbSa3sx4mvQCavZp6UgpPDqJKzSYGlh42SUE5o0l1UVotttauCQJf5VGPQcUt6lWUo8BsxYEh3DBG003csjsgvS'
    );
    const elements = this.stripe.elements();
    this.card = elements.create('card');
  }

  @Input() amount: number;
  @Input() description: string;
  @Input() eventId: string;
  @Input() subscriptionId: string;
  @Input() dismissModal?: () => void;
  @ViewChild('cardElement') cardElement: ElementRef;

  public stripe: stripe.Stripe; // : stripe.Stripe;
  public card: stripe.elements.Element;
  public cardErrors: string | undefined;
  public disabled: boolean = true;

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', (response) => {
      if (response) {
        const { complete, error } = response;
        if (complete) this.disabled = false;

        this.cardErrors = error?.message;
      }
    });
  }

  getButtonText = () =>
    this.amount && this.description
      ? `Buy ${this.description} for $ ${this.amount}.00`
      : 'Please choose a subscription';

  // Listen for form submission, process the form with Stripe,
  // and get the
  async handleForm(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (this.subscriptionId) this.handleSubscription();
    else if (this.eventId) this.handleSinglePayment();
  }

  handleSinglePayment = () => {
    this.signUpForEventMutationService.signUpForEventMutation(this.eventId).subscribe(async ({ data }) => {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 10000,
      });
      await loading.present();

      if (data?.signUpForEvent?.clientSecret) {
        const result = await this.stripe.confirmCardPayment(data.signUpForEvent.clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.authService!.currentUserValue!.user!.name!,
            },
          },
        });
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result?.paymentIntent?.status === 'succeeded') {
            console.log('success');
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        }
        loading.dismiss();
        this.dismissModal?.();
      }
    });
  };

  handleSubscription = async () => {
    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem('latestInvoicePaymentIntentStatus');

    if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
      const invoiceId = localStorage.getItem('latestInvoiceId');
      const isPaymentRetry = true;
      // create new payment method & retry payment on invoice with new payment method
      await this.createPaymentMethod({
        card: this.card,
        isPaymentRetry,
        //invoiceId: invoiceId!,
      });
    } else {
      // create new payment method & create subscription
      await this.createPaymentMethod({ card: this.card });
    }
    // Send the token to your server.
  };

  createPaymentMethod = async ({
    card,
    isPaymentRetry = false,
  }: //invoiceId = undefined,
  {
    card: stripe.elements.Element;
    isPaymentRetry?: boolean;
    //invoiceId?: string;
  }) => {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 10000,
    });
    await loading.present();
    // Set up payment method for recurring
    await this.stripe
      .createPaymentMethod({
        type: 'card',
        card: card,
      })
      .then((result) => {
        if (result.error) {
          this.cardErrors = result.error.message;
        } else {
          if (isPaymentRetry) {
            // Update the payment method and retry invoice payment
            // this.retryInvoiceWithNewPaymentMethod({
            //   customerId: this.authService.currentUserValue.user.id,
            //   paymentMethodId: result.paymentMethod.id,
            //   invoiceId: invoiceId,
            //   priceId: priceId,
            // });
          } else {
            //Create the subscription
            this.signUpforSubscriptionMutationService
              .signUpForSupscription({
                clubSubscriptionId: this.subscriptionId,
                paymentMethodId: result?.paymentMethod?.id!,
              })
              .subscribe();
          }
        }
        loading.dismiss();
        this.dismissModal?.();
      });
  };
}
