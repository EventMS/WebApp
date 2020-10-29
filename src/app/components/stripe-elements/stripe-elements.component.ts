import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private signUpforSubscriptionMutationService: SignupForSubscriptionMutationService
  ) {
    this.stripe = Stripe(
      'pk_test_51Hc6ZtETjZBFbSa3sx4mvQCavZp6UgpPDqJKzSYGlh42SUE5o0l1UVotttauCQJf5VGPQcUt6lWUo8BsxYEh3DBG003csjsgvS'
    );
    const elements = this.stripe.elements();
    this.card = elements.create('card');
  }

  @Input() amount: number;
  @Input() description: string;
  @Input() subscriptionId: string;
  @Input() dismissModal?: () => void;
  @ViewChild('cardElement') cardElement: ElementRef;

  stripe: stripe.Stripe; // : stripe.Stripe;
  card: stripe.elements.Element;
  cardErrors: string | undefined;

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', (error) => {
      this.cardErrors = error?.error?.message;
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

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 10000,
    });
    await loading.present();

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
    loading.dismiss();
    this.dismissModal?.();
  }

  createPaymentMethod = async ({
    card,
    isPaymentRetry = false,
  }: //invoiceId = undefined,
  {
    card: stripe.elements.Element;
    isPaymentRetry?: boolean;
    //invoiceId?: string;
  }) => {
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
            if (this.subscriptionId)
              //Create the subscription
              this.signUpforSubscriptionMutationService
                .signUpForSupscription({
                  clubSubscriptionId: this.subscriptionId,
                  paymentMethodId: result?.paymentMethod?.id!,
                })
                .subscribe();
            else {
              console.log('Single payment');
            }
          }
        }
      });
  };
}
